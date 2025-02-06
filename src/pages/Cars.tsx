import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { ChangeEvent, FC, useState } from "react";
import { Link } from "react-router-dom";

const Cars: FC = () => {
  const [selectedAvailability, setSelectedAvailability] = useState<boolean | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [carsPerPage] = useState(8);

  const { data: allCars } = useGetAllCarsQuery([
    { name: "searchTerm", value: search },
    { name: "limit", value: carsPerPage },
    { name: "page", value: currentPage },
    { name: "inStock", value: selectedAvailability },
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability(availability === "inStock" ? true : false);
  };

  const clearFilters = () => {
    setSelectedAvailability(undefined);
    setSearch(undefined);
  };

  return (
    <div className="container py-12 mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-4">
          <h2 className="text-3xl font-bold text-primary">All Cars</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Input
              name="search"
              id="search"
              type="search"
              placeholder="Search by Brand, Model, Year..."
              value={search || ""}
              onChange={handleSearchChange}
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
            <Select onValueChange={handleAvailabilityChange} defaultValue={selectedAvailability ? "" : ""}>
              <SelectTrigger className="w-[150px] border-2 border-gray-300 rounded-lg">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="inStock">Available</SelectItem>
                  <SelectItem value="not_available">Not Available</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={clearFilters} className="rounded-lg px-4 py-2">
              Clear Filters
            </Button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCars?.data?.length !== 0 ? (
            allCars?.data?.map((car, index) => (
              <div className="bg-gray-100 shadow-md hover:shadow-lg transition-all rounded-lg p-4" key={index}>
                <div className="h-48 overflow-hidden rounded-lg">
                  <img
                    src={car?.image || "https://carhaat.com.bd/upload/car_images/1822494498936614.jpg"}
                    alt={car?.brand}
                    width={400}
                    height={400}
                    className="rounded-lg h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2 py-3 text-center">
                  <h3 className="text-xl font-semibold text-primary uppercase bg-gray-200 py-1 rounded-md">{car?.category}</h3>
                  <div className="grid grid-cols-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Brand:</span>
                      <span>{car?.brand}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-bold">Stock:</span>
                      <span>{car?.quantity}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Model:</span>
                      <span>{car?.model}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-bold">Price:</span>
                      <span>${car?.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  {car?.inStock ? (
                    <Badge variant="outline" className="bg-green-500 text-white px-3 py-1 rounded-md">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Not Available
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Link to={`/cars/${car?._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-10 col-span-4">
              <h3 className="text-xl font-medium text-gray-700">No Cars Available</h3>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination totalPages={allCars?.meta?.totalPage ?? 0} currentPage={currentPage ?? 1} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Cars;
