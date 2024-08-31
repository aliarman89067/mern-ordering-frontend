import { SearchState } from "@/pages/SearchPage";
import { Restaurent, RestaurentSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurent = (restaurentId?: string) => {
  const getRestaurentByIdRequest = async (): Promise<Restaurent> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurent/${restaurentId}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurent");
    }
    return response.json();
  };
  const { data: result, isLoading } = useQuery(
    "fetchRestaurent",
    getRestaurentByIdRequest,
    { enabled: !!restaurentId }
  );
  return { result, isLoading };
};

export const useSearchRestaurent = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurentSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurent/search/${city}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurent");
    }
    return response.json();
  };
  const {
    data: results,
    isLoading,
    isSuccess,
  } = useQuery(["searchRestaurents", searchState, city], createSearchRequest, {
    enabled: !!city,
  });
  return { results, isLoading, isSuccess };
};
