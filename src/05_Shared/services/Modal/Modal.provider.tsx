/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Modal Context

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

// ########## ТИПЫ

// ########## СТИЛИ

// ########## КОМПОНЕНТЫ
import Modal from "./Modal";

// ########## МОДУЛИ
import { ModalContext } from "./Modal.context";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {

   const [content, setContent] = useState<React.ReactNode | null>(null);

   const location = useLocation();

   const open = useCallback((node: React.ReactNode) => {
      setContent(node);
   }, []);

   const close = useCallback(() => {
      setContent(null);
   }, []);

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(null);
   }, [location.pathname, setContent]);

   const value = useMemo(() => ({ open, close }), [open, close]);

   return (
      <ModalContext.Provider value={value}>
         {children}
         {content && <Modal>{content}</Modal>}
      </ModalContext.Provider>
   );
};
