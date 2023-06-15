import { ProductService } from "../../../backend/service/product.service";
import AddToCart from "../../cart/components/AddToCart";

import Link from "next/link";
import Image from "next/image";

export default async function Page({ params: { id } }) {
  const product = await new ProductService().findById(id);

  return (
    <>
      <div className="mx-auto w-4/5 pt-4">
        <div className="text-md breadcrumbs">
          <ul>
            <li><Link href={"/"}>Home</Link></li>
            <li>
              <Link href={"/products"}>Products</Link>
            </li>
            <li>{product.description}</li>
          </ul>
        </div>

        <div className="hero min-h-full rounded-lg w-3/5 py-12 mx-auto bg-base-100">
          <div className="hero-content flex-col lg:flex-row items-start gap-x-56">
            <Image
              src={
                "data:image/png;base64," +
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(product.picture)
                  )
                )
              }
              alt={product.name + " image"}
              width={500}
              height={500}
              className="max-w-xs rounded-lg shadow-lg w-60 -ml-32"
              tabIndex={1}
            />
            <div className="">
              <h1 className="text-2xl font-medium ">{product.name}</h1>
              <p className="py-4">{product.description}</p>
              <p className="py-4 font-bold  ">€{product.unit_price}/unit</p>
              <p className="py-4 font-bold  ">{product.number_in_stock} available</p>
              <div className="flex flex-row w-full relative bg-transparent mt-1 items-end text-sm">
                <AddToCart product={product} />
              </div>
              <p className="py-4 font-bold  ">Expected delivery: {product.expected_delivery_date == null ? (
                      <span className="text-warning">UNKNOWN</span>
                    ) : (
                      product.expected_delivery_date.getDate()
                    )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
