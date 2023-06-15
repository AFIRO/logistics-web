"use client";

import Link from "next/link";
import { useState } from "react";

export default function CartIcon(props) {

  let [totalPrice, setTotalPrice] = useState(0);
  let [totalItems, setTotalItems] = useState(0);

  let localCartItems;
  let cartItems;


  if (typeof window !== 'undefined') {
    if (localStorage.getItem('localStoredCartItems'))
      localCartItems = JSON.parse(localStorage.getItem('localStoredCartItems'));
  }

  if (props.items && !localCartItems) {
    cartItems = props.items;

    totalPrice = (cartItems.shopping_cart_order_lines
      .map((orderLines) => orderLines.order_line)
      .reduce((sum, current) => sum + (current.unit_price_order_line * current.quantity_ordered), 0));
    totalItems = (cartItems.shopping_cart_order_lines.length);

  }
 
  if (localCartItems) {
    try {
      fetch('/api/product', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localCartItems),
      }).then((data) => {
        if (!data.ok) {
          throw new Error("Failed to fetch data from the server.");
        }
        return data.json();
      })
        .then((parsedData) => {
          cartItems = parsedData;

          if (cartItems) {
            setTotalItems(cartItems.length);
            setTotalPrice(cartItems?.reduce((total, item) => item.quantity * item.product.unit_price + total, 0));
          }
        })
        .catch((err) => {
          console.error(err);
        });;
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <div className="tooltip tooltip-bottom" data-tip="Cart">
      <div className="dropdown dropdown-end mr-1 text-left">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
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
            <span className="badge badge-sm indicator-item">{totalItems}</span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 card card-compact dropdown-content w-72 bg-base-100 shadow-lg justify-start"
        >
          <div className="card-body ">
            <span className="font-bold text-lg text-primary mb-2">
              Shopping cart
            </span>
            <span className="font-semibold text-[1.05rem] ">
              Total items: {totalItems}
            </span>
            <span className="text-neutral text-base">
              Total excl. BTW:{" "}
              {new Intl.NumberFormat("nl-BE", {
                style: "currency",
                currency: "EUR",
              }).format(totalPrice)}
            </span>
            <span className="text-neutral text-base">
              Total:{" "}
              {new Intl.NumberFormat("nl-BE", {
                style: "currency",
                currency: "EUR",
              }).format(totalPrice * 1.21)}
            </span>
            <div className="card-actions justify-end">
              <Link href="/cart">
                <button className="btn btn-primary w-26 btn-sm mt-4 rounded-3xl">
                  View cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
