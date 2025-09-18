import React from "react";
import { StyleSheet } from "react-native";
// import SearchBar from "./src/components/SearchBar"; // adjust path
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <GestureHandlerRootView style={{ flex: 1 }} >
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)'
  },
});
