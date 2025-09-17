import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TrendingMovies() {
  const movies = Array.from({ length: 50 }, (_, i) => `Trending ${i + 1}`);
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.trendingText}>Trending Now</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal movie list */}
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} >
            <View style={[styles.item, { width: width / 2 - 30 }]}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // backgroundColor: "#fd6868ff"
    marginBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  trendingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  seeAllText: {
    color: "#fff",
    fontSize: 14
  },
  item: {
    backgroundColor: "#8feea0ff",
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 2 / 3
  }
});
