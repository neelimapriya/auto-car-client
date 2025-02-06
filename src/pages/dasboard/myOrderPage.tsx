import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Loader2, ShoppingBag } from "lucide-react";
import { useFetchCustomerOrdersQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/orderType";
import { useAppSelector } from "@/redux/hook";

const MyOrderPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const email = user?.email;

  const { data: orderData, isLoading } = useFetchCustomerOrdersQuery({ email });
  console.log(orderData);
  const orders: TOrder[] = orderData?.data || [];
  console.log(orders);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-center font-semibold  text-2xl">My Orders</h2>
      <Accordion type="single" collapsible className="w-full">
        {orders?.map((order, index) => (
          <AccordionItem value={`item-${index}`} key={order?._id}>
            <AccordionTrigger>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">
                    Order #{order._id.slice(-6)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium">
                    {order.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(order?.orderPayment)}>
                    {order?.orderPayment}
                  </Badge>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Order Details
                  </h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {order?.orderPayment}
                  </p>
                </div>
               
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Products</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody></TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                <p className="text-gray-500 text-sm">
                  No transaction details available
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default MyOrderPage;
