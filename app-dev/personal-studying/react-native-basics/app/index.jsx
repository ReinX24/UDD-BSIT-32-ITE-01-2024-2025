import Basic from "@/components/Basic";

import TextInput from "@/components/TextInput";
import { View, Text, StyleSheet } from "react-native";

function App() {
    return (
        <View style={styles.container}>
            <TextInput></TextInput>
            {/* <Basic></Basic> */}
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 8,
    },
});
