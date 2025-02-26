import Basic from "@/components/Basic";
import ScrollViewComponent from "@/components/ScrollView";
import TextInputComponent from "@/components/TextInput";
import FlexLayout from "@/components/FlexLayout";
import Styling from "@/components/Styling";
import TouchableComponents from "@/components/Touchable";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function App() {
    return (
        <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.scrollViewContent}
        >
            {/* <Basic /> */}
            {/* <TextInputComponent /> */}
            {/* <ScrollViewComponent /> */}
            {/* <Styling /> */}
            {/* <FlexLayout /> */}
            <TouchableComponents />
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
        // borderColor: "gray",
        // borderWidth: 4,
    },
});
