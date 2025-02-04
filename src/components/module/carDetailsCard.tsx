import { useAppDispatch } from "@/redux/hook";
import { TCar } from "@/types/carType";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
  


interface CardCardProps {
    car: TCar;
  }
  
  const CardCard = ({ car }: CardCardProps) => {
    const dispatch = useAppDispatch();
    // const handleAddToCart = () => {
      dispatch(
        addToCart({
          product: car._id,
          brand: car.brand,
          price: car.price,
          quantity: 1,
          stock: car.quantity,
          coverImage: car.image,
        })
      );
    // };
  
    return (
      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={car?.image || "/placeholder.svg"}
              alt={car?.model}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                    {car.model}
                  </CardTitle>
                  <p className="md:text-lg lg:text-xl mb-2 text-muted-foreground font-bold">
                    by {car.brand}
                  </p>
                  <Badge
                    variant={car.inStock ? "default" : "destructive"}
                    className="text-xs md:text-sm"
                  >
                    {car.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{car.description}</p>
              <p className="md:text-lg lg:text-xl mb-2 text-muted-foreground font-bold">
                Published: {new Date(car.year).toLocaleDateString()}
              </p>
              <p className="text-2xl font-bold mb-4">
                ৳ {car.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              {/* <Button
                onClick={() => handleAddToCart()}
                disabled={!car.inStock}
                className="w-full md:w-auto"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button> */}
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  };
  
  export default CardCard;