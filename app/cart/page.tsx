import { CartService } from "../../backend/service/cart.service"; 
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CartItems } from "./components/CartItems";

import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession(authOptions); 

    const id = session?.user?.id;

    let cartItems = [];

    // AANGEMELD? -> CART ITEMS OPHALEN uit DB
    if (session) {
        const cart = await new CartService().createShoppingCartForUser(id);
        const cartItemsFromDB = await new CartService().getAllShoppingCartItems(cart.shopping_cart_id);

        if (cartItemsFromDB)
            cartItemsFromDB.shopping_cart_order_lines.map((item) => {
                cartItems.push({
                    product_id: item.order_line.product.product_id,
                    quantity: item.order_line.quantity_ordered,
                })
            })
    }

    return (
        <>
            {<CartItems cartItems={cartItems}></CartItems>}
        </>
    );

}

