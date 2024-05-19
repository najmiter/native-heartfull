import { PropsWithChildren, createContext, useContext, useState } from "react";
import { globalQalmas } from "@/src/constants/qalma";
import { Context, days } from "@/src/constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BigContext = createContext<Context>({
    currentQalma: { qalma: "", count: 0, loop: 0 },
    setCurrentQalma: () => {},
    resetQalmaToTodays: () => {},
    qalmas: globalQalmas,
    setQalmas: () => {},
    today: 0,
});

export const BigProvider = ({ children }: PropsWithChildren) => {
    const today = new Date().getDay() as days;
    const [qalmas, setQalmas] = useState(globalQalmas);
    const [currentQalma, setCurrentQalma] = useState(qalmas[today]);

    function resetQalmaToTodays() {
        setCurrentQalma(qalmas[today]);
    }

    return (
        <BigContext.Provider
            value={{
                today,
                qalmas,
                setQalmas,
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
