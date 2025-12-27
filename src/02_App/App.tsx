/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: App

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import type { JSX } from "react";

// ########## ТИПЫ

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ
import AppRoutes from "./routes/AppRoutes";

// ########## МОДУЛИ
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../06_Store/store";


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const App = (): JSX.Element => {
   return (
      <BrowserRouter basename="/wowin_cases">
         <Provider store={store}>
            <AppRoutes />
         </Provider>
      </BrowserRouter>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default App;

