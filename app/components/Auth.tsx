"use client";

import { signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
  return (
    <button className=" btn btn-sm rounded-3xl " onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const SignOutButton = () => {
  return (
    <button className="btn rounded-3xl " onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export const SignOutListItem = () => {
  return (
    <li>
      <span onClick={() => signOut({ callbackUrl: "/" })}>Sign out</span>
    </li>
  );
};

export const SignOutCard = () => {
  return (
    <div className="card col-span-2 bg-[#AA9ACA] text-white">
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        <div className="card-body">
          <h2 className="card-title text-xl mt-2 cursor-pointer"> Sign out </h2>
        </div>
      </button>
    </div>
  );
};
