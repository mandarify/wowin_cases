/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: GiftList

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import type { JSX } from "react";
import { useState, useEffect, useCallback } from "react";

// ########## ТИПЫ
import type { TGiftData, TGiftsSet } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./GiftList.styles.css";

// ########## КОМПОНЕНТЫ
import { Gift } from "../../05_Shared/ui";

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const getGifts = async (): Promise<TGiftsSet | null> => {
   try {
      const res = await fetch("/wowin_cases/gifts/mini.json", { method: "GET" });
      const data = await res.json() as TGiftsSet;
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
};

type NumericKeys<T> = {
   [K in keyof T]: T[K] extends number | null ? K : never
}[keyof T];

const sortGifts = (
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

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


// export interface IGiftList {

// };


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const GiftList = (): JSX.Element => {

   const [gifts, setGifts] = useState<TGiftData[]>([]);

   const [search, setSearch] = useState<string>("");
   const [sort, setSort] = useState<"fdate" | "price">("fdate");
   const [sortType, setSortType] = useState<"asc" | "desc">("asc");

   useEffect(() => {

      const load = async () => {
         const data = await getGifts();
         if (data) {
            const items = data.elements;
            setGifts(items);
         };
      };

      load();

      return () => { };

   }, []);

   const chooseGift = useCallback((data: TGiftData) => {
      console.log(data);
   }, []);

   const sortFdate = useCallback(() => {
      if (sort === "fdate") setSortType(prev => prev === "asc" ? "desc" : "asc");
      else setSort("fdate");
   }, [sort, setSort, setSortType]);

   const sortPrice = useCallback(() => {
      if (sort === "price") setSortType(prev => prev === "asc" ? "desc" : "asc");
      else setSort("price");
   }, [sort, setSort, setSortType]);

   return (
      <>
         <div className="gifts-search">
            <input type="text" className="gifts-search-input" name="searchGifts" id="searchGifts" placeholder="Поиск подарка" value={search} onChange={(e) => setSearch(e.target.value)} />
         </div>

         <div className="gifts-sort">
            <div className={`gifts-sort-item ${sort === "fdate" ? 'gifts-sort-item_active' : ''}`.trim()} onClick={sortFdate}>ДАТА</div>
            <div className={`gifts-sort-item ${sort === "price" ? 'gifts-sort-item_active' : ''}`.trim()} onClick={sortPrice}>ЦЕНА</div>
         </div>

         <div className="gifts-list">
            {gifts && sortGifts(gifts.filter(g => !search ? g : g.title.toLowerCase().includes(search.toLowerCase())), sort, sortType)
               .map(item => <Gift key={item.id} data={item} mark={search.toLowerCase()} clickAction={chooseGift} />)}
         </div>

      </>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default GiftList;
