/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: Gifts Functions

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/


// ########## STANDART

// ########## ТИПЫ
import type { TGiftData } from "../types/global";
import type { TCaseItem, TCaseItemRarity } from "../types/global";

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ
import { RARITIES } from "../consts/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


export const getGiftImg = (id: string) => `/wowin_cases/gifts/files/${id}/webp256.webp`;

export const getCointImg = (value: number) => `/wowin_cases/imgs/coin-${value <= 100 ? 'low' : 'medium'}.svg`;


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


export type TMathCaseItemsData = Record<TCaseItemRarity, {
   current: number,
   count: number,
   weight: number,
   sum: number,
   percent: number
}>;

export const mathCaseItemsPercent = (items: TCaseItem[]): { data: TMathCaseItemsData, items: TCaseItem[] } => {

   const clonedItems: TCaseItem[] = items.map(item => ({ ...item }));
   const length = clonedItems.length;

   const counts: TMathCaseItemsData = {
      legendary: { current: 0, count: 0, weight: 0, sum: 0, percent: RARITIES.legendary },
      epic: { current: 0, count: 0, weight: 0, sum: 0, percent: RARITIES.epic },
      rare: { current: 0, count: 0, weight: 0, sum: 0, percent: RARITIES.rare },
      unique: { current: 0, count: 0, weight: 0, sum: 0, percent: RARITIES.unique },
      common: { current: 0, count: 0, weight: 0, sum: 0, percent: RARITIES.common },
   };

   for (let i = 0; i < length; i++) {
      const { rarity, price } = clonedItems[i];
      counts[rarity].count += 1;
      counts[rarity].sum += price;
      counts[rarity].weight += 1 / price;
   }

   for (let i = 0; i < length; i++) {
      const item = clonedItems[i];
      const { rarity } = item;
      counts[rarity].current += 1;
      if (counts[rarity].current === counts[rarity].count) {
         item.permille = counts[rarity].percent;
         counts[rarity].percent = 0;
      } else {
         // const permille = Math.floor(((counts[rarity].sum - item.price) * RARITIES[rarity]) / counts[rarity].sum);
         const permille = Math.floor(((1 / item.price) / counts[rarity].weight) * RARITIES[rarity]);
         item.permille = permille;
         counts[rarity].percent -= permille;
      }
   }

   clonedItems.sort((a, b) => {
      const rarityDiff = RARITIES[a.rarity] - RARITIES[b.rarity];
      if (rarityDiff !== 0) return rarityDiff;
      return a.permille - b.permille;
   });

   for (let i = 0; i < length; i++) {
      clonedItems[i].id = i;
   }

   return { data: counts, items: clonedItems };
};
