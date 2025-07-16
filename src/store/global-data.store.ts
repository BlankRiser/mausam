import { api } from "@/api/api";
import {
  extractNetworkDetails,
  extractVariableDetails,
} from "@/lib/synoptic-utils";
import type { MNETLabelItems } from "@/types/networks";
import type { VariableLabelItems } from "@/types/variables";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  variableLabels: Record<string, VariableLabelItems>;
  networkLabels: Record<string, MNETLabelItems>;
};

type Actions = {
  fetchVariables: () => Promise<void>;
  fetchNetworks: () => Promise<void>;
  setData: (data: {
    variableLabels: State["variableLabels"];
    networkLabels: State["networkLabels"];
  }) => void;
  reset: () => void;
};

const initialState: State = {
  variableLabels: {},
  networkLabels: {},
};

export const useGlobalDataStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      fetchVariables: async () => {
        if (Object.keys(get().variableLabels).length > 0) return;

        const data = await api.variables.getAllVariables();
        set({
          variableLabels: extractVariableDetails({
            variableArr: data.VARIABLES,
          }),
        });
      },
      fetchNetworks: async () => {
        if (Object.keys(get().networkLabels).length > 0) return;

        const data = await api.networks.getAllNetworks();
        set({
          networkLabels: extractNetworkDetails({ networksArr: data.MNET }),
        });
      },
      setData: ({ variableLabels, networkLabels }) => {
        set({ variableLabels, networkLabels });
      },
      reset: () => set(() => initialState),
    }),
    {
      name: "global-data-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        variableLabels: state.variableLabels,
        networkLabels: state.networkLabels,
      }),
      version: 1,
    },
  ),
);
