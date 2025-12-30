/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  МОДУЛЬ: GLOBAL FUNCS

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

export const unixNow = (): number => Math.floor(Date.now() / 1000);

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

export const downloadJson = (data: object, name: string) => {
   const blob = new Blob(
      [JSON.stringify(data, null, 3)],
      { type: 'application/json' }
   );

   const a = document.createElement('a');
   a.href = URL.createObjectURL(blob);
   a.download = `${name}.json`;
   a.click();

   URL.revokeObjectURL(a.href);
};
