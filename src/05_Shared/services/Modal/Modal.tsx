/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Case Page

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

import React from 'react';
import { createPortal } from 'react-dom';

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IModal {
   children: React.ReactNode;
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

const Modal = ({ children }: IModal): React.ReactNode => {

   const fixedModal = document.getElementById("modal");
   if (!fixedModal) return null;

   return createPortal(<>{children}</>, fixedModal);
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default Modal;
