import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKeysStore } from "@/store/env-keys.store";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

type UrlSerializerParams = {
  url: string;
  params: Record<string, string | number | undefined>;
  removeToken?: boolean;
};

export const urlSerializer = ({ url, params }: UrlSerializerParams) => {
  const httpUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;

    httpUrl.searchParams.append(key, value.toString());
  });
  httpUrl.searchParams.append("token", useKeysStore.getState().synopticToken);
  return httpUrl.toString();
};

export const fetcher = async <T>(url: string) => {
  return await fetch(url)
    .then((res) => res.json() as Promise<T>)
    .catch((err) => {
      throw err;
    });
};

export const formatLargeNumber = (value: number): string => {
  if (Math.abs(value) >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return value.toString();
};
