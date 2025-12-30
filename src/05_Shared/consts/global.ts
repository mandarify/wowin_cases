/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: GLOBAL VARS

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

import type { TCaseItemRarity } from "../types/global";

export const VERSION = "1.0.0";

export const STORAGIES = {
   VERSION: "version",
   CASES: "cases",
};

export const RARITIES: Record<TCaseItemRarity, number> = {
   legendary: 10,
   epic: 100,
   rare: 2000,
   unique: 20000,
   common: 77890
};
