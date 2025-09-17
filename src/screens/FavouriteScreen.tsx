import { View, Text, StyleSheet } from "react-native";
export default function FavouriteScreen() {
  return (
    <View style={styles.container} >
      <Text>
        Favourites
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})