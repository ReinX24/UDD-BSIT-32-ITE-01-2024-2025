import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Button,
} from "react-native";

function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, World!</Text>
            <Text>Rein Aldwin E. Solis</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const Cafe = () => {
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <Text>Welcome!</Text>
            <Cat name="John"></Cat>
            <Cat name="Jane"></Cat>
        </ScrollView>

        // <ScrollView>
        //     <Text>Some text</Text>
        //     <Image
        //         source={{
        //             uri: "https://reactnative.dev/docs/assets/p_cat2.png",
        //         }}
        //         style={{ width: 200, height: 200 }}
        //     ></Image>
        //     <View>
        //         <TextInput
        //             style={{
        //                 height: 40,
        //                 borderColor: "gray",
        //                 borderWidth: 1,
        //             }}
        //             defaultValue="You can type in me"
        //         />
        //     </View>
        // </ScrollView>
    );
};

const Cat = (props) => {
    // return <Text>Hello, I am {getFullName("Rum", "Tum", "Tugger")}!</Text>;

    const [isHungry, setIsHungry] = useState(true);
    return (
        <View>
            <Text>
                I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
            </Text>
            <Button
                onPress={() => {
                    setIsHungry(false);
                }}
                disabled={!isHungry}
                title={isHungry ? "Give me some food please!" : "Thank you!"}
            ></Button>
        </View>
    );
};

const Counter = () => {
    const [countValue, setCount] = useState(0);
    return (
        <View>
            <Text style={({ textAlign: "center" }, styles.title)}>
                {countValue}
            </Text>
            <Fragment>
                <Button
                    onPress={() => {
                        setCount(countValue + 1);
                    }}
                    title={"+"}
                ></Button>
                <Button
                    onPress={() => {
                        setCount(countValue - 1);
                    }}
                    title={"-"}
                ></Button>
            </Fragment>
        </View>
    );
};

const getFullName = (firstName, secondName, thirdName) => {
    return firstName + " " + secondName + " " + thirdName;
};

// export default Cafe;
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        justifyContent: "center",

        // borderWidth: 4,
        // borderColor: "#000000",
    },
    title: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
    },
});
