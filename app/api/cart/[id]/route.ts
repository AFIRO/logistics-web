import { CartService } from "../../../../backend/service/cart.service";

import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {

    const cartService = new CartService();
 
    const user_id = params.id;
 
    try {
        let cart = cartService.findByUserId(user_id);

        if (cart)
            cartService.deleteShoppingCart((await cart).shopping_cart_id);
    } catch (error) {
        console.error(error);
    }
  
    return NextResponse.json(user_id);

}