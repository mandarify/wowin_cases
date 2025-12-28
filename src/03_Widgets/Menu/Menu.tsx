/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Menu

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./Menu.styles.css";

// ########## КОМПОНЕНТЫ
import { NavLink } from "react-router-dom";

// ########## МОДУЛИ

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IMenuItem {
   title: string;
   link: string;
   icon: "shop" | "star" | "swords" | "img" | "box";
}

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const Menu = (): JSX.Element => {
   return (
      <menu className="menu">
         <div className="menu-container">
            <MenuItem title="подарки" link="/home" icon="shop" />
            <MenuItem title="кейсы" link="/cases" icon="star" />
         </div>
      </menu>
   );
};

const MenuItem = ({ title, link, icon }: IMenuItem): JSX.Element => {
   return (
      <NavLink end to={link} className={({ isActive }) => `menu-item ${isActive ? 'menu-item-active' : ''}`.trim()}>
         <span className={`svg-icon svg-icon-20 svg-model-${icon}`} />
         <span className="menu-item-name">{title}</span>
      </NavLink>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(Menu);
