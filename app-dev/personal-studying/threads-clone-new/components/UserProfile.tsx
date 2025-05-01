import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type UserProfileProps = {
  userId?: string;
};

const UserProfile = ({ userId }: UserProfileProps) => {
  const profile = useQuery(api.users.getUserById, {
    userId: userId as Id<"users">,
  });
  const { userProfile } = useUserProfile();
  const isSelf = userId === userProfile?._id;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text style={styles.username}>@{profile?.username}</Text>
        </View>
        <Image
          source={{ uri: profile?.imageUrl as string }}
          style={styles.image}
        />
      </View>
      <Text style={styles.bio}>{profile?.bio || "No bio"}</Text>
      <Text>
        {profile?.followersCount} • {profile?.websiteUrl || "No website"}
      </Text>

      <View style={styles.buttonRow}>
        {/* Shows if we are viewing our own profile */}
        {isSelf && (
          <>
            <Link
              href={`/edit-profile?userId=${profile?._id}&imageUrl=${profile?.imageUrl ? encodeURIComponent(profile.imageUrl) : ""}&bioString=${profile?.bio ? encodeURIComponent(profile.bio) : ""}&linkString=${profile?.websiteUrl ? encodeURIComponent(profile.websiteUrl) : ""}`}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share Profile</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Shows if we are viewing the profile of another user */}
        {!isSelf && (
          <>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Mention</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.background,
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: COLORS.border,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#000",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  fullButtonText: {
    fontWeight: "bold",
    color: COLORS.background,
  },
});
