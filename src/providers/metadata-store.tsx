import { API } from "@/api/constants";
import { create } from "zustand";

type State = {
  networks: any | null;
  variables: any | null;
};

type Actions = {
  setNetworks: () => void;
  setVariables: () => void;
};

const initialState: State = {
  networks: null,
  variables: null,
};

export const useMetadataStore = create<State & Actions>()((set) => ({
  networks: initialState.networks,
  variables: initialState.variables,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setNetworks: async () => {
    const res = await fetch(
      `${API.BaseUrl}/variables?token=
      ${import.meta.env.VITE_SYNOPTIC_KEY}`,
    );
    set({
      networks: res.json(),
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setVariables: async () => {
    const res = await fetch(
      `${API.BaseUrl}/variables?token=
      ${import.meta.env.VITE_SYNOPTIC_KEY}`,
    );

    set({
      variables: res.json(),
    });
  },
}));
