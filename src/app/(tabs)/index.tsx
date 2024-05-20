import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Vibration,
    GestureResponderEvent,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";

import { Styles } from "@/src/constants/Styles";
import { useBig } from "@/src/contexts/BigContext";

export default function HomeScreen() {
    const { currentQalma, updateCurrentQalmaLocally, target } = useBig();

    const [count, setCount] = useState(0);
    const [currentQalmaText, setCurrentQalmaText] = useState("");
    const [weekday, setWeekday] = useState("");
    const [touchStart, setTouchStart] = useState(0);

    const loop = Math.trunc(count / target);
    const aspectRatio =
        count === 0 ? 0 : count % target ? 1 / ((count % target) / target) : 1;

    useEffect(
        function () {
            AsyncStorage.getItem(`qalma_${currentQalma}`).then((q) => {
                const qalma = JSON.parse(q ?? "{}");
                setCount(qalma?.count);
                setCurrentQalmaText(qalma?.qalma);
                setWeekday(qalma?.day);
            });
        },
        [currentQalma]
    );

    const [fontLoaded] = useFonts({
        "Amiri-Bold": require("@/assets/fonts/Amiri-Bold.ttf"),
    });

    function handleTouchStart(e: GestureResponderEvent) {
        setTouchStart(e.nativeEvent.locationX);
    }

    function handleTouchEnd(e: GestureResponderEvent) {
        if ((count + 1) % target === 0) Vibration.vibrate(100);

        const touchEnd = e.nativeEvent.locationX;
        const by = touchEnd - touchStart > 70 ? -1 : 1;

        if (count === 0 && by < 0) return;

        setCount(count + by);
        updateCurrentQalmaLocally(by);
    }

    if (!fontLoaded) return null;

    return (
        <ImageBackground
            resizeMode="cover"
            source={require("@/assets/images/bg.png")}
            style={Styles.container}
        >
            <Pressable
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={[styles.counter]}
            >
                <ImageBackground
                    resizeMode="cover"
                    source={
                        count % target
                            ? require(
                                  `@/assets/images/counterCircleInProgress.png`
                              )
                            : require(`@/assets/images/counterCircleFull.png`)
                    }
                    style={styles.counterCircle}
                >
                    <Text style={styles.counterText}>
                        {count % target || (count > 0 ? target : 0)}
                    </Text>
                    <View style={[styles.filler, { aspectRatio }]} />
                </ImageBackground>
            </Pressable>
            <View style={styles.header}>
                <Text style={Styles.text}>On {weekday}, you'll say</Text>
                <Text style={Styles.qalma}>{currentQalmaText}</Text>
            </View>
            <View style={styles.info}>
                <Text style={[Styles.text, styles.infoText]}>Loop: {loop}</Text>
                <Text style={[Styles.text, styles.infoText]}>
                    Target: {target}
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: "center",
    },
    counter: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        zIndex: 10,
    },
    counterCircle: {
        width: 200,
        aspectRatio: 1,
        backgroundColor: "transparent",
        borderRadius: 100,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    counterText: {
        color: "#ddd",
        fontSize: 70,
        fontFamily: "monospace",
        fontWeight: "bold",
        zIndex: 10,
    },
    filler: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 200,
        aspectRatio: 1,
        backgroundColor: "#2226",
    },
    info: {
        alignItems: "center",
        gap: 5,
    },
    infoText: {
        backgroundColor: "#4447",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
});
