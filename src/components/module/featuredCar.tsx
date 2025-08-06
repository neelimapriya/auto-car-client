
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/module/loading";
import { toast } from "sonner";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Car, Star, MapPin, Calendar, ArrowRight, Eye } from "lucide-react";

export function FeaturedCars() {
  const { data: cars, isLoading, isError } = useGetAllCarsQuery(undefined);
  const [visibleCars, setVisibleCars] = useState(6);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300);
  }, []);

  if (isError) {
    toast.error("Failed to load cars");
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  const featuredCars = cars?.data?.slice(0, visibleCars) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-full text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <Car size={16} />
            Featured Collection
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our
            <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Premium Cars
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our handpicked selection of high-quality vehicles, each carefully inspected and certified for your peace of mind.
          </p>
        </motion.div>

        {/* Cars Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={fadeIn ? "visible" : "hidden"}
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car?._id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
                             <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-black/40">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={car?.image}
                      alt={car?.model}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay Info */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs font-medium text-gray-700">Featured</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/cars/${car?._id}`}>
                        <Button className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white transition-all duration-300">
                          <Eye size={16} className="mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                          {car?.model}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{car.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          ${car.price?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Starting Price</p>
                      </div>
                    </div>

                    {/* Car Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={14} />
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar size={14} />
                        <span>2024 Model</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to={`/cars/${car?._id}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 group">
                        <span>View Details</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

                 {/* Load More Button */}
         {(cars?.data?.length || 0) > visibleCars && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: fadeIn ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={() => setVisibleCars(prev => prev + 6)}
              variant="outline"
              className="px-8 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Load More Cars
            </Button>
          </motion.div>
        )}

        {/* Explore All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 20 }}
          transition={{ delay: 1 }}
        >
          <Link to="/cars">
            <Button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Car size={20} className="mr-2" />
              Explore All Cars
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
