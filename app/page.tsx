import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignOutCard } from "./components/Auth";

import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  return (
    <main className="h-[calc(100vh-4rem)] w-screen overflow-y-auto flex bg-login-bg justify-center items items-center ">
      <div className="w-1/2 mx-auto bg-white shadow-2xl p-12 h-[55%] rounded-lg -mt-56">
        <h1 className="text-2xl font-semibold">Delaware dashboard</h1>
        {session === null && (
          <p>
            For access to user-only features, please{" "}
            <Link href="/login" className="link link-primary">
              sign in
            </Link>
            .
          </p>
        )}
        <div className="grid grid-flow-row-dense grid-cols-5 gap-2  mt-6 ">
          <div className="card bg-primary text-white col-span-3 ">
            <div className="card-body">
              <Link href={"/products"}>
                <h2 className="card-title">Products</h2>
                <p>View our assortment of available products</p>
                <div className="card-actions justify-end"></div>
              </Link>
            </div>
          </div>

          <div className="card bg-primary text-white bg-opacity-70">
            <div className="card-body">
              <Link href={"/track"}>
                <h2 className="card-title">Track & Trace</h2>
                <p>View the status of your order</p>
                <div className="card-actions justify-end"></div>
              </Link>
            </div>
          </div>

          {session !== null && (
            <>
              <div className="card  bg-primary text-white">
                <div className="card-body">
                  <Link href={{
                    pathname: "user/" + session.user.id,
                    query: {user: session.user.id}
                  }}>
                    <h2 className="card-title">Profile</h2>
                    <p>Check your profile details</p>
                    <div className="card-actions justify-end"></div>
                  </Link>
                </div>
              </div>

              <div className="card bg-primary text-white col-span-2 bg-opacity-70">
                <div className="card-body">
                  <Link href={"/orders"}>
                    <h2 className="card-title">Orders</h2>
                    <p>View your order history details</p>
                    <div className="card-actions justify-end"></div>
                  </Link>
                </div>
              </div>

              <div className="card bg-secondary text-white bg-opacity-80">
                <div className="card-body">
                  <Link href={"/notifications"}>
                    <h2 className="card-title">Notifications</h2>
                    <p>View your notifications</p>
                    <div className="card-actions justify-end"></div>
                  </Link>
                </div>
              </div>

              <SignOutCard />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
