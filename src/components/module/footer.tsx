import logo from "@/assets/image/logo-dark.png";
import { Link } from "react-router-dom";
import { LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
   
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
      
        <div className="space-y-6">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-24" />
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="font-serif text-rose-700">AUTO CAR</strong> is engaged in car selling, displaying, and purchasing in the Bangladesh market. Today, the company has grown into a leading provider of quality services in the Bangladesh Car Market.
          </p>
        </div>
  
      
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-rose-700">PRODUCTS</h3>
          <ul className="space-y-2">
            <li>
              <Link to={"/cars"} className="text-gray-400 hover:text-white transition-colors">
                All Cars
              </Link>
            </li>
          </ul>
        </div>
  
 
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-rose-700">IMPORTANT LINKS</h3>
          <ul className="space-y-2">
            {[
              { to: "/", text: "Home" },
              { to: "/#", text: "Terms of Service" },
              { to: "/contact-us", text: "Contact Us" },
              { to: "/#", text: "Privacy Policy" },
            ].map((link, index) => (
              <li key={index}>
                <Link to={link.to} className="text-gray-400 hover:text-white transition-colors">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-rose-700">FOLLOW US</h3>
          <div className="flex space-x-4">
            {[LucideFacebook, LucideTwitter, LucideInstagram].map((Icon, index) => (
              <Link
                key={index}
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
  
      <div className="border-t border-gray-700 pt-8 text-center">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} <strong className="font-serif text-rose-700">AUTO CAR</strong>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
