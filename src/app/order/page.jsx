"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import Swal from "sweetalert2";

export default function Page() {
    const [order, setOrder] = useState([]);
    const [orderProduct, setOrderProduct] = useState([]);
    const [reloadOrders, setReloadOrders] = useState(false);
    const fetchOrder = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const storedToken = localStorage.getItem("token");
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
    useEffect(() => {
        fetchOrder();
    }, []);

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
            fetchOrder();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Payment Bill added successfully!',
            });

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

    const contentOrder = (orders, status) => (
        <>
            {orders
                .filter((order) => order.status === status)
                .map((order, index) => (
                    <div key={order.id}>
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-black text-3xl font-bold">Order {index + 1}</p>
                            <p className="text-gray-500 font-semibold">{order.createdAt}</p>
                        </div>

                        {/* Order Products */}
                        {order.OrderProducts?.map((product) => (
                            <div
                                key={product.Product.id}
                                className="flex justify-between border-t py-4 items-center"
                            >
                                {/* Product Image and Details */}
                                <div className="flex">
                                    <Image
                                        src={`http://localhost:3000/uploads/productImage/${product.Product.imageUrl}`}
                                        alt={product.Product.name}
                                        width={90}
                                        height={90}
                                    />
                                    <div className="ml-3">
                                        <p className="text-lg text-black">{product.Product.name}</p>
                                        <p className="text-gray-500">
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

                        {/* Order Summary */}
                        <div className="py-4 border-t">
                            {/* Subtotal */}
                            <div className="flex justify-end">
                                <div className="flex items-center">
                                    <p className="text-black">Subtotal:</p>
                                    <p className="text-2xl w-48 text-end text-blue-500 ml-2">
                                        {formatRupiah(order.totalPrice)}
                                    </p>
                                </div>
                            </div>

                            {/* Shipping Cost */}
                            <div className="flex justify-end">
                                <div className="flex items-center">
                                    <p className="text-black">Shipping Cost:</p>
                                    <p className="text-2xl w-48 text-end text-blue-500 ml-2">
                                        {formatRupiah(order.shippingCost)}
                                    </p>
                                </div>
                            </div>

                            {/* Total Affiliate */}
                            <div className="flex justify-end">
                                <div className="flex items-center">
                                    <p className="text-black">Total Affiliate:</p>
                                    <p className="text-2xl w-48 text-end text-red-500 ml-2">
                                        - {formatRupiah(order.totalAffiliate)}
                                    </p>
                                </div>
                            </div>

                            {/* Total Discount */}
                            <div className="flex justify-end">
                                <div className="flex items-center">
                                    <p className="text-black">Total Discount:</p>
                                    <p className="text-2xl w-48 text-end text-red-500 ml-2">
                                        - {formatRupiah(order.totalDiscount)}
                                    </p>
                                </div>
                            </div>

                            {/* Order Status and Total */}
                            <div className="flex justify-between items-center">
                                {order.paymentBill !== null ? (
                                    <div className="flex items-center">
                                        <p className="text-black">Status:</p>
                                        <p className="text-lg text-blue-500 ml-2">{order.status}</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <p className="text-black">Status:</p>
                                        <p className="text-lg text-blue-500 ml-2">
                                            You must upload Payment Bill
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center">
                                    <p className="text-black">Total Pesanan:</p>
                                    <p className="text-3xl w-48 text-end text-blue-500 ml-2">
                                        {formatRupiah(order.nettPrice)}
                                    </p>
                                </div>
                            </div>

                            {/* File Upload or Display Image based on paymentBill */}
                            {order.paymentBill !== null ? (
                                // Display Image
                                <div className="py-4 border-t flex flex-col items-center justify-center">
                                    <p className="text-black text-lg font-semibold">
                                        Payment Bill:
                                    </p>
                                    <Image
                                        src={`http://localhost:3000/uploads/paymentBills/${order.paymentBill}`}
                                        alt="Payment Bill"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                            ) : (
                                // File Upload
                                <div className="py-4 border-t">
                                    <div className="flex flex-col items-center">
                                        <label htmlFor={`uploadFile${index}`} className="text-gray-400 font-semibold text-sm cursor-pointer">
                                            <span className="text-[#007bff]">Choose file</span> to upload
                                        </label>
                                        <input
                                            type="file"
                                            id={`uploadFile${index}`}
                                            className="hidden"
                                            onChange={(e) => {
                                                const fileName = e.target.files[0].name;
                                                const fileNameElement = document.getElementById(`selectedFileName${index}`);
                                                fileNameElement.innerText = fileName;
                                                fileNameElement.classList.add('file-selected-animation');
                                                // Show the submit button when a file is selected
                                                const submitButton = document.getElementById(`submitButton${index}`);
                                                submitButton.style.display = "block";
                                            }}
                                        />
                                        <div className="flex gap-4">
                                            <p className="text-xs text-gray-400 mt-2" id={`selectedFileName${index}`}></p>
                                            <div className="text-center">
                                                <button
                                                    id={`submitButton${index}`}
                                                    className="font-bold text-blue-500 border border-blue-500 p-1 px-4 rounded-md hidden"
                                                    onClick={() => {
                                                        // Perform submit action here
                                                        addPaymentBill(order.id, document.getElementById(`uploadFile${index}`).files[0]);
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                return contentOrder(orders, "accept");
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
