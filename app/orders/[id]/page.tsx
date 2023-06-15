import { CustomerOrderService } from "../../../backend/service/customerorder.service";
import { AddressService } from "../../../backend/service/address.service";
import { authOptions } from "../../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page({ params: { id } }) {
  const order = await new CustomerOrderService().findById(id);
  const orderLines = await new CustomerOrderService().findOrderLinesByOrderId(
    id
  );
  const adres = await new AddressService().findById(
    order.delivery_address_address_id
  );
  console.log(order);
  let totaal = 0;
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="mx-auto w-4/5 pt-4">
        <div className="text-md breadcrumbs">
          <ul>
            <li><Link href={"/"}>Home</Link></li>
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
            <li>
              <Link href={"/orders"}>Orders</Link>
            </li>
            <li>Order details</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-4/5 pt-4 sm:rounded-lg">
        <div className="flex">
          <h1 className="text-2xl font-semibold flex-1">Order details</h1>
          <Link href={"/orders/edit/" + order.order_id}>
            <button
              className="bg-gray-100 p-2 px-4 rounded-md font-semibold"
              disabled={order.status.toLowerCase() !== "open"}
            >
              Edit order
            </button>
          </Link>
        </div>
        <div className="flex relative overflow-x-none shadow-md  mt-4 bg-neutral-content bg-opacity-10 ">
          <table className="table pl-6  text-sm  w-full mb-4">
            <thead>
              <tr>
                <th>Order ID</th>
                <th className="text-right">Date ordered</th>
                <th className="text-right">Status</th>
                <th className="text-right">Track and Trace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.order_id}</td>
                <td className="text-right">
                  {order.order_date.toDateString()}
                </td>
                <td className="text-right">
                  {order.status === "OPEN" && "Order Placed"}
                  {order.status === "SENT" && "Order Shipped"}
                </td>
                <td className="text-right">
                  {order.track_trace_code
                    ? order.track_trace_code
                    : "No tracking code available yet"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="table pl-6  text-sm  w-full my-4">
          <thead>
            <tr>
              <th>Item name (click to view details)</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price per unit</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderLines?.map((ol) => {
              const totaalOnderdeel =
                ol.order_line.unit_price_order_line *
                ol.order_line.quantity_ordered;
              totaal += totaalOnderdeel;
              return (
                <tr key={ol.order_lines_line_id}>
                  <td className="link link-primary">
                    <Link
                      href={"/products/" + ol.order_line.product_product_id}
                    >
                      {ol.order_line.product.name.toUpperCase()}
                    </Link>
                  </td>
                  <td className="text-right">
                    {ol.order_line.quantity_ordered}
                  </td>
                  <td className="text-right">
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(ol.order_line.unit_price_order_line)}
                  </td>
                  <td className="text-right">
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(totaalOnderdeel)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
          <tr>
              <td></td>
              <td></td>
              <td className="text-right">BTW</td>
              <td className="text-right">
                {new Intl.NumberFormat("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                }).format(totaal*0.21)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="text-right">TOTAL:</td>
              <td className="text-right">
                {new Intl.NumberFormat("nl-BE", {
                  style: "currency",
                  currency: "EUR",
                }).format(totaal)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="flex gap-2">
          <div className=" border-2 border-slate-200 w-full p-4 rounded-md">
            <h2 className="text-xl mb-2">Address:</h2>
            <div className="grid grid-flow-col gap-x-4">
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Street</span>
                <span className="capitalize">
                  {adres.street} {adres.house_number}{" "}
                </span>
              </div>
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Postal code</span>
                <span className="capitalize">{adres.postal_code}</span>
              </div>
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Country</span>
                <span>{adres.country}</span>
              </div>
            </div>
          </div>
          <div className=" border-2 border-slate-200 w-full p-4 rounded-md">
            <h2 className="text-xl mb-2 ">Packaging:</h2>
            <div className="grid grid-flow-col gap-x-4">
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Packaging name</span>
                <span className="capitalize">
                  {order.packaging.packaging_name}
                </span>
              </div>
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Packaging type</span>
                <span className="capitalize">
                  {order.packaging.packaging_type === "STANDARD"
                    ? "Standard Size"
                    : "Custom Size"}
                </span>
              </div>
              <div className="grid grid-flow-row gap-x-4">
                <span className="font-medium">Dimensions</span>
                <span>
                  {" "}
                  {order.packaging.height} cm X {order.packaging.length} cm X{" "}
                  {order.packaging.width}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
