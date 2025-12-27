/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: AppRoutes

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import type { JSX } from "react";
import { useLocation } from "react-router-dom";

// ########## ТИПЫ

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Pages from "../../04_Pages";

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const AppRoutes = (): JSX.Element => {

   const location = useLocation();

   return (
      <Routes location={location} key={location.pathname}>

         <Route element={<Layout />}>

            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Pages.Home />} />

            <Route path="/case/:id" element={<Pages.Case />} />

         </Route>

      </Routes>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default AppRoutes;
