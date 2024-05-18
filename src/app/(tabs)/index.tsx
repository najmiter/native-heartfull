import { useState } from "react";
import { StyleSheet, View, Text, Pressable, Button } from "react-native";

export default function TabOneScreen() {
    const [count, setCount] = useState<number>(0);
    const target = 10;

    const aspectRatio = count !== 0 ? 1 / (count / target) : 0;

    function handleCounter() {
        if (count % target === 0) setCount(1);
        else setCount(count + 1);
    }

    return (
        <View style={styles.container}>
            <Button title="Reset" onPress={() => setCount(0)}></Button>
            <Pressable onPress={handleCounter} style={[styles.container]}>
                <View style={styles.counterCircle}>
                    <Text style={styles.counterText}>{count}</Text>
                    <View style={[styles.filler, { aspectRatio }]} />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111",
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
});
