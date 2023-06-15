import { CartService } from "../../../backend/service/cart.service";
import { authOptions } from "../auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const clientId = session.user.id;

  try {
    const data = await request.json();
    try {
      await deleteCart(clientId);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}

  return NextResponse.json(JSON.stringify(""));
}

async function deleteCart(id: string) {
  const cartService = new CartService();
  try {
    let cart = cartService.findByUserId(id);
    if (cart) cartService.deleteShoppingCart((await cart).shopping_cart_id);
  } catch (error) {
    console.error(error);
  }
}
