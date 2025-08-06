import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Car, Star, MapPin, Calendar, ArrowRight, Eye, Grid3X3, List } from "lucide-react";

const Cars: FC = () => {
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [carsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fadeIn, setFadeIn] = useState(false);

  const { data: allCars, isLoading } = useGetAllCarsQuery([
    { name: "searchTerm", value: search },
    { name: "limit", value: carsPerPage },
    { name: "page", value: currentPage },
    { name: "inStock", value: selectedAvailability },
  ]);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability(availability === "true" ? true : false);
  };

  const clearFilters = () => {
    setSelectedAvailability(undefined);
    setSearch(undefined);
  };

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

  const hasActiveFilters = search || selectedAvailability !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-full text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Car size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Car Collection</span>
            <span className="sm:hidden">Cars</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Explore Our
            <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Car Collection
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Discover our extensive collection of high-quality vehicles, from luxury sedans to reliable family cars.
          </p>
        </motion.div>

                 {/* Filters Section */}
         <motion.div 
           className="bg-white dark:bg-black/40 rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200 dark:border-gray-800"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 20 }}
           transition={{ duration: 0.6, delay: 0.2 }}
         >
           <div className="flex flex-col gap-4">
             {/* Filter Header */}
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Filter size={18} className="sm:w-5 sm:h-5 text-red-600" />
                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
               </div>
               
               {/* View Mode Toggle - Mobile */}
               <div className="flex items-center gap-1 bg-gray-100 dark:bg-black/60 rounded-lg p-1 sm:hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-7 w-7 p-0"
                >
                  <Grid3X3 size={14} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-7 w-7 p-0"
                >
                  <List size={14} />
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="relative sm:col-span-1 lg:col-span-2">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  name="search"
                  id="search"
                  type="search"
                  placeholder="Search cars..."
                  value={search || ""}
                  onChange={handleSearchChange}
                  className="pl-10 h-10 sm:h-11 border-2 border-gray-200 focus:border-red-500 transition-colors duration-300"
                />
              </div>

              {/* Availability Filter */}
              <div className="sm:col-span-1">
                <Select onValueChange={handleAvailabilityChange} value={selectedAvailability?.toString() || ""}>
                  <SelectTrigger className="h-10 sm:h-11 border-2 border-gray-200 focus:border-red-500 transition-colors duration-300">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

                             {/* View Mode Toggle - Desktop */}
               <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-black/60 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="flex justify-center sm:justify-start">
                                 <Button 
                   variant="outline" 
                   onClick={clearFilters}
                   className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-black/40 dark:border-red-400 dark:text-red-400"
                 >
                  <X size={16} className="mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                                 {search && (
                   <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-black/60 dark:text-blue-300 dark:border-blue-500/30 text-xs">
                     Search: {search}
                   </Badge>
                 )}
                 {selectedAvailability !== undefined && (
                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-black/60 dark:text-green-300 dark:border-green-500/30 text-xs">
                     {selectedAvailability ? 'Available' : 'Not Available'}
                   </Badge>
                 )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeIn ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Showing {allCars?.data?.length || 0} of {allCars?.meta?.total || 0} cars
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {allCars?.meta?.totalPage || 1}
          </p>
        </motion.div>

        {/* Cars Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              className="flex justify-center items-center py-12 sm:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-red-600 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Loading cars...</p>
              </div>
            </motion.div>
          ) : allCars?.data?.length === 0 ? (
            <motion.div 
              className="text-center py-12 sm:py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Car size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Cars Found</h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 px-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-3 sm:space-y-4"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${viewMode}-${currentPage}`}
            >
              {allCars?.data?.map((car) => (
                <motion.div
                  key={car?._id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                                     className={viewMode === 'list' 
                     ? "bg-white dark:bg-black/40 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border border-gray-200 dark:border-gray-800"
                     : "bg-white dark:bg-black/40 rounded-xl shadow-lg overflow-hidden group border border-gray-200 dark:border-gray-800"
                   }
                >
                  {/* Image Section */}
                  <div className={viewMode === 'list' 
                    ? "w-full sm:w-48 h-32 sm:h-32 flex-shrink-0"
                    : "relative overflow-hidden"
                  }>
                    <img
                      src={car?.image || "https://carhaat.com.bd/upload/car_images/1822494498936614.jpg"}
                      alt={car?.brand}
                      className={`rounded-lg object-cover transition-transform duration-500 ${
                        viewMode === 'list' 
                          ? "w-full h-full"
                          : "w-full h-40 sm:h-48 group-hover:scale-110"
                      }`}
                    />
                    {viewMode === 'grid' && (
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-0 text-xs">
                          <Star size={10} className="text-yellow-500 fill-current mr-1" />
                          <span className="hidden sm:inline">Featured</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className={viewMode === 'list' 
                    ? "flex-1 space-y-2 sm:space-y-3"
                    : "p-4 sm:p-6 space-y-3 sm:space-y-4"
                  }>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                          {car?.model}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{car?.brand}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                          ${car?.price?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Starting Price</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className={viewMode === 'list' 
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"
                      : "space-y-2"
                    }>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="truncate">Category: {car?.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>Stock: {car?.quantity}</span>
                      </div>
                    </div>

                    {/* Status and Action */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-2">
                                             <Badge 
                         variant={car?.inStock ? "default" : "destructive"}
                         className={`text-xs ${
                           car?.inStock 
                             ? "bg-green-100 text-green-800 dark:bg-black/60 dark:text-green-300 dark:border-green-500/30"
                             : "bg-red-100 text-red-800 dark:bg-black/60 dark:text-red-300 dark:border-red-500/30"
                         }`}
                       >
                        {car?.inStock ? 'Available' : 'Not Available'}
                      </Badge>
                      
                      <Link to={`/cars/${car?._id}`} className="w-full sm:w-auto">
                        <Button 
                          size="sm"
                          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 group text-xs sm:text-sm"
                        >
                          <Eye size={14} className="mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">Details</span>
                          <ArrowRight size={14} className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {(allCars?.meta?.totalPage || 0) > 1 && (
          <motion.div 
            className="mt-6 sm:mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 20 }}
            transition={{ delay: 0.8 }}
          >
            <Pagination 
              totalPages={allCars?.meta?.totalPage ?? 0} 
              currentPage={currentPage ?? 1} 
              onPageChange={handlePageChange} 
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cars;
