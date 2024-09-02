import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurentOrder } from "@/api/MyRestaurentApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

export default function OrderItemCard({ order }: Props) {
  const { updateRestaurentStatus, isLoading } = useUpdateMyRestaurentOrder();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status);

  console.log(order.status);
  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurentStatus({ orderId: order._id, status: newStatus });
    setOrderStatus(newStatus);
  };

  const getTime = () => {
    const created = new Date(order.createdAt);
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddeddMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddeddMinutes}`;
  };
  useEffect(() => {
    setOrderStatus(order.status);
  }, [order.status]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of the order</Label>
          <Select
            value={orderStatus}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((o) => (
                <SelectItem value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
