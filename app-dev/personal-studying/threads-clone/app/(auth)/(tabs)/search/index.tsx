import ProfileSearchResult from "@/components/ProfileSearchResult";
import { COLORS } from "@/constants/COLORS";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchIndex = () => {
  const [search, setSearch] = useState("");
  const userList = useQuery(api.users.searchUsers, { searchQuery: search });
  const { top } = useSafeAreaInsets();

  const handleChangeText = (text: string) => {
    setSearch(text);
  };

  const handleCancel = () => {
    setSearch("");
  };

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Stack.Screen
        options={{
          title: "Search",
          headerShown: false,
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (event) => {
              setSearch(event.nativeEvent.text);
            },
            tintColor: "black",
            autoFocus: true,
            hideWhenScrolling: false,
            onCancelButtonPress: () => {
              setSearch("");
            },
          },
        }}
      />
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={handleChangeText}
          autoFocus
        />
        {search.length > 0 && (
          <View style={{ marginLeft: 4 }}>
            <TouchableOpacity onPress={handleCancel}>
              <MaterialIcons name="clear" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={userList}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => {
          return <ProfileSearchResult user={item as Doc<"users">} />;
        }}
      />
      <StatusBar backgroundColor={COLORS.background} />
    </View>
  );
};

export default SearchIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.background,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
