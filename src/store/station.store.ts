import { SensorVariables, Station } from "@/types/station";
import { create } from "zustand";

type State = {
  fetchedStations: Array<Station>;
  currentStation: Station | null;
  currentVariable: keyof SensorVariables;
};

type Actions = {
  setFetchedStations: (stations: Array<Station>) => void;
  setCurrentStation: (station: Station) => void;
  setCurrentVariable: (variable: string) => void;
  reset: () => void;
};

const initialState: State = {
  currentStation: null,
  currentVariable: "air_temp",
  fetchedStations: [],
};

export const useCurrentState = create<State & Actions>()((set) => ({
  currentStation: initialState.currentStation,
  currentVariable: initialState.currentVariable,
  fetchedStations: initialState.fetchedStations,
  setCurrentStation: (station: Station) => {
    set({
      currentStation: station,
    });
  },
  setCurrentVariable: (variable: string) => {
    set({
      currentVariable: variable as keyof SensorVariables,
    });
  },
  reset: () => set(() => initialState),
  setFetchedStations: (stations: Array<Station>) => {
    set({
      fetchedStations: stations,
    });
  },
}));
