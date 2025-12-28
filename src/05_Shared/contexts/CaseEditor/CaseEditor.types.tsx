/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Types

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

import type { TCase } from "../../types/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export type CaseEditorContextType = {
   draft: TCase;
   update: <K extends keyof TCase>(key: K, value: TCase[K]) => void;
};
