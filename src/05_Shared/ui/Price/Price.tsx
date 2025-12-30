/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Price

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";

// ########## ТИПЫ

// ########## СТИЛИ

import "./Price.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ

// ########## РЕСУРСЫ
import wowcoin from "../../../01_Assets/02_images/wowcoin.svg";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IPrice {
   value: number | string;
   position?: "left" | "right";
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Price = ({ value, position }: IPrice): JSX.Element => {
   return (
      <div className={`price ${position === "left" ? "price-order-left" : ""}`.trim()}>

         <div className="price-value _unselect">{value}</div>

         <div className="price-coin">
            <img className="price-coin-img _unselect" src={wowcoin} alt="WOWCOIN" />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Price);
