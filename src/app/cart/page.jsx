"use client";
import back from '../../../public/images/back.png'
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Cart() {
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [promos, setPromos] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAplyed, setIsAplyed] = useState(false);

  const addToCart = async (productId) => {
    try {
      const cartId = "ganti_dengan_id_cart";

      const response = await axios.post(
        `http://localhost:3000/cart/1/product`,
        {
          productId: productId,
          quantity: quantity,
        }
      );
      setSignInDialogOpen(false);
      console.log("Produk ditambahkan ke keranjang:", response.data);
    } catch (error) {
      console.error("Error menambahkan produk ke keranjang:", error);
    }
  };

  const handleAplyed = () => {
    setIsAplyed(true)
  }

  const handleChangeQuantity = () => {
    setSignInDialogOpen(true);
  };

  const handleBackdropClick = () => {
    setSignInDialogOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const fetchPromos = async () => {
    try {
      // Retrieve the token from localStorage
      const storedToken = localStorage.getItem('token');

      // Make the Axios request with the token in the Authorization header
      const response = await axios.get("http://localhost:3000/promo", {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      // Set the promos state with the data from the response
      const promoProduct = response.data.data;
      setPromos(promoProduct);
    } catch (error) {
      console.error("Error fetching promo data:", error);
    }
  };

  // Call fetchPromos when the component mounts
  useEffect(() => {
    fetchPromos();
  }, []);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsOpen(false);
  };

  const coupons = ["COUPON1", "COUPON2", "COUPON3"];

  return (
    <section>
      <div className=" bg-blue-50 px-24 py-10 overflow-auto">
        {/* modal start */}
        {isSignInDialogOpen && (
          <div
            data-dialog-show="sign-in-dialog"
            data-dialog-close="true"
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleBackdropClick}
          >
            <div
              data-dialog="sign-in-dialog"
              class="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              onClick={handleModalClick}
            >
              <div class="flex flex-col gap-4 p-6">
                <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug text-center tracking-normal text-blue-gray-900">
                  Quantity
                </h4>
                <p className="block mb-3 font-sans text-base antialiased font-normal text-center leading-relaxed text-gray-700">
                  Set your quantity to Cart
                </p>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Quantity
                  </label>
                </div>
              </div>
              <div class="p-6 pt-0">
                <button
                  class="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-500 to-blue-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => addToCart(1)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        {/* modal end */}

        <h1 className="text-2xl text-black font-bold place-content-start mb-5">
          My Chart(3)
        </h1>
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
                </ul>
              </div>
              <div className="flex flex-col content-center items-end">
                <h2 className="mb-4 font-bold text-black">Rp 70.000</h2>
                <div
                  className="flex items-center"
                  onClick={handleChangeQuantity}
                >
                  <button className="border-2 rounded p-2 mr-3 shadow">
                    <Image
                      src={"/images/edit.svg"}
                      alt=""
                      width={20}
                      height={20}
                    ></Image>
                  </button>
                  <h2 className="font-semibold ">Quantity : {quantity}</h2>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm font-semibold ml-32">
              <button className="bg-white border hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded-md">
                Remove
              </button>
            </div>
            <div className="flex flex-row justify-between p-4">
              <button className="bg-blue-500 border hover:bg-blue-700   text-white px-3 py-1 rounded-md">
                <Link href="/">
                  <div className="flex gap-2 items-center justify-center">
                    <Image
                      src={back}
                      alt="back"
                      width={20}
                      height={20}
                    />
                    <span> Back to shop</span>
                  </div>
                </Link>
              </button>
              <button className="text-blue-500 border hover:border-0 hover:bg-red-500 hover:text-white  font-semibold bg-white px-3 py-1 rounded-md">
                Remove all
              </button>
            </div>
          </div>

          {/* Pembayaran */}
          <div className="border-1 w-[20%] flex flex-col gap-2 ">
            <div className="bg-white px-4 pb-6 pt-2 flex flex-col rounded-xl shadow-lg w-full">
              <div className="font-semibold">
                <p className="m-3">Have a coupon?</p>
                <div className="relative inline-block w-full">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="border-2 w-full text-black px-2 py-1 rounded-lg bg-white focus:outline-none focus:ring focus:border-blue-300"
                    >
                      {selectedCoupon || "Select coupon"}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="none">
                        {promos.map((promo) => (
                          <button
                            key={promo.id}
                            onClick={() => selectCoupon(promo.description)}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {promo.description}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="border-2 rounded-lg font-semibold w-full mt-3 py-1 px-4 text-blue-500 border-slate-200 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() =>
                    handleAplyed()
                  }
                >
                  Apply
                </button>
              </div>
              {isAplyed === true ? <p className="text-green-500">Promo {selectedCoupon} applied</p> : ''}

              {/* Menampilkan informasi diskon */}
              <div className="bg-white border-2 px-4 pb-5 rounded-xl shadow-md mt-3">
                <ul className="text-slate-500 py-4 font-semibold">
                  <li className="flex flex-row justify-between">
                    {" "}
                    <span>Subtotal:</span>
                    <span>Rp. 70000</span>
                  </li>
                  <li className="flex flex-row justify-between">
                    {" "}
                    <span>Discount:</span>
                    <span className="text-red-500">-Rp.10000</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
