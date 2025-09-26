import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import env from "@/env";

type State = {
  synopticToken: string;
};

type Actions = {
  setSynopticToken: (token: string) => void;
  setTokens: (tokens: {  synopticToken: string }) => void;
  reset: () => void;
};

const initialState: State = {
  synopticToken: env.data?.VITE_SYNOPTIC_KEY ?? "",
};

export const useKeysStore = create<State & Actions>()(
  persist(
    (set) => ({
      synopticToken: initialState.synopticToken,
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
