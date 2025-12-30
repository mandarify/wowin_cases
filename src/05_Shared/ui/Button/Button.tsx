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
   type?: "default" | "disable" | "green" | "red" | "yellow";
   status?: "default" | "disable";
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Button = ({ title, clickAction, type, status }: IButton): JSX.Element => {

   const onClick = useCallback(() => {
      if (status === "disable") return;
      clickAction();
   }, [clickAction, status]);

   return (
      <div className={`button ${status && status === "disable" ? 'button-disable' : ''}`.trim()} data-type={type ?? "default"} onClick={onClick}>
         <div className="button-content _unselect">{title}</div>
      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Button);
