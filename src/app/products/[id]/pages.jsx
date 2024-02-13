"use client";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";

const Menu = [
    {
        id: 1,
        src: "https://plus.unsplash.com/premium_photo-1707092158569-9fb39e1fd996?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1707282462551-023e3b14417f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1707057538360-47db5c9a6b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
    },
];

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState(1);
    const handleClick = (index) => {
        setActiveTab(index);
    };
    const checkActive = (index, className) =>
        activeTab === index ? className : "";

    return (
        <section className="bg-white p-1 m-20 rounded-l grid">
            <div className="flex justify-evenly p-5 space-x-10 space-y-10">
                <div>
                    <aside>
                        <div className=" p-5 text-center mb-5">
                            <div className="bg-white items-center flex flex-col space-y-2">
                                <div className="shadow-lg rounded-md w-auto">
                                    {Menu.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`border-4 shadow-lg px-20 py-8 rounded-md border-blue-500 items-center flex flex-col panel ${checkActive(
                                                item.id,
                                                "active"
                                            )}`}
                                        >
                                            <Image
                                                src="https://images.unsplash.com/photo-1707057538360-47db5c9a6b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
                                                alt={item.title}
                                                className="w-96 h-96 object-cover"
                                                width="400"
                                                height="400"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white flex justify-center items-center space-x-2 px-4 py-2 rounded-lg w-[443px]">
                                    {Menu.map((item) => (
                                        <div key={item.title} className="">
                                            <div
                                                className={`cursor-pointer border-2 p-1 px-2 rounded-md border-slate-300 hover:border-slate-500 ${checkActive(
                                                    item.id,
                                                    "border-2 border-slate-500 p-2 rounded-md text-white"
                                                )}`}
                                                onMouseOver={() => handleClick(item.id)}
                                            >
                                                <Image
                                                    src="https://images.unsplash.com/photo-1707057538360-47db5c9a6b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
                                                    alt={item.title}
                                                    className="w-12 h-12 object-cover"
                                                    width="100"
                                                    height="100"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                        Produk A
                    </h2>
                    <p className="mb-4 font-semibold text-xl text-gray-800 ">100000</p>
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
                                <span className="text-gray-500">1000</span>
                            </li>
                            <li className="mb-2">
                                {" "}
                                <b className="font-medium w-36 inline-block">Category:</b>
                                <span className="text-gray-500">Elektronik</span>
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
 