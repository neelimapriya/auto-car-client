/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  useGetSingleCarQuery,
  useUpdateCarsMutation,
} from "@/redux/features/cars/carApi";
import Loading from "./loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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

const UpdateCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateImg, setUpdateImg] = useState<string | null>(null);

  const [updateCar, { isSuccess, isError, error }] = useUpdateCarsMutation();
  const { data: car, isLoading } = useGetSingleCarQuery(id as string);

  // default values
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

  useEffect(() => {
    if (car?.result) {
      form.reset({
        brand: car?.result?.brand,
        model: car?.result?.model,
        year: car?.result?.year.toString(),
        price: car?.result?.price.toString(),
        category: car?.result?.category,
        description: car?.result?.description,
        quantity: car?.result?.quantity.toString(),
      });
      setUpdateImg(car.result.image); 
    }
  }, [car, form]);

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as any)?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
    if (isSuccess) {
      toast.success("Car updated successfully!");
      navigate("/cars");
    }
  }, [isError, isSuccess, error, navigate]);

  const onSubmit = async (data: CarValues) => {
    const updatingToast = toast.loading("Updating car...");

    const carData = {
      brand: data.brand,
      model: data.model,
      year: Number(data.year),
      price: Number(data.price),
      category: data.category,
      description: data.description,
      quantity: Number(data.quantity),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(carData));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    } else {
      console.log("No new image selected, keeping old one.");
    }

    try {
      await updateCar({ id, data: formData });
      console.log(updateCar);
      toast.dismiss(updatingToast);
      toast.success("Car updated successfully!");
    } catch (err) {
      console.error("Update Error:", err);
      toast.dismiss(updatingToast);
      toast.error("Failed to update car.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Form {...form}>
      <h2 className="font-semibold text-2xl text-center">Update Car</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Brand */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="brand">Brand</FormLabel>
              <FormControl>
                <Input id="brand" {...field} required />
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
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                    if (file) {
                      setUpdateImg(URL.createObjectURL(file));
                    }
                  }}
                />
              </FormControl>
              {updateImg && (
                <img
                  src={updateImg}
                  alt="Preview"
                  className="mt-2 w-40 h-auto"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Model */}
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="model">Model</FormLabel>
              <FormControl>
                <Input id="model" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="price">Price</FormLabel>
              <FormControl>
                <Input id="price" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="year">Year</FormLabel>
              <FormControl>
                <Input id="year" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category">Category</FormLabel>
              <FormControl>
                <Input id="category" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <FormControl>
                <Input id="quantity" type="number" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea id="description" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Car</Button>
      </form>
    </Form>
  );
};

export default UpdateCarForm;
