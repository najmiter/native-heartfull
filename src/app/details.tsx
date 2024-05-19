import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { qalmas } from "@/src/constants/qalma";
import { Styles } from "@/src/constants/Styles";
import { days } from "@/src/constants/Types";
import { useBig } from "@/src/contexts/BigContext";

export default function DetailsScreen() {
    return (
        <ScrollView style={Styles.container}>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

            <FlatList
                style={styles.list}
                data={[0, 1, 2, 3, 4, 5, 6] as days[]}
                renderItem={({ item }) => <EachQalma item={item} />}
            />
        </ScrollView>
    );
}

function EachQalma({ item }: { item: days }) {
    const { setCurrentQalma } = useBig();
    const router = useRouter();
    const qalma = qalmas[item as days].qalma;

    function handleQalmaPress() {
        setCurrentQalma(qalma);
        router.replace("/");
    }

    return (
        <Pressable
            onPress={handleQalmaPress}
            style={styles.qlamaContainer}
            key={item}
        >
            <Text style={Styles.qalma}>{qalma}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 10,
    },
    qlamaContainer: {
        backgroundColor: "#4447",
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
});
