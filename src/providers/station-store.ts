import { SENSORVARIABLES, STATION } from "@/types/synoptic";
import { create } from "zustand";

type State = {
  currentStation: STATION | null;
  currentVariable: keyof SENSORVARIABLES;
};

type Actions = {
  setCurrentStation: (station: STATION) => void;
  setCurrentVariable: (variable: string) => void;
  reset: () => void;
};

const initialState: State = {
  currentStation: null,
  currentVariable: "air_temp",
};

export const useCurrentState = create<State & Actions>()((set) => ({
  currentStation: initialState.currentStation,
  currentVariable: initialState.currentVariable,
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
}));
