import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import { getBriefClient } from '../../app/client/brief';
import { isFulfilledAction, isPendingAction, isRejectedAction } from '../../utils/function';

const initialState = {
 briefs: [],
 orderCountInPage: 5,
 lastOrderNo: 0,
 briefCount: 0,
 isLoading: false,
 currentRequestId: undefined
};

export const getBriefList = createAsyncThunk(
    'brief/getBriefList',
    async (payload, thunkApi) => {
      const response = await getBriefClient.getBriefContentList(payload, thunkApi.signal)
      return response.data.body;
    }
  );

export const briefSlice = createSlice({
 name: 'brief',
 initialState,
 reducers: {
    //key name dùng để generate ra action
   addBrief: (state, action) => {
     state.briefs.push(action.payload);
   }
 },
 extraReducers(builder) {
  builder.addCase(getBriefList.fulfilled, (state, action) => {
    state.briefs = state.briefs.concat(action.payload.briefs)
    state.briefCount = action.payload.briefCount
    state.lastOrderNo = state.briefs.length
  })
  .addMatcher(
    isPendingAction,
    (state, action) => {
      state.isLoading = true
      state.currentRequestId = action.meta.requestId
    }
  )
  .addMatcher(
    isFulfilledAction,
    (state, action) => {
      if (state.isLoading && state.currentRequestId === action.meta.requestId) {
        state.isLoading = false
        state.currentRequestId = undefined
      }
    }
  )
  .addMatcher(
    isRejectedAction,
    (state, action) => {
      if (state.isLoading && state.currentRequestId === action.meta.requestId) {
        state.isLoading = false
        state.currentRequestId = undefined
      }
    }
  )
 }
});

export const { addBrief } = briefSlice.actions;

export const selectBrief = (state) => state.brief;

const briefReducer = briefSlice.reducer
// export reducer
export default briefReducer