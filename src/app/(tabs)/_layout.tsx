import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
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
                headerTintColor: "#eee",
                headerRight: () => (
                    <Link href="/modal" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="circle"
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
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "History",
                }}
            />
        </Tabs>
    );
}
