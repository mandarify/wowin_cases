/* ######################################################################

   Gifts Types

######################################################################### */

// ===== СТАНДАРТНЫЕ
import type { TGiftsSet, TGiftData } from "../../05_Shared/types/global";

/* ###################################################################### */


export type TGiftsState = {
   data: TGiftsSet | null,
   selectedGift: TGiftData | null,
   status: "idle" | "loading" | "success" | "error",
   error: string | null,
};
