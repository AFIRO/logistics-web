"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Succes() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  
  return (
    <>
      <div className="hero h-[calc(100vh-4rem)] bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={"/purchase.svg"}
            alt={"Icon illustrating a purchase"}
            height={250}
            width={250}
            className="max-w-sm rounded-lg shadow-2xl mr-8"
          ></Image>
          <div>
            <h1 className="text-5xl font-bold">Thank you for your order!</h1>
            <p className="py-6">
              Your order has succesfully been placed. You can view your order
              history{" "}
              <Link href={"/orders"} className="link link-primary">
                here
              </Link>
              .
            </p>
            <button className="btn btn-outline btn-sm">
              <Link href={"/"}>Back to homepage</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
