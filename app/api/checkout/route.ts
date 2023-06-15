import { CustomerOrderService } from "../../../backend/service/customerorder.service";
import { CartService } from "../../../backend/service/cart.service";
import { AdressDto } from "../../../backend/dto/adres.dto";

import { authOptions } from "../auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const data = await request.json();
  const cartService = new CartService();
  const productsFromData = JSON.parse(JSON.parse(data.products));
  const session = await getServerSession(authOptions);
  const clientId = session.user.id;
  const userId: string = data.person.id;
  const customerId: string = data.customerId;
 
  let adres = new AdressDto({ straat: data.address.street, nummer: data.address.houseNumber, postcode: data.address.postalCode, land: data.address.country });
  const packagingId: string = data.packagingType.packaging_id;
  const products: Map<string, number> = new Map();
  productsFromData.forEach((product) => {
    products.set(product.product_id, product.quantity);
  });
  
  let cart = cartService.createShoppingCartForUser(clientId);
   
  if (cart)
     cartService.deleteShoppingCart((await cart).shopping_cart_id); 

  const res = await new CustomerOrderService().createOrder(userId, adres, packagingId, products, customerId);
  return NextResponse.json(res);
}
