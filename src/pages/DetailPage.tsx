import { userCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurent } from "@/api/RestaurentApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurentInfo from "@/components/RestaurentInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { userFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailPage() {
  const { restaurentId } = useParams();
  const { result: restaurent, isLoading } = useGetRestaurent(restaurentId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    userCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const getRestaurentData = sessionStorage.getItem(
      `cart-item-${restaurentId}`
    );
    return getRestaurentData ? JSON.parse(getRestaurentData) : [];
  });

  const onCheckOut = async (userFormData: userFormData) => {
    console.log(userFormData);

    if (!restaurent) {
      return;
    }
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurentId: restaurent._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurent) {
    return "Loading...";
  }

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (prevItem) => prevItem._id === menuItem._id
      );
      let updatedItems;
      if (existingItem) {
        updatedItems = prevCartItems.map((prevItem) =>
          prevItem._id === menuItem._id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        );
      } else {
        updatedItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cart-item-${restaurentId}`,
        JSON.stringify(updatedItems)
      );
      return updatedItems;
    });
  };

  const deleteFromCart = (id: string) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item._id === id);
      let updatedItems;
      if (!existingItem) {
        return prevCartItems;
      }
      if (existingItem?.quantity > 1) {
        updatedItems = prevCartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedItems = prevCartItems.filter((item) => item._id !== id);
      }
      sessionStorage.setItem(
        `cart-item-${restaurentId}`,
        JSON.stringify(updatedItems)
      );
      return updatedItems;
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurent.imageUrl}
          alt="Restaurent Image"
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div id="menu-item" className="flex flex-col gap-4">
          <RestaurentInfo restaurent={restaurent} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurent.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurent={restaurent}
              cartItems={cartItems}
              deleteFromCart={deleteFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
