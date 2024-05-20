import { Styles } from "@/src/constants/Styles";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

export default function HistoryScreen() {
    return (
        <ImageBackground
            resizeMode="cover"
            source={require("@/assets/images/bg.png")}
            style={Styles.container}
        >
            <View>
                <Text style={Styles.text}>Tab Two</Text>
            </View>
        </ImageBackground>
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
