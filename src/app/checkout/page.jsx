"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const token = localStorage.getItem("token");
        const responese = await axios.get(
          `http://localhost:3000/cart/${cartId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(responese.data.data);
      } catch (error) {
        console.log("eror fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataUser(response.data.data);
      } catch (error) {
        console.log("error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const cartId = localStorage.getItem("cartId");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:3000/order/`,
        {
          userId: userId,
          cartId: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been placed successfully!",
      }).then((result) => {
        // If "OK" is clicked on the alert, navigate to "/"
        if (result.isConfirmed || result.isDismissed) {
          router.push("/");
        }
      });
      console.log("produk ditambahkan ke Order", response.data);
    } catch (error) {
      console.log("produk tidak ditambahkan karena error:", error);
    }
  };

  function formatToRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }

  const idUser = localStorage.getItem("userId");

  return (
    <div className="flex mx-20 gap-8 my-8">
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
            <h2 className="font-bold text-black text-2xl">
              Thank you <span className="capitalize">{dataUser.username}</span>!
            </h2>
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
            <p className="text-gray-500 w-1/12">Contact</p>
            <p className="ml-5 text-black ">{dataUser.email}</p>
          </div>
          <div className="flex border-2 border-t-0 p-3">
            <p className="text-gray-500 w-1/12 ">Addres</p>
            <p className="ml-5 text-black ">{dataUser.address}</p>
          </div>
          <div className="flex border-2 border-t-0 p-3">
            <p className="text-gray-500 w-1/12">Payment</p>
            <p className="ml-5 text-black ">check payment</p>
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
              {data.CartProducts?.length}
            </p>
          </div>
        </div>
        {/* product start */}
        <div className="mt-8">
          {data.CartProducts?.map((product) => (
            <div key={product.productId} className="flex border-b-2 pb-6 mt-4">
              <div>
                <Image
                  src={`http://localhost:3000/uploads/productImage/${product.Product.imageUrl}`}
                  alt=""
                  width={90}
                  height={70}
                />
              </div>
              <div className="ml-3 flex-grow">
                <div>
                  <p className="text-black font-bold text-lg">
                    {product.Product.name}
                  </p>
                  <p className="text-black mt-2">
                    Weight: {product.Product.weight}gr
                  </p>
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <p className="border-2 text-black px-2 py-1 font-bold">
                    x {product.quantity}
                  </p>
                  <p className="text-black font-bold text-lg">
                    {formatToRupiah(product.Product.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                <option
                  value=""
                  className="text-black font-semibold"
                  disabled
                  defaultValue
                >
                  Pilih opsi
                </option>
                <option className="text-black font-semibold" value="">
                  JNE
                </option>
                <option className="text-black font-semibold" value="">
                  TIKI
                </option>
              </select>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">Subtotal</p>
              <p className="font-semibold text-black text-lg">
                {formatToRupiah(data.totalPrice)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">Shipping</p>
              <p className="font-semibold text-red-500 text-lg">
                - {formatToRupiah(data.shippingCost)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">
                Total Affiliate:
              </p>
              <p className="font-semibold text-red-500 text-lg">
                - {formatToRupiah(data.totalAffiliate)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-black text-lg">
                Total Discount:
              </p>
              <p className="font-semibold text-red-500 text-lg">
                - {formatToRupiah(data.totalDiscount)}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-2xl font-bold text-black">Total</p>
            <p className="text-2xl font-bold text-blue-500">
              {formatToRupiah(data.nettPrice)}
            </p>
          </div>
        </div>
        <div className="mt-4">

          <button
            onClick={handleOrder}
            className="w-full p-2 bg-blue-500 text-white rounded-md text-xl font-bold"
          >
            Order
          </button>

        </div>
      </div>
    </div>
  );
}
