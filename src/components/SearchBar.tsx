import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";

const SearchBar = () => {
  const { width } = Dimensions.get("window");
  const startingWidth = 50;
  const expandedWidth = width * 0.9;

  const widthAnim = useRef(new Animated.Value(startingWidth)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSerachValue] = useState("");

  function handleSubmit() {
    console.log(searchValue)
  }

  function handleInputChange(text: string) {
    setSerachValue(() => text);
  }

  const toggleFocus = () => {
    if (isFocused) {
      // Collapse: fade out input first
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnim, {
          toValue: startingWidth,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => setIsFocused(false));
    } else {
      // Expand: animate width first, then fade in input
      setIsFocused(true);
      Animated.timing(widthAnim, {
        toValue: expandedWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }).start();
      });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Animated.View style={[styles.searchInner, { width: widthAnim }]}>
        {isFocused && (
          <Animated.View style={{ flex: 1, opacity: opacityAnim }}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#fff"
              style={styles.searchInput}
              cursorColor="#fff"
              autoFocus
              value={searchValue}
              onChangeText={handleInputChange}
              onSubmitEditing={handleSubmit}
            />
          </Animated.View>
        )}

        <TouchableOpacity onPress={toggleFocus} style={isFocused && styles.icon}>
          <FontAwesome5
            name={isFocused ? "times" : "search"}
            size={20}
            color="#fff"
            iconStyle="solid"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  searchInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // semi-transparent background
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)", // subtle border for glass effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  searchInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;
