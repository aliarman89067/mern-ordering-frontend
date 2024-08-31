import {
  useCreateMyRestaurent,
  useGetMyRestaurent,
  useUpdateMyRestaurent,
} from "@/api/MyRestaurentApi";
import ManageRestaurentForm from "@/forms/manage-restaurent-form/ManageRestaurentForm";

export default function ManageRestaurentPage() {
  const { createRestaurent, isLoading: isCreateLoading } =
    useCreateMyRestaurent();
  const { restaurent } = useGetMyRestaurent();
  const { updateRestaurent, isLoading: isUpdateLoading } =
    useUpdateMyRestaurent();
  const isUpdating = !!restaurent;
  return (
    <ManageRestaurentForm
      onSave={isUpdating ? updateRestaurent : createRestaurent}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurent={restaurent}
    />
  );
}
