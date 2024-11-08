import env from "@/env";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  mapboxToken: string;
  synopticToken: string;
};

type Actions = {
  setMapboxToken: (token: string) => void;
  setSynopticToken: (token: string) => void;
  setTokens: (tokens: { mapboxToken: string; synopticToken: string }) => void;
  reset: () => void;
};

const initialState: State = {
  mapboxToken: env.data?.VITE_MAPBOX_PUBLIC_KEY ?? "",
  synopticToken: env.data?.VITE_SYNOPTIC_KEY ?? "",
};

export const useKeysStore = create<State & Actions>()(
  persist(
    (set) => ({
      mapboxToken: initialState.mapboxToken,
      synopticToken: initialState.synopticToken,
      setMapboxToken: (token: string) => {
        set({
          mapboxToken: token,
        });
      },
      setSynopticToken: (token: string) => {
        set({
          synopticToken: token,
        });
      },
      setTokens: (tokens) => {
        set(tokens);
      },
      reset: () => set(() => initialState),
    }),
    {
      name: "env-keys",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
