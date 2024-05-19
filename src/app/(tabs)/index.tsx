import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Styles } from "@/src/constants/Styles";
import { useBig } from "@/src/contexts/BigContext";
import { useFocusEffect } from "expo-router";
import { globalQalmas } from "@/src/constants/qalma";

export default function HomeScreen() {
    const { qalmas, currentQalma, setQalmas, today } = useBig();

    const count = currentQalma.count;

    useFocusEffect(function () {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("qalmas");
                if (value !== null) {
                    const qalmas = JSON.parse(value);
                    setQalmas(qalmas);
                } else {
                    await AsyncStorage.setItem(
                        "qalmas",
                        JSON.stringify(globalQalmas)
                    );
                }
            } catch (e) {
                // error reading value
            }
        };
        getData();
    });

    const [fontLoaded] = useFonts({
        "Amiri-Bold": require("@/assets/fonts/Amiri-Bold.ttf"),
    });

    const target = qalmas.target;
    const loop = Math.trunc((count + 1) / target);
    const displayCount = (count % target) + Number(count > 1);

    const aspectRatio = displayCount !== 0 ? 1 / (displayCount / target) : 0;

    function handleCounter() {
        const storeData = async () => {
            try {
                const newQalmas = { ...qalmas };
                newQalmas[today].count = count;
                setQalmas(newQalmas);
                console.log(count);
                await AsyncStorage.setItem("qalmas", JSON.stringify(newQalmas));
            } catch (e) {
                // saving error
            }
        };

        storeData();
    }

    if (!fontLoaded) return null;

    return (
        <View style={Styles.container}>
            <Pressable onPress={handleCounter} style={[styles.counter]}>
                <View style={styles.counterCircle}>
                    <Text style={styles.counterText}>{displayCount}</Text>
                    <View style={[styles.filler, { aspectRatio }]} />
                </View>
            </Pressable>
            <Text style={Styles.qalma}>{currentQalma.qalma}</Text>
            <View style={styles.info}>
                <Text style={[Styles.text, styles.infoText]}>Loop: {loop}</Text>
                <Text style={[Styles.text, styles.infoText]}>
                    Target: {target}
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
