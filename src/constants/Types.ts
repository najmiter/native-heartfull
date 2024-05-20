import { Dispatch, SetStateAction } from "react";
import { globalQalmas } from "./qalma";

export type days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type qalma = { qalma: string; count: number; loop: number };
export type Context = {
    setQalmas: Dispatch<SetStateAction<typeof globalQalmas>>;
    currentQalma: number;
    setCurrentQalma: Dispatch<SetStateAction<days>>;
    resetQalmaToTodays: () => void;
    qalmas: typeof globalQalmas;
    today: days;
    getCurrentQalmaForDay: (d: days) => void;
    updateCurrentQalmaLocally: (by?: number) => void;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};
