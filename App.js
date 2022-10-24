import * as React from "react";
import { Provider } from "react-redux";
import store from "./Src/store";

// import CustomCamera from './src/components/CustomCamera'
import MainNavigator from "./Src/Config/Navigation";

import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
