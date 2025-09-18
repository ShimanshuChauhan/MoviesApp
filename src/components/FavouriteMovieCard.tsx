import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";

type FavouriteMovieCardProps = {
  id: number,
  poster: string;
  title: string;
  rating: number;
  duration: number;
  onRemove: (id: number) => void;
};

export default function FavouriteMovieCard({ id, poster, title, rating, duration, onRemove }: FavouriteMovieCardProps) {
  const { height, width } = Dimensions.get("screen");
  const CARD_HEIGHT = height * 0.15; // slightly taller
  const POSTER_WIDTH = width * 0.2;

  return (
    <View style={[styles.card, { height: CARD_HEIGHT }]}>
      {/* Left: Poster */}
      <Image source={{ uri: poster }} style={[styles.poster, { width: POSTER_WIDTH, height: CARD_HEIGHT - 10 }]} />

      {/* Middle: Title, Rating & Duration */}
      <View style={styles.middle}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        <Text style={styles.info}>⭐ {rating}  •  🕛 {duration} min</Text>
      </View>

      {/* Right: Heart */}
      <TouchableOpacity style={styles.right}>
        <FontAwesome5 name="heart" iconStyle="solid" size={30} color={"#ff0000a9"} style={{ elevation: 4 }} onPress={() => onRemove(id)} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  poster: {
    borderRadius: 15,
    resizeMode: 'cover',
  },
  middle: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  info: {
    marginTop: 4,
    fontSize: 14,
    color: '#aaa',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  heart: {
    fontSize: 24,
    shadowColor: "#ff4d6d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
