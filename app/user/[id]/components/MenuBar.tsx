import { SignOutListItem } from "../../../components/Auth";

import Link from "next/link";

export default function MenuBar() {
  return (
    <>
      <ul className="menu bg-base-100 w-56">
        <li className="bordered">
          <Link href="">Account details</Link>
        </li>
        <li className="">
          <Link href="">Orders</Link>
        </li>
        <SignOutListItem />
      </ul>
    </>
  );
}
