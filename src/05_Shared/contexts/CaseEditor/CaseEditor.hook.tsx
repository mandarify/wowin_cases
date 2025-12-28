/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Hooks

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

import { useContext } from "react";
import { CaseEditorContext } from "./CaseEditor.context";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export const useCaseEditor = () => {
   const ctx = useContext(CaseEditorContext);
   if (!ctx) throw new Error("useCaseEditor must be used inside provider");
   return ctx;
};
