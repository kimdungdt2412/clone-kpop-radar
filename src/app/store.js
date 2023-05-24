import { combineReducers, configureStore } from '@reduxjs/toolkit';
import briefReducer from '../features/BriefList/BriefSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { briefApi } from './services/Brief';
import { artistApi } from './services/Artist';
import artistReducer from '../features/Artist/ArtistSlice';
import youtubeReducer from '../features/Youtube/YoutubeSlice';
import { youtubeApi } from './services/Youtube';
import { channelApi } from './services/Channel';
import channelReducer from '../features/Channel/ChannelSlice';

export const store = configureStore({
  reducer: {
    brief: briefReducer,
    [briefApi.reducerPath]: briefApi.reducer, // them reducer tao tu api slice
    artist: artistReducer,
    [artistApi.reducerPath]: artistApi.reducer,
    youtube: youtubeReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    channel: channelReducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  //enable cac tinh nang cua rtk
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(briefApi.middleware)
  .concat(artistApi.middleware)
  .concat(youtubeApi.middleware)
  .concat(channelApi.middleware)
});


setupListeners(store.dispatch)
