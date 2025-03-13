import { View, Text, StyleSheet } from "react-native";

const Projects: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Projects</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default Projects;
