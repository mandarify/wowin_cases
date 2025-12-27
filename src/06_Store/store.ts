/* ######################################################################

   STORE

######################################################################### */

// ===== СТАНДАРТНЫЕ
import { configureStore } from "@reduxjs/toolkit";

// ===== SLICES
import giftsReducer from "./gifts/gifts.slice";

/* ###################################################################### */


export const store = configureStore({
   reducer: {
      gifts: giftsReducer,
   },
});


/* ###################################################################### */

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
