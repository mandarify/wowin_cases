/* ######################################################################

   STORE

######################################################################### */

// ===== СТАНДАРТНЫЕ
import { configureStore } from "@reduxjs/toolkit";

// ===== SLICES
import giftsReducer from "./gifts/gifts.slice";
import casesReducer from "./cases/cases.slice";

//
import { casesMiddleware } from "./cases/cases.middleware";

//
import StorageCases from "../05_Shared/storagies/cases";

/* ###################################################################### */

const preloadedState = {
   cases: {
      list: StorageCases.load(),
      nextId: StorageCases.getNextId(),
      selectedCaseId: null,
      status: "idle" as const,
      error: null,
   },
};

/* ###################################################################### */

export const store = configureStore({
   reducer: {
      gifts: giftsReducer,
      cases: casesReducer,
   },
   preloadedState,
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(casesMiddleware),
});


/* ###################################################################### */

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
