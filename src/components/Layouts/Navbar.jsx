"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Navbar = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState();
  const [cart, setCart] = useState({});
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/cart/${cartId}`
        );
        setCart(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();

    // Set interval untuk melakukan fetchCart setiap 5 detik (sesuaikan dengan kebutuhan Anda)
    const intervalId = setInterval(() => {
      fetchCart();
    }, 2000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [cartUpdated]);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // Fungsi untuk mereset state cartUpdated
  const handleCartUpdate = () => {
    setCartUpdated((prev) => !prev);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    };

    // Add event listener for storage change
    window.addEventListener("storage", handleStorageChange);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/category/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the headers
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCategorySelectChange = (e) => {
    setCategoryValue(e.target.value);
  };
  const handleSignOut = () => {
    localStorage.removeItem("cartId");
    localStorage.removeItem("referralCode");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-white text-black py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-[100%] flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/images/logo-symbol.png"
                alt="brand"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold ml-2 text-blue-500">
                Brand
              </span>
            </div>
          </Link>
        </div>
        <div className="container mx-auto flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border-2 border-blue-500 text-black py-2 px-4 rounded-l leading-tight focus:outline-none focus:border-blue-500 border-r-0"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          {categories && (
            <select
              onChange={handleCategorySelectChange}
              className="block appearance-none w-auto bg-white border-2 border-r-0 border-blue-500 text-black py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}

          <Link href={{
            pathname: '/products',
            query: {
              value: searchValue,
              category: categoryValue
            }
          }}>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r"
            >
              Search
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-end w-[100%] mr-3">
          <Link href="/order">
            <div className="ml-8 text-slate-500 text-sm font-semibold flex flex-col items-center">
              <Image
                src="/images/order.png"
                width={50}
                height={50}
                alt="Cart"
                className="w-5 h-5 mb-1"
              />
              <span>My Order</span>
            </div>
          </Link>

          <Link href="/cart">
            <div className="ml-8 text-slate-500 text-sm font-semibold flex flex-col items-center relative">
              <Image
                src="/images/cart.png"
                width={50}
                height={50}
                alt="Cart"
                className="w-5 h-5 mb-1"
              />
              {cart.CartProducts?.length > 0 ? (
                <p className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-500 px-2 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                  {cart.CartProducts.length}
                </p>
              ) : null}
              <span className="mt-1">My Cart</span>
            </div>
          </Link>
          {isLoggedIn ? (
            <div
              className="mx-8 text-slate-500 text-sm font-semibold flex items-center relative"
              onClick={toggleProfileMenu}
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-row gap-2 cursor-pointer">
                  <Image
                    src="/images/person.png"
                    width={60}
                    height={50}
                    alt="Profile"
                    className="w-5 h-5 mb-1"
                  />
                  <div className="flex items-center">
                    <Image
                      src="/images/profile-dropdown.png"
                      alt="images"
                      width={10}
                      height={10}
                      className=""
                    />
                  </div>
                </div>
                <span>Profile</span>
                {/* module start */}
                <ul
                  role="menu"
                  data-popover="profile-menu"
                  data-popover-placement="bottom"
                  className={`absolute z-10 flex min-w-[180px] flex-col overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-xl shadow-blue-gray-500/10 focus:outline-none transition-all ${isProfileMenuOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    } top-10`}
                >
                  <Link href={`/profile`}>
                    <button
                      role="menuitem"
                      className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-2  text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"
                          fill="#90A4AE"
                        ></path>
                      </svg>
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                        Edit Profile
                      </p>
                    </button>
                  </Link>

                  <hr className="my-2 border-blue-gray-50" role="menuitem" />
                  <button
                    role="menuitem"
                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                        fill="#90A4AE"
                      ></path>
                    </svg>


                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </p>
                  </button>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div >
    </nav >
  );
};

export default Navbar;
