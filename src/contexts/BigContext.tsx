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
});

export const BigProvider = ({ children }: PropsWithChildren) => {
    const today = new Date().getDay() as days;

    const [qalmas, setQalmas] = useState(globalQalmas);
    const [currentQalma, setCurrentQalma] = useState(today);

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

    function updateCurrentQalmaLocally() {
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
                        count: oQalma.count + 1,
                    })
                );
            }
        });
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
