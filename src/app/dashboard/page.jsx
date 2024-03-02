"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import defaultImage from "../../../public/images/test-product.jpg";
import {
  Alert,
  Button,
  Dialog,
  Card,
  Option,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
} from "@material-tailwind/react";
import axios from "axios";
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function Dashboard() {
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [value, setValue] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [formSignUp, setFormSignUp] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    cityId: "",
    provinceId: "",
    referralCode: "",
  });
  const [categories, setCategories] = useState([]);
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
      const response = await axios.get("http://localhost:3000/category");
      // Limit to 8 items using array slicing
      const limitedCategories = response.data.data.slice(0, 8);
      setCategories(limitedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormSignUp({
      ...formSignUp,
      [name]: value,
    });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeCity = (selectedCity) => {
    setValueCity(selectedCity);
    setFormSignUp({
      ...formSignUp,
      cityId: selectedCity,
    });
  };

  const handleChangeProvince = (selectedProvince) => {
    setValue(selectedProvince);
    fetchCities(selectedProvince);
    setFormSignUp({
      ...formSignUp,
      provinceId: selectedProvince,
    });

  };
  const handleSignInOpen = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
    setSignInOpen(false);
  };

  const handleCloseDialogs = () => {
    setSignInOpen(false);
    setSignUpOpen(false);
  };

  const [promos, setPromos] = useState([]);
  const fetchProvinces = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/order/provinces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProvinces(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  const fetchCities = async (provinceName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/order/cities/${provinceName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCities(response.data.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  const fetchPromos = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/promo/", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const promoProduct = response.data.data;
      console.log(response.data.data);
      setPromos(promoProduct);
    } catch (error) {
      console.error("Error fetching promo data:", error);
    }
  };

  useEffect(() => {
    fetchPromos();
    fetchProvinces();
    fetchCategories();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      console.log(response.data.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("cartId", response.data.data.Cart.id);
      localStorage.setItem("referralCode", response.data.data.privateReferralCode.code);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem('isLoggedIn', true);
      window.location.reload();
      handleCloseDialogs();
    } catch (error) {
      // Handle login error here
      console.log(error);
      console.error("Login error:", error);
    }
  };
  const handleSignUp = async () => {
    try {
      // Make a request to sign up the user
      const response = await axios.post(
        `http://localhost:3000/users/register`,
        formSignUp
      );

      // Optionally, clear the form fields after successful sign-up
      setFormSignUp({
        email: "",
        password: "",
        username: "",
        address: "",
        cityId: "",
        provinceId: "",
        referralCode: "",
      });
      handleCloseDialogs();
      Swal.fire({
        icon: 'success',
        title: 'Sign-up Successful',
        text: 'Your account has been successfully created!',
      });
      // Display success message or redirect the user
    } catch (error) {
      // Handle sign-up error
      setErrorSignUp(error.response.data.message || "An error occurred during sign-up.");
      // Display error message to the user
    }
  };

  return (
    <div className="bg-white">
      <Dialog
        size="md"
        open={signInOpen}
        onClose={handleCloseDialogs}
        className="bg-transparent shadow-none w-60"
      >
        <div className="bg-transparent absolute top-2 right-0 -translate-x-28 z-20">
          <Button onClick={handleCloseDialogs} className="bg-transparent">
            <span name="close" className="text-xl text-black bg-transparent">X</span>
          </Button>
        </div>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <div className="relative">
              <Input
                label="Password"
                size="lg"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleLogin} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={handleSignUpOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      <Dialog
        size="xl"
        open={signUpOpen}
        onClose={handleCloseDialogs}
        className="bg-transparent shadow-none w-100"
      >
        <div className="bg-transparent absolute top-2 right-0 -translate-x-28 z-20">
          <Button onClick={handleCloseDialogs} className="bg-transparent">
            <span name="close" className="text-xl text-black bg-transparent">X</span>
          </Button>
        </div>
        {/* Sign up dialog content */}
        <Card className="mx-auto w-[80%]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your details to create an account.
            </Typography>

            {errorSignUp && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Alert
                  color="red"
                  variant="gradient"
                  icon={<Icon />}
                  action={
                    <div style={{ marginLeft: 'auto' }} className="h-5">
                      <Button
                        variant="text"
                        color="white"
                        size="sm"
                        onClick={() => setErrorSignUp(null)}
                        className="hover:bg-transparent -translate-y-2"
                      >
                        <span className="text-base">X</span>
                      </Button>
                    </div>
                  }
                >
                  {errorSignUp}
                </Alert>
              </div>
            )}

            <Input
              label="Email"
              size="lg"
              name="email"
              value={formSignUp.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              name="password"
              value={formSignUp.password}
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-10">
              <div className="w-full">
                <Input
                  label="Username"
                  size="lg"
                  name="username"
                  value={formSignUp.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  label="Address"
                  size="lg"
                  name="address"
                  value={formSignUp.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex gap-10">
              <div className="w-full">
                <Select
                  onChange={(value) => {
                    handleChangeProvince(value);
                  }}
                  name="province"
                  label="Province"
                  required >
                  {provinces.map(province => (
                    <Option key={province.id} value={province.id}>{province.name}</Option>
                  ))}
                </Select>
              </div>
              <div className="w-full">
                <Select
                  onChange={(valueCity) => {
                    handleChangeCity(valueCity);
                  }}
                  name="city"
                  label="City"
                  required >
                  {cities.map(city => (
                    <Option key={city.id} value={city.id}>{city.name}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <Input
              label="Referral Code"
              size="lg"
              name="referralCode"
              value={formSignUp.referralCode}
              onChange={handleInputChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSignUp} fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signin"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleSignInOpen}
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      {/* Hero section start */}
      <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative flex">
        <div className="relative my-4 ml-4">
          <Image
            src="/images/banner-board.png"
            alt="banner"
            width={1400}
            height={425}
            className="rounded-md object-cover"
          />
          <div className="absolute top-2 left-5 text-left p-4">
            <p className="text-black text-2xl ">Latest Trending</p>
            <p className="text-black text-4xl font-bold ">Baby & Mom Items</p>
            <Link href="/">
              <p className="text-black hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all px-3 py-2 mt-4 text-center bg-white rounded font-semibold w-44">
                shop now
              </p>
            </Link>
            <p className="text-black text-2xl mt-16 w-80 ">
              Shop to support products made by us
            </p>
          </div>
        </div>
        <div className="m-4 relative">
          {!isLoggedIn && (
            <div className="bg-blue-100 rounded pt-2 px-4">
              <div className="flex items-center mb-2">
                <Image
                  src="/images/Avatar.svg"
                  alt="avatar"
                  width={40}
                  height={40}
                  className=""
                />
                <span className="ml-2 font-semibold text-black">
                  Hi, user let&apos;s get started
                </span>
              </div>
              <button
                onClick={handleSignUpOpen}
                className="w-full font-semibold mb-3 rounded py-1 bg-blue-600 text-white transition-all hover:bg-white hover:text-blue-600"
              >
                join now
              </button>
              <button
                onClick={handleSignInOpen}
                className="w-full font-semibold mb-3 py-1 bg-white rounded text-blue-600 hover:text-white hover:bg-blue-600"
              >
                Log in
              </button>
            </div>
          )}
          <div className="my-2">
            <p className="px-2 py-4 font-semibold bg-orange-500 rounded text-white">
              Share Your Affiliate Code to Get More Benefit
              <br /> <br />
              {localStorage.getItem("referralCode") ? (
                <p className="p-3 bg-blue-gray-50 bg-opacity-45 rounded-lg">
                  Your code: {localStorage.getItem("referralCode")}
                </p>
              ) : null}
            </p>
          </div>
          <div className="my-2">
            <p className="px-2 py-4 font-semibold bg-teal-400 rounded text-white">
              50% Discount For First-time Checkout
            </p>
          </div>
        </div>
      </div>

      {/* Hero section end */}

      {/* Promo section start */}
      <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative">
        <div className="mt-4">
          <div>
            <h1 className="text-center font-bold text-lg text-black">
              Limited Promo
            </h1>
            <h1 className="text-center text-slate-500">Get Your Item Now!</h1>
          </div>
          <div>
            <div className="flex mt-4 mx-4 mb-10">
              {promos[0]?.Products.slice(0, 5).map((product) => (
                <div key={product.id} className={`w-1/3 mx-3 relative`}>
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={
                        product.ProductGalleries[0]?.imageUrl
                          ? `http://localhost:3000/uploads/productImage/${product.ProductGalleries[0].imageUrl}`
                          : defaultImage // Fallback image
                      }
                      alt={`Promo Image - ${promos[0].code}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-full h-60"
                    />
                    <div className="absolute top-0 left-0 text-left p-2">
                      <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                        -{promos[0].percentage}%
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                      <p className="text-black text-xl font-bold">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Promo section end */}

      {/* Categories section start */}
      <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative">
        <div className="flex items-center">
          <div className="flex-none">
            <Image
              src="/images/banner-categories.png"
              alt="categories"
              width={279}
              height={353}
              className="rounded-l object-cover"
            />
          </div>
          <div className="absolute top-7 left-2 text-left p-2">
            <p className="text-black w-max rounded-lg font-semibold text-2xl ">
              Categories
            </p>
            <Link href="/">
              <p className="bg-white text-black w-max px-4 py-2 rounded-md font-semibold mt-4 hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                Source Now
              </p>
            </Link>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <div key={category.id} className="w-1/4 p-4 border flex justify-between items-center">
                  <p className="text-black">{category.name}</p>
                  <div className="flex justify-between">
                    <Image
                      src="/images/list-categories.png"
                      alt={category.name}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Categories section end */}
    </div>
  );
}

export default Dashboard;
