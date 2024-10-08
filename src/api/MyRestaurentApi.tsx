import { Order, Restaurent } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurentRequest = async (): Promise<Restaurent> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurent`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurent");
    }
    return response.json();
  };
  const {
    data: restaurent,
    isLoading,
    isSuccess,
  } = useQuery("fetchMyRestaurent", getMyRestaurentRequest);
  return { restaurent, isLoading, isSuccess };
};

export const useCreateMyRestaurent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurentRequest = async (
    restaurentFormData: FormData
  ): Promise<Restaurent> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurent`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurentFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update a restaurent");
    }
    return response.json();
  };
  const {
    mutate: createRestaurent,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestaurentRequest);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to create a restaurant!");
  }
  return { createRestaurent, isLoading };
};

export const useUpdateMyRestaurent = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurentRequest = async (
    restaurentFormData: FormData
  ): Promise<Restaurent> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurent`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurentFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update a restaurent");
    }
    return response.json();
  };
  const {
    mutate: updateRestaurent,
    data,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMyRestaurentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchMyRestaurent"]);
    },
  });
  if (isSuccess) {
    toast.success("Restaurant updated!");
  }
  if (error) {
    toast.error("Unable to update a restaurant!");
  }
  return { updateRestaurent, isLoading, isSuccess, data };
};

export const useGetMyRestaurentOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurentOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurent/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyrestaurentOrder",
    getMyRestaurentOrdersRequest
  );
  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurentOrder = () => {
  const queryClient = useQueryClient();

  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurentOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurent/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRestaurentStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurentOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchMyrestaurentOrder"]);
    },
  });
  if (isSuccess) {
    toast.success("Order updated");
  }
  if (isSuccess) {
    toast.success("Order updated");
  }
  if (isError) {
    toast.error("Failed to update order");
    reset();
  }
  return { updateRestaurentStatus, isLoading };
};
