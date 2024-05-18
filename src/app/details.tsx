import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Text, FlatList } from "react-native";
import { qalmas } from "@/src/constants/qalma";
import { Styles } from "../constants/Styles";
import { days } from "@/src/constants/Types";

export default function DetailsScreen() {
    return (
        <View style={Styles.container}>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

            <FlatList
                style={styles.list}
                data={[0, 1, 2, 3, 4, 5, 6] as days[]}
                renderItem={({ item }) => (
                    <View style={styles.qlamaContainer} key={item}>
                        <Text style={Styles.qalma}>
                            {qalmas[item as days].qalma}
                        </Text>
                    </View>
                )}
            />
        </View>
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
        marginVertical: 10,
    },
});
