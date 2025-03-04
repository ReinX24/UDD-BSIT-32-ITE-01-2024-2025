import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ThemeScreen: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const isDarkMode = theme === "dark";

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? "#2f2f2f" : "#f2f2f2",
                },
            ]}
        >
            <Text
                style={[
                    styles.header,
                    {
                        color: isDarkMode ? "#f2f2f2" : "#2f2f2f",
                    },
                ]}
            >
                Toggle Theme Demo
            </Text>

            {/* Try implementing this on another page or this page */}
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#2f2f2f", true: "#81b0ff" }}
                thumbColor={isDarkMode ? "#f5dd4b" : "#f2f2f2"}
                ios_backgroundColor={"#3e3e3e"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
});

export default ThemeScreen;
