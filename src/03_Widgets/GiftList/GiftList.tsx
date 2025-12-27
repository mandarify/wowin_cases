/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: GiftList

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// STORE
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../06_Store/store";
import { getGifts } from "../../06_Store/gifts/gifts.api";
import { getGiftsState } from "../../06_Store/gifts/gifts.selectors";

// ########## STANDART
import type { JSX } from "react";
import { useState, useEffect, useCallback } from "react";

// ########## ТИПЫ
import type { TGiftData } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./GiftList.styles.css";

// ########## КОМПОНЕНТЫ
import { Gift } from "../../05_Shared/ui";

// ########## МОДУЛИ
import { sortGifts } from "../../05_Shared/funcs/gifts";


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


// export interface IGiftList {

// };


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const GiftList = (): JSX.Element => {

   const dispatch = useDispatch<AppDispatch>();
   const gifts = useSelector(getGiftsState);

   const [search, setSearch] = useState<string>("");
   const [sort, setSort] = useState<"fdate" | "price">("fdate");
   const [sortType, setSortType] = useState<"asc" | "desc">("asc");

   useEffect(() => {
      if (gifts.status !== "success") dispatch(getGifts());
      return () => { };
   }, [dispatch, gifts.status]);

   const chooseGift = useCallback((data: TGiftData) => {
      console.log(data);
   }, []);

   const sortDate = useCallback(() => {
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
            <div className={`gifts-sort-item ${sort === "fdate" ? 'gifts-sort-item_active' : ''}`.trim()} onClick={sortDate}>ДАТА</div>
            <div className={`gifts-sort-item ${sort === "price" ? 'gifts-sort-item_active' : ''}`.trim()} onClick={sortPrice}>ЦЕНА</div>
         </div>

         <div className="gifts-list">
            {gifts.data && sortGifts(gifts.data.elements.filter(g => !search ? g : g.title.toLowerCase().includes(search.toLowerCase())), sort, sortType)
               .map(item => <Gift key={item.id} data={item} mark={search.toLowerCase()} clickAction={chooseGift} />)}
         </div>

      </>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default GiftList;
