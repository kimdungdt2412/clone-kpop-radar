import { combineReducers, configureStore } from '@reduxjs/toolkit';
import briefReducer from '../features/BriefList/BriefSlice';


const rootReducer = combineReducers({
  brief: briefReducer
})

export const store = configureStore({
  reducer: {
    brief: briefReducer
  },
});
