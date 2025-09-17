import { FlatList, StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PopularMovies() {
  const movies = Array.from({ length: 100 }, (_, i) => `Home ${i + 1}`);
  const { width } = Dimensions.get("screen");

  const numColumns = 2;
  const spacing = 10;
  const padding = 20;
  const ITEM_WIDTH = (width - padding - spacing * (numColumns - 1) - 30) / numColumns;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.trendingText}>Popular</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Grid of movies */}
        <FlatList
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} >
              <View style={[styles.item, { width: ITEM_WIDTH }]}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-evenly", marginBottom: spacing }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  trendingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#fff",
    fontSize: 14,
  },
  item: {
    backgroundColor: "#8feea0ff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 2 / 3,
    padding: 5,
  },
});
