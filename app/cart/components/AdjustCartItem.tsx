"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdjustCartItem({ cartItem }) {
  const router = useRouter();

  const number_in_stock = cartItem.product.number_in_stock;
  const productId = cartItem.product.product_id;
  const { status } = useSession();
  const [count, setCount] = useState(cartItem.quantity);
  const [error, setError] = useState("");

  function removeItem() {
    let existingData;
    let dataArray;

    if (typeof window !== "undefined") {
      if (localStorage.getItem("localStoredCartItems")) {
        existingData = localStorage.getItem("localStoredCartItems");
        dataArray = JSON.parse(existingData);
      }
    }

    if (existingData) {
      let itemIndex = -1;
      dataArray.forEach((item, index) => {
        if (item.product_id === productId) {
          itemIndex = index;
        }
      });

      if (itemIndex !== -1) {
        dataArray.splice(itemIndex, 1);
      }

      localStorage.setItem("localStoredCartItems", JSON.stringify(dataArray));
    } else {
      dataArray = [cartItem];
      localStorage.setItem("localStoredCartItems", JSON.stringify(dataArray));
    }

    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataArray),
      })
        .then((data) => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("POST not executed since user is not logged in");
    }

    // adapt stock from changed cart item
    fetch(`/api/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: -cartItem.quantity }),
    })
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function adjustItem(num) {
    if (num < 0) num = 0;
    if (num > number_in_stock + cartItem.quantity) {
      setCount(num);
      setError(`You can not order more than ${number_in_stock}!`);
      return;
    } else setError("");

    setCount(num);

    let delta = cartItem.quantity - num;

    cartItem.quantity = cartItem.quantity - delta;

    let existingData;
    let dataArray;

    if (typeof window !== "undefined") {
      if (localStorage.getItem("localStoredCartItems")) {
        existingData = localStorage.getItem("localStoredCartItems");
        dataArray = JSON.parse(existingData);
      }
    }

    if (existingData) {
      let itemFound = false;
      dataArray.forEach((item) => {
        if (item.product_id === productId) {
          item.quantity = cartItem.quantity;
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
        .then((data) => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("POST not executed since user is not logged in");
    }

    // adapt stock from changed cart item
    fetch(`/api/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: -delta }),
    })
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="input-group input-group-sm">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => adjustItem(count - 1)}
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
          onClick={() => adjustItem(count + 1)}
        >
          +
        </button>

        <button
          className="btn btn-primary btn-sm px-2 capitalize"
          disabled={!!error}
          onClick={removeItem}
        >
          Remove item
        </button>
      </div>
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
