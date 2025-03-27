import { styles } from "@/styles/feed.styles";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

// TODO: add the actual type
export default function Post({ post }: { post: any }) {
  return (
    <View style={styles.post}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeader}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* SHOW DELETE BUTTON IF OWNER TODO: do this later */}
        {/* <TouchableOpacity>
          <Ionicons
            name={"ellipsis-horizontal"}
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Ionicons name={"trash-outline"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
        {/* END OF SHOW DELETE BUTTON */}
      </View>
      {/* END OF POST HEADER */}

      {/* IMAGE */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />
      {/* END OF IMAGE */}

      {/* POST ACTIONS */}
      <View>{/* TODO: continue @344 - 13:04 */}</View>
      {/* END OF POST ACTIONS */}
    </View>
  );
}
