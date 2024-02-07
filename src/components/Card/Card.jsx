import Image from "next/image";

function Card() {
  return (
    <div className="bg-white pt-4">
      <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4 bg-white">
        <div className="mx-auto p-4">
          <Image
            src={
              "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1_1.jpg"
            }
            alt="Iphone 13 Pro"
            width={270}
            height={240}
          />
          <p className="text-black">Rp.15.000,00</p>
          <p className="text-black">Iphone 13 Pro</p>
          <button className="flex items-center mt-3 bg-white text-blue-500 border-2 rounded border-slate-400 px-4 py-2">
            <Image
              src="https://im7.ezgif.com/tmp/ezgif-7-b99d7f7d83.png"
              alt="cart"
              width={20}
              height={50}
              className="mr-2"
            />
            <span>Move to cart</span>
          </button>
        </div>
        <div className="mx-auto p-4">
          <Image
            src={
              "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1_1.jpg"
            }
            alt="Iphone 13 Pro"
            width={270}
            height={240}
          />
          <p className="text-black">Rp.15.000,00</p>
          <p className="text-black">Iphone 13 Pro</p>
          <button className="flex items-center mt-3 bg-white text-blue-500 border-2 rounded border-slate-400 px-4 py-2">
            <Image
              src="https://im7.ezgif.com/tmp/ezgif-7-b99d7f7d83.png"
              alt="cart"
              width={20}
              height={50}
              className="mr-2"
            />
            <span>Move to cart</span>
          </button>
        </div>
        <div className="mx-auto p-4">
          <Image
            src="https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1_1.jpg"
            alt="Iphone 13 Pro"
            width={270}
            height={240}
          />
          <p className="text-black">Rp.15.000,00</p>
          <p className="text-black">Iphone 13 Pro</p>
          <button className="flex items-center bg-white mt-3 text-blue-500 border-2 rounded border-slate-400 px-4 py-2">
            <Image
              src="https://im7.ezgif.com/tmp/ezgif-7-b99d7f7d83.png"
              alt="cart"
              width={20}
              height={50}
              className="mr-2"
            />
            <span>Move to cart</span>
          </button>
        </div>
        <div className="mx-auto p-4">
          <Image
            src={
              "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1_1.jpg"
            }
            alt="Iphone 13 Pro"
            width={270}
            height={240}
          />
          <p className="text-black">Rp.15.000,00</p>
          <p className="text-black">Iphone 13 Pro</p>
          <button className="flex items-center bg-white mt-3 text-blue-500 border-2 rounded border-slate-400 px-4 py-2">
            <Image
              src="https://im7.ezgif.com/tmp/ezgif-7-b99d7f7d83.png"
              alt="cart"
              width={20}
              height={50}
              className="mr-2"
            />
            <span>Move to cart</span>
          </button>
        </div>
        <div className="mx-auto p-4">
          <Image
            src={
              "https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1_1.jpg"
            }
            alt="Iphone 13 Pro"
            width={270}
            height={240}
          />
          <p className="text-black">Rp.15.000,00</p>
          <p className="text-black">Iphone 13 Pro</p>
          <button className="flex items-center mt-3 bg-white text-blue-500 border-2 rounded border-slate-400 px-4 py-2">
            <Image
              src="https://im7.ezgif.com/tmp/ezgif-7-b99d7f7d83.png"
              alt="cart"
              width={20}
              height={50}
              className="mr-2"
            />
            <span>Move to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
