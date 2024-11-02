import { API } from "@/api/constants";
import { Networks } from "@/types/networks";
import { Variables } from "@/types/variables";
import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

export const variablesQueryOptions = () => {
  return queryOptions({
    queryKey: ["variables"],
    queryFn: () => {
      return ky
        .get(
          `${API.BaseUrl}/variables?token=${import.meta.env.VITE_SYNOPTIC_KEY}`,
        )
        .json<Variables>();
    },
  });
};

export const networksQueryOptions = () => {
  return queryOptions({
    queryKey: ["networks"],
    queryFn: () => {
      return ky
        .get(
          `${API.BaseUrl}/networks?token=${import.meta.env.VITE_SYNOPTIC_KEY}`,
        )
        .json<Networks>();
    },
  });
};
