/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Cases

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../06_Store/store";
import { reset, addCasesList } from "../../06_Store/cases/cases.slice";
import { getCasesList } from "../../06_Store/cases/cases.selectors";
import { addCaseAndReturnId } from "../../06_Store/cases/cases.thunks";

// ########## STANDART
import type { JSX } from "react";
import { useCallback, useRef } from "react";
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

   const inputRef = useRef<HTMLInputElement | null>(null);

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

   const openFileDialog = useCallback(() => {
      const input = inputRef.current;
      if (!input) return;
      input.click();
   }, []);

   const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.type !== 'application/json') return;

      const reader = new FileReader();
      reader.onload = () => {
         try {
            const json = JSON.parse(reader.result as string) as TCasesListSave;
            if (json.type === "list" && json.version === VERSION && Array.isArray(json.list)) {
               dispatch(addCasesList(json.list));
            } else {
               console.log('Некорректный JSON');
            }
         } catch {
            console.log('Некорректный JSON');
         }
      };

      reader.readAsText(file);
   }, [dispatch]);

   return (
      <div className="page-cases">

         <div className="page-cases-block">
            <Topic title="Кейсы" />
            <div className="button-list-h">

               <Button title="Создать" type="default" clickAction={createNewCase} />
               <Button title="Загрузить" type="green" clickAction={openFileDialog} />
               <Button title="Скачать" type="yellow" clickAction={download} />
               <Button title="Очистить" type="red" clickAction={resetCases} />

               <input ref={inputRef} className="_none" type="file" accept="application/json" onChange={handleFile} />

            </div>
            <CasePreviewList cases={cases} />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasesPage;
