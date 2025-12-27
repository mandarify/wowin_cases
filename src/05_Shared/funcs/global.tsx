/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: GLOBAL FUNCS

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

export const formatUnixDate = (unix: number): string => {
   return new Date(unix * 1000)
      .toLocaleDateString("ru-RU", {
         day: "2-digit",
         month: "long",
         year: "numeric"
      })
      .replace(" г.", "");
};

export const splitKeepMark = (title: string, mark: string): string[] => {
   const escaped = mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   const regex = new RegExp(`(${escaped})`, "gi");
   return title.split(regex);
};
