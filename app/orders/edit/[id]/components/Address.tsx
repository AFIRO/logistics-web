"use client";

import { updateAddress } from "./actions";

import { useRouter } from "next/navigation";

export default async function Address(props) {
  const adres = props.adres;
  const id = props.id;
  const router = useRouter();

  const changeAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nieuwAdres = {};
    nieuwAdres.land = formData.get("country").toString();
    nieuwAdres.postcode = formData.get("postal").toString();
    nieuwAdres.straat = formData.get("street").toString();
    nieuwAdres.nummer = formData.get("number").toString();
    await updateAddress(adres.address_id, nieuwAdres);
    router.refresh();
    router.push("/orders/" + id);
  };

  return (
    <form className="flex flex-col" onSubmit={changeAddress}>
      <div className="grid grid-flow-col gap-x-16">
        <div className="form-control">
          <label htmlFor="street" className="label">
            <span className="text-base label-text">Street</span>
          </label>
          <input
            type="text"
            className="input-sm input input-bordered input-primary"
            id="street"
            name="street"
            required
            minLength={3}
            placeholder={adres.street}
          />
        </div>
        <div className="form-control  w-1/3">
          <label htmlFor="number" className="label">
            <span className="text-base label-text">Number</span>
          </label>
          <input
            type="text"
            className="input-sm input input-bordered input-primary"
            id="number"
            placeholder={adres.house_number}
            name="number"
            required
          />
        </div>
      </div>

      <div className="grid grid-flow-col gap-x-16">
        <div className="form-control w-2/3">
          <label htmlFor="country" className="label">
            <span className="text-base label-text">Country</span>
          </label>
          <input
            type="text"
            className="input-sm input input-bordered input-primary"
            id="country"
            placeholder={adres.country}
            name="country"
            minLength={3}
            required
          />
        </div>

        <div className="form-control w-1/3">
          <label htmlFor="postal" className="label">
            <span className="text-base label-text">Postal code</span>
          </label>
          <input
            type="text"
            className="input-sm input input-bordered input-primary"
            id="postal"
            placeholder={adres.postal_code}
            minLength={3}
            name="postal"
            required
          />
        </div>
      </div>

      <button className="btn btn-outline btn-sm w-36 mt-8" type="submit">
        Save address
      </button>
    </form>
  );
}
