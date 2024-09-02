import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatusPage() {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return "Loading...";
  }
  if (!orders || orders.length === 0) {
    return "No orders found";
  }
  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurent.imageUrl}
                alt="Restaurent Image"
                className="object-cover h-full w-full rounded-md"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
