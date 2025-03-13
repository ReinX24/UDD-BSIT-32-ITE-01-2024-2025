import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./app/navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
