import type { FC } from "react";

import "./details.css";

const Details: FC = () => {
  return (
    <article className="details">
      <h2 className="details__header">Реквизиты компании</h2>
      <div className="details__container">
        <p className="details__name">Полное наименование</p>
        <p className="details__description">
          Общество с ограниченной ответственностью торговый дом «УралТехДеталь»
        </p>
      </div>
      <div className="details__container">
        <p className="details__name">Сокращённое наименование</p>
        <p className="details__description">ООО ТД «УралТехДеталь»</p>
      </div>
      <div className="details__container">
        <p className="details__name">Юридический адрес</p>
        <p className="details__description">
          456300, Челябинская область, город Миасс, Тургоякское шоссе, дом № 3/16, помещение 1
        </p>
      </div>
      <div className="details__container">
        <p className="details__name">Фактический адрес</p>
        <p className="details__description">
          456300, Челябинская область, город Миасс, Тургоякское шоссе, дом № 3/16, помещение 1
        </p>
      </div>
      <div className="details__container">
        <p className="details__name">Почтовый адрес</p>
        <p className="details__description">
          456317, Челябинская область, город Миасс, улица Степана Разина, дом № 1, квартира 31
        </p>
      </div>
      <div className="details__container">
        <p className="details__name">ИНН</p>
        <p className="details__description">7415096937</p>
      </div>
      <div className="details__container">
        <p className="details__name">КПП</p>
        <p className="details__description">741501001</p>
      </div>
      <div className="details__container">
        <p className="details__name">ОГРН</p>
        <p className="details__description">1177456011193</p>
      </div>
      <div className="details__container">
        <p className="details__name">ОКВЭД</p>
        <p className="details__description">
          50.30.1 Оптовая торговля автомобильными деталями, узлами и принадлежностями
        </p>
      </div>
      <div className="details__container">
        <p className="details__name">Руководитель предприятия</p>
        <p className="details__description">Директор Лубенков Юрий Николаевич</p>
      </div>
      <div className="details__container">
        <p className="details__name">Главный бухгалтер</p>
        <p className="details__description">Яценко Наталья Николаевна</p>
      </div>
      <h2 className="details__header">Банковские реквизиты</h2>
      <div className="details__container">
        <p className="details__name">Полное наименование банка</p>
        <p className="details__description">ПАО «ЧЕЛИНДБАНК» г.Челябинск</p>
      </div>
      <div className="details__container">
        <p className="details__name">БИК</p>
        <p className="details__description">047 501 711</p>
      </div>
      <div className="details__container">
        <p className="details__name">Корреспондирующий счет</p>
        <p className="details__description">301 018 104 000 000 007 11</p>
      </div>
      <div className="details__container">
        <p className="details__name">Расчетный счет</p>
        <p className="details__description">407 028 108 091 000 014 48</p>
      </div>
      <strong className="details__fact">Организация является плательщиком НДС.</strong>
    </article>
  );
};

Details.displayName = "Details";

export { Details };
