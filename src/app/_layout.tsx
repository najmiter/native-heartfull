import { Stack } from "expo-router";
import "react-native-reanimated";
import { BigProvider } from "../contexts/BigContext";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function RootLayout() {
    return (
        <BigProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#222",
                    },
                    headerTintColor: "#eee",
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="details"
                    options={{ presentation: "modal", title: "Qalmas" }}
                />
            </Stack>
        </BigProvider>
    );
}
