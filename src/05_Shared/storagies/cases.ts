/* ######################################################################

   Cases Storage

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { TCase } from "../types/global";

/* ###################################################################### */

const STORAGE_KEY_CASES = "cases";

/* ###################################################################### */

const StorageCases = {

   getNextId: (): number => {
      try {
         let nextId = -1;
         const raw = localStorage.getItem(STORAGE_KEY_CASES);
         const data: TCase[] | null = raw ? JSON.parse(raw) : null;
         if (data && Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
               if (data[i].id > nextId) nextId = data[i].id;
            }
         }
         return nextId + 1;
      } catch {
         return 0;
      }
   },

   load: (): TCase[] => {
      try {
         const raw = localStorage.getItem(STORAGE_KEY_CASES);
         return raw ? JSON.parse(raw) : [];
      } catch {
         return [];
      }
   },

   save: (cases: TCase[]) => {
      localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(cases));
   },

   remove: () => {
      localStorage.removeItem(STORAGE_KEY_CASES);
   },
};

/* ###################################################################### */

export default StorageCases;
