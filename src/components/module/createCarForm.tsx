import { useEffect } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useCreateCarMutation } from "@/redux/features/cars/carApi";

type CarValues = {
  brand: string;
  image: File | null;
  model: string;
  year: number | string;
  price: number | string;
  category: string;
  description: string;
  quantity: number | string;
};

const CreateCarForm = () => {
  const form = useForm<CarValues>({
    defaultValues: {
      brand: "",
      image: null,
      model: "",
      year: "",
      price: "",
      category: "",
      description: "",
      quantity: "",
    },
  });

  const [createCar, { isSuccess, isError, error }] = useCreateCarMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Car Successfully Added");
      form.reset();
    }
  }, [isError, isSuccess, error, form]);
  console.log(error);

  const onSubmit = async (data: CarValues) => {
    const creatingToast = toast.loading("Uploading car...");

    const carData = {
      brand: (data.brand),
      model: (data.model),
      year: Number(data.year),
      price: Number(data.price),
      category: (data.category),
      description: data.description,
      quantity: Number(data.quantity),
    };

    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("data", JSON.stringify(carData));
console.log(formData);
    try {
      await createCar(formData);
      toast.success("Car Added successfully!");
      form.reset()
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Failed to upload car.");
      toast.dismiss(creatingToast);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="brand">Brand Name</FormLabel>
                <FormControl>
                  <Input id="brand" placeholder="Enter Brand name" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="image">Image</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="model">Model</FormLabel>
                <FormControl>
                  <Input id="model" type="text" placeholder="Enter car model" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormControl>
                  <Input id="price" type="number" placeholder="Enter car price" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="year">Year</FormLabel>
                <FormControl>
                  <Input id="year" type="number" placeholder="Enter year" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="category">Category</FormLabel>
                <FormControl>
                  <Input id="category" type="text" placeholder="Enter category" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <FormControl>
                  <Input id="quantity" type="number" placeholder="Enter quantity" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea id="description" placeholder="Enter car description" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <div className="col-span-2 py-5">
          <Button type="submit">Create Car</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCarForm;
