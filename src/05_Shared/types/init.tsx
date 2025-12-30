/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Init

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## ТИПЫ
import type { TCase } from "./global";

// ########## МОДУЛИ
import { unixNow } from "../funcs/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export const initDataCase: TCase = {
   id: -1,
   version: 1,
   status: "edit",
   isTop: null,
   position: -1,
   title: "Название",
   desc: "Описание кейса.",
   slug: "",
   dtPublication: null,
   dtUpdated: unixNow(),
   dtCreated: unixNow(),
   dtDeleted: null,
   style: "default",
   price: 0,
   sale: null,
   limit: null,
   timer: null,
   stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
   srcs: { low: "", high: "" },
   items: []
};
