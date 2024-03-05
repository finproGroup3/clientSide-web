"use client";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = () => {
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [product, setProduct] = useState(null);
  const cartId = localStorage.getItem("cartId");
  const pathname = window.location.pathname;
  const idFromPath = pathname.substring(pathname.lastIndexOf("/") + 1);
  useEffect(() => {

    const fetchProductDetail = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/product/${idFromPath}`,
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

  const addToCart = async (productId) => {
    try {
      // Parse productId to integer
      const parsedProductId = parseInt(productId, 10);
      const parsedQuantity = parseInt(quantity, 10);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/cart/${cartId}/product`,
        {
          productId: parsedProductId,
          quantity: parsedQuantity,
        }
      );
      setIsQuantityModalOpen(false);
      console.log("Produk ditambahkan ke keranjang:", response.data);
    } catch (error) {
      console.error("Error menambahkan produk ke keranjang:", error);
    }
  };


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

  const handleQuantity = () => {
    setIsQuantityModalOpen(true);
  };

  const handleBackdropClick = () => {
    setIsQuantityModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (product === null) {
        window.location.reload();
      }
    }, 500);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [product]);

  return (
    <section className="bg-white p-1 m-20 rounded-l grid">
      {product === null && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      )}

      {/* modal start */}
      {isQuantityModalOpen && (
        <div
          data-dialog-show="sign-in-dialog"
          data-dialog-close="true"
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick}
        >
          <div
            data-dialog="sign-in-dialog"
            className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
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
                onClick={() => addToCart(idFromPath)}
              >
                Move To cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* modal end */}

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
                        src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads/productImage/${product.ProductGalleries[activeTab].imageUrl}`}
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
                          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}/uploads/productImage/${products.imageUrl}`}
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
            <button
              onClick={handleQuantity}
              className="px-4 py-1 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;