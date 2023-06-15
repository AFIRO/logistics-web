"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCart({ product }) {
  const router = useRouter();

  const number_in_stock = product.number_in_stock;
  const { status } = useSession();
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  function checkCount(num) {
    if (num < 0) num = 0;
    if (num > number_in_stock)
      setError(`You cannot order more than ${number_in_stock}!`);
    else setError("");
    setCount(num);
  }

  function addItem() {
    let existingData;
    let dataArray;

    if (typeof window !== "undefined") {
      if (localStorage.getItem("localStoredCartItems")) {
        existingData = localStorage.getItem("localStoredCartItems");
        dataArray = JSON.parse(existingData);
      }
    }

    const cartItem = {
      product_id: product.product_id,
      quantity: count,
    };

    if (existingData) {
      let itemFound = false;
      dataArray.forEach((item) => {
        if (item.product_id === cartItem.product_id) {
          item.quantity += count;
          itemFound = true;
        }
      });
      if (itemFound)
        localStorage.setItem("localStoredCartItems", JSON.stringify(dataArray));
      else dataArray.push(cartItem);
      localStorage.setItem("localStoredCartItems", JSON.stringify(dataArray));
      router.refresh();
    } else {
      dataArray = [cartItem];
      localStorage.setItem("localStoredCartItems", JSON.stringify(dataArray));
      router.refresh();
    }

    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataArray),
      })
        .then((data) => {
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("POST not executed since user is not logged in");
    }

    // diminish stock from added item
    // ideal we should also have a 'reservation table' and when certain time exceeds we need to revert the stock change
    fetch(`/api/product/${product.product_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: count }),
    })
      .then((data) => {
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {number_in_stock > 0 ? (
        <div className="tooltip tooltip-right" data-tip="Add to cart">
          <div className="input-group input-group-sm">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => checkCount(count - 1)}
            >
              -
            </button>
            <input
              className="input w-14 text-center input-sm border-y-1 border-x-0 border-opacity-100"
              readOnly
              value={count}
              type="number"
            />
            <button
              className="btn btn-outline btn-sm"
              onClick={() => checkCount(count + 1)}
            >
              +
            </button>

            <button
              className="btn btn-primary btn-sm px-2 py-0 text-xl"
              disabled={!!error}
              onClick={addItem}
            >
              +
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="alert h-8 w-[22rem] shadow-md mt-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>This item is currently unavailable for delivery.</span>
          </div>
        </div>
      )}

      {error ? (
        <div className="alert alert-warning h-8 w-[17rem] shadow-md mt-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
