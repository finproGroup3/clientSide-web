import Link from "next/link";
import Image from "next/image";

function footer() {
  return (
    <>
      <div className="bg-white pt-24 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="box1 w-full px-4 mb-12 text-black font-medium md:w-1/4">
              <div className="flex items-center mb-5">
              <Image src='/images/logo-symbol.png' alt="brand" width={50} height={50} />
              <span className="font-bold text-4xl text-blue-500 ml-3">Brand </span>
              </div>
              <p>
                Best information about the company gies here but now lorem ipsum
                is
              </p>
              <div className="flex items-center mt-4">
                <Link href=''>
                  <Image src='/images/facebook3.png' alt="facebook" width={30} height={30} className="" />
                </Link>
                <Link href=''>
                  <Image src='/images/instagram3.png' alt="instagram" width={30} height={30} className="ml-2" />
                </Link>
                <Link href=''>
                  <Image src='/images/linkedin3.png' alt="linkedin" width={30} height={30} className="ml-2" />
                </Link>
                <Link href=''>
                  <Image src='/images/twitter3.png' alt="twiter" width={30} height={30} className="ml-2" />
                </Link>
                <Link href=''>
                  <Image src='/images/youtube3.png' alt="youtube" width={30} height={30} className="ml-2" />
                </Link>
              </div>
            </div>           
            <div style={{ width: '15%' }} className="w-full px-4 mb-12 ">
              <h3 className="font-semibold text-xl text-black mb-5 mt-3">
                About
              </h3>
              <ul className="text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Find store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ width: '15%' }} className="w-full px-4 mb-12 ">
              <h3 className="font-semibold text-xl text-black mb-5 mt-3">
                Partnership
              </h3>
              <ul className="text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Find Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ width: '15%' }} className="w-full px-4 mb-12 ">
              <h3 className="font-semibold text-xl text-black mb-5 mt-3">
                Information
              </h3>
              <ul className="text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Money Refund
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ width: '15%' }} className="w-full px-4 mb-12 ">
              <h3 className="font-semibold text-xl text-black mb-5 mt-3">
                For users
              </h3>
              <ul className="text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    Setting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
            <div style={{ width: '15%' }} className="w-full px-4 mb-12 ">
              <h3 className="font-semibold text-xl text-black mb-5 mt-3">
                Get App
              </h3>
              <ul className="text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    <Image src='/images/appstore.png' alt="" width={124} height={42} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    <Image src='/images/playstore.png' alt="" width={124} height={42} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full pt-10 border-t border-slate-500"></div>
        </div>
      </div>
    </>
  );
}

export default footer;
