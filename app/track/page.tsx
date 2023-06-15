"use client";

import OrderProgress from "./components/OrderProgress";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TrackAndTraceObject {
  order_id: string;
  order_date: Date;
  status: string;
}

export default async function Page({ searchParams }) {
  const [resultaat, setResultaat] = useState<TrackAndTraceObject>();
  const [nietGevonden, setNietGevonden] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTrackAndTrace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNietGevonden(null);
    setResultaat(null);
    const formData = new FormData(e.currentTarget);
    const body = {
      id: formData.get("track"),
      verification: formData.get("verification"),
    };

    const res = await fetch("/api/track", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      setNietGevonden("An error has occurred, please try again later.");
      setResultaat(null);
      setLoading(false);
    }

    res.json().then((data) => {
      if (data.status === 404) {
        setNietGevonden(
          "The track & trace code and/ord the verification code could not be found in the database."
        );
        setResultaat(null);
        setLoading(false);
      } else {
        setNietGevonden(null);
        setResultaat(data);
        setLoading(false);
      }
    });
  };

  return (
    <>
      <div className="mx-auto w-4/5 pt-4 ">
        <div className="text-md breadcrumbs">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            {searchParams.user !== undefined && (
              <li>
                <Link
                  href={{
                    pathname: "/user/" + searchParams.user,
                    query: { user: searchParams.user },
                  }}
                >
                  Profile
                </Link>
              </li>
            )}
            <li>Track & Trace</li>
          </ul>
        </div>

        <div className="flex mt-2">
          <div className="mr-56">
            <h1 className="text-2xl font-semibold mt-2">Track & Trace</h1>
            <p className="text-primary text-lg font-semibold">
              Track your parcel
            </p>
            <p className="w-[30rem]">
              Please enter your track & trace code and your verification code
              below to view the status of your parcel.
            </p>

            <div>
              <form
                className="card flex-shrink-0 w-[35rem] max-w-sm shadow-2xl bg-base-200 mt-8"
                onSubmit={getTrackAndTrace}
              >
                <div className="card-body pb-5">
                  <label className="font-semibold" htmlFor="track">
                    Track & Trace code:
                  </label>
                  <input
                    className="input input-primary"
                    type="text"
                    id="track"
                    name="track"
                    required
                    minLength={3}
                  />
                  <label className="font-semibold mt-4" htmlFor="verification">
                    Verification code:
                  </label>
                  <input
                    className="input input-primary"
                    type="text"
                    id="verification"
                    name="verification"
                    required
                    minLength={3}
                  />
                  <button
                    className="btn btn-sm btn-primary w-20  self-center mt-4 rounded-3xl"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="">
              {loading && (
                <div className="text-xl text-center mt-56 ml-56">
                  Loading...
                  <br />
                  <progress className="progress w-20"></progress>
                </div>
              )}

              {nietGevonden && (
                <div>
                  <h1 className="text-2xl font-semibold mt-2 mb-8">
                    Your parcel details
                  </h1>{" "}
                  <div className="card w-[38rem] bg-base-100 shadow-xl">
                    <div className="mx-auto">
                      <Image
                        src={"/tracktraceicon.svg"}
                        alt={"track&trace icon"}
                        width={250}
                        height={250}
                        className=" w-56 px-10 pt-10 mb-2"
                      />
                    </div>

                    <div className="card-body">
                      <h2 className="card-title my-0">
                        Parcel status: Parcel not (yet) found
                      </h2>
                      <p className="text-lg font-semibold">
                        We were unable to find your parcel in our system.
                      </p>
                      <p className="mt-2 text-lg">
                        Please make sure you&lsquo;ve entered the correct <br />{" "}
                        track & trace and verification code and try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {resultaat && (
                <>
                  <h1 className="text-2xl font-semibold mt-2 mb-8">
                    Your parcel details
                  </h1>
                  <div className="card w-[38rem] bg-base-100 shadow-xl">
                    <div className="mx-auto">
                      <Image
                        src={"/tracktraceicon.svg"}
                        alt={"track&trace icon"}
                        width={250}
                        height={250}
                        className=" w-56 px-10 pt-10"
                      />
                    </div>

                    <div className="mx-auto">
                      <OrderProgress step={resultaat.status} />
                    </div>

                    <div className="card-body">
                      <h2 className="card-title my-0">
                        Parcel status: {resultaat.status}
                      </h2>
                      {resultaat.status === "SENT" && (
                        <p>Your parcel has been shipped out.</p>
                      )}

                      <p>
                        <b>Order ID:</b> {resultaat.order_id}
                      </p>
                      <p>
                        <b>Date ordered:</b>{" "}
                        {new Date(
                          Date.parse(String(resultaat.order_date))
                        ).toDateString()}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
