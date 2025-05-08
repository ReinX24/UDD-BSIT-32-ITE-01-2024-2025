import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  const { url } = useLocalSearchParams();
  console.log("url:", url);
  return (
    <View>
      <Text>Url Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
