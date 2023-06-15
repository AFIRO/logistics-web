import { CustomerOrderService } from "../../backend/service/customerorder.service";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../db/prisma";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  //const idWithOrders = "14c8c162-d31c-454b-b1ea-f5579de67849 "
  const personId = (
    await prisma.application_user.findUnique({
      where: {
        user_id: id,
      },
    })
  ).persoonsgegevens_person_id;
  const getOrders = async () => {
    try {
      return await new CustomerOrderService().findAllByCustomer(personId);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const order = await getOrders();

  return (
    <>
      {order ? (
        <div className="mx-auto w-4/5 pt-4 ">
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              {session !== undefined && session !== null && (
                <li>
                  <Link
                    href={{
                      pathname: "/user/" + session.user.id,
                      query: { user: session.user.id },
                    }}
                  >
                    Profile
                  </Link>
                </li>
              )}
              <li>Orders</li>
            </ul>
          </div>

          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="flex relative overflow-x-none  mt-4 ">
            <table className="table pl-6  text-sm  w-full sm:rounded-lg shadow-md">
              <thead>
                <tr>
                  <th>Order ID (click to view details)</th>
                  <th>Date ordered</th>
                  <th>Order status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => {
                  return (
                    <tr key={order.order_id}>
                      <td className="link-primary link">
                        <Link href={"/orders/" + order.order_id}>
                          {order.order_id}
                        </Link>
                      </td>
                      <td>{order.order_date.toDateString()}</td>
                      <td>{order.status === "OPEN" && "Order Placed"}
                          {order.status === "SENT" && "Order shipped"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        //To do: make a better element for this
        <div>You have not yet placed any orders on this account.</div>
      )}
    </>
  );
}
