import { Dimensions, FlatList, StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

type TrendingMovie = {
  id: number;
  poster_path: string;
};

type TrendingMoviesProps = {
  isLoading: boolean;
  trendingMovies: TrendingMovie[];
};

export default function TrendingMovies({ isLoading, trendingMovies }: TrendingMoviesProps) {
  const movies = Array.from({ length: 10 }, (_, i) => `Trending ${i + 1}`);
  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = width / 2 - 30;

  const renderSkeleton = () => (
    <View style={[styles.skeleton, { width: ITEM_WIDTH }]} />
  );

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
        data={isLoading ? movies : trendingMovies}
        keyExtractor={(item, index) =>
          isLoading ? index.toString() : item.id.toString()
        }
        renderItem={({ item }) =>
          isLoading ? (
            renderSkeleton()
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={() => console.log(item.id)}>
              <View style={[styles.item, { width: ITEM_WIDTH }]}>
                <Image
                  source={{ uri: `${item.poster_path}` }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'space-evenly', paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  trendingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  seeAllText: {
    color: "#aaa",
    fontSize: 14,
  },
  item: {
    borderWidth: 0.1,
    borderColor: "rgba(255, 255, 255, 0.27)",
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: 2 / 3,
    backgroundColor: "#222", // fallback for poster loading
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 5
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  skeleton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    marginRight: 10,
    aspectRatio: 2 / 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 3,
  },
});
