import { View, Text, StyleSheet, FlatList } from "react-native";

// Sample data / data from an api
const FLAT_DATA = Array.from({ length: 50 }, (_, index) => {
  return {
    id: index.toString(),
    title: `Item ${index + 1}`,
  };
});

type DataProp = {
  item: {
    id: string;
    title: string;
  };
};

const FlatListScreen: React.FC = () => {
  const handleRenderItem = ({ item }: DataProp) => {
    return (
      <View style={styles.item}>
        <Text>ID: {item.id}</Text>
        <Text>Title: {item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flatlist Example</Text>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.flatListHeader}>FlatList Header</Text>
        }
        ListFooterComponent={
          <Text style={styles.flatListFooter}>FlatList Footer</Text>
        }
        keyExtractor={(item) => {
          return item.id;
        }}
        data={FLAT_DATA}
        renderItem={handleRenderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2f2f2f",
  },
  flatListHeader: {
    fontSize: 30,
    fontWeight: "bold",
  },
  flatListFooter: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4f4f4f",
  },
});

export default FlatListScreen;
