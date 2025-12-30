/*
:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::

  КОМПОНЕНТ: Case Page

:::::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::::::
*/

// State
import { useDispatch, useSelector, } from "react-redux";
import type { AppState, AppDispatch } from "../../06_Store/store";
import { updateCase, removeCase } from "../../06_Store/cases/cases.slice";
import { getCaseById } from "../../06_Store/cases/cases.selectors";
import { cloneCaseAndReturnId } from "../../06_Store/cases/cases.thunks";

// ########## STANDART
import type { JSX } from "react";
import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ########## ТИПЫ
import type { TCase, TCasesListSave, TCaseItem, TCaseItemRarity } from "../../05_Shared/types/global";

// ########## СТИЛИ
import "./Case.styles.css";

// ########## КОМПОНЕНТЫ
import { Button, ModalSelect, Price, Topic2 } from "../../05_Shared/ui";
import { Screen, CaseChooseList } from "../../03_Widgets";

// ########## МОДУЛИ
import { CaseEditorContext } from "../../05_Shared/contexts/CaseEditor/CaseEditor.context";
import { downloadJson } from "../../05_Shared/funcs/global";
import { mathCaseItemsPercent } from "../../05_Shared/funcs/gifts";
import { VERSION } from "../../05_Shared/consts/global";
import { useModal } from "../../05_Shared/services/Modal/useModal";
import { getGiftImg, getCointImg } from "../../05_Shared/funcs/gifts";
import { useCaseEditor } from "../../05_Shared/contexts/CaseEditor/CaseEditor.hook";

// ########## РЕСУРСЫ
import casecoin from "../../01_Assets/02_images/casecoin.svg";
import wowcoin from "../../01_Assets/02_images/wowcoin.svg";

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


// export interface ICasePage {};

export type CasePageTab = "info" | "test" | "raw";

export type TCaseMath = {
   rtp: number,
   priceMin: number,
   priceMax: number,
   priceAvg: number,
   priceAvgByPermille: number,
   casePriceByRtp: number,
   totalPermille: number,
};


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */


