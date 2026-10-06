import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  serviceIds: number[];
}

const loadFavorites = (): number[] => {
  const savedFavorites = localStorage.getItem("favoriteServiceIds");

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  serviceIds: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.serviceIds.includes(action.payload)) {
        state.serviceIds.push(action.payload);

        localStorage.setItem(
          "favoriteServiceIds",
          JSON.stringify(state.serviceIds)
        );
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.serviceIds = state.serviceIds.filter(
        (id) => id !== action.payload
      );

      localStorage.setItem(
        "favoriteServiceIds",
        JSON.stringify(state.serviceIds)
      );
    },

    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.serviceIds.includes(id)) {
        state.serviceIds = state.serviceIds.filter(
          (serviceId) => serviceId !== id
        );
      } else {
        state.serviceIds.push(id);
      }

      localStorage.setItem(
        "favoriteServiceIds",
        JSON.stringify(state.serviceIds)
      );
    },

    clearFavorites: (state) => {
      state.serviceIds = [];

      localStorage.removeItem("favoriteServiceIds");
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;