import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { Hero } from '../types/hero.interface';

interface FavoriteHeroeContext {
  // states
  favorites: Hero[];
  favoriteCount: number;
  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroeContext = createContext({} as FavoriteHeroeContext);

// siempre es bueno usar zod para validar
const getFavoriteFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

// componente provider
// se usa usestate para hacer rirender
export const FavoriteHeroeProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoriteFromLocalStorage());
  const toggleFavorites = (hero: Hero) => {
    const existHero = favorites.some((h) => h.id === hero.id);

    if (existHero) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id == hero.id);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroeContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorites,
      }}
    >
      {children}
    </FavoriteHeroeContext>
  );
};
