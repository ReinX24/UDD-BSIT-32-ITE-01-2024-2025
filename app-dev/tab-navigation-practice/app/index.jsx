import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/(tabs)/home"}></Redirect>;
  // return (
  // <View
  //   style={{
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // >
  //   <Text>Welcome!</Text>

  // </View>
  // );
}
