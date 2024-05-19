import { StyleSheet, View, Text, Pressable } from "react-native";
import { useFonts } from "expo-font";

import { Styles } from "@/src/constants/Styles";
import { useBig } from "@/src/contexts/BigContext";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const { currentQalma, setCurrentQalma, updateCurrentQalmaLocally } =
        useBig();

    const [count, setCount] = useState(currentQalma.count);

    useEffect(
        function () {
            setCount(currentQalma.count);
        },
        [currentQalma]
    );

    const [fontLoaded] = useFonts({
        "Amiri-Bold": require("@/assets/fonts/Amiri-Bold.ttf"),
    });

    function handleCount() {
        setCurrentQalma({
            ...currentQalma,
            count: currentQalma.count + 1,
        });
        updateCurrentQalmaLocally();
    }

    if (!fontLoaded) return null;

    return (
        <View style={Styles.container}>
            <Pressable onPress={handleCount} style={[styles.counter]}>
                <View style={styles.counterCircle}>
                    <Text style={styles.counterText}>{count}</Text>
                    <View style={[styles.filler]} />
                </View>
            </Pressable>
            <Text style={Styles.qalma}>{currentQalma.qalma}</Text>
            <View style={styles.info}>
                <Text style={[Styles.text, styles.infoText]}>Loop: {0}</Text>
                <Text style={[Styles.text, styles.infoText]}>
                    Target: {100}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    counter: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    counterCircle: {
        width: 200,
        aspectRatio: 1,
        backgroundColor: "#888",
        borderRadius: 100,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    counterText: {
        color: "#222",
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
        backgroundColor: "#666",
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
