import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { networksQueryOptions, variablesQueryOptions } from '@/api/query-factory';
import { queryClient } from '@/lib/query-client';
import { extractNetworkDetails, extractVariableDetails } from '@/lib/synoptic-utils';

import type { MNETLabelItems } from '@/types/networks';
import type { VariableLabelItems } from '@/types/variables';

type State = {
  variableLabels: Record<string, VariableLabelItems>;
  networkLabels: Record<string, MNETLabelItems>;
};

type Actions = {
  fetchVariables: () => Promise<Record<string, VariableLabelItems>>;
  fetchNetworks: () => Promise<Record<string, MNETLabelItems>>;
  setData: (data: { variableLabels: State['variableLabels']; networkLabels: State['networkLabels'] }) => void;
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
        const existing = get().variableLabels;
        if (Object.keys(existing).length > 0) return existing;

        const data = await queryClient.ensureQueryData(variablesQueryOptions());
        const variableLabels = extractVariableDetails({
          variableArr: data.VARIABLES,
        });
        set({ variableLabels });
        return variableLabels;
      },
      fetchNetworks: async () => {
        const existing = get().networkLabels;
        if (Object.keys(existing).length > 0) return existing;

        const data = await queryClient.ensureQueryData(networksQueryOptions());
        const networkLabels = extractNetworkDetails({
          networksArr: data.MNET,
        });
        set({ networkLabels });
        return networkLabels;
      },
      setData: ({ variableLabels, networkLabels }) => {
        set({ variableLabels, networkLabels });
      },
      reset: () => set(() => initialState),
    }),
    {
      name: 'global-data-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        variableLabels: state.variableLabels,
        networkLabels: state.networkLabels,
      }),
      version: 1,
    }
  )
);
