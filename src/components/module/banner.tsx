import bannerImg from "@/assets/image/banner2.png";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Banner = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
      style={{ backgroundImage: `url(${bannerImg})`, opacity: fadeIn ? 1 : 0 }}
    >
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
      <div className="relative text-center px-6 sm:px-12 lg:px-20 max-w-3xl">
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-white transition-transform duration-1000 transform"
          style={{ transform: fadeIn ? "translateY(0)" : "translateY(-20px)" }}
        >
          IT'S TIME TO
          <span className="block font-serif text-rose-600"> Accelerate</span>
          <strong className="block text-4xl sm:text-5xl text-white">Your Dreams</strong>
        </h1>

        <p
          className="mt-4 text-lg text-gray-300 transition-opacity duration-1000"
          style={{ opacity: fadeIn ? 1 : 0 }}
        >
          Where your dreams meet affordability. If you are looking for a used, cost-effective, enchanting car, 
          <span className="inline-block px-2 bg-gray-800 text-rose-600 font-serif rounded-md">AUTO CAR</span> is here for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 transition-opacity duration-1000"
          style={{ opacity: fadeIn ? 1 : 0 }}
        >
          <Link
            to="/cars"
            className="px-8 py-3 rounded-lg bg-rose-600 text-white font-medium shadow-lg hover:bg-rose-700 transition"
          >
            Explore
          </Link>
          <Link to='/about'
            className="px-8 py-3 rounded-lg bg-white text-rose-600 font-medium shadow-lg hover:bg-gray-100 transition"
          >
            About Auto Car
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
