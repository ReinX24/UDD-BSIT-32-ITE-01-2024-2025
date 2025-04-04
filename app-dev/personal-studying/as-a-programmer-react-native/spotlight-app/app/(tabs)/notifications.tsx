import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { FlatList, Text, View } from "react-native";

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications);

  // If the notifications is undefined, this means that it is loading
  if (notifications === undefined) {
    return <Loader />;
  }

  // If there are no notifications
  if (notifications.length === 0) {
    return <NoNotificationsFound />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }: any) => {
          return <Notification notification={item} />;
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const NoNotificationsFound = () => {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons name="notifications-outline" size={48} color={COLORS.primary} />
      <Text style={{ fontSize: 20, color: COLORS.white }}>
        No notifications yet
      </Text>
    </View>
  );
};
