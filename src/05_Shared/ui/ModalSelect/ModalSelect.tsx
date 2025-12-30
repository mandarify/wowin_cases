/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: ModalSelect

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";
import { useCallback } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./ModalSelect.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ

// ########## РЕСУРСЫ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IModalSelect {
   actionClose: () => void;
   children: React.ReactNode;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

const ModalSelect = ({ actionClose, children }: IModalSelect): JSX.Element => {

   const close = useCallback(() => {
      actionClose();
   }, [actionClose]);

   return (
      <div className="modal-select _use">

         <div className="modal-select-container">
            {children}
         </div>

         <div className="modal-select-btn-close" onClick={close}></div>

      </div>
   );
};

export default React.memo(ModalSelect);
