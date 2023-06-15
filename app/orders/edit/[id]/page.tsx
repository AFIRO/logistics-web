import { AddressService } from "../../../../backend/service/address.service";
import { CustomerOrderService } from "../../../../backend/service/customerorder.service";
import { PackagingService } from "../../../../backend/service/packaging.service";

import Address from "./components/Address";
import BoxPicker from "./components/BoxPicker";

import Link from "next/link";

export default async function page({ params: { id } }) {
  const order = await new CustomerOrderService().findById(id);
  const adres = await new AddressService().findById(
    order.delivery_address_address_id
  );
  const packagingtypes = await new PackagingService().findAll();

  return (
    <>
      <div className="mx-auto w-4/5 pt-4">
        <div className="text-md breadcrumbs">
          <ul>
            <li>
              <Link href={"/orders"}>Orders</Link>
            </li>
            <li>
              <Link href={"/orders/" + order.order_id}>Order details</Link>
            </li>
            <li>Edit order</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-4/5 pt-4 sm:rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">Edit order</h1>
        <p className="text-secondary">
          You are currently editing the details of order <b>{order.order_id}</b>
          , placed on {order.order_date.toLocaleDateString()}.
        </p>
        <div className="flex gap-2 mt-4">
          <div className=" border-2 border-slate-200 w-full p-4 rounded-md">
            <h2 className="text-xl  ">Change address</h2>
            <Address adres={adres} id={id}></Address>
          </div>
          <div className=" border-2 border-slate-200 w-full p-4 rounded-md">
            <h2 className="text-xl   ">Change box</h2>
            <BoxPicker
              packaging={packagingtypes}
              chosen={order.packaging}
              id={id}
            ></BoxPicker>
          </div>
        </div>

        <button className="btn btn-outline btn-sm my-5 gap-2">
          <Link href={"/orders/" + order.order_id}>Cancel edit</Link>
        </button>
      </div>
    </>
  );
}
