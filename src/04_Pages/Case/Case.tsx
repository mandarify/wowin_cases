/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Case Page

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { /* useDispatch, */ useSelector, } from "react-redux";
import type { AppState } from "../../06_Store/store";
import { getCaseById } from "../../06_Store/cases/cases.selectors";

// ########## STANDART
import type { JSX } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ
import type { TCase } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./Case.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ
import { CaseEditorContext } from "../../05_Shared/contexts/CaseEditor/CaseEditor.context";

// ########## РЕСУРСЫ
import casecoin from "../../01_Assets/02_images/casecoin.svg";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


// export interface ICasePage {};

export type CasePageTab = "info" | "test" | "raw";


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasePage = (): JSX.Element => {

   const navigate = useNavigate();
   // const dispatch = useDispatch<AppDispatch>();

   const { id } = useParams<{ id: string }>();
   const caseId = id ? parseInt(id, 10) : null;
   const caseData = useSelector((state: AppState) => caseId !== null ? getCaseById(caseId)(state) : null);

   const [draft, setDraft] = useState<TCase | null>(caseData);

   const [tab, setTab] = useState<CasePageTab>("info");

   useEffect(() => {
      if (!caseData) navigate("/wowin_cases/404", { replace: true });
      return () => { };
   }, [navigate, caseData, setDraft]);

   const updateTab = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const tabName = e.currentTarget.dataset.name as CasePageTab;
      setTab(tabName);
   }, [setTab]);

   if (!draft) return <></>;

   const update = <K extends keyof TCase>(key: K, value: TCase[K]) => {
      setDraft(prev => ({ ...prev!, [key]: value }));
   };

   return (
      <CaseEditorContext.Provider value={{ draft, update }}>
         <div className="page-case">
            <div className="case-editor-block">

               <div className="case-editor-title">
                  <div className="case-editor-img-container">
                     <img src={casecoin} alt="CASECOIN" className="case-editor-img" />
                  </div>
                  <input className="case-editor-text-input" type="text" name="caseEditorTitle" id="caseEditorTitle" placeholder="Название"
                     value={draft.title} onChange={(e) => update("title", e.target.value)}
                  />
               </div>

               <div className="case-editor-tabs">
                  <div className={`case-tab ${tab === "info" ? 'case-tab-active' : ''}`.trim()} data-name="info" onClick={updateTab}>Кейс</div>
                  <div className={`case-tab ${tab === "test" ? 'case-tab-active' : ''}`.trim()} data-name="test" onClick={updateTab}>Тесты</div>
                  <div className={`case-tab ${tab === "raw" ? 'case-tab-active' : ''}`.trim()} data-name="raw" onClick={updateTab}>RAW</div>
               </div>

               {tab === "info" &&
                  <div className="case-editor-tab-content">info</div>
               }

               {tab === "test" &&
                  <div className="case-editor-tab-content">test</div>
               }

               {tab === "raw" &&
                  <div className="case-editor-tab-content">
                     <pre className="raw">{JSON.stringify(caseData, null, 3)}</pre>
                  </div>
               }

            </div>
         </div>
      </CaseEditorContext.Provider>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasePage;
