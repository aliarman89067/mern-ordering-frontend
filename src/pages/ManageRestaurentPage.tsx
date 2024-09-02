import {
  useCreateMyRestaurent,
  useGetMyRestaurent,
  useGetMyRestaurentOrder,
  useUpdateMyRestaurent,
} from "@/api/MyRestaurentApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManageRestaurentForm from "@/forms/manage-restaurent-form/ManageRestaurentForm";

export default function ManageRestaurentPage() {
  const { orders } = useGetMyRestaurentOrder();
  const { createRestaurent, isLoading: isCreateLoading } =
    useCreateMyRestaurent();
  const { restaurent } = useGetMyRestaurent();
  const { updateRestaurent, isLoading: isUpdateLoading } =
    useUpdateMyRestaurent();
  const isUpdating = !!restaurent;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Order</TabsTrigger>
        <TabsTrigger value="manage-restaurent">Manage Restaurent</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} Active orders</h2>
        {orders?.map((order) => {
          return <OrderItemCard order={order} />;
        })}
      </TabsContent>
      <TabsContent value="manage-restaurent">
        <ManageRestaurentForm
          onSave={isUpdating ? updateRestaurent : createRestaurent}
          isLoading={isCreateLoading || isUpdateLoading}
          restaurent={restaurent}
        />
      </TabsContent>
    </Tabs>
  );
}
