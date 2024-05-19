import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import { Styles } from "@/src/constants/Styles";
import { days } from "@/src/constants/Types";
import { useBig } from "@/src/contexts/BigContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function DetailsScreen() {
    return (
        <View style={Styles.container}>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

            <FlatList
                style={styles.list}
                data={[0, 1, 2, 3, 4, 5, 6] as days[]}
                renderItem={({ item }) => <EachQalma item={item} />}
            />
        </View>
    );
}

function EachQalma({ item }: { item: days }) {
    const { getCurrentQalmaForDay, qalmas } = useBig();
    const router = useRouter();
    const qalma = { ...qalmas[item as days] };

    const [count, setCount] = useState(0);
    (async () => await AsyncStorage.getItem(`qalma_${item}`))().then((c) =>
        setCount(JSON.parse(c ?? "{}")?.count)
    );

    function handleQalmaPress() {
        getCurrentQalmaForDay(item);
        router.replace("/");
    }

    return (
        <Pressable
            onPress={handleQalmaPress}
            style={styles.qlamaContainer}
            key={item}
        >
            <Text style={Styles.qalma}>{qalma.qalma}</Text>
            <View>
                <Text style={Styles.text}>Count: {count}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 10,
    },
    qlamaContainer: {
        backgroundColor: "#4447",
        paddingHorizontal: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
});
