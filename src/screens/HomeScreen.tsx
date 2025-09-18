import { StyleSheet, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import PopularMovies from '../components/PopularMovies';
import TrendingMovies from '../components/TrendingMovies';
import { useEffect, useState } from 'react';
import { getPopularMoviesData, getTrendingMoviesData } from '../api/tmdb';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true);
        const popular = await getPopularMoviesData();
        const trending = await getTrendingMoviesData();
        setTrendingMovies(trending);
        setPopularMovies(popular);
        console.log(popular)
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPopularMovies();
  }, [])
  return (
    <View style={styles.container}>
      <SearchBar />
      <TrendingMovies isLoading={isLoading} trendingMovies={trendingMovies} />
      <PopularMovies isLoading={isLoading} popularMovies={popularMovies} />
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
