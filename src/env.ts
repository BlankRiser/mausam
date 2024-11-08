import { z } from "zod";

const envSchema = z.object({
  VITE_MAPBOX_PUBLIC_KEY: z.string().min(1),
  VITE_SYNOPTIC_KEY: z.string().min(1),
});

const env = envSchema.safeParse({
  VITE_MAPBOX_PUBLIC_KEY: import.meta.env.VITE_MAPBOX_PUBLIC_KEY,
  VITE_SYNOPTIC_KEY: import.meta.env.VITE_SYNOPTIC_KEY,
});

export default env;
