/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: HomePage

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../06_Store/store";
import { addCaseAndReturnId } from "../../06_Store/cases/cases.thunks";

// ########## STANDART
import type { JSX } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ

// ########## СТИЛИ
import "./HomePage.styles.css";

// ########## КОМПОНЕНТЫ
import { Topic, Button } from "../../05_Shared/ui";
import { GiftList, CasePreviewList } from "../../03_Widgets";

// ########## МОДУЛИ
import { initDataCase } from "../../05_Shared/types/init";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

// const items: TCase[] = [
//    {
//       id: 0,
//       isTop: null,
//       position: 1,
//       title: "Сияние",
//       desc: "Звезды светят ярко и точно знают как согреть твой баланс.",
//       slug: "glow",
//       dtCreate: 1765886400,
//       style: "purgold",
//       price: 799,
//       sale: null,
//       limit: null,
//       timer: null,
//       stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
//       srcs: { low: "", high: "" },
//       items: []
//    },
//    {
//       id: 1,
//       isTop: null,
//       position: 2,
//       title: "Льдина",
//       desc: "Хрусть! Либо красиво, либо подозрительно красиво.",
//       slug: "iceblock",
//       dtCreate: 1765800000,
//       style: "ice",
//       price: 329,
//       sale: null,
//       limit: null,
//       timer: null,
//       stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
//       srcs: { low: "", high: "" },
//       items: []
//    },
//    {
//       id: 2,
//       isTop: null,
//       position: 3,
//       title: "Фортуна",
//       desc: "Фортуна мало обещает, но может очень дорого удивить.",
//       slug: "fortune",
//       dtCreate: 1765368000,
//       style: "default",
//       price: 169,
//       sale: null,
//       limit: null,
//       timer: null,
//       stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
//       srcs: { low: "", high: "" },
//       items: []
//    },
//    {
//       id: 3,
//       isTop: null,
//       position: 4,
//       title: "Стиль",
//       desc: "Кейс держит эмоции дольше, чем твой аккумулятор.",
//       slug: "swag",
//       dtCreate: 1765713600,
//       style: "zoom",
//       price: 249,
//       sale: null,
//       limit: null,
//       timer: null,
//       stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
//       srcs: { low: "", high: "" },
//       items: []
//    },
//    {
//       id: 4,
//       isTop: null,
//       position: 5,
//       title: "Посылка",
//       desc: "Тебе пришла крупная посылка! Забирай и открывай!",
//       slug: "package",
//       dtCreate: 1766429532,
//       style: "default",
//       price: 9,
//       sale: null,
//       limit: null,
//       timer: null,
//       stats: { legendary: 0, epic: 0, rare: 0, unique: 0, common: 0 },
//       srcs: { low: "", high: "" },
//       items: []
//    },
// ];

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const HomePage = (): JSX.Element => {

   const dispatch = useDispatch<AppDispatch>();

   const navigate = useNavigate();

   const createNewCase = useCallback(() => {
      const newId = dispatch(addCaseAndReturnId({ ...initDataCase }));
      navigate(`/case/${newId}`);
   }, [navigate, dispatch]);

   return (
      <div className="page-home">

         <div className="page-block">
            <Topic title="Кейсы" />
            <div className="button-list-h">
               <Button title="Создать" clickAction={createNewCase} />
               <Button title="Загрузить" clickAction={() => { }} />
            </div>
            <CasePreviewList />
         </div>

         <div className="page-block">
            <Topic title="Подарки" />
            <GiftList />
         </div>

      </div>
   );
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default HomePage;
