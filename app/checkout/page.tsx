import { CheckoutPage } from "./components/CheckoutForm";
import { PackagingService } from "../../backend/service/packaging.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CartService } from "../../backend/service/cart.service";
import { prisma } from "../../db/prisma";

import Link from "next/link";

export default async function Checkout() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  let personId;
  let customerId;
  if (id) {
    personId = (
      await prisma.application_user.findUnique({
        where: {
          user_id: id,
        },
      })
    ).persoonsgegevens_person_id;
    if (personId) {
      customerId = (await prisma.customer_buyers.findUnique({
        where: {
          buyers_person_id: personId,
        },
      }))?.customer_customer_id;
    }
  } else {
    // Als gebruiker niet ingelogd is, dan eerst laten inloggen, niet de moeite om Cartservice aan te spreken
    return (
      <>
        <div className="mx-auto w-4/5 pt-4 my-auto mt-[20rem]">
          <h1 className="text-2xl font-semibold mb-4">Please sign in</h1>
          <p>
            <span className="text-lg">
              You need to be{" "}
              <b>
                <Link
                  className="link link-primary"
                  href="/login?redirect=checkout"
                >
                  signed in
                </Link>
              </b>{" "}
              to place an order.
            </span>
            <br />
            <span className="text-neutral">
              Your shopping cart has been saved, you will be redirected to
              checkout after signing in.
            </span>
          </p>
        </div>
      </>
    );
  }
  const cart = await new CartService().createShoppingCartForUser(id);
  const cartItems = await new CartService().getAllShoppingCartItems(
    cart.shopping_cart_id
  );
  const packagingtypes = await new PackagingService().findAll();

  if (cartItems.shopping_cart_order_lines)
    return (
      <>
        <CheckoutPage
          packaging={packagingtypes}
          id={personId}
          cart={cartItems.shopping_cart_order_lines}
          customerId={customerId}
        ></CheckoutPage>
      </>
    );

  return (
    <>
      <CheckoutPage
        packaging={packagingtypes}
        id={personId}
        cart={null}
      ></CheckoutPage>
    </>
  );
}
