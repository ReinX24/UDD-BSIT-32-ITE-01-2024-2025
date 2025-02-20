import Basic from "@/components/Basic";
import TextInputComponent from "@/components/TextInput";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function App() {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Basic /> */}
            <TextInputComponent />
        </ScrollView>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 8,
    },
    scrollViewContent: {
        padding: 8,
    },
});
