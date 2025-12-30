/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Wowcoin

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";
import { useCallback, useState } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./Wowcoin.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ

// ########## РЕСУРСЫ
import wowcoin from "../../../01_Assets/02_images/wowcoin.svg";


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IWowcoin {
   id: string;
   initValue: number;
   chooseAction: (value: number) => void;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Wowcoin = ({ id, initValue, chooseAction }: IWowcoin): JSX.Element => {

   const [value, setValue] = useState<number | "">(initValue);

   const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.currentTarget.value) || "";
      setValue(newValue);
   }, [setValue]);

   const blur = useCallback(() => {
      if (!value) setValue(1);
   }, [value, setValue]);

   const choose = useCallback(() => {
      if (!value) return;
      chooseAction(value);
      if (value !== 1) setValue(1);
   }, [value, setValue, chooseAction]);

   return (
      <div className="wowcoin">

         <div className="wowcoin-img-container">
            <img src={wowcoin} alt="WOWCOIN" className="wowcoin-img _unselect" />
         </div>

         <div className="wowcoin-input-container">
            <input type="number" className="wowcoin-input-number" name={id} id={id} value={value} min={1} step={1} onChange={change} onBlur={blur} />
         </div>

         <div className={`wowcoin-button-add ${value ? 'button-add-active' : ''}`} onClick={choose}>+</div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Wowcoin);