import { ProductService } from "../../backend/service/product.service";
import AddToCart from "../cart/components/AddToCart";

import Link from "next/link";
import Image from "next/image";

async function getData() {
  return await new ProductService().findAll();
}

export default async function Products() {
  let products = await getData();

  return (
    <>
      <div className="mx-auto w-4/5 pt-4">
        <div className="text-md breadcrumbs">
          <ul>
            <li><Link href={"/"}>Home</Link></li>
            <li>Products</li>
          </ul>
        </div>

        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex  relative  overflow-x-none shadow-md  sm:rounded-lg mt-4 ">
          <table className="table bg-base-300  text-sm  w-full  sm:rounded-lg bg-opacity-20  ">
            <thead>
              <tr>
                <th className="pl-8">Name</th>
                <th>Description</th>
                <th>Price per unit</th>
                <th>Delivery</th>
                <th className="text-center">Available stock</th>
                <th>Picture</th>
                <th>{"   "}</th>
                <th>{"   "}</th>
              </tr>
            </thead>

            <tbody className=" ">
              {products.map((product) => (
                <tr key={product.product_id} id={"row-" + product.product_id}>
                  <td className="text-lg font-semibold  capitalize pl-8">
                    {product.name}
                  </td>
                  <td>{product.description}</td>
                  <td>€{product.unit_price}</td>
                  <td>
                    {product.expected_delivery_date == null ? (
                      <span className="text-warning">UNKNOWN</span>
                    ) : (
                      product.expected_delivery_date.getDate()
                    )}
                  </td>
                  <td className="text-center">
                    {product.number_in_stock > 0 ? (
                      <>
                        <div className="flex w-full">
                          <div className="badge badge-success gap-2">
                            In stock
                          </div>
                          <div className="divider divider-horizontal"></div>
                          <span>{product.number_in_stock} available</span>
                        </div>
                      </>
                    ) : (
                      <div className="badge badge-error gap-2">
                        Out of stock
                      </div>
                    )}
                  </td>
                  <td>
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
                      className="mask mask-squircle w-20 h-20 mt-1 hover:scale-150"
                      tabIndex={1}
                    />
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">
                      <Link href={"/products/" + product.product_id}>
                        details
                      </Link>
                    </button>
                  </td>
                  <td>
                    <AddToCart product={product}></AddToCart>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
