import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
    Platform,
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import { Styles } from "@/src/constants/Styles";
import { days } from "@/src/constants/Types";
import { useBig } from "@/src/contexts/BigContext";
import Button from "../components/Button";

export default function DetailsScreen() {
    const [expand, setExpand] = useState<days | null>(null);

    return (
        <View style={Styles.container}>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

            <FlatList
                style={styles.list}
                data={[0, 1, 2, 3, 4, 5, 6] as days[]}
                renderItem={({ item }) => (
                    <EachQalma
                        item={item}
                        expand={expand}
                        setExpand={setExpand}
                    />
                )}
            />
        </View>
    );
}

function EachQalma({
    item,
    expand,
    setExpand,
}: {
    item: days;
    expand: days | null;
    setExpand: React.Dispatch<React.SetStateAction<days | null>>;
}) {
    const [count, setCount] = useState(0);

    const { getCurrentQalmaForDay, qalmas, target } = useBig();
    const router = useRouter();
    const qalma = { ...qalmas[item as days] };

    (async () => await AsyncStorage.getItem(`qalma_${item}`))().then((c) =>
        setCount(JSON.parse(c ?? "{}")?.count)
    );

    function handleQalmaPress() {
        getCurrentQalmaForDay(item);
        router.replace("/");
    }

    return (
        <Pressable
            onPress={() => setExpand(item)}
            style={styles.qlamaContainer}
            key={item}
        >
            <Text style={Styles.qalma}>{qalma.qalma}</Text>
            {expand === item && (
                <View style={styles.details}>
                    <View style={styles.detailsThing}>
                        <FontAwesome6
                            name="hashtag"
                            size={20}
                            color="#ffa5008a"
                        />
                        <Text style={styles.detailsText}>
                            {count === target ? target : count % target}
                        </Text>
                    </View>
                    <View style={styles.detailsThing}>
                        <Entypo name="loop" size={20} color="#ffa5008a" />
                        <Text style={styles.detailsText}>
                            {Math.trunc(count / target)}
                        </Text>
                    </View>
                    <Button onPress={handleQalmaPress} text="Select" />
                </View>
            )}
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
    details: {
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    detailsText: {
        color: "#aaa",
    },
    detailsThing: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
});
