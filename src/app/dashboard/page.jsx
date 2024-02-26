"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Icon,
} from "@material-tailwind/react";
import axios from "axios";

function Dashboard() {
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    // Retrieve isLoggedIn value from localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    // If storedIsLoggedIn exists and is true, set isLoggedIn state to true
    if (storedIsLoggedIn && storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/promo/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const promoProduct = response.data.data;
        setPromos(promoProduct);
      } catch (error) {
        console.error("Error fetching promo data:", error);
      }
    };
    fetchPromos();
  }, []);
  // localStorage.setItem('isLoggedIn', false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      // Handle successful login response here
      localStorage.setItem("token", response.data.token);
      console.log(response.data.data.Cart.id);
      localStorage.setItem("cartId", response.data.data.Cart.id);
      localStorage.setItem("userId", response.data.data.id)
      // localStorage.setItem('isLoggedIn', false);
      setIsLoggedIn(false);
      handleCloseDialogs();
    } catch (error) {
      // Handle login error here
      console.log(error);
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="bg-white">
      <Dialog
        size="m"
        open={signInOpen}
        onClose={handleCloseDialogs}
        className="bg-transparent shadow-none"
      >
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
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleSignUpOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      <Dialog
        size="m"
        open={signUpOpen}
        onClose={handleCloseDialogs}
        className="bg-transparent shadow-none"
      >
        {/* Sign up dialog content */}
        <Card className="mx-auto w-full max-w-[24rem]">
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
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" />
            {/* Add more sign-up form fields as needed */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleCloseDialogs} fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
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
            src="/images/banner-board.svg"
            alt="banner"
            width={1400}
            height={325}
            className="rounded-md"
          />
          <div className="absolute top-2 left-5 text-left p-4">
            <p className="text-black text-2xl ">Latest Trending</p>
            <p className="text-black text-4xl font-bold ">Electronic Items</p>
            <Link href="/">
              <p className="text-black hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all px-3 py-2 mt-4 text-center bg-white rounded font-semibold w-44">
                Learn more
              </p>
            </Link>
            <p className="text-black text-2xl mt-9 w-80 ">
              Shop to support products made by the nation’s children
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
                className="w-full font-semibold mb-3 rounded py-1 bg-blue-600 text-white transition-all hover:bg-white hover:text-blue-600 "
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
            <Link href="/" className="">
              <p className="hover:cursor-pointer px-2 py-4 font-semibold bg-orange-500 rounded text-white">
                Share Your Affiliate Code to Get More Benefit
              </p>
            </Link>
          </div>
          <div className="my-2">
            <Link href="/" className="">
              <p className="hover:cursor-pointer px-2 py-4 font-semibold bg-teal-400 rounded text-white">
                50% Discount For First-time Checkout
              </p>
            </Link>
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
            <div className="flex mt-4 mx-4">
              {promos[0]?.Products.map((product) => (
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
        <div className="flex">
          <div className="flex-none">
            <Image
              src="/images/banner-categories.svg"
              alt="categories"
              width={279}
              height={253}
              className="rounded-l"
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
            <div className="flex h-1/2">
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 1</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 2</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 3</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 4</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </div>
            <div className="flex h-1/2">
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 5</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 6</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 7</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 8</p>
                <div className="flex ">
                  <p>from Rp.1.000.000</p>
                  <Image
                    src="/images/list-categories.svg"
                    alt="categories1"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Categories section end */}
    </div>
  );
}

export default Dashboard;
