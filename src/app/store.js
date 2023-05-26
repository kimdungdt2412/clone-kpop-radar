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
import { snsApi } from './services/SNS';
import snsReducer from '../features/SNS/Slice';
import tiktokReducer from '../features/Tiktok/TiktokSlice';
import { tiktokApi } from './services/Tiktok';
import { siteArtistApi } from './services/SiteArtist';
import siteArtistReducer from '../features/SiteArtist/SiteArtistSlice';
import { fancafeApi } from './services/Fancafe';
import fancafeReducer from '../features/Fancafe/FancafeSlice';
import { badgeApi } from './services/Badge';
import badgeReducer from '../features/Badge/BadgeSlice';

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
    sns: snsReducer,
    [snsApi.reducerPath]: snsApi.reducer,
    tiktok: tiktokReducer,
    [tiktokApi.reducerPath]: tiktokApi.reducer,
    siteArtist: siteArtistReducer,
    [siteArtistApi.reducerPath]: siteArtistApi.reducer,
    fancafe: fancafeReducer,
    [fancafeApi.reducerPath]: fancafeApi.reducer,
    badge: badgeReducer,
    [badgeApi.reducerPath]: badgeApi.reducer
  },
  //enable cac tinh nang cua rtk
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(briefApi.middleware)
  .concat(artistApi.middleware)
  .concat(youtubeApi.middleware)
  .concat(channelApi.middleware)
  .concat(snsApi.middleware)
  .concat(tiktokApi.middleware)
  .concat(siteArtistApi.middleware)
  .concat(fancafeApi.middleware)
  .concat(badgeApi.middleware)
});


setupListeners(store.dispatch)
