import { Styles } from "@/src/constants/Styles";
import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>Tab Two</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
