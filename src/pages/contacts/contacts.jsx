import { Map } from "react-yandex-maps";
import { Placemark } from "react-yandex-maps";
import { GeolocationControl } from "react-yandex-maps";
import { ZoomControl } from "react-yandex-maps";
import "./contacts.css";

function Contacts() {
  return (
    <article className="contacts">
      <h2 className="contacts__header">Контакты компании ООО&nbsp;ТД&nbsp;«УралТехДеталь»</h2>
      <div className="contacts__container">
        <strong className="contacts__label">Телефон:</strong>
        <a className="contacts__link" href="tel:+73513264004">
          +7 (3513) 264-004
        </a>
        <a className="contacts__link" href="tel:+79193151000">
          +7 (919) 315-10-00
        </a>
      </div>
      <div className="contacts__container">
        <strong className="contacts__label">E-mail:</strong>
        <div className="contacts__emails-container">
          <a className="contacts__link" href="mailto:gruz_74@mail.ru">
            gruz_74@mail.ru
          </a>
          <span className="contacts__link-text"> (отдел продаж)</span>
        </div>
        <div className="contacts__emails-container">
          <a className="contacts__link" href="mailto:89193151000@mail.ru">
            89193151000@mail.ru
          </a>
          <span className="contacts__link-text"> (отдел закупок)</span>
        </div>
      </div>
      <div className="contacts__container">
        <strong className="contacts__label">Фактический адрес:</strong>
        <address className="contacts__address">
          456300, Челябинская область, город Миасс, Тургоякское шоссе, дом № 3/16, помещение 1
        </address>
      </div>
      <div className="contacts__container">
        <strong className="contacts__label">Почтовый адрес:</strong>
        <address className="contacts__address">
          456317, Челябинская область, город Миасс, улица Степана Разина дом № 1, квартира 31
        </address>
      </div>
      <div>
        <strong className="contacts__label">Режим работы:</strong>
        <ul className="contacts__opening-hours-list">
          <li className="contacts__opening-hours">
            местное время: ПН-ПТ 9:00 — 17:00, обед с 12:00 до 12:30
          </li>
          <li className="contacts__opening-hours">
            московское время: ПН-ПТ 7:00 — 15:00, обед с 10:00 до 10:30
          </li>
        </ul>
      </div>
      <strong className="contacts__label-map">Схема проезда</strong>
      <div className="contacts__map-container">
        <Map className="contacts__map" defaultState={{ center: [55.105233, 60.133198], zoom: 17 }}>
          <Placemark geometry={[55.105233, 60.133198]} />
          <GeolocationControl options={{ float: "left" }} />
          <ZoomControl options={{ float: "right" }} />
        </Map>
      </div>
    </article>
  );
}

export { Contacts };
