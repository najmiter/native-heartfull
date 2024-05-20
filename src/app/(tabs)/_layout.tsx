import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Link, Tabs } from "expo-router";
import { Image, Pressable } from "react-native";
import { useBig } from "@/src/contexts/BigContext";

export default function TabLayout() {
    const { resetQalmaToTodays } = useBig();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#222",
                    borderColor: "#222",
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#222",
                },
                tabBarActiveTintColor: "lightskyblue",
                headerTitleAlign: "center",
                headerTintColor: "#eee",
                headerLeft: () => (
                    <Pressable onPress={resetQalmaToTodays}>
                        {({ pressed }) => (
                            <FontAwesome
                                name="repeat"
                                size={25}
                                style={{
                                    marginLeft: 15,
                                    paddingRight: 20,
                                    opacity: pressed ? 0.5 : 1,
                                    color: "#eee",
                                }}
                            />
                        )}
                    </Pressable>
                ),

                headerRight: () => (
                    <Link href="/details" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="bars"
                                    size={25}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                        color: "#eee",
                                    }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Heartfull",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="heart" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <Fontisto name="history" size={20} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
