import { StyleSheet, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import PopularMovies from '../components/PopularMovies';
import TrendingMovies from '../components/TrendingMovies';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <TrendingMovies />
      <PopularMovies />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 16,
  }
});
