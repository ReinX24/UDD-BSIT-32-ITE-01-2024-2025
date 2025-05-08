import { COLORS } from "@/constants/COLORS";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { url } = useLocalSearchParams();
  // console.log("url:", url);

  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.dismiss();
          }}
          style={{ position: "relative", top: 50, left: 25, zIndex: 9999 }}
        >
          <Ionicons name="close" size={24} color={"white"} />
        </TouchableOpacity>
        <>
          <ImageZoom
            uri={url as string}
            style={styles.image}
            resizeMode={"contain"}
            minScale={0.5}
            maxScale={5}
            isDoubleTapEnabled
            isSingleTapEnabled
            doubleTapScale={2}
          />
        </>
      </View>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
});
