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
    currentQalma: 0,
    setCurrentQalma: () => {},
    resetQalmaToTodays: () => {},
    qalmas: globalQalmas,
    setQalmas: () => {},
    today: 0,
    getCurrentQalmaForDay: () => {},
    updateCurrentQalmaLocally: () => {},
    isLoading: false,
    setIsLoading: () => {},
    target: 0,
});

export const BigProvider = ({ children }: PropsWithChildren) => {
    const today = new Date().getDay() as days;
    const target = 100;

    const [qalmas, setQalmas] = useState(globalQalmas);
    const [currentQalma, setCurrentQalma] = useState(today);
    const [isLoading, setIsLoading] = useState(false);

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
        setCurrentQalma(today);
    }

    function getCurrentQalmaForDay(day: days) {
        setCurrentQalma(day);
    }

    function updateCurrentQalmaLocally(by = 1) {
        AsyncStorage.getItem(`qalma_${currentQalma}`).then((qalma) => {
            const oQalma = JSON.parse(qalma ?? "{}");
            const at = qalmas.findIndex(
                (qalma) => qalma.qalma === oQalma.qalma
            );

            if (at !== -1) {
                AsyncStorage.setItem(
                    `qalma_${at}`,
                    JSON.stringify({
                        ...oQalma,
                        count: oQalma.count + by,
                    })
                );
            }
        });
    }

    return (
        <BigContext.Provider
            value={{
                today,
                target,
                qalmas,
                isLoading,
                setQalmas,
                currentQalma,
                setIsLoading,
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
