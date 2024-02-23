"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultImage from '../../../public/images/test-product.jpg'

function Card() {
  const [isQuantityModalOpen, setQuantityModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  const addToCart = async (productId) => {
    try {
      
      const cartId =  localStorage.getItem('cartId')

      const response = await axios.post(
        `http://localhost:3000/cart/${cartId}/product`,
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



  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/product/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const product = response.data.data;
        setProducts(product);
      } catch (error) {
        console.error("error fetching product", error);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantity = () => {
    setQuantityModalOpen(true);
  };

  const handleBackdropClick = () => {
    setQuantityModalOpen(false);
  };

  const handleModalClick = (e, ) => {
    e.stopPropagation();
  };

  function formatRupiah(amount) {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  }
  return (
    <div className="bg-white pt-4">
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
                Move To cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* modal end */}

      <div className="bg-white mx-32 my-4 rounded border shadow-lg p-5">
        <h1 className="ml-5 font-semibold text-lg text-black my-6">
          All Product
        </h1>
        <div className="flex justify-between flex-wrap gap-y-10 bg-white">
          {products && products.length > 0 && products.map((product, index) => (
            <div key={index} className="p-4 shadow-md">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={
                    product.ProductGalleries[0]?.imageUrl
                      ? `http://localhost:3000/uploads/productImage/${product.ProductGalleries[0].imageUrl}`
                      : defaultImage // Fallback image
                  }
                  alt="Image"
                  width={250}
                  height={240}
                  className="rounded-md object-cover h-64"
                />
                <p className="text-black font-bold text-lg text-center mt-4">
                  {formatRupiah(product.price)}
                </p>
                <p className="text-slate-500 text-center font-semibold">
                  {product.name}
                </p>
              </Link>
              <button
                onClick={handleQuantity}
                className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2"
              >
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Card;
