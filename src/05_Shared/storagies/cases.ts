/* ######################################################################

   Cases Storage

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { TCase } from "../types/global";

import { VERSION, STORAGIES } from "../consts/global";

/* ###################################################################### */

const StorageCases = {

   getNextId: (): number => {
      try {
         let nextId = -1;
         const raw = localStorage.getItem(STORAGIES.CASES);
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
         const version = localStorage.getItem(STORAGIES.VERSION);
         if (version !== VERSION) {
            localStorage.setItem(STORAGIES.CASES, JSON.stringify([]));
            return [];
         }
         const raw = localStorage.getItem(STORAGIES.CASES);
         return raw ? JSON.parse(raw) : [];
      } catch {
         return [];
      } finally {
         localStorage.setItem(STORAGIES.VERSION, VERSION);
      }
   },

   save: (cases: TCase[]) => {
      localStorage.setItem(STORAGIES.CASES, JSON.stringify(cases));
   },

   remove: () => {
      localStorage.setItem(STORAGIES.CASES, JSON.stringify([]));
   },
};

/* ###################################################################### */

export default StorageCases;
