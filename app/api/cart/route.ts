import { CartService } from "../../../backend/service/cart.service";
import { ProductService } from "../../../backend/service/product.service";
import { authOptions } from "../auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    const clientId = session.user.id;

    const cartService = new CartService();
    const productService = new ProductService();

    const data = await request.json();

    const cart = await cartService.createShoppingCartForUser(clientId);

    const dataProductIds = data.map(item => item.product_product_id);

    for(let item of cart.shopping_cart_order_lines){
        if(!dataProductIds.includes(item.order_line.product_product_id)){
            await cartService.deleteShoppingCartItem(item.order_lines_line_id);
        };
    }
      
    for (let item of data) {
        const product = await productService.findById(item.product_id);

        // check if quantity is valid
        if (product.number_in_stock - item.quantity < 0) {
            return // TODO: error stockbreach
        }

        await cartService.createOrderLineForShoppingCart(cart, product, item.quantity);

    }

    return NextResponse.json(JSON.stringify(""));
}




