import { CartItem } from "@/pages/DetailPage";
import { Restaurent } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurent: Restaurent;
  cartItems: CartItem[];
  deleteFromCart: (id: string) => void;
};

export default function OrderSummary({
  restaurent,
  cartItems,
  deleteFromCart,
}: Props) {
  const getTotalCost = () => {
    const totalPriceInPenny = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (totalPriceInPenny === 0) {
      return 0;
    }
    const totalWithDelivery = totalPriceInPenny + restaurent.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex place-items-center">
              <Trash
                size={20}
                className="text-red-600 cursor-pointer"
                onClick={() => deleteFromCart(item._id)}
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurent.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
