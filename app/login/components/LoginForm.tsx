"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image"; 

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const loginerror = searchParams.get("error") ? "Invalid credentials" : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(loginerror || "");
  const { data: session } = useSession();
 
  const redirectPage = searchParams.get("redirect");

    
  const onSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

     signIn("credentials", {
      email,
      password,
      callbackUrl: redirectPage ? "/success?redirect=" + redirectPage : "/success", // backend DB sync on this page
    })
  }
 
  return (
    <>
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="card w-96 bg-base-100 shadow-xl text-neutral-content text-center">
            <figure className="px-10 pt-10">
              <Image
                src="/delaware-logo.svg"
                alt="Delaware logo"
                width={500}
                height={500}
                className="w-48 ml-3"
              />
            </figure>
            <figcaption>
              <span className="font-medium text-lg text-primary">
                Welcome to the portal
              </span>
            </figcaption>
            <div className="card-body items-center text-center">
              <div className="form-control  w-full max-w-xs gap-y-1">
                <label className="label " htmlFor="email">
                  <span className="label-text text-lg">Email</span>
                </label>
                <input
                  className="input input-primary input-bordered rounded-3xl w-full max-w-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                />
                <label className="label" htmlFor="password">
                  <span className="label-text text-lg ">Password</span>
                </label>
                <input
                  className="input input-primary input-bordered rounded-3xl w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                />
                {error && (
                  <div className="alert alert-error h-10 mt-4 shadow-lg">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                <button className="btn btn-primary w-32 mt-6 self-center rounded-3xl">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
