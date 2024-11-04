import env from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  httpUrl.searchParams.append("token", env.VITE_SYNOPTIC_KEY);
  return httpUrl.toString();
};

export const fetcher = async <T>(url: string) => {
  return fetch(url)
    .then((res) => res.json() as Promise<T>)
    .catch((err) => {
      throw err;
    });
};
