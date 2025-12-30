/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: GLOBAL TYPES

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/


export type TStoreStatus = "idle" | "loading" | "success" | "error";


export type TGiftData = {
   id: string;
   title: string;
   fdate: number | null;
   ldate: number | null;
   upgrade: number | null;
   price: number | null;
};

export type TGiftsSet = {
   title: string,
   description: string,
   length: number,
   lastUpdate: string,
   elements: TGiftData[],
};


export type TCaseStyle = "default" | "purgold" | "ice" | "zoom";

export type TCaseItemRarity = "legendary" | "epic" | "rare" | "unique" | "common";

export type TCaseItemContentType = "gift" | "coin";

export type TCaseItemContent = {
   id: null | string,
   type: TCaseItemContentType,
   name: string,
   src: string,
};

export type TCaseItem = {
   id: number,
   rarity: TCaseItemRarity,
   permille: number,
   price: number,
   content: TCaseItemContent,
};

export type TCaseStatus = "edit" | "published" | "deleted";

export type TCase = {
   id: number;
   version: number;
   status: TCaseStatus,
   isTop: number | null;
   position: number;
   title: string,
   desc: string,
   slug: string,
   dtPublication: number | null,
   dtUpdated: number;
   dtCreated: number,
   dtDeleted: number | null,
   style: TCaseStyle,
   price: number,
   sale: null | {
      percent: number,
      oldPrice: number,
   },
   limit: null | {
      total: number,
      purchased: number,
   },
   timer: null | {
      dtStart: number,
      duration: number,
   },
   stats: Record<TCaseItemRarity, number>,
   srcs: {
      low: string;
      high: string;
   },
   items: TCaseItem[],
};

export type TCaseSave = {
   version: string,
   type: "item",
   item: TCase,
};

export type TCasesListSave = {
   version: string,
   type: "list",
   list: TCase[],
};