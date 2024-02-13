import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

export default function Cart() {
  return (
    <section>
      <div className=" bg-blue-50 px-24 py-10 overflow-auto">
      <h1 className="text-2xl text-black font-bold place-content-start mb-5">My Chart(3)</h1>
        {/* Cart */}
        <div className="flex flex-row justify-center gap-4">
        <div className=" bg-white border-2 float-left w-[80%] rounded-xl shadow-lg max-w-full">
          <div className="flex flex-row justify-between m-4">
            <div className="flex flex-row gap-3">
              <Image
                src="/next.svg"
                alt=""
                width={100}
                height={100}
                className="border  p-2 h-20 rounded"
              />
              <ul className="flex flex-col font-semibold">
                <li className="font-bold text-lg text-black">Kaos</li>
                <li>
                  weight: <span>60gr</span>
                </li>
                <li>
                  stock: <span>10</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col content-center items-end">
              <h2 className="mb-4 font-bold text-black">Rp 70.000</h2>
              <select
                name="qty"
                id="qty"
                className="border rounded h-10 bg-white text-slate-800 p-1 w-28"
              >
                <option value="1"></option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold ml-32">
            <button className="bg-white border hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded-md">
              Remove
            </button>
            <button className="bg-white border hover:bg-blue-500 hover:text-white text-blue-500 px-3 py-1 rounded-md">
              Save for later
            </button>
          </div>

          <hr className="m-4" />
          <div className="flex flex-row justify-between m-4">
            <div className="flex flex-row gap-3">
              <Image
                src="/next.svg"
                alt=""
                width={100}
                height={100}
                className="border  p-2 h-20 rounded"
              />
              <ul className="flex flex-col font-semibold">
                <li className="font-bold text-lg text-black">Kaos</li>
                <li>
                  weight: <span>60gr</span>
                </li>
                <li>
                  stock: <span>10</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col content-center items-end">
              <h2 className="mb-4 font-bold text-black">Rp 70.000</h2>
              <select
                name="qty"
                id="qty"
                className="border rounded h-10 bg-white text-slate-800 p-1 w-28"
              >
                <option value="1"></option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold ml-32">
            <button className="bg-white border hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded-md">
              Remove
            </button>
            <button className="bg-white border hover:bg-blue-500 hover:text-white text-blue-500 px-3 py-1 rounded-md">
              Save for later
            </button>
          </div>

          <hr className="m-4" />
          <div className="flex flex-row justify-between m-4">
            <div className="flex flex-row gap-3">
              <Image
                src="/next.svg"
                alt=""
                width={100}
                height={100}
                className="border  p-2 h-20 rounded"
              />
              <ul className="flex flex-col font-semibold">
                <li className="font-bold text-lg text-black">Kaos</li>
                <li>
                  weight: <span>60gr</span>
                </li>
                <li>
                  stock: <span>10</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col content-center items-end">
              <h2 className="mb-4 font-bold text-black">Rp 70.000</h2>
              <select
                name="qty"
                id="qty"
                className="border rounded h-10 bg-white text-slate-800 p-1 w-28"
              >
                <option value="1"></option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold ml-32">
            <button className="bg-white border hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded-md">
              Remove
            </button>
            <button className="bg-white border hover:bg-blue-500 hover:text-white text-blue-500 px-3 py-1 rounded-md">
              Save for later
            </button>
          </div>

          <hr className="m-4" />
          <div className="flex flex-row justify-between p-4">
            <button className="bg-blue-500 border hover:bg-blue-700   text-white px-3 py-1 rounded-md">
              {"<"} Back to shop
            </button>
            <button className="text-blue-500 border hover:border-0 hover:bg-red-500 hover:text-white  font-semibold bg-white px-3 py-1 rounded-md">
              Remove all
            </button>
          </div>
        </div>
        {/* Pembayaran */}
        <div className="border-1 w-[20%] flex flex-col gap-2 ">
          <div className="bg-white px-4 pb-6 pt-2 flex flex-col rounded-xl shadow-lg w-full ">
            <label htmlFor="coupon" className="py-2 font-semibold">
              Have a coupon?
            </label>
            <div className="flex flex-row ">
              <input
                id="coupon"
                className="border-2 w-[100%] text-black px-2 rounded-l-lg bg-white"
                placeholder="Add coupon"
              />
              <button
                type="button"
                className="border-2 border-l-0 rounded-r-lg font-semibold py-1 px-4 text-blue-500 border-slate-200 hover:bg-blue-500 hover:text-white"
              >
                Apply
              </button>
              {/* <input type="text" className="border-2 bg-white" />
              <button className="bg-white py-0 px-1 border-2">Apply</button> */}
            </div>
          </div>
          <div className="bg-white border-2 px-4 pb-5 rounded-xl shadow-md">
            <ul className=" text-slate-500 py-4 font-semibold">
              <li className="flex flex-row justify-between">
                {" "}
                <span>Subtotal:</span>
                <span>Rp. 70000</span>
              </li>
              <li className="flex flex-row justify-between">
                {" "}
                <span>Discount:</span>
                <span className="text-red-500">-Rp. 70000</span>
              </li>
              <li className="flex flex-row justify-between">
                {" "}
                <span>Tax:</span>
                <span className="text-green-500">+Rp. 70000</span>
              </li>
              <hr />

              <li className="flex flex-row justify-between font-bold mt-5 text-black text-xl">
                <span>Total:</span> <span>Rp 170.000</span>
              </li>
            </ul>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white text-center rounded-lg w-full py-3"
            >
              Checkout
            </button>
            <ul className="flex flex-row gap-2 justify-center m-4">
              <li className="border-2 py-1 px-2 rounded">
                <Image
                  src="/apple-pay.svg"
                  alt="apple-pay"
                  width={25}
                  height={25}
                />
              </li>
              <li className="border-2 py-1 px-2 rounded">
                <Image
                  src="/mastercard.svg"
                  alt="apple-pay"
                  width={25}
                  height={25}
                />
              </li>
              <li className="border-2 py-1 px-2 rounded">
                <Image src="/paypal.svg" alt="paypal" width={25} height={25} />
              </li>
              <li className="border-2 py-1 px-2 rounded">
                <Image src="/visa.svg" alt="visa" width={25} height={25} />
              </li>
              <li className="border-2 py-1 px-2 rounded">
                <Image
                  src="/apple-pay.svg"
                  alt="apple-pay"
                  width={25}
                  height={25}
                />
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