const CasePage = (): JSX.Element => {

   const navigate = useNavigate();
   const { open, close } = useModal();

   const dispatch = useDispatch<AppDispatch>();

   const { id } = useParams<{ id: string }>();
   const caseId = id ? parseInt(id, 10) : null;
   const caseData = useSelector((state: AppState) => caseId !== null ? getCaseById(caseId)(state) : null);

   const [isSave, setIsSave] = useState<boolean>(true);
   const [draft, setDraft] = useState<TCase | null>(null);

   const [isTest, setIsTest] = useState<boolean>(false);

   const caseMath: TCaseMath | null = useMemo(() => {
      if (!draft) return null;

      const rtp = 0.65;
      const len = draft.items.length;

      let priceMin = Infinity;
      let priceMax = 0;
      let priceAvg = 0;
      let priceAvgByPermille = 0;
      let totalPermille = 0;

      for (let i = 0; i < len; i++) {
         priceMin = draft.items[i].price < priceMin ? draft.items[i].price : priceMin;
         priceMax = draft.items[i].price > priceMax ? draft.items[i].price : priceMax;
         priceAvg += draft.items[i].price;
         priceAvgByPermille += draft.items[i].price * (draft.items[i].permille / 100000);
         totalPermille += draft.items[i].permille;
      }

      return {
         rtp,
         priceMin: priceMin === Infinity ? 0 : priceMin,
         priceMax,
         priceAvg: Math.floor(len > 0 ? priceAvg / len : 0),
         priceAvgByPermille: Math.floor(priceAvgByPermille),
         casePriceByRtp: Math.floor(priceAvgByPermille / rtp),
         totalPermille,
      };
   }, [draft])

   const [tab, setTab] = useState<CasePageTab>("info");

   useEffect(() => {
      if (!caseData) navigate("/cases", { replace: true });
      else queueMicrotask(() => setDraft(caseData));
   }, [navigate, caseData, setDraft]);

   const switchTab = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const tabName = e.currentTarget.dataset.name as CasePageTab;
      setTab(tabName);
   }, [setTab]);

   const updateDraft = useCallback(<K extends keyof TCase>(key: K, value: TCase[K]) => {

      setDraft(prev => {
         if (!prev) return prev;

         if (key === "items") {
            const { data, items } = mathCaseItemsPercent(value as TCaseItem[]);
            const { legendary, epic, rare, unique, common } = data;

            return ({
               ...prev!,
               items,
               stats: {
                  legendary: legendary.count,
                  epic: epic.count,
                  rare: rare.count,
                  unique: unique.count,
                  common: common.count
               },
            });
         }

         return ({ ...prev!, [key]: value });
      });

      if (isSave) setIsSave(false);

   }, [isSave, setIsSave, setDraft]);

   const pushItemInCase = useCallback((newItem: TCaseItem) => {
      if (!draft) return;
      newItem.id = draft.items.length || 0;
      updateDraft("items", [...draft.items, newItem]);
      // console.log(newItem);
      close();
   }, [close, draft, updateDraft]);


   /* TEST */

   const onTestStart = useCallback(() => {
      if (isTest) return;
      setIsTest(true);
   }, [isTest, setIsTest]);

   /* Buttons */

   const save = useCallback(() => {
      if (isSave) return;
      dispatch(updateCase(draft!));
      setIsSave(true);
   }, [isSave, setIsSave, dispatch, draft]);

   const clone = useCallback(() => {
      if (!isSave) {
         dispatch(updateCase(draft!));
         setIsSave(true);
      }
      const newId = dispatch(cloneCaseAndReturnId({ id: draft!.id }));
      if (newId) navigate(`/cases/${newId}`);
   }, [isSave, setIsSave, dispatch, draft, navigate]);

   const remove = useCallback(() => {
      dispatch(removeCase({ id: draft!.id }));
   }, [draft, dispatch]);

   const download = useCallback(() => {
      if (!caseData) return;
      const saveData: TCasesListSave = { version: VERSION, type: "list", list: [caseData] };
      downloadJson(saveData, caseData.slug);
   }, [caseData]);


   /* Modals */

   const openChooseModal = useCallback(() => {
      open(
         <Screen closeAction={close}>
            <ModalSelect actionClose={close}>
               <CaseChooseList chooseAction={pushItemInCase} />
            </ModalSelect>
         </Screen>
      );
   }, [open, close, pushItemInCase]);

   if (!draft) return <></>;

   return (
      <CaseEditorContext.Provider value={{ draft, update: updateDraft }}>
         <div className="page-case">
            <div className="case-editor-block">

               <div className="case-editor-title">
                  <div className="case-editor-img-container">
                     <img src={casecoin} alt="CASECOIN" className="case-editor-img" />
                  </div>
                  <input className="case-editor-text-input" type="text" name="caseEditorTitle" id="caseEditorTitle" placeholder="Название"
                     value={draft.title} onChange={(e) => updateDraft("title", e.target.value.toUpperCase())}
                  />
               </div>

               <div className="case-editor-button-list-h">
                  <Button title={`Сохранить${isSave ? '' : '*'}`} type={isSave ? `disable` : 'green'} status={isSave ? `disable` : 'default'} clickAction={save} />
                  <Button title="Клонировать" type="default" clickAction={clone} />
                  <Button title="Скачать" type="yellow" clickAction={download} />
                  <Button title="Удалить" type="red" clickAction={remove} />
               </div>

               <div className="case-editor-tabs">
                  <div className={`case-tab ${tab === "info" ? 'case-tab-active' : ''}`.trim()} data-name="info" onClick={switchTab}>Кейс</div>
                  <div className={`case-tab ${tab === "test" ? 'case-tab-active' : ''}`.trim()} data-name="test" onClick={switchTab}>Тесты</div>
                  <div className={`case-tab ${tab === "raw" ? 'case-tab-active' : ''}`.trim()} data-name="raw" onClick={switchTab}>RAW</div>
               </div>

               {tab === "info" &&
                  <div className="case-editor-tab-content">

                     <div className="case-editor-tab-content-block">
                        <Topic2 title="Цена" />
                        <CasePriceEl id="caseEditorPrice" math={caseMath} />
                     </div>

                     <div className="case-editor-tab-content-block">
                        <Topic2 title="Показатели" />
                        <div className="case-math">

                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>рек. цена кейса</span></div>
                              <div className="case-math-item-value"><Price position="left" value={caseMath?.casePriceByRtp || 0} /></div>
                           </div>

                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>rtp</span></div>
                              <div className="case-math-item-value">{caseMath ? (caseMath.rtp * 100).toFixed(2) : "0.00"}%</div>
                           </div>


                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>полнота</span></div>
                              <div className={`case-math-item-value ${caseMath && caseMath.totalPermille !== 100000 ? "text-red" : "text-green"}`.trim()}>{caseMath ? `${(caseMath.totalPermille / 1000).toFixed(2)}` : "0.00"}%</div>
                           </div>

                        </div>
                        <div className="case-math">

                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>min цена дропа</span></div>
                              <div className="case-math-item-value"><Price position="left" value={caseMath?.priceMin || 0} /></div>
                           </div>

                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>avg цена дропа</span></div>
                              <div className="case-math-item-value"><Price position="left" value={caseMath?.priceAvgByPermille || 0} /></div>
                           </div>

                           <div className="case-math-item _unselect">
                              <div className="case-math-item-title"><span>max цена дропа</span></div>
                              <div className="case-math-item-value"><Price position="left" value={caseMath?.priceMax || 0} /></div>
                           </div>

                        </div>
                     </div>

                     <div className="case-editor-tab-content-block">
                        <Topic2 title="Содержимое" />
                        <div className="case-editor-gifts-list">

                           <div className="case-stat-counts _unselect">
                              <div className={`case-stat-count-item ${!draft.items.length ? "text-red" : "text-default"}`} data-name="T" data-rarity="default">{draft.items.length || 0}</div>
                              <div className={`case-stat-count-item ${!draft.stats.legendary ? "text-red" : "text-default"}`} data-name="L" data-rarity="legendary">{draft.stats.legendary}</div>
                              <div className={`case-stat-count-item ${!draft.stats.epic ? "text-red" : "text-default"}`} data-name="E" data-rarity="epic">{draft.stats.epic}</div>
                              <div className={`case-stat-count-item ${!draft.stats.rare ? "text-red" : "text-default"}`} data-name="R" data-rarity="rare">{draft.stats.rare}</div>
                              <div className={`case-stat-count-item ${!draft.stats.unique ? "text-red" : "text-default"}`} data-name="U" data-rarity="unique">{draft.stats.unique}</div>
                              <div className={`case-stat-count-item ${!draft.stats.common ? "text-red" : "text-default"}`} data-name="C" data-rarity="common">{draft.stats.common}</div>
                           </div>

                           <div className="case-editor-gift-plus" onClick={openChooseModal} />

                           {draft.items.map(item => <CaseItemEl key={item.content.id} item={item} />)}

                        </div>
                     </div>

                  </div>
               }

               {tab === "test" &&
                  <div className="case-editor-tab-content">

                     <div className="case-editor-tab-content-block">
                        <Topic2 title="Тестирование" />
                        <div className="case-editor-test">
                           <div className="case-editor-test-opts">
                              <InputNumberLine id="caseWditorTestRange" isBlock={isTest} min={100} max={10000} step={100} current={1000} />
                              <div className={`case-editor-test-btn-start ${isTest ? 'btn-block' : ''}`.trim()} onClick={onTestStart}><span className="_unselect">ТЕСТ</span></div>
                           </div>
                           <div className="case-editor-test-result"></div>
                        </div>
                     </div>

                  </div>
               }

               {tab === "raw" &&
                  <div className="case-editor-tab-content">
                     <pre className="raw">{JSON.stringify(draft, null, 2)}</pre>
                  </div>
               }

            </div>
         </div>
      </CaseEditorContext.Provider>
   );
};

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface ICaseItemEl {
   item: TCaseItem;
};

