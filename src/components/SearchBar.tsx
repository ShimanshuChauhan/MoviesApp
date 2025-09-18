import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";
import { searchMoviesByName } from "../api/tmdb";

const SearchBar = () => {
  const { width, height } = Dimensions.get("window");
  const startingWidth = 50;
  const expandedWidth = width * 0.9;

  const widthAnim = useRef(new Animated.Value(startingWidth)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBarY, setSearchBarY] = useState(0); // store Y position of search bar
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const searchContainerRef = useRef<View>(null);

  const handleSubmit = () => console.log(searchValue);

  const handleInputChange = (text: string) => {
    setSearchValue(text);
  }

  const toggleFocus = () => {
    if (isFocused) {
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 0, duration: 100, useNativeDriver: false }),
        Animated.timing(widthAnim, { toValue: startingWidth, duration: 300, useNativeDriver: false }),
      ]).start(() => {
        setIsFocused(false);
        setSearchValue("");
      });
    } else {
      setIsFocused(true);
      Animated.timing(widthAnim, { toValue: expandedWidth, duration: 300, useNativeDriver: false }).start(() => {
        Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: false }).start();
      });
    }
  };

  useEffect(() => {
    const search = async () => {
      try {
        setIsResultsLoading(true)
        const results = await searchMoviesByName(searchValue);
        setSearchResults(results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsResultsLoading(false);
      }
    }
    search();
  }, [searchValue])

  return (
    <View style={{ width: "100%", zIndex: 10 }}>
      <View
        ref={searchContainerRef}
        onLayout={() => {
          searchContainerRef.current?.measure((x, y, w, h, px, py) => setSearchBarY(py + h)); // get absolute Y + height
        }}
        style={styles.searchContainer}
      >
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

      {/* Absolute Results Container */}
      {isFocused && searchValue.trim().length > 0 && (
        <View style={[styles.resultsContainer, { top: searchBarY }]}>
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultItem} onPress={() => console.log(item.name)}>
                <View style={styles.resultItem} >
                  <View style={[styles.imageContainer, { width: height / 14 }]} >
                    <Image
                      source={{ uri: `${item.poster_path}` }}
                      style={styles.poster}
                      resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text style={styles.resultText}>{item.name}</Text>
                    <Text style={{ color: '#fff' }} >{item.release_date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingVertical: 5 }}
          />
        </View>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "flex-end",
    margin: 10,
  },
  searchInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
    flex: 1,
  },
  icon: { marginRight: 10 },
  resultsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.82)",
    borderRadius: 10,
    maxHeight: 500,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  imageContainer: {
    // backgroundColor: 'blue',
    aspectRatio: 2 / 3,
    borderWidth: 0.3,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5
  },
  resultItem: {
    padding: 7,
    // backgroundColor: 'green',
    flexDirection: 'row',
    gap: 10,
  },
  resultText: {
    color: "#fff",
    fontSize: 16,
  },
  poster: {
    width: '100%',
    height: '100%'
  }
});

export default SearchBar;
