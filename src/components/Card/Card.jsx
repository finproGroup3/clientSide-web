import Image from "next/image";
import Link from "next/link";

function Card() {
  return (
    <div className="bg-white pt-4">
      <div className="bg-white mx-32 my-4 rounded border shadow-lg">
        <h1 className="ml-5 font-semibold text-lg text-black my-6">All Product</h1>
        <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 bg-white">
          <div className="p-4">
            <Link href="/">
              <Image
                src='/images/test-product.jpg'
                alt="Iphone 13 Pro"
                width={270}
                height={240}
                className="rounded-md"
              />
              <p className="text-black font-bold text-lg text-center">
                Rp.15.000,00
              </p>
              <p className="text-slate-500 text-center font-semibold">
                Iphone 13 Pro
              </p>
              <button className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2">
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </Link>
          </div>
          <div className="p-4">
            <Link href="/">
              <Image
                src='/images/test-product.jpg'
                alt="Iphone 13 Pro"
                width={270}
                height={240}
                className="rounded-md"
              />
              <p className="text-black font-bold text-lg text-center">
                Rp.15.000,00
              </p>
              <p className="text-slate-500 text-center font-semibold">
                Iphone 13 Pro
              </p>
              <button className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2">
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </Link>
          </div>
          <div className="p-4">
            <Link href="/">
              <Image
                src='/images/test-product.jpg'
                alt="Iphone 13 Pro"
                width={270}
                height={240}
                className="rounded-md"
              />
              <p className="text-black font-bold text-lg text-center">
                Rp.15.000,00
              </p>
              <p className="text-slate-500 text-center font-semibold">
                Iphone 13 Pro
              </p>
              <button className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2">
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </Link>
          </div>
          <div className="p-4">
            <Link href="/">
              <Image
                src='/images/test-product.jpg'
                alt="Iphone 13 Pro"
                width={270}
                height={240}
                className="rounded-md"
              />
              <p className="text-black font-bold text-lg text-center">
                Rp.15.000,00
              </p>
              <p className="text-slate-500 text-center font-semibold">
                Iphone 13 Pro
              </p>
              <button className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2">
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </Link>
          </div>
          <div className="p-4">
            <Link href="/">
              <Image
                src='/images/test-product.jpg'
                alt="Iphone 13 Pro"
                width={270}
                height={240}
                className="rounded-md"
              />
              <p className="text-black font-bold text-lg text-center">
                Rp.15.000,00
              </p>
              <p className="text-slate-500 text-center font-semibold">
                Iphone 13 Pro
              </p>
              <button className="flex items-center mx-auto bg-white mt-3 text-blue-500 border-2 rounded-md border-slate-400 px-4 py-2">
                <Image
                  src="/images/cart-blue.png"
                  alt="cart"
                  width={20}
                  height={50}
                  className="mr-2"
                />
                <span className=" font-semibold">Move to cart</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
