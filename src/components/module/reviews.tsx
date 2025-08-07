import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Md. Arif Hossain (Dhaka)",
    rating: 5,
    comment:
      "Excellent service! The staff was very helpful and the car was in perfect condition. Highly recommended for anyone looking to buy a used car in Dhaka.",
    date: "May 12, 2024",
  },
  {
    id: 2,
    name: "Sadia Rahman (Chittagong)",
    rating: 4,
    comment:
      "Good selection of cars and fair prices. The paperwork was handled smoothly. Would have liked a bit more negotiation on price, but overall satisfied.",
    date: "April 28, 2024",
  },
  {
    id: 3,
    name: "Tanvir Ahmed (Sylhet)",
    rating: 5,
    comment: "Very professional team. They explained everything clearly and made the buying process easy. The car was exactly as described.",
    date: "March 19, 2024",
  },
  {
    id: 4,
    name: "Farzana Akter (Khulna)",
    rating: 3,
    comment: "The car was good, but delivery took a bit longer than expected. Customer support was responsive and resolved my queries.",
    date: "February 7, 2024",
  },
  {
    id: 5,
    name: "Imran Kabir (Rajshahi)",
    rating: 4,
    comment: "Nice experience overall. The test drive was arranged quickly and the staff was friendly. Would recommend to friends.",
    date: "January 25, 2024",
  },
  {
    id: 6,
    name: "Nusrat Jahan (Barisal)",
    rating: 2,
    comment: "The car was fine but I faced some issues with the initial paperwork. It was sorted out after a few calls, but could be improved.",
    date: "December 15, 2023",
  },
  {
    id: 7,
    name: "Shamim Reza (Dhaka)",
    rating: 5,
    comment: "Best car buying experience I've had! Transparent process and no hidden charges. Will come back for my next car.",
    date: "November 30, 2023",
  },
  {
    id: 8,
    name: "Rina Sultana (Comilla)",
    rating: 3,
    comment: "Decent selection, but the waiting area could be more comfortable. Staff was polite and helpful.",
    date: "October 10, 2023",
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
