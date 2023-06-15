import { ProductService } from "../../../backend/service/product.service";

import { NextResponse } from "next/server"; 

export async function POST(request) {

  const data = await request.json();
  const productService = new ProductService();
  const cartItems: CartItem[] = [];

    
  if (data)
    for (const item of data) {
      const productFromDb = await productService.findById(item.product_id);

      if (productFromDb) {
          
        cartItems.push({
          product: {
            product_id: productFromDb.product_id,
            name: productFromDb.name,
            description: productFromDb.description,
            expected_delivery_date: productFromDb.expected_delivery_date,
            number_in_stock: productFromDb.number_in_stock,
            picture: String.fromCharCode.apply(
              null,
              new Uint8Array(productFromDb.picture)),
            unit_price: productFromDb.unit_price
          },
          quantity: item.quantity,
        });
      }
    }
  else
    return NextResponse.json([]);

  return NextResponse.json(cartItems);
}




