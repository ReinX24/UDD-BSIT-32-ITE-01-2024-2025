import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const EditProfile = () => {
  const {
    bioString: bioString,
    linkString: linkstring,
    userId,
    imageUrl,
  } = useLocalSearchParams<{
    bioString: string;
    linkString: string;
    userId: string;
    imageUrl: string;
  }>();

  return (
    <View>
      <Text>edit-profile</Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
