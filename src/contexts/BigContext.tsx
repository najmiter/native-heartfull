import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
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
    getCurrentQalmaForDay: () => {},
    updateCurrentQalmaLocally: () => {},
});

export const BigProvider = ({ children }: PropsWithChildren) => {
    const today = new Date().getDay() as days;

    const [qalmas, setQalmas] = useState(globalQalmas);
    const [currentQalma, setCurrentQalma] = useState({ ...qalmas[today] });

    useEffect(function () {
        AsyncStorage.getItem("isFirstUse")
            .then((data) => {
                if (!data) {
                    AsyncStorage.setItem("isFirstUse", "true");

                    qalmas.forEach((qalma, i) =>
                        AsyncStorage.setItem(
                            `qalma_${i}`,
                            JSON.stringify(qalma)
                        )
                    );
                } else {
                    getCurrentQalmaForDay(today);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    function resetQalmaToTodays() {
        setCurrentQalma(qalmas[today]);
    }

    function getCurrentQalmaForDay(day: days) {
        AsyncStorage.getItem(`qalma_${day}`).then((data) =>
            setCurrentQalma(JSON.parse(data ?? "{}"))
        );
    }

    function updateCurrentQalmaLocally() {
        const at = qalmas.findIndex(
            (qalma) => qalma.qalma === currentQalma.qalma
        );

        if (at !== -1) {
            AsyncStorage.setItem(
                `qalma_${at}`,
                JSON.stringify({
                    ...currentQalma,
                    count: currentQalma.count + 1,
                })
            );
        }
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
                getCurrentQalmaForDay,
                updateCurrentQalmaLocally,
            }}
        >
            {children}
        </BigContext.Provider>
    );
};

export const useBig = () => useContext(BigContext);
