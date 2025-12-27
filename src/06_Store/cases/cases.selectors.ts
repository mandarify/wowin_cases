/* ######################################################################

   Gifts Selectors

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { AppState } from "../store";

/* ###################################################################### */

export const getCasesState = (state: AppState) => state.cases;

export const getNextId = (state: AppState) => state.cases.nextId;

export const getCasesList = (state: AppState) => state.cases.list;

export const getSelectedCaseId = (state: AppState) => state.cases.selectedCaseId;

export const getSelectedCase = (state: AppState) => {
   if (!state.cases.selectedCaseId) return null;
   return state.cases.list[state.cases.selectedCaseId] ?? null;
};

export const getCaseById = (id: number) => (state: AppState) => {
   const item = state.cases.list.find(el => el.id === id);
   return item ?? null;
};

export const getCaseBySlug = (slug: string) => (state: AppState) => {
   const item = state.cases.list.find(el => el.slug === slug);
   return item ?? null;
};
