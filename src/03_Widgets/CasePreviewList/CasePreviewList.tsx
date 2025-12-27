/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: CasePreviewList

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useSelector } from "react-redux";
import { getCasesList } from "../../06_Store/cases/cases.selectors";

// ########## STANDART
import React from "react";
import type { JSX } from "react";

// ########## ТИПЫ

// ########## СТИЛИ
import "./CasePreviewList.styles.css";

// ########## КОМПОНЕНТЫ
import { PreviewCase } from "../../05_Shared/ui";

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

// export interface ICasePreviewList {};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasePreviewList = (): JSX.Element => {

   // const dispatch = useDispatch<AppDispatch>();
   const cases = useSelector(getCasesList);

   return (
      <div className="case-preview-list">
         {[...cases].sort((a, b) => b.dtCreate - a.dtCreate).map(item => <PreviewCase key={item.id} data={item} />)}
      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(CasePreviewList);
