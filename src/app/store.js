import { combineReducers, configureStore } from '@reduxjs/toolkit';
import briefReducer from '../features/BriefList/BriefSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { briefApi } from './services/Brief';
import { artistApi } from './services/Artist';
import artistReducer from '../features/Artist/ArtistSlice';

export const store = configureStore({
  reducer: {
    brief: briefReducer,
    [briefApi.reducerPath]: briefApi.reducer, // them reducer tao tu api slice
    artist: artistReducer,
    [artistApi.reducerPath]: artistApi.reducer
  },
  //enable cac tinh nang cua rtk
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(briefApi.middleware)
  .concat(artistApi.middleware)
});


setupListeners(store.dispatch)
