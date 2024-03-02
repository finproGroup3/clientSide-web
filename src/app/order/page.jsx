"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default function Page() {
    const [order, setOrder] = useState([]);
    const [orderProduct, setOrderProduct] = useState([]);
    const [reloadOrders, setReloadOrders] = useState(false);

    const downloadInvoicePDF = async (invoiceUrl) => {
        try {
            // Fetch the PDF file from the backend
            const response = await fetch(`http://localhost:3000/uploads/invoices/${invoiceUrl}`);
            const blob = await response.blob();

            // Create a temporary anchor element
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf'; // Set a default name for the downloaded file

            // Programmatically click the anchor element to trigger download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading invoice PDF:', error);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                const response = await axios.get(
                    `http://localhost:3000/order/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );
                setOrder(response.data.data);
                setOrderProduct(response.data.data[0]);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };
        fetchOrder();
    }, [reloadOrders]);

    const refetchOrders = () => {
        setReloadOrders(!reloadOrders); // Toggle nilai reloadOrders untuk mereset useEffect
    };

    const addPaymentBill = async (orderId, file) => {
        try {
            const storedToken = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("paymentBill", file);

            const response = await axios.put(
                `http://localhost:3000/order/${orderId}/payment-bill`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // URL gambar setelah berhasil diunggah
            const imageUrl = response.data.data.url;

            // Lakukan sesuatu dengan URL gambar jika diperlukan
            console.log("Payment Bill Image URL:", imageUrl);
        } catch (error) {
            console.error("Error uploading payment bill:", error);
        }
    };

    function formatRupiah(amount) {
        const formattedAmount = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);

        return formattedAmount;
    }
    function formatCreatedAt(createdAt) {
        const createdAtDate = new Date(createdAt);
        const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "UTC",
        });
        return formattedCreatedAt;
    }
    const contentOrder = (orders, status) => (
        <>
            {orders
                .filter((order) => order.status === status)
                .map((order, index) => (
                    <div key={order.id} className=" border-b pb-4 mb-4">
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-black text-3xl font-bold">Order {index + 1}</p>
                            <p className="text-gray-500 font-semibold">{formatCreatedAt(order.createdAt)}</p>
                        </div>
                        <div className="flex gap-8">
                            <div className="w-[70%]  border-blue-gray-200 border-t-0 rounded">
                                {/* Order Products */}
                                {order.OrderProducts?.map((product) => (
                                    <div
                                        key={product.Product.id}
                                        className="flex justify-between mt-3 rounded-md shadow border-blue-gray-200 p-4 items-center bg-blue-50"
                                    >
                                        {/* Product Image and Details */}
                                        <div className="flex">
                                            <div className=" border border-blue-gray-200 rounded-md">
                                                <Image
                                                    src={`http://localhost:3000/uploads/productImage/${product.Product.imageUrl}`}
                                                    alt={product.Product.name}
                                                    width={90}
                                                    height={90}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-lg text-black">
                                                    {product.Product.name}
                                                </p>
                                                <p className="text-gray-700">
                                                    quantity: {product.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Product Price */}
                                        <p className="text-lg text-black">
                                            {formatRupiah(product.price)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-[30%] rounded-md p-4 mt-3 shadow bg-blue-50">
                                {order ? (
                                    <button
                                        className="w-full font-bold text-center py-3 mb-4 border bg-white rounded-lg"
                                        onClick={() => downloadInvoicePDF(order.invoiceUrl)}
                                    >
                                        <div className="flex gap-3 items-center mx-auto w-fit">
                                            <span>Download invoice</span>
                                            <Image
                                                src="/images/download.png"
                                                alt="brand"
                                                width={25}
                                                height={25}
                                            />
                                        </div>
                                    </button>
                                ) : null}
                                <p className="text-center font-semibold text-lg border-b boder border-blue-gray-200">
                                    Order Summary
                                </p>
                                {/* Subtotal */}
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-black">Sub total:</p>
                                    <div className="flex-grow text-lg text-end text-black ml-2">
                                        {formatRupiah(order.totalPrice)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-black">Shipping Cost:</p>
                                    <div className="flex-grow text-lg  text-end text-black ml-2">
                                        {formatRupiah(order.shippingCost)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-black">Total Affiliate:</p>
                                    <div className="flex-grow text-lg text-end text-red-500 ml-2">
                                        - {formatRupiah(order.totalAffiliate)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1 border-b pb-4 border-blue-gray-200">
                                    <p className="text-black">Total Discount:</p>
                                    <div className="flex-grow text-lg text-end text-red-500 ml-2">
                                        - {formatRupiah(order.totalDiscount)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-black">Total Order:</p>
                                    <div className="flex-grow text-lg text-end text-black ml-2">
                                        {formatRupiah(order.nettPrice)}
                                    </div>
                                </div>
                                <div className="py-3 mt-4">
                                    {order.paymentBill !== null ? (
                                        <div className="flex items-center">
                                            <p className="text-black">Status:</p>
                                            <p className="text-lg text-blue-500 ml-2">
                                                {order.status}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <p className="text-black">Status:</p>
                                            <p className=" text-blue-500 ml-2">
                                                You must upload Payment Bill
                                            </p>
                                        </div>
                                    )}
                                    {/* File Upload or Display Image based on paymentBill */}
                                    {order.paymentBill !== null ? (
                                        // Display Image
                                        <div className="py-4  flex flex-col items-center justify-center">
                                            <p className="text-black text-lg font-semibold">
                                                Payment Bill:
                                            </p>
                                            <Image
                                                src={`http://localhost:3000/uploads/paymentBills/${order.paymentBill}`}
                                                alt="Payment Bill"
                                                width={200}
                                                height={100}
                                                className="rounded border border-blue-gray-200"
                                            />
                                        </div>
                                    ) : (
                                        // File Upload
                                        <div className="">
                                            <label
                                                htmlFor={`uploadFile${index}`}
                                                className="bg-white text-center rounded w-full py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-4"
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
                                                    <span className="text-[#007bff]">Choose file</span> to
                                                    upload
                                                </p>
                                                <input
                                                    type="file"
                                                    id={`uploadFile${index}`}
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        addPaymentBill(order.id, file)
                                                            .then(() => {
                                                                // Reload or refetch order data after successful upload
                                                                // This assumes that you have a function to refetch orders
                                                                // Replace it with the actual function you use to fetch orders
                                                                refetchOrders();
                                                            })
                                                            .catch((error) => {
                                                                console.error(
                                                                    "Error uploading payment bill:",
                                                                    error
                                                                );
                                                            });
                                                    }}
                                                />
                                                <p className="text-xs text-gray-400 mt-2">
                                                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                                                </p>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {/* Back to Home Button */}
            <div className="flex items-center">
                <div className="text-center">
                    <button className="font-bold text-blue-500 border border-blue-500 p-4 rounded-md">
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );

    const renderTabContent = (orders, tabKey) => {
        switch (tabKey) {
            case "1":
                // Menampilkan pesanan dengan paymentBill null (Not Completed)
                return contentOrder(
                    orders.filter((order) => order.paymentBill === null),
                    "pending"
                );
            case "2":
                // Menampilkan pesanan dengan paymentBill tidak null (Pending)
                return contentOrder(
                    orders.filter((order) => order.paymentBill !== null),
                    "pending"
                );
            case "3":
                return contentOrder(orders, "succeed");
            case "4":
                return contentOrder(orders, "rejected");
            default:
                return null;
        }
    };

    return (
        <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative p-4">
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Not Completed" key="1">
                    {renderTabContent(order, "1")}
                </TabPane>
                <TabPane tab="Pending" key="2">
                    {renderTabContent(order, "2")}
                </TabPane>
                <TabPane tab="Success" key="3">
                    {renderTabContent(order, "3")}
                </TabPane>
                <TabPane tab="Rejected" key="4">
                    {renderTabContent(order, "4")}
                </TabPane>
            </Tabs>
        </div>
    );
}