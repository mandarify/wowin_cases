/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: CaseChooseList

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";
import { useCallback } from "react";

// ########## ТИПЫ
import type { TGiftData, TCaseItem } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./CaseChooseList.styles.css";

// ########## КОМПОНЕНТЫ
import GiftList from "../GiftList/GiftList";
import { Wowcoin, Topic2 } from "../../05_Shared/ui";

// ########## МОДУЛИ
import { unixNow } from "../../05_Shared/funcs/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface ICaseChooseList {
   chooseAction: (data: TCaseItem) => void;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

const CaseChooseList = ({ chooseAction }: ICaseChooseList): JSX.Element => {

   const chooseGiftAction = useCallback((data: TGiftData) => {
      chooseAction({
         id: -1,
         rarity: "common",
         permille: -1,
         price: data.price ? parseInt(data.price.toFixed(0)) : 0,
         content: {
            id: data.id,
            type: "gift",
            name: data.title,
            src: `/wowin/test/models/${data.id}-512.webp`,
         }
      });
   }, [chooseAction]);

   const chooseCoinAction = useCallback((value: number) => {
      chooseAction({
         id: -1,
         rarity: "common",
         permille: -1,
         price: value,
         content: {
            id: `wowcoin-${unixNow()}-${value}`,
            type: "coin",
            name: `${value} WOW`,
            src: `/wowin/test/coins/coin-${value <= 100 ? "low" : "medium"}.svg`,
         }
      });
   }, [chooseAction]);

   return (
      <div className="case-choose-list">

         <div className="case-choose-list-block">
            <Topic2 title="Монеты" />
            <Wowcoin id="wowcoinAddCoin" chooseAction={chooseCoinAction} initValue={1} />
         </div>

         <div className="case-choose-list-block">
            <Topic2 title="Подарки" />
            <GiftList chooseAction={chooseGiftAction} isShort />
         </div>

      </div>
   );
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(CaseChooseList);