const CaseItemEl = React.memo(({ item }: ICaseItemEl): JSX.Element => {

   const { draft, update } = useCaseEditor();

   const caseItemRef = useRef<HTMLDivElement>(null);
   const timerRef = useRef<number | null>(null);
   const [remove, setRemove] = useState<boolean>(false);

   const updateRarity = useCallback((rarity: TCaseItemRarity) => {
      if (rarity === item.rarity) return;
      update("items", draft.items.map(el => el.id === item.id ? { ...el, rarity: rarity } : el));
   }, [item, draft, update]);

   const removeItem = useCallback(() => {
      update("items", draft.items.map(el => ({ ...el })).filter(el => el.id !== item.id));
   }, [item, draft, update]);

   const toggleRemove = useCallback(() => {
      setRemove(prev => !prev);
   }, [setRemove]);

   const startPress = () => {
      if (timerRef.current) return;
      timerRef.current = window.setTimeout(() => {
         toggleRemove();
         timerRef.current = null;
      }, 500);
   };

   const clearPress = () => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = null;
      }
   };

   return (
      <div ref={caseItemRef} className="case-editor-item" data-id={item.id} data-rarity={item.rarity}
         onDoubleClick={toggleRemove}
         onMouseDown={startPress}
         onMouseUp={clearPress}
         onMouseLeave={clearPress}
         onTouchStart={startPress}
         onTouchEnd={clearPress}
         onTouchMove={clearPress}
      >

         <div className="case-editor-item-img-box">
            {remove && <div className="case-editor-item-btn-delete" onClick={removeItem}><span className="svg-icon svg-icon-28 svg-icon-white svg-model-delete _unselect" /></div>}
            <img src={item.content.type === "gift" ? getGiftImg(item.content.id!) : getCointImg(item.price)} alt={item.content.name} className="case-editor-item-img _unselect" />
         </div>

         <div className="case-editor-item-data">
            <div className="case-editor-item-name">{item.content.name}</div>
            <div className="case-editor-item-price _unselect">
               <div className="case-editor-item-percent">{(item.permille / 1000).toFixed(3)}%</div>
               <Price value={item.price ? item.price.toFixed(0) : '0'} />
            </div>
         </div>

         <div className="case-editor-item-opts">
            <div className="case-editor-item-rarities">
               <div className={`case-editor-item-rarity ${item.rarity === "legendary" ? "rarity-active" : ""}`.trim()} data-rarity="legendary" onClick={() => updateRarity("legendary")}><span className="_unselect">L</span></div>
               <div className={`case-editor-item-rarity ${item.rarity === "epic" ? "rarity-active" : ""}`.trim()} data-rarity="epic" onClick={() => updateRarity("epic")}><span className="_unselect">E</span></div>
               <div className={`case-editor-item-rarity ${item.rarity === "rare" ? "rarity-active" : ""}`.trim()} data-rarity="rare" onClick={() => updateRarity("rare")}><span className="_unselect">R</span></div>
               <div className={`case-editor-item-rarity ${item.rarity === "unique" ? "rarity-active" : ""}`.trim()} data-rarity="unique" onClick={() => updateRarity("unique")}><span className="_unselect">U</span></div>
               <div className={`case-editor-item-rarity ${item.rarity === "common" ? "rarity-active" : ""}`.trim()} data-rarity="common" onClick={() => updateRarity("common")}><span className="_unselect">C</span></div>
            </div>
         </div>

      </div>
   );
});

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface ICasePriceEl {
   id: string;
   math: TCaseMath | null;
   isBlock?: true;
};

