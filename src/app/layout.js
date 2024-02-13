import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
import "./globals.css";

export const metadata = {
  title: "ecommerce",
  description: "clothes, mobile, headphone, electronic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
