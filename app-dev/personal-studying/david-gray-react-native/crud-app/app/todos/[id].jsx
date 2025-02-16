import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function EditScreen() {
    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState({});
    const router = useRouter();

    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
}
