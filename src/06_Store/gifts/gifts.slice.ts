/* ######################################################################

   Gifts Slice

######################################################################### */

// ===== СТАНДАРТНЫЕ
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TGiftsState } from "./gifts.types";
import type { TGiftData } from "../../05_Shared/types/global";

import { getGifts } from "./gifts.api";

/* ###################################################################### */

const initialState: TGiftsState = {
   data: null,
   selectedGift: null,
   status: "idle",
   error: null,
};

/* ###################################################################### */

const giftsSlice = createSlice({
   name: "gifts",
   initialState,
   reducers: {
      selectGift: (state, action: PayloadAction<TGiftData>) => {
         state.selectedGift = action.payload;
      },
      clearSelectedGift: (state) => {
         state.selectedGift = null;
      },
      clearError: (state) => {
         state.error = null;
      },
      reset: () => {
         return { ...initialState };
      },
   },
   extraReducers: (builder) => {
      builder
         // pending
         .addCase(getGifts.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         // success
         .addCase(getGifts.fulfilled, (state, action) => {
            state.status = "success";
            state.data = action.payload;
         })
         // error
         .addCase(getGifts.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Error";
         });
   },
});


/* ###################################################################### */

export const { selectGift, clearSelectedGift, clearError, reset } = giftsSlice.actions;
export default giftsSlice.reducer;
