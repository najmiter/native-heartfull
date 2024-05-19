import { Dispatch, SetStateAction } from "react";
import { globalQalmas } from "./qalma";

export type days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type qalma = { qalma: string; count: number; loop: number };
export type Context = {
    currentQalma: qalma;
    setQalmas: Dispatch<SetStateAction<typeof globalQalmas>>;
    setCurrentQalma: Dispatch<SetStateAction<qalma>>;
    resetQalmaToTodays: () => void;
    qalmas: typeof globalQalmas;
    today: days;
};
