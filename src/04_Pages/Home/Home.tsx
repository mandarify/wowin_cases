/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: HomePage

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State

// ########## STANDART
import type { JSX } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./HomePage.styles.css";

// ########## КОМПОНЕНТЫ
import { Topic } from "../../05_Shared/ui";
import { GiftList } from "../../03_Widgets";

// ########## МОДУЛИ

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const HomePage = (): JSX.Element => {

   return (
      <div className="page-home">

         <div className="page-home-block">
            <Topic title="Подарки" />
            <GiftList />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default HomePage;
