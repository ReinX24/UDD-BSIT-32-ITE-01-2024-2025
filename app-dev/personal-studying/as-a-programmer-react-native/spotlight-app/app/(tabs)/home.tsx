import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { styles } from "../../styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={COLORS.white}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        style={styles.storiesContainer}
      >
        {/* Stories */}
        {STORIES.map((story) => {
          return <Story key={story.id} story={story}></Story>;
        })}
        {/* End of Stories */}
      </ScrollView>

      {/* Posts */}
      {/* TODO: continue 344 @5:52 */}
      {/* End of Posts */}
    </View>
  );
}
