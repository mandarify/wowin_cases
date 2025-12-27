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
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Price = ({ value }: IPrice): JSX.Element => {
   return (
      <div className="price">

         <div className="price-value">{value}</div>

         <div className="price-coin">
            <img className="price-coin-img" src={wowcoin} alt="WOWCOIN" />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Price);
