/* ######################################################################

   Cases Slice

######################################################################### */

// ===== СТАНДАРТНЫЕ
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TCasesState } from "./cases.types";
import type { TCase } from "../../05_Shared/types/global";

import { unixNow } from "../../05_Shared/funcs/global";

/* ###################################################################### */

const initialState: TCasesState = {
   list: [],
   nextId: 0,
   selectedCaseId: null,
   status: "idle",
   error: null,
};

/* ###################################################################### */

const casesSlice = createSlice({
   name: "cases",
   initialState,
   reducers: {
      addCase: (state, action: PayloadAction<TCase>) => {
         const newCase = action.payload;
         state.list.push(newCase);
         state.nextId = state.nextId + 1;
      },
      addCasesList: (state, action: PayloadAction<TCase[]>) => {
         const len = action.payload.length;
         for (let i = 0; i < len; i++) {
            const newCase = action.payload[i];
            newCase.id = state.nextId + i;
            state.list.push(newCase);
         }
         state.nextId = state.nextId + len;
      },
      updateCase: (state, action: PayloadAction<TCase>) => {
         const itemIndex = state.list.findIndex(el => el.id === action.payload.id);
         const newCaseData = { ...action.payload };
         newCaseData.version += 1;
         newCaseData.dtUpdated = unixNow();
         if (itemIndex !== -1) state.list[itemIndex] = newCaseData;
      },
      removeCase: (state, action: PayloadAction<{ id: number }>) => {
         const itemIndex = state.list.findIndex(el => el.id === action.payload.id);
         if (itemIndex !== -1) state.list.splice(itemIndex, 1);
      },
      selectCaseId: (state, action: PayloadAction<{ id: number }>) => {
         state.selectedCaseId = action.payload.id;
      },
      clearSelectedCaseId: (state) => {
         state.selectedCaseId = null;
      },
      clearError: (state) => {
         state.error = null;
      },
      reset: () => {
         return { ...initialState };
      },
   },
});

/* ###################################################################### */

export const { addCase, addCasesList, updateCase, removeCase, selectCaseId, clearSelectedCaseId, clearError, reset } = casesSlice.actions;
export default casesSlice.reducer;
