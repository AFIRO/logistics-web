"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

interface Packaging {
  packaging_id: string;
  active?: boolean;
  height: number;
  length: number;
  packaging_name?: string;
  price: number;
  type?: string;
  width: number;
}

interface Props {
  packagingTypes: Packaging[];
  customerId: string;
}

export function CheckoutPage(props) {
  const [chosenType, setChosenType] = useState<Packaging | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const packagingTypes = props.packaging;

  const handleTypeClick = (type: Packaging) => {
    setChosenType(type);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!localStorage.getItem("localStoredCartItems")) {
      alert("No cart items!");
      setLoading(false);
      return;
    }

    const data = new FormData(e.currentTarget);

    const body = {
      address: {
        street: data.get("street"),
        country: data.get("country"),
        houseNumber: data.get("houseNumber"),
        postalCode: data.get("postalCode"),
      },
      packagingType: chosenType,
      person: {
        email: data.get("email"),
        phone: data.get("phone"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        id: props.id,
      },
      products: JSON.stringify(localStorage.getItem("localStoredCartItems")),
      customerId: props.customerId,
    };
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      localStorage.removeItem("localStoredCartItems");
      router.refresh();
      router.push("/checkout/success");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("We can't submit the form, try again later?");
    }
  };

  return (
    <>
      <div className="mx-auto w-4/5 pt-4 ">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p>Please enter your information below:</p>

        <form onSubmit={onSubmit}>
          <div className="flex">
            <div className="w-1/3 mr-6">
              <h2 className="text-xl font-semibold mt-4">
                Contact Information
              </h2>

              <div className="flex w-3/4">
                <div className="form-control mr-2">
                  <label htmlFor="firstName" className="label">
                    <span className="text-base label-text">
                      First Name
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className=" input-sm input input-bordered input-primary"
                    id="name"
                    placeholder="Enter first name"
                    name="firstName"
                    required
                  />
                </div>

                <div className="form-control ">
                  <label htmlFor="lastName" className="label">
                    <span className="text-base label-text">
                      Last Name
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-sm input input-bordered input-primary"
                    id="name"
                    placeholder="Enter last name"
                    name="lastName"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-3/4">
                <label htmlFor="email" className="label">
                  <span className="text-base label-text">
                    Email Address
                    <span className="text-primary">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  className="input-sm input input-bordered input-primary"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  required
                />
              </div>

              <div className="form-control w-2/5">
                <label htmlFor="phone" className="label">
                  <span className="text-base label-text">
                    Phone Number
                    <span className="text-primary">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  className="input-sm input input-bordered input-primary"
                  id="phone"
                  placeholder="Enter phone number"
                  name="phone"
                  required
                />
              </div>

              <h2 className="text-xl font-semibold mt-4">Delivery Address</h2>

              <div className="flex">
                <div className="form-control w-1/2  mr-2">
                  <label htmlFor="street" className="label">
                    <span className="text-base label-text">
                      Street Address
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-sm input input-bordered input-primary"
                    id="street"
                    name="street"
                    placeholder="Enter street name"
                    required
                  />
                </div>

                <div className="form-control w-1/3">
                  <label htmlFor="houseNumber" className="label">
                    <span className="text-base label-text">
                      House Number
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-sm input input-bordered input-primary "
                    id="houseNumber"
                    placeholder="Enter house number"
                    name="houseNumber"
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="form-control w-1/2 mr-2">
                  <label htmlFor="city" className="label">
                    <span className="text-base label-text">
                      City
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-sm input input-bordered input-primary"
                    id="city"
                    placeholder="Enter city"
                    name="city"
                    required
                  />
                </div>

                <div className="form-control w-1/3">
                  <label htmlFor="postalCode" className="label">
                    <span className="text-base label-text">
                      Zip Code
                      <span className="text-primary">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-sm input input-bordered input-primary"
                    id="zip"
                    placeholder="Enter zip code"
                    name="postalCode"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-1/2">
                <label htmlFor="country" className="label">
                  <span className="text-base label-text">
                    Country
                    <span className="text-primary">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input-sm input input-bordered input-primary"
                  id="country"
                  placeholder="Enter country"
                  name="country"
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold my-4">Packaging Type</h2>

              <table className="table table-compact shadow-xl rounded-lg">
                <thead>
                  <tr>
                    <th>{"  "}</th>
                    <th className="text-xs font-medium">Name</th>
                    <th className="text-xs font-medium pl-6">Type</th>
                    <th className="text-xs font-medium pl-2">Price</th>
                    <th className="text-xs font-medium pl-2">Height</th>
                    <th className="text-xs font-medium pl-2">Length</th>
                    <th className="text-xs font-medium pl-2">Width</th>
                  </tr>
                </thead>
                <tbody>
                  {packagingTypes
                    ? packagingTypes.map((type: Packaging) => (
                        <tr
                          key={type.packaging_id}
                          onClick={() => handleTypeClick(type)}
                          style={{
                            backgroundColor:
                              chosenType?.packaging_id === type.packaging_id
                                ? "lightblue"
                                : "white",
                          }}
                        >
                          <td>
                            <input
                              type="radio"
                              name="radiopackaging"
                              className="radio"
                            />
                          </td>
                          <td className="capitalize">{type.packaging_name}</td>
                          <td className="px-6">
                            {" "}
                            {type.type === "STANDARD"
                              ? "Standard Size"
                              : "Custom Size"}
                          </td>
                          <td className="px-2">€ {type.price}</td>
                          <td className="px-2">{type.height} cm</td>
                          <td className="px-2">{type.length} cm</td>
                          <td className="px-2">{type.width} cm</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              {chosenType && (
                <div>
                  <h2 className="text-lg mt-2 font-medium">
                    Selected packaging type
                  </h2>
                  <span>
                    ›{" "}
                    <span className="capitalize">
                      {chosenType.packaging_name}
                    </span>{" "}
                    (
                    {chosenType.type === "STANDARD"
                      ? "Standard Size"
                      : "Custom Size"}
                    ) - Dimensions: {chosenType.height}cm x {chosenType.length}
                    cm x {chosenType.width}cm (HxLxW) - Price: €
                    {chosenType.price}
                  </span>
                </div>
              )}
            </div>
          </div>

          {!loading ? <button type="submit" className="btn btn-primary mt-4">
            Place Order
          </button>
          :
          <RotatingLines
            strokeColor="#ef463c"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          }

        </form>
      </div>
    </>
  );
}
