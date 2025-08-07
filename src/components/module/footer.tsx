import logo from "@/assets/image/logo-dark.png";
import { Link } from "react-router-dom";
import { LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-900 dark:text-white py-14 border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo & Mission */}
          <div className="space-y-6">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-24" />
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              <strong className="font-serif text-rose-700">AUTO CAR</strong> is engaged in car selling, displaying, and purchasing in the Bangladesh market. Today, the company has grown into a leading provider of quality services in the Bangladesh Car Market.
            </p>
            <div className="bg-gray-100 dark:bg-black rounded-lg p-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Mission:</span> To deliver affordable, high-quality cars and outstanding customer service, making car ownership accessible to everyone.
            </div>
          </div>
          {/* Address & Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-rose-700">SHOWROOM</h3>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Plot 15, Road 7, Block C,<br />Banasree, Rampura,<br />Dhaka 1219, Bangladesh
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Business Hours:</span>
              <ul className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                <li>Mon - Fri: 9:00 AM - 7:00 PM</li>
                <li>Saturday: 10:00 AM - 5:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Contact:</span>
              <div className="text-gray-500 dark:text-gray-400 text-xs">+44 20 3519 2700</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">contact@autocar.com</div>
            </div>
          </div>
          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-rose-700">IMPORTANT LINKS</h3>
            <ul className="space-y-2">
              {[
                { to: "/", text: "Home" },
                { to: "/cars", text: "All Cars" },
                { to: "/about", text: "About Us" },
                { to: "/contact", text: "Contact Us" },
                { to: "/#", text: "Terms of Service" },
                { to: "/#", text: "Privacy Policy" },
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="text-gray-500 dark:text-gray-400 hover:text-rose-700 dark:hover:text-rose-400 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-rose-700 mb-2">NEWSLETTER</h3>
              <form className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Your email address" className="px-3 py-2 rounded-md bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-600 text-sm" />
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition">Subscribe</button>
              </form>
              <div className="text-xs text-gray-400 mt-1">Get updates on new arrivals and special offers.</div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-rose-700 mb-2">FOLLOW US</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 transition"><LucideFacebook size={22} /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 transition"><LucideTwitter size={22} /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 transition"><LucideInstagram size={22} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-900 pt-8 text-center bg-gray-50 dark:bg-black">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} <strong className="font-serif text-rose-700">AUTO CAR</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
