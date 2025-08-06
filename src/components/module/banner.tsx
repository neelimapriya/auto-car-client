import bannerImg from "@/assets/image/banner2.png";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Car, Shield, Clock, Star } from "lucide-react";

const Banner = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [floatAnimation, setFloatAnimation] = useState(false);

  useEffect(() => {
    // Staggered animations for better visual impact
    setTimeout(() => setFadeIn(true), 300);
    setTimeout(() => setSlideIn(true), 600);
    setTimeout(() => setFloatAnimation(true), 900);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-all duration-1000 ease-out"
        style={{ 
          backgroundImage: `url(${bannerImg})`,
          transform: fadeIn ? 'scale(1.05)' : 'scale(1)',
          opacity: fadeIn ? 0.4 : 0.2
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium transition-all duration-1000 ${
                fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Star size={16} className="text-yellow-400" />
              Trusted by 10,000+ Customers
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-1000 ${
                  fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Discover Your Perfect
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Dream Car
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-300 font-light">
                  At Unbeatable Prices
                </span>
              </h1>
            </div>

            {/* Description */}
            <p 
              className={`text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl transition-all duration-1000 delay-300 ${
                fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Experience the perfect blend of quality, affordability, and reliability. 
              Find your ideal vehicle from our extensive collection of pre-owned cars, 
              all thoroughly inspected and certified for your peace of mind.
            </p>

            {/* Features */}
            <div 
              className={`grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${
                slideIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Shield size={16} className="text-green-400" />
                <span className="text-sm">Certified Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={16} className="text-blue-400" />
                <span className="text-sm">Quick Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Car size={16} className="text-red-400" />
                <span className="text-sm">Wide Selection</span>
              </div>
            </div>

           
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                slideIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
                             <Link
                 to="/cars"
                 className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
               >
                 <span className="relative z-10 flex items-center justify-center gap-2">
                   Explore Cars
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
               </Link>
              
              <Link 
                to="/about"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative hidden lg:block">
            {/* Floating Car Icon */}
            <div 
              className={`relative transition-all duration-1000 delay-1000 ${
                floatAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Main Car Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car size={200} className="text-red-500/20" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-red-500/10 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-10 w-12 h-12 bg-blue-500/10 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 left-5 w-14 h-14 bg-green-500/10 rounded-full animate-bounce"></div>
                <div className="absolute bottom-10 right-5 w-10 h-10 bg-yellow-500/10 rounded-full animate-pulse"></div>
                
                {/* Price Tag */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-center">
                    <div className="text-2xl font-bold text-white">Starting at</div>
                    <div className="text-3xl font-bold text-red-400">$5,999</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
             
            <div 
              className={`absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-4 transition-all duration-1000 delay-1200 ${
                floatAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Cars Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${
          floatAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
