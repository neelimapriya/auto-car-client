import logo from "@/assets/image/logo-dark.png";
import { Link } from "react-router-dom";
import { LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-24" />
          </Link>
          <p className="mt-4 text-gray-300">
            <strong className="font-serif text-rose-700 ">AUTO CAR </strong> is
            engaged in car selling, displaying and purchasing market in
            Bangladesh. Today the company has grown into a leading provider of
            quality services in Bangladesh Car Market.
          </p>
          <div className="mt-5 flex space-x-4">
            <div className="border border-gray-700 rounded-full p-2">
              <LucideFacebook size={18} />
            </div>
            <div className="border border-gray-700 rounded-full p-2">
              <LucideTwitter size={18} />
            </div>
            <div className="border border-gray-700 rounded-full p-2">
              <LucideInstagram size={18} />
            </div>
          </div>
        </div>
        <div></div>
        <div>
          <h3 className="font-semibold">PRODUCTS</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to={"/bikes"} className="text-gray-400 hover:text-white">
                All Cars
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">IMPORTANT LINKS</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to={"/"} className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/#"} className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to={"/contact-us"}
                className="text-gray-400 hover:text-white"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link to={"/#"} className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="border-t border-slate-800 text-center text-gray-200 mt-5 pt-6">
          <h2>Auto Car</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
