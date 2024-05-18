import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type ButtonProps = {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
};

export default function Button({ text, onPress }: ButtonProps) {
    return (
        <Pressable style={styles.btn} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "#333",
        fontWeight: "bold",
    },

    btn: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: "lightskyblue",
        borderRadius: 5,
    },
});
