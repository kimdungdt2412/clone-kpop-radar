import { createSlice } from '@reduxjs/toolkit';
import { briefApi } from '../../app/services/Brief';

const initialState = {
  briefs: [],
  orderCountInPage: 5,
  lastOrderNo: 0,
  briefCount: 0,
  currentBriefData: {}
  // isLoading: false,
  // currentRequestId: undefined
};

// export const getBriefList = createAsyncThunk(
//   'brief/getBriefList',
//   async (payload, thunkApi) => {
//     const response = await getBriefClient.getBriefContentList(payload, thunkApi.signal)
//     return response.data.body;
//   }
// );

export const briefSlice = createSlice({
  name: 'brief',
  initialState,
  reducers: {
    setCurrentBriefData: (state, action) => {
      state.currentBriefData = action.payload;
    },
    removeCurrentBriefData: (state, action) => {
      state.currentBriefData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(briefApi.endpoints.getBriefList.matchFulfilled, (state, action) => {
        state.briefs = state.briefs.concat(action.payload.briefs)
        state.briefCount = action.payload.briefCount
        state.lastOrderNo = state.briefs.length
      })
    // .addCase(getBriefList.fulfilled, (state, action) => {
    //   state.briefs = state.briefs.concat(action.payload.briefs)
    //   state.briefCount = action.payload.briefCount
    //   state.lastOrderNo = state.briefs.length
    // })
    // .addMatcher(
    //   isPendingAction,
    //   (state, action) => {
    //     state.isLoading = true
    //     state.currentRequestId = action.meta.requestId
    //   }
    // )
    // .addMatcher(
    //   isFulfilledAction,
    //   (state, action) => {
    //     if (state.isLoading && state.currentRequestId === action.meta.requestId) {
    //       state.isLoading = false
    //       state.currentRequestId = undefined
    //     }
    //   }
    // )
    // .addMatcher(
    //   isRejectedAction,
    //   (state, action) => {
    //     if (state.isLoading && state.currentRequestId === action.meta.requestId) {
    //       state.isLoading = false
    //       state.currentRequestId = undefined
    //     }
    //   }
    // )
  }
});

export const { getBriefList, setCurrentBriefData, removeCurrentBriefData } = briefSlice.actions;

export const selectBrief = (state) => state.brief;

const briefReducer = briefSlice.reducer
// export reducer
export default briefReducer