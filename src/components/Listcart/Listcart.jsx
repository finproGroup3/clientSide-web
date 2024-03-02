"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Listcart({ handleChangeQuantity, product, reFetch }) {

  function formatRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }

  const deleteCart = async () => {
    try {
      console.log(product);
      const cartId = localStorage.getItem("cartId");

      // Show confirmation dialog
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will remove the item from the cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      });

      if (confirmResult.isConfirmed) {
        // User confirmed, proceed with deletion
        const response = await axios.delete(`http://localhost:3000/cart/${cartId}/product/${product.Product.id}`);

        // Show success message
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item has been removed from the cart!',
        });

        // Fetch updated cart data
        await reFetch();
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
  }, [product]);

  return (
    <div className="flex flex-row justify-between m-4">
      <div className="flex flex-row gap-3">
        <Image
          src={`http://localhost:3000/uploads/productImage/${product.Product.imageUrl}`}
          alt=""
          width={100}
          height={100}
          className="border  p-2 h-20 rounded"
        />
        <ul className="flex flex-col font-semibold">
          <li className="font-bold text-lg text-black">{product.Product.name}</li>
          <li>
            weight: <span>{product.Product.weight} g</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col content-center items-end">
        <h2 className="mb-4 font-bold text-black">{formatRupiah(product.Product.price)}</h2>
        <div className="flex items-center" onClick={(e) => handleChangeQuantity(product)}>
          <button className="border-2 rounded p-2 mr-3 shadow">
            <Image
              src={"/images/edit.svg"}
              alt=""
              width={20}
              height={20}
            ></Image>
          </button>
          <h2 className="font-semibold ">Quantity :  {product.quantity}</h2>
        </div>
        <div className="flex flex-row gap-2 text-sm font-semibold ml-32">
          {/* Tambahkan event onClick untuk memanggil fungsi deleteCart saat tombol "Remove" ditekan */}
          <button className="bg-white border hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded-md" onClick={deleteCart}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
