/* ######################################################################

   Cases Middleware

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { AppState } from "../store";
import type { Middleware } from "@reduxjs/toolkit";

import StorageCases from "../../05_Shared/storagies/cases";

/* ###################################################################### */

export const casesMiddleware: Middleware = store => next => action => {

   const res = next(action);

   if (typeof action === "object" && action !== null && "type" in action) {
      const type = (action as { type: string }).type;

      if (["cases/addCase", "cases/updateCase", "cases/removeCase", "cases/reset", "cases/addCasesList"].includes(type)) {
         const state = store.getState() as AppState;
         StorageCases.save(state.cases.list);
      }
   }

   return res;
};
