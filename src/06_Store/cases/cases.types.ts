/* ######################################################################

   Cases Types

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { TCase, TStoreStatus } from "../../05_Shared/types/global";

/* ###################################################################### */

export type TCasesState = {
   list: TCase[],
   nextId: number,
   selectedCaseId: number | null;
   status: TStoreStatus,
   error: string | null,
};
