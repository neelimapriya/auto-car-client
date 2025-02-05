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
  // console.log(allCars?.data?.data);

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
      <div className="rounded-lg px-2.5 py-5 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-3.5">
          <h2 className="text-2xl font-semibold">All Cars</h2>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <div>
              <Input
                name="search"
                id="search"
                type="search"
                placeholder="Brand, Model,Year, etc"
                value={search || ""}
                onChange={handleSearchChange}
              />
            </div>
            <Select onValueChange={handleAvailabilityChange} defaultValue={selectedAvailability ? "" : ""}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="By Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="inStock">Available</SelectItem>
                  <SelectItem value="not_available">Not Available</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant={"outline"} onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        <hr className="py-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCars?.data?.data?.length !== 0 ? (
            allCars?.data?.data?.map((car, index) => (
              <div
                className="border hover:border-primary transition-all transform duration-500 ease-in-out rounded-xl px-2.5 py-3"
                key={index}
              >
                <div className="h-48 overflow-hidden rounded-md">
                  <img
                    src={car?.image || "https://carhaat.com.bd/upload/car_images/1822494498936614.jpg"}
                    alt={car?.brand}
                    width={400}
                    height={400}
                    className="rounded-md h-full md:h-48 hover:scale-105 transform transition-all duration-300 animate-in ease-in-out w-full object-cover"
                  />
                </div>
                <div className="space-y-1 py-2.5 text-center ">
                  <h3 className="text-lg font-semibold uppercase  bg-slate-100">{car?.category}</h3>
                 
                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">Brand :</span>
                      <span className="text-sm">{car?.brand}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-bold">Quantity :</span>
                      <span className="text-sm">{car?.quantity}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">Model :</span>
                      <span className="text-sm">{car?.model}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-bold">Price :</span>
                      <span className="text-sm">${car?.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {car?.inStock ? (
                    <Badge variant="outline" className="bg-green-200">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="whitespace-nowrap bg-red-200">
                      Not Available
                    </Badge>
                  )}
                  <Button variant={"outline"} size={"sm"} asChild>
                    <Link to={`/cars/${car?._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-10 col-span-4">
              <h3 className="text-xl font-medium">No Cars Available</h3>
            </div>
          )}
        </div>
        <Pagination
          totalPages={allCars?.meta?.totalPage ?? 0}
          currentPage={currentPage ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Cars;
