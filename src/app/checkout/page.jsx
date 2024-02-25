import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex mx-20 gap-8">
      <div className="w-3/4">
        <h1 className="font-bold text-3xl text-black">Checkout</h1>
        <div className="flex items-center mt-5">
          <div>
            <Image
              src={"/images/check-circle.svg"}
              alt=""
              width={40}
              height={40}
            ></Image>
          </div>
          <div className="ml-3">
            <h2 className="font-bold text-black text-2xl">Thank you James!</h2>
          </div>
        </div>
        <div className=" border-2 rounded p-3 shadow-sm mt-5">
          <p className="font-bold text-xl text-blue-500">Order Updates</p>
          <p className="text-gray-500 font-semibold">
            You will receive order and shipping updates in order page
          </p>
        </div>
        {/* ini untuk map */}
        <div></div>
        {/* ini untuk map */}
        <div className="flex-row mt-8">
          <div className="flex border-2  p-3">
            <p className="text-gray-500">Contact</p>
            <p className="ml-5 text-black">User@gmail.com</p>
          </div>
          <div className="flex border-2 border-t-0 p-3">
            <p className="text-gray-500">Addres</p>
            <p className="ml-5 text-black">Jl.NewYork no 110</p>
          </div>
          <div className="flex border-2 border-t-0 p-3">
            <p className="text-gray-500">Payment</p>
            <p className="ml-5 text-black">check payment</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 border-2 p-3">
        <div className="flex items-center">
          <div>
            <Image
              src={"/images/cart-order.svg"}
              alt=""
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="ml-2">
            <p className="text-black font-bold text-lg">Your Order</p>
          </div>
          <div className="ml-2">
            <p className="text-white bg-black rounded-full px-3 py-1 text-sm">
              3
            </p>
          </div>
        </div>
        {/* product start */}
        <div className="mt-8">
          <div className="flex border-b-2 pb-6">
            <div>
              <Image
                src={"/images/test-product.jpg"}
                alt=""
                width={90}
                height={70}
              ></Image>
            </div>
            <div className="ml-3 flex-grow">
              <div>
                <p className="text-black font-bold text-lg">Hoodie</p>
                <p className="text-black mt-2">Weight: 10gr</p>
              </div>
              <div className="flex justify-between mt-3 items-center">
                <p className="border-2 text-black px-2 py-1 font-bold">x 1</p>
                <p className="text-black font-bold text-lg">Rp.300.000</p>
              </div>
            </div>
          </div>
        </div>
        {/* product end */}
        <div className="mt-6 ">
          <div className="pb-6 border-b-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-black text-lg">Courier</p>
              <select
                name="courier"
                id=""
                className="bg-white text-black font-semibold border-2 p-2 rounded"
                
              >
                <option value="" disabled selected>Pilih opsi</option>
                <option value="">JNE</option>
                <option value="">TIKI</option>
              </select>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">Subtotal</p>
              <p className="font-semibold text-black text-lg">Rp.300.000</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">Shipping</p>
              <p className="font-semibold text-black text-lg">Rp.20.000</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-2xl font-bold text-black">Total</p>
            <p className="text-2xl font-bold text-blue-500">Rp.320.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
