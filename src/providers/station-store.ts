import { SENSORVARIABLES, STATION } from "@/types/synoptic";
import { create } from "zustand";

type State = {
  fetchedStations: Array<STATION>;
  currentStation: STATION | null;
  currentVariable: keyof SENSORVARIABLES;
};

type Actions = {
  setFetchedStations: (stations: Array<STATION>) => void;
  setCurrentStation: (station: STATION) => void;
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
  setCurrentStation: (station: STATION) => {
    set({
      currentStation: station,
    });
  },
  setCurrentVariable: (variable: string) => {
    set({
      currentVariable: variable as keyof SENSORVARIABLES,
    });
  },
  reset: () => set(() => initialState),
  setFetchedStations: (stations: Array<STATION>) => {
    set({
      fetchedStations: stations,
    });
  },
}));
