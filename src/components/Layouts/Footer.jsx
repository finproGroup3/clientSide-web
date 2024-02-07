import Link from "next/link";

function footer() {
  return (
    <>
      <div className="bg-white pt-24 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4 mb-12 text-black font-medium md:w-1/4">
              <h2 className="font-bold text-4xl text-black mb-5">Brand Logo</h2>
              <h3 className="font-bold text-2xl text-black mb-2">
                Hubungi Kami
              </h3>
              <p>test@mail.com</p>
              <p>stret no.11 washington</p>
              <p>NewYork</p>
            </div>
            <div className="w-full px-4 mb-12 md:w-1/4">
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
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 mb-12 md:w-1/4">
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
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 mb-12 md:w-1/4">
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
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="inline-block text-base hover:text-blue-500 mb-3"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full pt-10 border-t border-slate-500">
            
          </div>
        </div>
      </div>
    </>
  );
}

export default footer;
