import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const ModalScreen: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    console.log(showModal);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Modal Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setShowModal(!showModal);
                }}
            >
                <Text style={styles.buttonText}>Show Modal</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
                transparent={true}
            >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <Text>Modal Component</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setShowModal(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        padding: 10,
        backgroundColor: "#2f2f2f",
        borderRadius: 5,
        marginBottom: 10,
        minWidth: 250,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: "#f2f2f2",
        fontWeight: "bold",
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: "#f2f2f2",
        padding: 16,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
});

export default ModalScreen;
