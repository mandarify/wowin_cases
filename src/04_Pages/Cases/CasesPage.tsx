/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Cases

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../06_Store/store";
import { reset } from "../../06_Store/cases/cases.slice";
import { getCasesList } from "../../06_Store/cases/cases.selectors";
import { addCaseAndReturnId } from "../../06_Store/cases/cases.thunks";

// ########## STANDART
import type { JSX } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ
import type { TCasesListSave } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./CasesPage.styles.css";

// ########## КОМПОНЕНТЫ
import { Topic, Button } from "../../05_Shared/ui";
import { CasePreviewList } from "../../03_Widgets";

// ########## МОДУЛИ
import { initDataCase } from "../../05_Shared/types/init";
import { downloadJson } from "../../05_Shared/funcs/global";
import { VERSION } from "../../05_Shared/consts/global";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasesPage = (): JSX.Element => {

   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

   const cases = useSelector(getCasesList);

   const createNewCase = useCallback(() => {
      const newId = dispatch(addCaseAndReturnId({ ...initDataCase }));
      navigate(`/cases/${newId}`);
   }, [navigate, dispatch]);

   const resetCases = useCallback(() => {
      if (!cases.length) return;
      dispatch(reset());
   }, [cases, dispatch]);

   const download = useCallback(() => {
      if (!cases.length) return;
      const saveData: TCasesListSave = { version: VERSION, type: "list", list: cases };
      downloadJson(saveData, "cases");
   }, [cases]);

   return (
      <div className="page-cases">

         <div className="page-cases-block">
            <Topic title="Кейсы" />
            <div className="button-list-h">
               <Button title="Создать" type="default" clickAction={createNewCase} />
               <Button title="Загрузить" type="green" clickAction={() => { }} />
               <Button title="Скачать" type="yellow" clickAction={download} />
               <Button title="Очистить" type="red" clickAction={resetCases} />
            </div>
            <CasePreviewList cases={cases} />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasesPage;
