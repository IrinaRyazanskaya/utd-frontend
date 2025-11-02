import { useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { CallModal } from "../call-modal";
import { RequestModal } from "../request-modal";

import "./footer.css";
import iconCallSrc from "./call-icon.svg";
import iconEmailSrc from "./email-icon.svg";
import iconPhoneSrc from "./phone-icon.svg";
import iconPlaceholderSrc from "./placeholder-icon.svg";
import iconPriceSrc from "./price-icon.svg";
import iconRequestSrc from "./request-icon.svg";

const Footer: FC = () => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);

  const handleRequestClick = () => {
    setRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setRequestModalOpen(false);
  };

  const [isCallModalOpen, setCallModalOpen] = useState(false);

  const handleCallClick = () => {
    setCallModalOpen(true);
  };

  const closeCallModal = () => {
    setCallModalOpen(false);
  };

  return (
    <footer className="footer">
      <div className="footer__actions">
        <a
          className="footer__action-link"
          href="https://drive.google.com/file/d/1YJSsE58Co4uEeVLHjXuhn4hRS_4h0usD/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer__action-icon" src={iconPriceSrc} alt="Иконка прайс-листа" />
          <span className="footer__price-list">СМОТРЕТЬ ПРАЙС-ЛИСТ</span>
        </a>
        <button className="footer__action-button" onClick={handleRequestClick}>
          <img className="footer__action-icon" src={iconRequestSrc} alt="Иконка отправки заявки" />
          ОТПРАВИТЬ ЗАЯВКУ
        </button>
        {isRequestModalOpen && <RequestModal onClose={closeRequestModal} />}
        <button className="footer__action-button" onClick={handleCallClick}>
          <img className="footer__action-icon" src={iconCallSrc} alt="Иконка заказа звонка" />
          ЗАКАЗАТЬ ЗВОНОК
        </button>
        {isCallModalOpen && <CallModal onClose={closeCallModal} />}
      </div>
      <div className="footer__links">
        <HashLink className="footer__link" smooth to="/about#top">
          Информация о компании
        </HashLink>
        <HashLink className="footer__link" smooth to="/delivery#top">
          Доставка и оплата
        </HashLink>
        <HashLink className="footer__link" smooth to="/guarantees#top">
          Гарантии и возврат
        </HashLink>
      </div>
      <div className="footer__links">
        <HashLink className="footer__link" smooth to="/details#top">
          Реквизиты компании
        </HashLink>
        <HashLink className="footer__link" smooth to="/cooperation#top">
          Сотрудничество
        </HashLink>
        <HashLink className="footer__link" smooth to="/contacts#top">
          Контактная информация
        </HashLink>
      </div>
      <div className="footer__contacts">
        <div className="footer__phones">
          <img className="footer__phones-icon" src={iconPhoneSrc} alt="Иконка телефоноа" />
          <div className="footer__phone-numbers">
            <a className="footer__phone-number" href="tel:+73513264004">
              +7 (3513) 264-004
            </a>
            <a className="footer__phone-number" href="tel:+79193151000">
              +7 (919) 315-10-00
            </a>
          </div>
        </div>
        <div className="footer__emails">
          <img className="footer__emails-icon" src={iconEmailSrc} alt="Иконка email" />
          <div className="footer__email-addresses">
            <a className="footer__email-address" href="mailto:gruz_74@mail.ru">
              gruz_74@mail.ru
            </a>
            <span className="footer__email-text"> отдел продаж </span>
            <a className="footer__email-address" href="mailto:89193151000@mail.ru">
              89193151000@mail.ru
            </a>
            <span className="footer__email-text"> отдел закупок</span>
          </div>
        </div>
        <div className="footer__location">
          <img
            className="footer__placeholder-icon"
            src={iconPlaceholderSrc}
            alt="Иконка места на карте"
          />
          <div className="footer__address">
            <address className="footer__address-text">
              Челябинская область, город Миасс,
              <br />
              Тургоякское шоссе, дом № 3/16,
              <br />
              помещение 1
            </address>
            <Link className="footer__map-link" to="/contacts">
              Карта проезда
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export { Footer };
