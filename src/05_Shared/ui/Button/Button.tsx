/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Button

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";
import { useCallback } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./Button.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IButton {
   title: string;
   clickAction: () => void;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Button = ({ title, clickAction }: IButton): JSX.Element => {

   const onClick = useCallback(() => {
      clickAction();
   }, [clickAction]);

   return (
      <div className="button" onClick={onClick}>
         <div className="button-content">{title}</div>
      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Button);
