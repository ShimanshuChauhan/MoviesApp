import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5"; // or react-native-vector-icons

const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <FontAwesome5 name="home" color={color} size={size} iconStyle="solid" />
);

const FavouriteTabBarIcon = ({ color, size }: { color: string; size: number }) => (
  <FontAwesome5 name="heart" color={color} size={size} iconStyle="solid" />
);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffffff",
        tabBarInactiveTintColor: "#ffffff65",
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.3)", // semi-transparent glassy look
          borderTopWidth: 0,
          height: 60,
        },
        animation: 'fade',
        tabBarHideOnKeyboard: true
      }}
      safeAreaInsets={{ bottom: 0 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: FavouriteTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
}
