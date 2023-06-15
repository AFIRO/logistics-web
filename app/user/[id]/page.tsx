import { UserService } from "../../../backend/service/user.service";
import { SignOutListItem } from "../../components/Auth";

import Link from "next/link";
import Image from "next/image";

export default async function Page({ searchParams }) {
  const user = await new UserService().findBydIDWithPersonAddress(
    searchParams.user
  );

  return (
    <>
      <div className="mx-auto w-4/5 pt-4">
        <div className="text-md breadcrumbs">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>Profile</li>
          </ul>
        </div>

        <div className="flex mt-4 ">
          <ul className="menu bg-base-100 w-56 mr-4">
            <li className="bordered">
              <Link href="/user">Account details</Link>
            </li>
            <li className="">
              <Link
                href={{
                  pathname: "/orders",
                  query: { user: searchParams.user },
                }}
              >
                Orders
              </Link>
            </li>
            <li className="">
              <Link
                href={{
                  pathname: "/track",
                  query: { user: searchParams.user },
                }}
              >
                Track & Trace
              </Link>
            </li>
            <SignOutListItem />
          </ul>

          <div className="">
            <h1 className="text-xl font-semibold">Account details</h1>

            <div className="card shadow-xl rounded-3xl w-[60rem] mt-8">
              <div className="card-body ">
                <div className="flex">
                  <div className="w-auto mx-auto">
                    <Image
                      src="/placeholder_user_icon.jpeg"
                      alt="Placeholder user icon"
                      width={150}
                      height={150}
                      className="rounded-2xl"
                    />
                  </div>

                  <div className="w-3/4">
                    <div>
                      <h2 className="text-xl font-semibold">Personal info</h2>
                      <div className="divider my-1"></div>
                      <div className="grid grid-cols-2 ">
                        <div>
                          <p className="font-medium">First name</p>
                          <p>{user.person.first_name}</p>
                        </div>
                        <div>
                          <p className="font-medium">Last name</p>
                          <p>{user.person.last_name}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mt-6">
                        Contact details
                      </h2>
                      <div className="divider my-1"></div>

                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-medium">Email</p>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <p className="font-medium">Phone number</p>
                          <p>{user.person.phone_number}</p>
                        </div>
                      </div>

                      <div className="divider my-1"></div>
                      <h3 className="text-lg font-medium">Address</h3>

                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-medium">Street</p>
                          <p>{user.person.address.street}</p>
                        </div>
                        <div>
                          <p className="font-medium">Number</p>
                          <p>{user.person.address.house_number}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-medium">Postal code</p>
                          <p>{user.person.address.postal_code}</p>
                        </div>
                        <div>
                          <p className="font-medium">Country</p>
                          <p>{user.person.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
