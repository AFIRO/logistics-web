import { NotificationService } from "../../../backend/service/notification.service"; 
import { authOptions } from "../../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page({ params: { id } }){

  const session = await getServerSession(authOptions);
  const notification = await new NotificationService().findById(id);

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

        <div className="hero min-h-full rounded-lg w-3/5 py-12 mx-auto bg-base-100">
          <div className="hero-content flex-col lg:flex-row items-start gap-x-56">
             
            <div className="">
              <p className="py-4 font-bold  ">{notification.active === true ? 'ACTIVE' : 'PROCESSED'}</p>
              <p className="py-4 font-bold  ">{notification.date_created.toISOString()}</p>
              <Link className="py-4 font-bold  "
                      href={
                        "/orders/" +
                        notification.id_of_order_to_be_checked
                      }
                    >
                      {notification.id_of_order_to_be_checked}
                    </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}