"use client";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    const idFromPath = pathname.substring(pathname.lastIndexOf("/") + 1);

    const fetchProductDetail = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDg0MTI2OTIsImV4cCI6MTcwODQ1NTg5Mn0.QlsFcQdJSK411tbHdKqSkw5KQbs1WZDqvbl0MVIQmF8";
      localStorage.setItem("token", token);
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/product/${idFromPath}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    if (idFromPath) {
      fetchProductDetail();
    }
  }, []);

  const handleClick = (index) => {
    setActiveTab(index);
  };
  const checkActive = (index, className) =>
    activeTab === index ? className : "";

  function formatRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }

  return (
    <section className="bg-white p-1 m-20 rounded-l grid">
      <div className="flex justify-evenly p-5 space-x-10 space-y-10">
        <div>
        <aside>
            <div className="p-5 text-center mb-5">
              <div className="bg-white items-center flex flex-col space-y-2">
                <div className="shadow-lg rounded-md w-auto">
                  {product && product.ProductGalleries && (
                    <div
                      key={product.ProductGalleries[activeTab].id}
                      className={`border-4 shadow-lg px-20 py-8 rounded-md border-blue-500 items-center flex flex-col panel`}
                    >
                      <Image
                        src={product.ProductGalleries[activeTab].imageUrl}
                        alt={"image"}
                        className="w-96 h-96 object-cover"
                        width="400"
                        height="400"
                      />
                    </div>
                  )}
                </div>
                <div className="bg-white flex justify-center items-center space-x-2 px-4 py-2 rounded-lg w-[443px]">
                  <div className="flex">
                    {product?.ProductGalleries.map((products, index) => (
                      <div
                        key={products.id}
                        className={`cursor-pointer border-2 p-1 px-2 rounded-md border-slate-300 hover:border-slate-500 ${checkActive(
                          index,
                          "border-2 border-slate-500 p-2 rounded-md text-white"
                        )}`}
                        onClick={() => handleClick(index)}
                      >
                        <Image
                          src={products.imageUrl}
                          alt={"image"}
                          className="w-12 h-12 object-cover"
                          width="100"
                          height="100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="w-1/2 h-1/2">
          <div className="flex items-center font-semibold text-green-500">
            <CheckOutlined className="mr-2" />
            <span>in Stock</span>
          </div>
          <h2 className="font-semibold text-gray-700 text-2xl mb-4">
            {product?.name}
          </h2>
          <p className="mb-4 font-semibold text-xl text-gray-800 ">
            {formatRupiah(product?.price)}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <button className="px-4 py-1 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Checkout
            </button>
          </div>
          <hr className="w-1/2" />
          <div className="pt-10">
            <ul className="mb-5 gap-10">
              <li className="mb-2">
                {" "}
                <b className="font-medium w-36 inline-block">Stock:</b>
                <span className="text-gray-500">{product?.stock}</span>
              </li>
              <li className="mb-2">
                {" "}
                <b className="font-medium w-36 inline-block">Category:</b>
                <span className="text-gray-500 capitalize">
                  {product?.Category?.name}
                </span>
              </li>
              <li className="mb-2">
                {" "}
                <b className="font-medium w-36 inline-block">Seller / Brand:</b>
                <span className="text-gray-500">Apple</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
