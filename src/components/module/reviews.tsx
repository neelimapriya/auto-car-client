import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment:
      "Amazing service! The cars are top quality, and the process was smooth.",
    date: "January 15, 2025",
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4,
    comment:
      "Great selection of cars. Customer service could be a bit faster, though!",
    date: "February 2, 2025",
  },
  {
    id: 3,
    name: "Michael Lee",
    rating: 5,
    comment: "Excellent experience! The car I bought was exactly as described.",
    date: "March 10, 2025",
  },
  {
    id: 4,
    name: "Emily Johnson",
    rating: 3,
    comment: "Decent cars, but I faced some delays in processing my order.",
    date: "April 5, 2025",
  },
  {
    id: 5,
    name: " John smith",
    rating: 4,
    comment: "Decent cars, but I faced some delays in processing my order.",
    date: "April 5, 2025",
  },
  {
    id: 6,
    name: "Charley smith",
    rating: 3,
    comment: "Decent cars, but I faced some delays in processing my order.",
    date: "April 5, 2025",
  },
];

export default function ReviewsPage() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="shadow-md border rounded-lg p-4">
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
