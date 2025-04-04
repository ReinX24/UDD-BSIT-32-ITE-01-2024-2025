import { STORIES } from "@/constants/mock-data";
import { FlatList } from "react-native";
import Story from "./Story";
import { styles } from "@/styles/feed.styles";

const Stories = () => {
  return (
    // Using FlatList (only loads needed data)
    <FlatList
      data={STORIES}
      renderItem={({ item }: any) => {
        return <Story story={item} />;
      }}
      keyExtractor={(item) => {
        return item.id;
      }}
      horizontal
      showsVerticalScrollIndicator={false}
      style={styles.storiesContainer}
    />

    // Using ScrollView (loads all data at once)
    // <ScrollView
    //   horizontal
    //   showsVerticalScrollIndicator={false}
    //   style={[styles.storiesContainer]}
    // >
    //   {STORIES.map((story) => {
    //     return <Story key={story.id} story={story}></Story>;
    //   })}
    // </ScrollView>
  );
};

export default Stories;
