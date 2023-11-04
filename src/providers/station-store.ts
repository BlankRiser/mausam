import { STATION } from "@/types/synoptic";
import { create } from "zustand";

type State = {
    currentStation: STATION | null;
};

type Actions = {
    setCurrentStation: (station: STATION) => void;
    reset: () => void;
};

const initialState: State = {
    currentStation: null,
};

export const useCurrentStation = create<State & Actions>()((set) => ({
    currentStation: null,
    setCurrentStation: (station: STATION) => {
        set({
            currentStation: station,
        });
    },
    reset: () => set(() => initialState),
}));
