import { useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button,
    Animated,
    Easing,
} from "react-native";

const BasicAnimation: React.FC = () => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const translateAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;
    const springAnimation = useRef(new Animated.Value(0)).current;
    const bounceAnimation = useRef(new Animated.Value(0)).current;

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

    const handleTranslate = () => {
        Animated.timing(translateAnimation, {
            toValue: 100,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
        }).start();
    };

    const handleScale = () => {
        Animated.sequence([
            Animated.timing(scaleAnimation, {
                toValue: 1.5,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 3,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleRotate = () => {
        Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            rotateAnimation.setValue(0);
        });
    };

    const spin = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const handleSpring = () => {
        Animated.spring(springAnimation, {
            toValue: 100,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start(() => {
            springAnimation.setValue(0);
        });
    };

    const handleBounce = () => {
        Animated.sequence([
            Animated.spring(bounceAnimation, {
                toValue: -20,
                useNativeDriver: true,
            }),
            Animated.spring(bounceAnimation, {
                toValue: 0,
                useNativeDriver: true,
            }),
        ]).start();
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

            {/* Translate animation demo */}
            <Text style={styles.headerText}>Translate Demo</Text>
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.translateBox,
                        {
                            transform: [{ translateX: translateAnimation }],
                        },
                    ]}
                ></Animated.View>
                <Button title="Translate" onPress={handleTranslate} />
            </View>

            {/* Scale animation demo */}
            <Text style={styles.headerText}>Scale Demo</Text>
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.scaleBox,
                        {
                            transform: [
                                {
                                    scale: scaleAnimation,
                                },
                            ],
                        },
                    ]}
                ></Animated.View>
                <Button title="Scale" onPress={handleScale} />
            </View>

            {/* Rotate animation demo */}
            <Text style={styles.headerText}>Rotate Demo</Text>
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.rotateBox,
                        {
                            transform: [
                                {
                                    rotate: spin,
                                },
                            ],
                        },
                    ]}
                ></Animated.View>
                <Button title="Rotate" onPress={handleRotate} />
            </View>

            {/* Spring animation demo */}
            <Text style={styles.headerText}>Spring Demo</Text>
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.springBox,
                        {
                            transform: [
                                {
                                    translateX: springAnimation,
                                },
                            ],
                        },
                    ]}
                ></Animated.View>
                <Button title="Spring" onPress={handleSpring} />
            </View>

            {/* Bounce animation demo */}
            <Text style={styles.headerText}>Bounce Demo</Text>
            <View style={styles.demoContainer}>
                <Animated.View
                    style={[
                        styles.box,
                        styles.bounceBox,
                        {
                            transform: [
                                {
                                    translateY: bounceAnimation,
                                },
                            ],
                        },
                    ]}
                ></Animated.View>
                <Button title="Bounce" onPress={handleBounce} />
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
    translateBox: {
        backgroundColor: "#89c825",
    },
    scaleBox: {
        backgroundColor: "#C84025",
    },
    rotateBox: {
        backgroundColor: "#7125C8",
    },
    springBox: {
        backgroundColor: "#C825C5",
    },
    bounceBox: {
        backgroundColor: "#C8252A",
    },
});

export default BasicAnimation;