const CasePriceEl = React.memo(({ id, math, isBlock }: ICasePriceEl): JSX.Element => {

   const { draft, update } = useCaseEditor();
   const [value, setValue] = useState<number | "">(draft.price);

   const realRTP = (math && value && value > 0) ? `${(math.priceAvgByPermille / value * 100).toFixed(2)}%` : "0.00%";

   const change = useCallback((rawValue: number | string) => {
      const newValue = typeof rawValue === "string" ? (parseInt(rawValue) || "") : rawValue;
      setValue(newValue);
      if (newValue) update("price", newValue);
   }, [setValue, update]);

   const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBlock) return;
      const newValue = parseInt(e.currentTarget.value) || "";
      change(newValue);
   }, [isBlock, change]);

   const onBlur = useCallback(() => {
      if (!value) setValue(0);
   }, [value, setValue]);

   return (
      <div className="case-editor-price" data-rtp={realRTP}>
         <div className="case-editor-price-img-container">
            <img src={wowcoin} alt="WOWCOIN" className="case-editor-price-img _unselect" />
         </div>
         <input className={`case-editor-price-input ${isBlock ? 'input-block' : ''}`.trim()} type="number" name={id} id={id} step={1} value={value} onChange={onChange} onBlur={onBlur} />
      </div>
   );
});


/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export interface IInputNumberLine {
   id: string;
   min: number;
   max: number;
   step: number;
   current: number;
   isBlock?: boolean;
};

const InputNumberLine = React.memo(({ id, min, max, step, current, isBlock }: IInputNumberLine): JSX.Element => {

   const [value, setValue] = useState<number>(current);

   const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (isBlock) return;
      const newValue = parseInt(e.currentTarget.value);
      setValue(newValue);
   }, [setValue, isBlock])

   return (
      <div className={`input-number-line ${isBlock ? 'input-number-line-block' : ''}`.trim()}>
         <input className="input-number-line-range" type="range" name={id} id={id} min={min} max={max} step={step} value={value} onChange={onChange} />
         <div className="imput-number-line-value _unselect">{value}</div>
      </div>
   );
});

/* ::::::: :::::::::: :::::::::: :::::::::: :::::::::: :::::::::: ::::::: */

export default CasePage;
