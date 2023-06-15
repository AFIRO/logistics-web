import { NotificationService } from "../../backend/service/notification.service";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Notifications() {

  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  let notifications;

  if (session === undefined || session === null) {
    return (<>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>Notifications</li>
        </ul>
      </div>
      <div>
        <p>You need to be <b><Link href="/login?redirect=notifications">signed in</Link></b> in order to consult notifications.</p>
      </div>
    </>);
  }
  else {
    notifications = await new NotificationService().findAllForUser(id);

    return (
      <>
        <div className="mx-auto w-4/5 pt-4 ">
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link href={"/products"}>Home</Link>
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
              <li>Notifications</li>
            </ul>
          </div>

          <h1 className="text-2xl font-semibold">Notifications</h1>

          <div className="flex  relative  overflow-x-none shadow-md  sm:rounded-lg mt-4 ">
            <table className="table bg-base-300  text-sm  w-full  sm:rounded-lg bg-opacity-20  ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th className="pl-8">Active</th>
                  <th>Date</th>
                  <th>Order ID</th>
                </tr>
              </thead>
              <tbody className=" ">
                {notifications.map((notification) => (
                  <tr key={notification.id} id={"row-" + notification.id}>
                    <td>
                      {" "}
                      <Link
                        href={
                          "/notifications/" +
                          notification.id
                        }
                      >
                        {notification.id}
                      </Link>
                    </td>
                    <td>{notification.active === true ? 'ACTIVE' : 'PROCESSED'}</td>
                    <td>{notification.date_created.toLocaleString()}</td>
                    <td>
                      {" "}
                      <Link
                        href={
                          "/orders/" +
                          notification.id_of_order_to_be_checked
                        }
                      >
                        {notification.id_of_order_to_be_checked}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
