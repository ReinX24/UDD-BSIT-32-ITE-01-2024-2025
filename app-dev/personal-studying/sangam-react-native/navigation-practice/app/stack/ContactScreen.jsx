import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const ContactScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>This is the contact screen.</Text>
      <Text>{route.params.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ContactScreen;
