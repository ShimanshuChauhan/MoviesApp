import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type PopularMovie = {
  id: number;
  poster_path: string;
};

type PopularMovieProps = {
  isLoading: boolean;
  popularMovies: PopularMovie[];
};

const { width } = Dimensions.get("screen");
const numColumns = 2;
const spacing = 10;
const padding = 20;
const ITEM_WIDTH =
  (width - padding - spacing * (numColumns - 1) - 30) / numColumns;

/** 🎭 Skeleton Loader */
const MovieSkeleton = () => (
  <View style={[styles.skeleton, { width: ITEM_WIDTH }]} />
);

export default function PopularMovies({ isLoading, popularMovies }: PopularMovieProps) {
  const skeletonMovies = Array.from({ length: 6 }, (_, i) => `Skeleton-${i}`);
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.popularText}>Popular</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={isLoading ? skeletonMovies : popularMovies}
          keyExtractor={(item, index) =>
            isLoading ? index.toString() : (item as PopularMovie).id.toString()
          }
          renderItem={({ item }) =>
            isLoading ? (
              <MovieSkeleton />
            ) : (
              <TouchableOpacity
                style={{ borderRadius: 12 }}
                activeOpacity={0.75}
                onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
              >
                <View style={[styles.item, { width: ITEM_WIDTH }]}>
                  <Image
                    source={{ uri: `${(item as PopularMovie).poster_path}` }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            )
          }
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
    marginBottom: 12,
  },
  popularText: {
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
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 5,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  skeleton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    aspectRatio: 2 / 3,
    marginBottom: spacing,
  },
});
