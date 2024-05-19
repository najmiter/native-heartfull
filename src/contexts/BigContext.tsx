import { PropsWithChildren, createContext, useContext, useState } from "react";
import { qalmas } from "@/src/constants/qalma";
import { Context, days } from "@/src/constants/Types";

const BigContext = createContext<Context>({
    currentQalma: "",
    setCurrentQalma: () => {},
    resetQalmaToTodays: () => {},
    qalmas,
});

export const BigProvider = ({ children }: PropsWithChildren) => {
    const today = new Date().getDay() as days;
    const [currentQalma, setCurrentQalma] = useState(qalmas[today].qalma);

    function resetQalmaToTodays() {
        setCurrentQalma(qalmas[today].qalma);
    }

    return (
        <BigContext.Provider
            value={{
                qalmas,
                currentQalma,
                setCurrentQalma,
                resetQalmaToTodays,
            }}
        >
            {children}
        </BigContext.Provider>
    );
};

export const useBig = () => useContext(BigContext);
