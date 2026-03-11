import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (event) =>
        set((state) => {
          const exists = state.favorites.some(
            (item) => String(item.id) === String(event.id)
          );
          if (exists) return state;
          return { favorites: [...state.favorites, event] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (item) => String(item.id) !== String(id)
          ),
        })),

      isFavorite: (id) => {
        return get().favorites.some(
          (item) => String(item.id) === String(id)
        );
      },
    }),
    {
      name: "favorite-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useFavoriteStore;
