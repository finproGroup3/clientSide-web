"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function Page() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const pathname = window.location.pathname;
    const idFromPath = pathname.substring(pathname.lastIndexOf("/") + 1);

    const fetchOrder = async () => {

      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/order/user/${idFromPath}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setOrder(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    if (idFromPath) {
      fetchOrder();
    }
  }, []);

  function formatRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }

  const contentOrder = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <p className="text-black text-3xl font-bold">Order</p>
          <p className="text-gray-500 font-semibold">21/02/2004</p>
        </div>
        <div className="flex justify-between border-t py-4 items-center">
          <div className="flex">
            <Image
              src="/images/test-product.jpg"
              alt="product"
              width={90}
              height={90}
            />
            <div className="ml-3">
              <p className="text-lg text-black">Iphone 13 128GB</p>
              <p className="text-gray-500">quantity: 1</p>
            </div>
          </div>
          <p className="text-lg text-black">Rp.100.000,00</p>
        </div>
        <div className="flex justify-between border-t py-4 items-center">
          <div className="flex">
            <Image
              src="/images/test-product.jpg"
              alt="product"
              width={90}
              height={90}
            />
            <div className="ml-3">
              <p className="text-lg text-black">Iphone 13 128GB</p>
              <p className="text-gray-500">quantity: 1</p>
            </div>
          </div>
          <p className="text-lg text-black">Rp.100.000,00</p>
        </div>
        <div className="py-4 border-t">
          <div className="flex justify-end">
            <div className="flex items-center">
              <p className="text-black">shipping Cost:</p>
              <p className="text-2xl w-48 text-end text-blue-500 ml-2">
                {formatRupiah(order.shippingCost)}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center">
              <p className="text-black">Total Discount:</p>
              <p className="text-2xl w-48 text-end text-red-500 ml-2">
                - {formatRupiah(order.totalDiscount)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-black">Status:</p>
              <p className="text-lg text-blue-500 ml-2">{order.status}</p>
            </div>
            <div className="flex items-center">
              <p className="text-black">Total Pesanan:</p>
              <p className="text-3xl w-48 text-end text-blue-500 ml-2">
                {formatRupiah(order.totalPrice)}
              </p>
            </div>
          </div>
          <label
            htmlFor="uploadFile1"
            className="bg-white text-center rounded w-full sm:w-[360px] min-h-[160px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 mb-6 fill-gray-400"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
                data-original="#000000"
              />
              <path
                d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
                data-original="#000000"
              />
            </svg>
            <p className="text-gray-400 font-semibold text-sm">
              Drag & Drop or <span className="text-[#007bff]">Choose file</span>{" "}
              to upload
            </p>
            <input type="file" id="uploadFile1" className="hidden" />
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
          <div className="flex items-center">
            <div className="text-center">
              <button className="font-bold text-blue-500 border border-blue-500 p-4 rounded-md">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderTabContent = (status) => {
    switch (status) {
      case "accept":
        return order?.status === "accept" ? contentOrder() : null;
      case "pending":
        return order?.status === "pending" ? contentOrder() : null;
      case "rejected":
        return order?.status === "rejected" ? contentOrder() : null;
      default:
        return null;
    }
  };

  return (
    <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative p-4">
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Not Completed" key="1">
        {renderTabContent("notCompleted")}
      </TabPane>
      <TabPane tab="Pending" key="2">
        {renderTabContent("pending")}
      </TabPane>
      <TabPane tab="Success" key="3">
        {renderTabContent("accept")}
      </TabPane>
      <TabPane tab="Rejected" key="4">
        {renderTabContent("rejected")}
      </TabPane>
    </Tabs>
  </div>
  );
}
