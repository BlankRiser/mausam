import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type UrlSerializerParams = {
  url: string;
  params: Record<string, string>;
  removeToken?: boolean;
};

export function urlSerializer({ url, params }: UrlSerializerParams) {
  const httpUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    httpUrl.searchParams.append(key, value);
  });
  httpUrl.searchParams.append("token", import.meta.env.VITE_SYNOPTIC_KEY);
  return httpUrl.toString();
}

export async function fetcher<T>(url: string) {
  return fetch(url)
    .then((res) => res.json() as Promise<T>)
    .catch((err) => {
      // If the error is a TypeError, it's likely due to a CORS error
      // which means we need to add the CORS proxy to the URL
      throw err;
    });
}
