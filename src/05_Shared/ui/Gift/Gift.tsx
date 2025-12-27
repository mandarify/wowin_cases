/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Gift

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";
import { useCallback } from "react";

// ########## ТИПЫ
import type { TGiftData } from "../../types/global";

// ########## СТИЛИ
import "./Gift.styles.css";

// ########## КОМПОНЕНТЫ
import Price from "../Price/Price";

// ########## МОДУЛИ
import { formatUnixDate, splitKeepMark } from "../../funcs/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

const getGiftImg = (id: string) => `/wowin_cases/gifts/files/${id}/webp256.webp`;

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IGift {
   data: TGiftData;
   mark: string;
   clickAction: (data: TGiftData) => void;
};

const Gift = React.memo(({ data, mark, clickAction }: IGift): JSX.Element => {

   const onClick = useCallback(() => {
      clickAction(data);
   }, [clickAction, data]);

   return (
      <div className="gift" data-title={data.title || "no title"} onClick={onClick}>

         <div className="gift-img-container">
            <img src={getGiftImg(data.id)} alt={data.title || "Gift"} className="gift-img" />
         </div>

         <div className="gift-data-container">
            <GiftTitle title={data.title} mark={mark} />
            <div className="gift-date">{data.fdate ? formatUnixDate(data.fdate) : 'no date'}</div>
         </div>

         <div className="gift-price">
            <Price value={data.price ? data.price.toFixed(0) : '0'} />
            <div className="gift-price-usd">{data.price ? '$' + (parseInt(data.price.toFixed(0)) / 100).toFixed(0) : '$0'}</div>
         </div>

      </div>
   );
});

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IGiftTitle {
   title: string;
   mark: string;
};

const GiftTitle = React.memo(({ title, mark }: IGiftTitle): JSX.Element => {

   return (
      <div className="gift-title">
         {!mark
            ? <span>{title || "-"}</span>
            : splitKeepMark(title, mark).map((t, index) =>
               t.toLowerCase() !== mark
                  ? <span key={index}>{t}</span>
                  : <mark key={index}>{t}</mark>
            )
         }
      </div>
   );
});

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default Gift;
