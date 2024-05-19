import { Dispatch, SetStateAction } from "react";
import { qalmas } from "./qalma";

export type days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Context = {
    currentQalma: string;
    setCurrentQalma: Dispatch<SetStateAction<string>>;
    resetQalmaToTodays: () => void;
    qalmas: typeof qalmas;
};
