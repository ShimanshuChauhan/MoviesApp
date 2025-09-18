import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'favouriteMovies';

export const saveMovie = async (id: number) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    let favourites: number[] = existing ? JSON.parse(existing) : [];

    if (!favourites.includes(id)) {
      favourites.push(id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const removeMovie = async (id: number) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existing) return false;

    let favourites: number[] = JSON.parse(existing);
    favourites = favourites.filter(movieId => movieId !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllFavouriteMovies = async (): Promise<number[]> => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
