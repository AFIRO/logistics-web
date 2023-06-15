import Image from "next/image";

export default function OrderProgress({ step }) {
  return (
    <>
      <div className="flex mx-auto mt-6">
        <div className="flex flex-col">
          <div className="w-[4rem] rounded-full bg-primary p-4">
            <Image
              src="/ordered.svg"
              alt="Order placed"
              width={250}
              height={250}
            />{" "}
          </div>
          <span className="text-center -ml-4 mt-2">Order placed</span>
        </div>
        <hr className="w-12 h-1 mx-2 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700 "></hr>
        <div className="flex flex-col items-center">
          {step === "SENT" && (
            <>
              <div className="w-[4rem] rounded-full bg-primary p-4">
                <Image
                  src="/pending.svg"
                  alt="Order pending shipment"
                  width={250}
                  height={250}
                />{" "}
              </div>
              <span className="text-center -ml-2 mt-2">
                Order pending
                <br />
                approval
              </span>
            </>
          )}
        </div>
        <hr className="w-12 h-1 ml-2 my-4 mr-3 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <div className="flex flex-col">
          {step === "SENT" && (
            <>
              <div className="w-[4rem] rounded-full bg-primary p-4">
                <Image
                  src="/shipped.svg"
                  alt="Order shipped"
                  width={250}
                  height={250}
                />{" "}
              </div>
              <span className="text-center -ml-4 mt-2">Order shipped</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
