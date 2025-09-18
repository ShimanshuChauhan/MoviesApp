import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FavouriteMovieCard from "../components/FavouriteMovieCard";
import { getFavouriteMoviesDetails } from "../api/tmdb";
import { getAllFavouriteMovies, removeMovie } from "../utils/storage";
import SkeletonCard from "../components/SkeletonCard";

export default function FavouriteMoviesList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const favouriteMovieIds = await getAllFavouriteMovies();
      if (favouriteMovieIds.length === 0) {
        setMovies([]);
      } else {
        const data = await getFavouriteMoviesDetails(favouriteMovieIds);
        setMovies(data);
      }
    } catch (error) {
      console.error("Error fetching favourite movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh favourites when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchFavourites();
    }, [])
  );

  async function handleRemove(id: number) {
    const success = await removeMovie(id);
    if (success) {
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } else {
      Alert.alert("Error", "Failed to remove movie from favourites");
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        {[...Array(5)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FavouriteMovieCard
            id={item.id}
            poster={item.poster}
            title={item.title}
            rating={item.rating}
            duration={item.duration}
            onRemove={() => handleRemove(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 10, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favourite movies yet 🎬</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});
