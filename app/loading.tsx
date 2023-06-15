"use client"

import { RotatingLines } from "react-loader-spinner";

export default function load() {
    return (
        <div className="py-28">
          <div className="w-fit mx-auto my-auto">
          <RotatingLines
            strokeColor="#ef463c"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            />
          </div>
        </div>
    )
}