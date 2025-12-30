/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: Gifts Functions

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/


// ########## STANDART

// ########## ТИПЫ
import type { TGiftData } from "../types/global";
import type { TCase, TCaseItem, TCaseItemRarity } from "../types/global";

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ
import { RARITIES } from "../consts/global";
import { random } from "./global";

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

const getItemIndexByValue = (data: TCase, value: number) => {
   const len = data.items.length;
   let start = 0;
   for (let i = 0; i < len; i++) {
      start += data.items[i].permille;
      if (value <= start) return i;
   }
   return len > 0 ? len - 1 : 0;
};

export const caseRtpTesting = (data: TCase, count: number): string[] => {

   /* Проверка первичных условий для проверки. */

   const setError = (error: string, ...msg: string[]): string[] => ["Тест выполнить не возможно!", `Причина: ${error}`, ...msg];

   /* Количество попыток. */
   if (count < 100) return setError(`Количество тестовых данных меньше 100.`, `Необходимо увеличить количество тестовых данных!`);

   /* Цена кейса. */
   if (data.price <= 0) return setError(`Цена кейса (${data.price} WOW) - некорректная.`, 'Необходимо изменить цену кейса.');

   /* Полнота кейса. */
   let totalPermille = 0;
   for (let i = 0; i < data.items.length; i++) {
      totalPermille += data.items[i].permille;
   }
   if (totalPermille !== 100000) return setError(
      `Кейс неполный (${(totalPermille / 1000).toFixed(2)}%).`,
      "Необходимо использовать как минимум 1 подарок в каждой категории.",
      ...Object.entries(data.stats).filter(([, value]) => value === 0).map(([key, value]) => `- ${key}: ${value} (необходимо добавить +1).`)
   );

   /* Тестирование. */
   const len = data.items.length;
   const minPermille = 1;
   const maxPermille = totalPermille;

   const totalWowSpent = data.price * count;
   let totalWowWin = 0;

   const cards = Array.from({ length: len }).fill(0) as number[];
   const rarities: Record<TCaseItemRarity, number> = {
      legendary: 0,
      epic: 0,
      rare: 0,
      unique: 0,
      common: 0,
   };

   for (let i = 0; i < count; i++) {
      const value = random(minPermille, maxPermille);
      const itemIndex = getItemIndexByValue(data, value);
      const item = data.items[itemIndex];
      cards[itemIndex] += 1;
      rarities[item.rarity] += 1;
      totalWowWin += item.price;
   }

   const rtpPlayer = Math.floor(totalWowWin / totalWowSpent * 100);
   const rtpGame = 100 - rtpPlayer;

   const maxCountLen = count.toString().length;
   const spaces = (length: number) => Array.from({ length }).join("\u00A0");
   const cardsStats = Object.keys(cards).map(index => {
      const id = parseInt(index);
      const item = data.items[id];
      const value = cards[id].toString();
      return `- ${index}${spaces(3 - index.length)} | ${spaces(maxCountLen - value.length)}${value} шт. | ${item.rarity}${spaces(10 - item.rarity.length)} | ${item.content.name}`;
   });

   return [
      `Тестирование кейса "${data.title}"`,
      "",
      `Цена 1 шт.${spaces(1)} : ${data.price} WOW`,
      `Количество${spaces(1)} : ${count} шт.`,
      "",
      "Игрок:",
      `RTP Игрока${spaces(1)} : ${rtpPlayer.toFixed(2)}%`,
      `Потрачено${spaces(2)} : ${totalWowSpent} WOW`,
      `Выиграно${spaces(3)} : ${totalWowWin} WOW`,
      `Прибыль${spaces(4)} : ${totalWowWin - totalWowSpent} WOW`,
      "",
      "Казино:",
      `RTP Казино${spaces(1)} : ${rtpGame.toFixed(2)}%`,
      `Заработок${spaces(2)} : ${(0 - ((totalWowWin - totalWowSpent) / 100)).toFixed(2)}$`,
      "",
      `Статистика выпадения редкостей:`,
      `- Legendary : ${rarities.legendary} шт.`,
      `- Epic${spaces(6)} : ${rarities.epic} шт.`,
      `- Rare${spaces(6)} : ${rarities.rare} шт.`,
      `- Unique${spaces(4)} : ${rarities.unique} шт.`,
      `- Common${spaces(4)} : ${rarities.common} шт.`,
      "",
      `Статистика выпадения подарков:`,
      ...cardsStats,
   ];
};
