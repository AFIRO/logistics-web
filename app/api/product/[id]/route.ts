import { ProductService } from "../../../../backend/service/product.service";

import { NextResponse } from "next/server";

export async function POST(request, { params }) {

    const data = await request.json();
    const productService = new ProductService();

    let productFromDb = await productService.findById(params.id);
    productFromDb.number_in_stock = productFromDb.number_in_stock - data.quantity;
    if (productFromDb)
        productService.updateProduct(productFromDb);


    return NextResponse.json(productFromDb);
}
