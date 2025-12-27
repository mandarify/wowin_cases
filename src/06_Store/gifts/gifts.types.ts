/* ######################################################################

   Types

######################################################################### */


// ===== СТАНДАРТНЫЕ
import type { TGiftData } from "../../05_Shared/types/global";


/* ###################################################################### */


export type TGifts = {
   list: TGiftData[],
   selectedProduct: TGifts | null,
   status: "idle" | "loading" | "success" | "error",
   error: string | null,
};
