import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#222",
                },
                headerTintColor: "#eee",
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Details" options={{ presentation: "modal" }} />
        </Stack>
    );
}
