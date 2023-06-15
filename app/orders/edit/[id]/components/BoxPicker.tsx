"use client";

import { updateBox } from "./actions";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function BoxPicker(props) {
  const packagingTypes = props.packaging;
  const initChosen = props.chosen;
  const id = props.id;
  const [chosenType, setChosenType] = useState(null);
  const router = useRouter();

  const handleTypeClick = (type) => {
    setChosenType(type);
  };

  const handleSubmit = async () => {
    await updateBox(id, chosenType.packaging_id);
    router.refresh();
    router.push("/orders/" + id);
  };

  useEffect(() => {
    setChosenType(initChosen);
  }, []);

  return (
    <div className="w-full">
      <table className="w-full px-4">
        <thead className="text-left">
          <tr>
            <th className="font-semibold">Name</th>
            <th className="font-semibold">Type</th>
            <th className="font-semibold">Price</th>
            <th className="font-semibold">Height</th>
            <th className="font-semibold">Length</th>
            <th className="font-semibold">Width</th>
          </tr>
        </thead>
        <tbody className="cursor-pointer ">
          {packagingTypes
            ? packagingTypes.map((type) => (
                <tr
                  key={type.packaging_id}
                  onClick={() => handleTypeClick(type)}
                  style={{
                    backgroundColor:
                      chosenType?.packaging_id === type.packaging_id
                        ? "#c2b4de"
                        : "white",
                  }}
                >
                  <td className=" capitalize rounded-tl-lg rounded-bl-lg pl-4">
                    {type.packaging_name}
                  </td>
                  <td>
                    {type.type === "STANDARD" ? "Standard Size" : "Custom Size"}
                  </td>
                  <td>
                    {new Intl.NumberFormat("nl-BE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(type.price)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("en", {
                      style: "unit",
                      unit: "centimeter",
                    }).format(type.height)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("en", {
                      style: "unit",
                      unit: "centimeter",
                    }).format(type.length)}
                  </td>
                  <td className=" rounded-tr-lg rounded-br-lg">
                    {new Intl.NumberFormat("en", {
                      style: "unit",
                      unit: "centimeter",
                    }).format(type.width)}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <button
        className="btn btn-outline btn-sm w-36 mt-8"
        onClick={handleSubmit}
      >
        Save box
      </button>
    </div>
  );
}
