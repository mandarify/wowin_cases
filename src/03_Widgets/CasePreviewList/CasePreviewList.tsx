/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: CasePreviewList

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// ########## STANDART
import React from "react";
import type { JSX } from "react";

// ########## ТИПЫ
import type { TCase } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./CasePreviewList.styles.css";

// ########## КОМПОНЕНТЫ
import { PreviewCase } from "../../05_Shared/ui";

// ########## МОДУЛИ


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface ICasePreviewList {
   list: TCase[];
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasePreviewList = ({ list }: ICasePreviewList): JSX.Element => {
   return (
      <div className="case-preview-list">
         {list.sort((a, b) => a.dtCreate - b.dtCreate).map(item => <PreviewCase key={item.slug + item.id} data={item} />)}
      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default React.memo(CasePreviewList);
