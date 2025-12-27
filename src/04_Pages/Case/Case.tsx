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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ

// ########## СТИЛИ
import "./Case.styles.css";

// ########## КОМПОНЕНТЫ

// ########## МОДУЛИ

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


// export interface ICasePage {};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasePage = (): JSX.Element => {

   const navigate = useNavigate();
   // const dispatch = useDispatch<AppDispatch>();

   const { id } = useParams<{ id: string }>();
   const caseId = id ? parseInt(id, 10) : null;
   const caseData = useSelector((state: AppState) => caseId !== null ? getCaseById(caseId)(state) : null);

   useEffect(() => {
      if (!caseData) navigate("/wowin_cases/404", { replace: true });
      return () => { };
   }, [navigate, caseData]);

   return (
      <div className="page-case">
         {caseData && <pre>{JSON.stringify(caseData, null, 3)}</pre>}
      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasePage;
