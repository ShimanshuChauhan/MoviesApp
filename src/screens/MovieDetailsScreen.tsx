import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMovieDetailsById } from "../api/tmdb";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import { getAllFavouriteMovies, removeMovie, saveMovie } from "../utils/storage";

type MovieDetails = {
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
};

export default function MovieDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { movieId } = route.params as { movieId: number };
  const { width } = Dimensions.get("window");
  const POSTER_WIDTH = width * 0.9;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function handleFavouriteButton(id: number) {
    try {
      if (!isFavourite) {
        await saveMovie(id);
        setIsFavourite((isFavourite) => !isFavourite);
        ToastAndroid.showWithGravity("Added to favourites ❤️", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
      } else {
        await removeMovie(id);
        setIsFavourite((isFavourite) => !isFavourite);
        ToastAndroid.showWithGravity("Removed from favourites", ToastAndroid.BOTTOM, ToastAndroid.SHORT);

      }
      const movies = await getAllFavouriteMovies();
    } catch (err) {
      ToastAndroid.showWithGravity("Something went wrong", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setIsLoading(true);
        const movieDetails = await getMovieDetailsById(movieId);
        const favouriteMovies = await getAllFavouriteMovies();
        const isFavouriteMovie = favouriteMovies.includes(movieId);
        setIsFavourite(isFavouriteMovie);
        setMovie(movieDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <>
            {/* Skeleton Poster */}
            <View style={[styles.posterContainer, { width: POSTER_WIDTH }]}>
              <View style={styles.skeletonBox} />
            </View>

            {/* Skeleton Title & Rating */}
            <View style={styles.detailsContainer}>
              <View style={[styles.skeletonLine, { width: 200, height: 28 }]} />
              <View style={[styles.skeletonLine, { width: 60, height: 18 }]} />
            </View>

            {/* Skeleton Release Date */}
            <View style={[styles.skeletonLine, { width: 120, height: 16 }]} />

            {/* Skeleton Overview */}
            <View style={styles.overviewContainer}>
              <View style={[styles.skeletonLine, { width: 100, height: 20 }]} />
              <View style={[styles.skeletonLine, { width: "100%", height: 14, marginTop: 8 }]} />
              <View style={[styles.skeletonLine, { width: "90%", height: 14, marginTop: 6 }]} />
              <View style={[styles.skeletonLine, { width: "80%", height: 14, marginTop: 6 }]} />
            </View>
          </>
        ) : (
          movie && (
            <>
              {/* Poster */}
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <FontAwesome5 name="chevron-left" iconStyle="solid" size={25} color={'#ffffffff'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.favouriteButton} onPress={() => handleFavouriteButton(movieId)}>
                <FontAwesome5 name="heart" iconStyle={isFavourite ? "solid" : "regular"} size={25} color={'#ff0000a9'} />
              </TouchableOpacity>
              <View style={[styles.posterContainer, { width: POSTER_WIDTH }]}>
                <Image
                  source={{
                    uri: `${movie.poster_path}`,
                  }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              </View>

              {/* Title & Rating */}
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.rating}>
                  ⭐ {movie.vote_average} / 10
                </Text>
              </View>

              {/* Release Date */}
              <Text style={styles.releaseDate}>
                Released: {movie.release_date}
              </Text>

              {/* Overview */}
              <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>Overview</Text>
                <Text style={styles.overviewText}>{movie.overview}</Text>
              </View>
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    paddingRight: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
    zIndex: 100
  },
  favouriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
    zIndex: 100
  },
  contentContainer: {
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  posterContainer: {
    aspectRatio: 2 / 3,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
  },
  rating: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  releaseDate: {
    alignSelf: "flex-start",
    color: "#aaa",
    fontSize: 14,
  },
  overviewContainer: {
    width: "100%",
    marginTop: 8,
  },
  overviewTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  overviewText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  /* Skeleton styles */
  skeletonBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
  },
  skeletonLine: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
});
