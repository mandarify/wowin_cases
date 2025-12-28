/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: PreviewCase

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";

// ########## ТИПЫ
import type { TCase } from "../../types/global";

// ########## СТИЛИ
import "./PreviewCase.styles.css";

// ########## КОМПОНЕНТЫ
import Price from "../Price/Price";
import { NavLink } from "react-router-dom";

// ########## МОДУЛИ
import { formatUnixDate } from "../../funcs/global";

// ########## РЕСУРСЫ
import coincase from "../../../01_Assets/02_images/casecoin.svg";


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IPreviewCase {
   data: TCase;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const PreviewCase = ({ data }: IPreviewCase): JSX.Element => {
   return (
      <NavLink end to={`/cases/${data.id}`} className="preview-case">

         <div className="preview-case-img-container">
            <img src={coincase} alt="CASE" className="preview-case-img" />
         </div>

         <div className="preview-case-data">
            <div className="preview-case-title">{data.title}</div>
            <div className="preview-case-date">{formatUnixDate(data.dtCreate)}</div>
         </div>

         <div className="preview-case-price">
            <Price value={data.price} />
            <div className="preview-case-price-usd">{data.price ? '$' + (parseInt(data.price.toFixed(0)) / 100).toFixed(2) : '$0'}</div>
         </div>

      </NavLink>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(PreviewCase);
