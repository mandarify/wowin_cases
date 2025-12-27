/* ######################################################################

   Cases Thunks

######################################################################### */

import { addCase } from "./cases.slice";
import type { AppDispatch, AppState } from "../store";
import type { TCase } from "../../05_Shared/types/global";

/* ###################################################################### */

export const addCaseAndReturnId = (payload: Omit<TCase, "id">) => (dispatch: AppDispatch, getState: () => AppState) => {
   const state = getState();
   const newId = state.cases.nextId;
   dispatch(addCase({ ...payload, id: newId }));
   return newId;
};
