import React from "react";
import { Redirect } from "expo-router";

// import { View, Text } from "react-native";
// import { styles } from "@/styles/auth.styles";
// import { Link } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

// export default function Index() {
//   return (
//     <View style={styles.container}>
//       <Link href="/old_index">Go To Old Index</Link>
//     </View>
//   );
// }
