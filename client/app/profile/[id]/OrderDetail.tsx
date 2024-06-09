"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserDto } from "@/services/auth/dto";
import { GET_ORDERS_BY_USER_ID } from "@/services/orders/queries";
import { useQuery } from "@apollo/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
interface OrderDetailProps {
  user: UserDto;
}

function ColorStatus(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-blue-600";
    case "PAID":
      return "bg-green-600";
    case "CANCELLED":
      return "bg-red-600";
    case "SHIPPING":
      return "bg-yellow-600";
    case "COMPLETED":
      return "bg-purple-600";
    default:
      return "bg-gray-600";
  }
}

export const OrderDetail = ({ user }: OrderDetailProps) => {
  const { data, loading, error } = useQuery(GET_ORDERS_BY_USER_ID, {
    variables: { userID: user.id },
    fetchPolicy: "no-cache",
  });
  return (
    <Card className="">
      <CardContent className="px-auto flex flex-col space-y-4">
        <div className="w-full">
          <div className="grid grid-cols-4 gap-2 justify-center items-center text-center">
            <div className="text-lg font-bold">Order ID</div>
            <div className="text-lg font-bold">Total</div>
            <div className="text-lg font-bold">Payment medthod</div>
            <div className="text-lg font-bold">Status</div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <div className="">
            {data &&
            data.getOrdersByUserID &&
            data.getOrdersByUserID.length > 0 ? (
              data.getOrdersByUserID.map((order) => (
                <>
                  <AccordionItem value={order.OrderID} key={order.OrderID}>
                    <AccordionTrigger className=" group">
                      <div className="grid grid-cols-4 gap-2 justify-center items-center text-center w-full group-[data-state=open]:bg-gray-200 ">
                        <div className="overflow-hidden overflow-ellipsis w-full text-whitenowrap text-center">
                          {order.OrderID}
                        </div>
                        <div>{order.TotalPrice}</div>
                        <div>
                          <Badge
                            variant="default"
                            className={cn(
                              order.PaymentMethod === "COD"
                                ? "bg-green-300 hover:bg-green-400 rounded-full"
                                : "bg-blue-300 hover:bg-blue-400 rounded-full"
                            )}
                          >
                            {order.PaymentMethod}
                          </Badge>
                        </div>
                        <div>
                          <Badge
                            variant="default"
                            className={cn(
                              ColorStatus(order.Status),
                              "rounded-full"
                            )}
                          >
                            {order.Status}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead className="bg-light-brown">
                            <tr>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center">
                                Image
                              </th>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center">
                                Book Title
                              </th>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center ">
                                Quantity
                              </th>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center">
                                Unit item price
                              </th>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center">
                                Discount
                              </th>
                              <th className="py-3 px-4 uppercase font-semibold text-sm text-gray-700 text-center">
                                Total Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            {order.OrderItems.map((orderDetail) => (
                              <tr
                                className="border-t text-center"
                                data-order-id={orderDetail.BookID}
                                key={orderDetail.BookID}
                              >
                                <td className="py-3 px-4">
                                  <Image
                                    src={orderDetail.ImageURL}
                                    alt={orderDetail.BookID}
                                    width={300}
                                    height={300}
                                    className="w-28 object-contain rounded-lg"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  {orderDetail.BookTitle}
                                </td>
                                <td className="py-3 px-4">
                                  {orderDetail.ItemQuantity}
                                </td>

                                <td className="py-3 px-4">
                                  {orderDetail.UnitItemPrice}
                                </td>

                                <td className="py-3 px-4">
                                  {orderDetail.Discount || 0}
                                </td>
                                <td className="py-3 px-4">
                                  {orderDetail.TotalItemPrice}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </>
              ))
            ) : (
              <div className="text-lg">No orders</div>
            )}
          </div>
        </Accordion>
      </CardContent>
    </Card>
  );
};
