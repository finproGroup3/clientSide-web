import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white text-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/images/logo-symbol.png"
                alt="brand"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold ml-2 text-blue-500">Brand</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center ">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            className="bg-white border-2 border-blue-500 text-white py-2 px-4 rounded-l leading-tight focus:outline-none focus:border-blue-500 border-r-0"
          />
          <div className="relative ">
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block appearance-none w-full bg-white border-2 border-r-0 border-blue-500 text-black py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path
                  fill="#6B7280"
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 7.586l2.293-2.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
            </div>
          </div>
          <h1
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2  px-4 rounded-r "
          >
            Search
          </h1>
        </div>

        <div className="flex items-center">
          <Link href="/profile">
            <div className="mx-4 text-slate-500 text-sm font-semibold flex flex-col items-center">
              <Image
                src="/images/person.png"
                width={60}
                height={50}
                alt="Profile"
                className="w-5 h-5 mb-1"
              />
              <span>Profile</span>
            </div>
          </Link>
          <Link href="/cart">
            <div className="ml-4 text-slate-500 text-sm font-semibold flex flex-col items-center">
              <Image
                src="/images/cart.png"
                width={50}
                height={50}
                alt="Cart"
                className="w-5 h-5 mb-1"
              />
              <span>My Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
