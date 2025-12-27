/* ######################################################################

   Gifts Selectors

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { AppState } from "../store";

/* ###################################################################### */


export const getGiftsState = (state: AppState) => state.gifts;

export const getGiftsStatus = (state: AppState) => state.gifts.status;

export const getGiftsError = (state: AppState) => state.gifts.error;

export const getGiftsData = (state: AppState) => state.gifts.data;

export const getGiftsElements = (state: AppState) => state.gifts.data ? state.gifts.data.elements : [];

export const getSelectedGift = (state: AppState) => state.gifts.selectedGift;

export const getGiftById = (id: string) => (state: AppState) => {
   return state.gifts.data ? (state.gifts.data.elements.find(el => el.id === id) ?? null) : null;
};
