/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: Gifts Functions

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/


// ########## STANDART

// ########## ТИПЫ
import type { TGiftData } from "../types/global";

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


type NumericKeys<T> = {
   [K in keyof T]: T[K] extends number | null ? K : never
}[keyof T];

export const sortGifts = (
   gifts: TGiftData[],
   field: NumericKeys<TGiftData>,
   type: "asc" | "desc",
) => {
   gifts.sort((a, b) => {
      if (a.upgrade !== null && b.upgrade === null) return -1;
      if (a.upgrade === null && b.upgrade !== null) return 1;

      const av = a[field] ?? 0;
      const bv = b[field] ?? 0;

      return type === "asc" ? av - bv : bv - av;
   });
   return gifts;
};
