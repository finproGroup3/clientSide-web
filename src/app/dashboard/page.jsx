import Image from "next/image";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="bg-white">
      {/* Hero section start */}
      <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative">
        <div className="flex mx-6 my-4 relative">
          <div className="relative">
            <Image
              src="/images/banner-board.svg"
              alt="banner"
              width={20}
              height={20}
              style={{ width: "1400px", height: "325px" }}
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
          <div className=" ml-3 relative">
            <div className=" bg-blue-100 rounded pt-2 px-4">
              <div className="flex items-center mb-2">
                <Image
                  src="/images/Avatar.svg"
                  alt="avatar"
                  width={40}
                  height={40}
                  className=""
                />
                <span className="ml-2 font-semibold text-black">
                  Hi, user {"let's"} get started
                </span>
              </div>
              <button className="w-full font-semibold mb-3 rounded py-1 bg-blue-600 text-white transition-all hover:bg-white hover:text-blue-600 ">
                join now
              </button>
              <button className="w-full font-semibold mb-3 py-1 bg-white rounded text-blue-600 hover:text-white hover:bg-blue-600">
                Log in
              </button>
            </div>
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
      </div>
      {/* Hero section end */}

      {/* Promo section start */}
      <div className="border mt-4 bg-white mx-32 rounded shadow-lg relative">
        <div className="mt-4">
          <div>
            <h1 className="text-center font-bold text-lg text-black">
              Limited Promo
            </h1>
            <h1 className="text-center text-slate-500">Get Your Item Now !</h1>
          </div>
          <div className="flex my-4">
            <div className="w-1/5 mx-auto text-center text-white bg-gray-500 rounded">
              <p>05</p>
              <p>days</p>
            </div>
            <div className="w-1/5 mx-auto text-center text-white bg-gray-500 rounded">
              <p>05</p>
              <p>hours</p>
            </div>
            <div className="w-1/5 mx-auto text-center text-white bg-gray-500 rounded">
              <p>05</p>
              <p>min</p>
            </div>
            <div className="w-1/5 mx-auto text-center text-white bg-gray-500 rounded">
              <p>05</p>
              <p>sec</p>
            </div>
          </div>
          <div>
            <div className="flex mt-4 mx-4">
              <div className="w-1/3 mx-3 relative">
                <Image
                  src="/images/banner-promo.svg"
                  alt=""
                  width={362}
                  height={248}
                  className="rounded-lg"
                ></Image>
                <div className="absolute top-0 left-0 text-left p-2">
                  <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                    -15%
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                  <p className="text-black  text-xl font-bold">Product 1</p>
                </div>
              </div>
              <div className="w-1/3 mx-3 relative">
                <Image
                  src="/images/banner-promo.svg"
                  alt=""
                  width={362}
                  height={248}
                  className="rounded-lg"
                ></Image>
                <div className="absolute top-0 left-0 text-left p-2">
                  <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                    -15%
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                  <p className="text-black  text-xl font-bold">Product 2</p>
                </div>
              </div>
              <div className="w-1/3 mx-3 relative">
                <Image
                  src="/images/banner-promo.svg"
                  alt=""
                  width={362}
                  height={248}
                  className="rounded-lg"
                ></Image>
                <div className="absolute top-0 left-0 text-left p-2">
                  <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                    -15%
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                  <p className="text-black  text-xl font-bold">Product 3</p>
                </div>
              </div>
            </div>
            <div className="flex m-4">
              <div className="w-1/2 mx-3 relative">
                <Image
                  src="/images/big-banner-promo.svg"
                  alt=""
                  width={543}
                  height={282}
                  className="rounded-lg"
                ></Image>
                <div className="absolute top-0 left-0 text-left p-2">
                  <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                    -15%
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                  <p className="text-black  text-xl font-bold">Product 4</p>
                </div>
              </div>
              <div className="w-1/2 mx-3 relative">
                <Image
                  src="/images/big-banner-promo.svg"
                  alt=""
                  width={543}
                  height={282}
                  className="rounded-lg"
                ></Image>
                <div className="absolute top-0 left-0 text-left p-2">
                  <p className="text-red-500 w-max rounded-lg py-1 bg-opacity-25 px-2 font-bold text-xl bg-white">
                    -15%
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 text-left py-2 px-5 my-3 bg-opacity-50 rounded-r-xl bg-white">
                  <p className="text-black  text-xl font-bold">Product 5</p>
                </div>
              </div>
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
            <Link href='/'>
            <p className="bg-white text-black w-max px-4 py-2 rounded-md font-semibold mt-4 hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all">Source Now</p>
            </Link>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex h-1/2">
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 1</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 2</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 3</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
              <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 4</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
            </div>
            <div className="flex h-1/2">
            <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 5</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
            <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 6</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
            <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 7</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
                </div>
              </div>
            <div className="w-1/4 p-4 border">
                <p className="text-black uppercase">Categories 8</p>
                <div className="flex ">
                    <p>from Rp.1.000.000</p>
                    <Image src='/images/list-categories.svg' alt="categories1" width={60} height={60}></Image>
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
