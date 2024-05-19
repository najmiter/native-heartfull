import { Stack } from "expo-router";
import "react-native-reanimated";
import { BigProvider } from "../contexts/BigContext";

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
                    name="Details"
                    options={{ presentation: "modal" }}
                />
            </Stack>
        </BigProvider>
    );
}
