import { Doc } from "@/convex/_generated/dataModel";
import { StyleSheet, Text, View } from "react-native";

type ProfileSearchResultProps = {
  user: Doc<"users">;
};

const ProfileSearchResult = ({ user }: ProfileSearchResultProps) => {
  return (
    <View>
      <Text>{user.username}</Text>
    </View>
  );
};

export default ProfileSearchResult;

const styles = StyleSheet.create({});
