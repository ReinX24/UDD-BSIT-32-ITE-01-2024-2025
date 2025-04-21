import { StyleSheet, Text, View } from "react-native";

type ProfileProps = {
  userId: string;
  showBackButton: boolean;
};

export default function Profile() {
  return (
    <View>
      <Text>Profile component</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
