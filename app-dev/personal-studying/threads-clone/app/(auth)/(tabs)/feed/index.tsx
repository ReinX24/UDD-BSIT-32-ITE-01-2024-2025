import { View, Text, Button } from "react-native";
import * as Sentry from "@sentry/react-native";

const FeedIndex = () => {
  const testError = () => {
    try {
      throw new Error("Test Error");
    } catch (error) {
      const sentryID = Sentry.captureMessage("Houston, we have a problem!");
      console.log("Sentry ID:", sentryID);

      const userFeedback: Sentry.UserFeedback = {
        event_id: sentryID,
        name: "John Doe",
        email: "johndoe@example.com",
        comments: "This was not so cool",
      };

      Sentry.captureUserFeedback(userFeedback);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Index</Text>
      <Button onPress={testError} title="Test Error" />
    </View>
  );
};

export default FeedIndex;
