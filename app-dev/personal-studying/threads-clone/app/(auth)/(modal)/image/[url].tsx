import { COLORS } from "@/constants/COLORS";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { StatusBar } from "expo-status-bar";

const Page = () => {
  const { url } = useLocalSearchParams();
  // console.log("url:", url);

  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <View style={styles.container}>
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
  },
});
