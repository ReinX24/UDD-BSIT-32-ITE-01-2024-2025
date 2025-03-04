import { useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button,
    Animated,
} from "react-native";

const BasicAnimation: React.FC = () => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const translateAnimation = useRef(new Animated.Value(0)).current;

    const handeFadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const handleFadeOut = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Basic Animations Demo</Text>
            <Text style={styles.headerText}>Fade In & Fade Out Demo</Text>

            {/* Fade animation demo */}
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.fadeBox,
                        {
                            opacity: fadeAnimation,
                        },
                    ]}
                ></Animated.View>
                <View style={styles.buttonContainer}>
                    <Button title="Fade In" onPress={handeFadeIn} />
                    <Button title="Fade Out" onPress={handleFadeOut} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#f0f0f0",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    demoContainer: {
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10,
    },
    box: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        backgroundColor: "#f2f2f2",
    },
    fadeBox: {
        backgroundColor: "#3498db",
    },
});

export default BasicAnimation;
