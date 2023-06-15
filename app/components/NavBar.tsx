import { Authenticated } from "./User";
import { NotificationService } from "../../backend/service/notification.service";
import { CartService } from "../../backend/service/cart.service";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import CartIcon from "./CartIcon";

import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  const cartService = new CartService();
  const session = await getServerSession(authOptions);
  
  let cart = null;
  let items;
  let notifications;

  if (session) {
    const id = session?.user?.id;
    cart = await cartService.findByUserId(id);
    notifications = await new NotificationService().findAllForUser(id);
    
  }

  if (cart) {
    items = await cartService.getAllShoppingCartItems(cart.shopping_cart_id);
  }

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/delaware-logo.svg"
              alt="Placeholder user icon"
              width={500}
              height={500}
              className="w-32 ml-3"
            />
          </Link>
        </div>

        <div className="flex-none mr-6">
          {<CartIcon items={items}></CartIcon>}

          <div className="tooltip tooltip-bottom" data-tip="Notifications">
            <Link href="/notifications">
              <button className="btn btn-ghost btn-circle">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item">{notifications ? notifications.length : ''}</span>
                </div>
              </button>
            </Link>
          </div>

          <div className="tooltip tooltip-bottom" data-tip="Track & Trace">
            <Link href="/track">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                  >
                    <path d="M240 864q-50 0-85-35t-35-85H48V336q0-29.7 21.15-50.85Q90.3 264 120 264h552v144h120l120 168v168h-72q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-72q20.4 0 34.2-13.8Q288 764.4 288 744q0-20.4-13.8-34.2Q260.4 696 240 696q-20.4 0-34.2 13.8Q192 723.6 192 744q0 20.4 13.8 34.2Q219.6 792 240 792ZM120 672h24q17-23 42-35.5t54-12.5q29 0 54 12.5t41.529 35.5H600V336H120v336Zm600 120q20.4 0 34.2-13.8Q768 764.4 768 744q0-20.4-13.8-34.2Q740.4 696 720 696q-20.4 0-34.2 13.8Q672 723.6 672 744q0 20.4 13.8 34.2Q699.6 792 720 792Zm-48-192 168-1-85-119h-83v120Zm-310-93Z" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <Authenticated />
      </div>
    </nav>
  );
}
