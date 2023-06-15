"use client";

import { SignInButton, SignOutListItem } from "./Auth";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const User = () => {
  const { data: session } = useSession();
  console.log("Client Session", session);
 
  if (session != null) {
    return <p>{session.user.email}</p>;
  }
  return <p></p>;
};

export let Authenticated = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {

    return (
      <div className="dropdown dropdown-end cursor-pointer bg-base-100">
        <div className="flex">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
            <div className="w-10 rounded-full ">
              <Image
                src="/placeholder_user_icon.jpeg"
                alt="Placeholder user icon"
                width={500}
                height={500}
              />
            </div>
          </label>
          <div className="self-center flex ml-2 text-primary">
            <span tabIndex={0} className="text-sm">
              <User />
            </span>
            <svg
              className="fill-current ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              tabIndex={0}
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
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
          <Link href="/orders">
          <li>
            <a>Orders</a>
          </li>
          </Link>
          <SignOutListItem />
        </ul>
      </div>
    );
  }
  return <SignInButton />;
};
