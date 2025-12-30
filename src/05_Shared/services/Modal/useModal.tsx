/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: useModal

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

import { useContext } from 'react';
import { ModalContext } from './Modal.context';

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export const useModal = () => {
   const ctx = useContext(ModalContext);
   if (!ctx) throw new Error('useModal must be inside ModalProvider');
   return ctx;
};
