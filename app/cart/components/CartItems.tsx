"use client";

import AdjustCartItem from './AdjustCartItem'

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotatingLines } from 'react-loader-spinner';

export const CartItems = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  let totalPrice;

  function addCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("localStoredCartItems"));
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cartItems),
    });
  }

  // we want to overwrite old shopping cart items in DB with cart items from localStorage
  function getCartItemsMetaData() {
    let cartItems = props.cartItems;

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('localStoredCartItems'))
        cartItems = JSON.parse(localStorage.getItem('localStoredCartItems'));
      else
        localStorage.setItem('localStoredCartItems', JSON.stringify(cartItems))


      if (cartItems) {
        try {
          fetch('/api/product', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
          })
            .then((data) => {
              if (!data.ok) {
                throw new Error("Failed to fetch data from the server.");
              }
              return data.json();
            })
            .then((parsedData) => {
              setCartItems(parsedData);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    getCartItemsMetaData();
  }, []);

  return (
    <>
      <div className="mx-auto w-4/5 pt-4 sm:rounded-lg">
        <div className="text-md breadcrumbs">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            {session !== undefined && session !== null && (
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
            )}
            <li>Cart</li>
          </ul>
        </div>

        <h1 className="text-2xl font-semibold">Shopping cart items</h1>
        {loading ? (
          <div className="fixed left-1/2">
            <RotatingLines
              strokeColor="#ef463c"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <div className="flex relative overflow-x-none shadow-md mt-4 w-3/4 ">
            <table className="table pl-6  text-sm    w-full">
              <thead>
                <tr>
                  <th className="pl-8">Product</th>
                  <th>Picture</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>{"    "}</th>
                </tr>
              </thead>
              <tbody className=" ">
                {cartItems
                  ? cartItems.map((cartItem) => (
                    <tr key={cartItem.product_id}>
                      <td className="text-lg font-semibold  capitalize pl-8">
                        {cartItem.product.name}
                      </td>
                      <td>
                        <Image
                          src={
                            "data:image/png;base64," +
                            btoa(
                              String.fromCharCode.apply(
                                null,
                                new Uint8Array(
                                  Buffer.from(
                                    cartItem.product.picture,
                                    "binary"
                                  )
                                )
                              )
                            )
                          }
                          alt={cartItem.product.name + " image"}
                          width={500}
                          height={500}
                          className="mask mask-squircle w-20 h-20 mt-1 hover:scale-150"
                          tabIndex={1}
                        />
                      </td>
                      <td>{cartItem.product.unit_price}</td>
                      <td>{cartItem.quantity}</td>
                      <td>
                        {new Intl.NumberFormat("nl-BE", {
                          style: "currency",
                          currency: "EUR",
                        }).format(
                          cartItem.quantity * cartItem.product.unit_price
                        )}
                      </td>
                      <td>
                        <AdjustCartItem cartItem={cartItem}></AdjustCartItem>
                      </td>
                    </tr>
                  ))
                  : null}
                <tr>
                  <td className="text-lg font-semibold  capitalize pl-8">Total excl. BTW: </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold  capitalize pl-8" >
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(
                      cartItems.reduce((total, item) => total + (item.quantity * item.product.unit_price), 0)
                    )}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold  capitalize pl-8">BTW 21% : </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold  capitalize pl-8">
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(
                      cartItems.reduce((total, item) => total + (item.quantity * item.product.unit_price), 0) * 0.21)
                    }</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold  capitalize pl-8">Total:</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold  capitalize pl-8"> 
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(
                      cartItems.reduce((total, item) => total + (item.quantity * item.product.unit_price), 0) * 1.21)
                    }</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <button
          onClick={() => addCartItems()}
          className="btn btn-outline btn-sm my-5 gap-2"
        >
          <Link href={"/checkout"}>Checkout</Link>
          <Image
            src={"/ordered.svg"}
            alt={"Cart icon"}
            height={250}
            width={250}
            className="w-4"
          ></Image>
        </button>

      </div>
    </>
  );
};
