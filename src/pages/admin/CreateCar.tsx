import Breadcrumb from "@/components/module/breadcrum";
import CreateCarForm from "@/components/module/createCarForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const CreateCar = () => {
  return (
    <div className="container mx-auto py-10">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-1.5">
        <h2 className="text-xl font-semibold sm:text-2xl">Create Car</h2>
        <Button asChild>
          <Link to={"/dashboard/cars"}>Manage Cars</Link>
        </Button>
      </div>
      <CreateCarForm />
    </div>
  );
};

export default CreateCar;
