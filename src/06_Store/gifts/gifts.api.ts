/* ######################################################################

   Gifts API

######################################################################### */

// ===== СТАНДАРТНЫЕ
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { TGiftsSet } from "../../05_Shared/types/global";

/* ###################################################################### */

const API_GIFTS = {
   get: {
      name: "gifts/getGifts",
      url: "/wowin_cases/gifts/mini.json",
   },
};

/* ###################################################################### */

export const getGifts = createAsyncThunk<TGiftsSet, void, { rejectValue: string }>(API_GIFTS.get.name, async (_, thunkAPI) => {
   try {
      const res = await fetch(API_GIFTS.get.url, { method: "GET" });
      if (!res.ok) return thunkAPI.rejectWithValue("Get gifts API error.");
      return (await res.json()) as TGiftsSet;
   } catch (error) {
      return thunkAPI.rejectWithValue(`Server Error: ${error}`);
   }
});
