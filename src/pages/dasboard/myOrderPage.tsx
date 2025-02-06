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
  
  const { data: orderData, isLoading } = useFetchCustomerOrdersQuery(email);
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
                {/* {order.transaction && (
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Payment Information
                          </h3>
                          <p>
                            <strong>Transaction ID:</strong>{" "}
                            {order.transaction.id}
                          </p>
                          <p>
                            <strong>Method:</strong> {order.transaction.method}
                          </p>
                          <p>
                            <strong>Date:</strong> {order.transaction.date_time}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {order.transaction.bank_status}
                          </p>
                        </div>
                      )} */}
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
                  <TableBody>
                    {/* {order.products.map((item, productIndex) => (
                            <TableRow key={productIndex}>
                              <TableCell className="font-medium">
                                {item.product ? (
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={
                                        item.product.coverImage ||
                                        "/placeholder.svg"
                                      }
                                      alt={item.product.title}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                    {item.product.title}
                                  </div>
                                ) : (
                                  "Product Unavailable"
                                )}
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                $
                                {item.product
                                  ? (item.product.price * item.quantity).toFixed(
                                      2
                                    )
                                  : "N/A"}
                              </TableCell>
                            </TableRow>
                          ))} */}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                {/* {order.transaction ? (
                        <Link
                          to={`/order/verify?order_id=${order.transaction.id}`}
                        >
                          <Button variant="outline" size="sm">
                            View Full Details
                          </Button>
                        </Link>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No transaction details available
                        </p>
                      )} */}
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
