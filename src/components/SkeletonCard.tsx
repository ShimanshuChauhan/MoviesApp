import React from "react";
import { View, StyleSheet } from "react-native";

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
      {/* Poster */}
      <View style={styles.poster} />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.title} />
        <View style={styles.details} />
      </View>

      {/* Heart Placeholder */}
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: "#222",
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    height: 20,
    width: "70%",
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 10,
  },
  details: {
    height: 15,
    width: "50%",
    backgroundColor: "#333",
    borderRadius: 5,
  },
  right: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#222",
    alignSelf: "center",
  },
});
