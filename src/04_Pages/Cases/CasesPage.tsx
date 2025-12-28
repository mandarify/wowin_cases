/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Cases

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../06_Store/store";
import { addCaseAndReturnId } from "../../06_Store/cases/cases.thunks";

// ########## STANDART
import type { JSX } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ

// ########## СТИЛИ
import "./CasesPage.styles.css";

// ########## КОМПОНЕНТЫ
import { Topic, Button } from "../../05_Shared/ui";
import { CasePreviewList } from "../../03_Widgets";

// ########## МОДУЛИ
import { initDataCase } from "../../05_Shared/types/init";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasesPage = (): JSX.Element => {

   const dispatch = useDispatch<AppDispatch>();

   const navigate = useNavigate();

   const createNewCase = useCallback(() => {
      const newId = dispatch(addCaseAndReturnId({ ...initDataCase }));
      navigate(`/cases/${newId}`);
   }, [navigate, dispatch]);

   return (
      <div className="page-cases">

         <div className="page-cases-block">
            <Topic title="Кейсы" />
            <div className="button-list-h">
               <Button title="Создать" clickAction={createNewCase} />
               <Button title="Загрузить" clickAction={() => { }} />
            </div>
            <CasePreviewList />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasesPage;
