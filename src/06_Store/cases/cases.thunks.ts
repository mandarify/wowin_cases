/* ######################################################################

   Cases Thunks

######################################################################### */

import { addCase } from "./cases.slice";
import type { AppDispatch, AppState } from "../store";
import type { TCase } from "../../05_Shared/types/global";

import { unixNow } from "../../05_Shared/funcs/global";

/* ###################################################################### */

export const addCaseAndReturnId = (payload: Omit<TCase, "id">) => (dispatch: AppDispatch, getState: () => AppState) => {
   const state = getState();
   const newId = state.cases.nextId;
   dispatch(addCase({ ...payload, id: newId, slug: `case-${state.cases.nextId}` }));
   return newId;
};

export const cloneCaseAndReturnId = (payload: { id: number }) => (dispatch: AppDispatch, getState: () => AppState) => {
   const state = getState();

   const caseData = state.cases.list.find(el => el.id === payload.id);
   if (!caseData) return null;

   const newId = state.cases.nextId;
   dispatch(addCase({ ...caseData, id: newId, slug: `case-${state.cases.nextId}`, title: caseData.title + " CLONE", dtCreated: unixNow(), dtUpdated: unixNow() }));

   return newId;
};