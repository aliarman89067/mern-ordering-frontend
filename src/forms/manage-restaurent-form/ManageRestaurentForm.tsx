import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurent } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurentName: z.string({
      required_error: "Restaurent name is required",
    }),
    city: z.string({
      required_error: "city name is required",
    }),
    country: z.string({
      required_error: "country name is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery Price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "please select atleast one item" }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        price: z.coerce.number().min(1, { message: "Price is required" }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be included",
    path: ["imageFile"],
  });

type RestaurentFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurentFormData: FormData) => void;
  isLoading: boolean;
  restaurent?: Restaurent;
};

export default function ManageRestaurentForm({
  onSave,
  isLoading,
  restaurent,
}: Props) {
  const form = useForm<RestaurentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (!restaurent) {
      return;
    }
    const deliveryPriceFormatted = parseInt(
      (restaurent.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurent.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const updatedRestaurent = {
      ...restaurent,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
    form.reset(updatedRestaurent);
  }, [restaurent, form]);

  const onSubmit = (formDataJson: RestaurentFormData) => {
    const formData = new FormData();
    formData.append("restaurentName", formDataJson.restaurentName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
