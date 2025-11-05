import { useState } from "react";
import type { FC } from "react";

import { CallModal } from "../call-modal";
import { RequestModal } from "../request-modal";

import "./header.css";
import logoSrc from "./logo.webp";
import iconCallSrc from "./call-icon.svg";
import iconEmailSrc from "./email-icon.svg";
import iconPhoneSrc from "./phone-icon.svg";
import iconPriceSrc from "./price-icon.svg";
import iconRequestSrc from "./request-icon.svg";
import iconSmartphoneSrc from "./smartphone-icon.svg";

const HEADER_LOGO_DIMENSIONS = { width: 880, height: 320 };
const HEADER_CONTACT_ICON_DIMENSIONS = { width: 18, height: 18 };
const HEADER_ACTION_ICON_DIMENSIONS = { width: 18, height: 19 };

const Header: FC = () => {
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
    <header className="header">
      <div className="header__logo">
        <img
          className="header__logo-image"
          src={logoSrc}
          alt="Логотип компании"
          width={HEADER_LOGO_DIMENSIONS.width}
          height={HEADER_LOGO_DIMENSIONS.height}
        />
      </div>
      <div className="header__phones">
        <div className="header__phone">
          <img
            className="header__phone-icon"
            src={iconPhoneSrc}
            alt="Иконка телефона"
            width={HEADER_CONTACT_ICON_DIMENSIONS.width}
            height={HEADER_CONTACT_ICON_DIMENSIONS.height}
          />
          <a className="header__phone-number" href="tel:+73513264004">
            +7 (3513) 264-004
          </a>
        </div>
        <div className="header__phone">
          <img
            className="header__phone-icon"
            src={iconSmartphoneSrc}
            alt="Иконка мобильного телефона"
            width={HEADER_CONTACT_ICON_DIMENSIONS.width}
            height={HEADER_CONTACT_ICON_DIMENSIONS.height}
          />
          <a className="header__phone-number" href="tel:+79193151000">
            +7 (919) 315-10-00
          </a>
        </div>
      </div>
      <div className="header__emails">
        <div className="header__email">
          <img
            className="header__email-icon"
            src={iconEmailSrc}
            alt="Иконка email"
            width={HEADER_CONTACT_ICON_DIMENSIONS.width}
            height={HEADER_CONTACT_ICON_DIMENSIONS.height}
          />
          <a className="header__email-address" href="mailto:gruz_74@mail.ru">
            gruz_74@mail.ru (отдел продаж)
          </a>
        </div>
        <div className="header__email">
          <img
            className="header__email-icon"
            src={iconEmailSrc}
            alt="Иконка email"
            width={HEADER_CONTACT_ICON_DIMENSIONS.width}
            height={HEADER_CONTACT_ICON_DIMENSIONS.height}
          />
          <a className="header__email-address" href="mailto:89193151000@mail.ru">
            89193151000@mail.ru (отдел закупок)
          </a>
        </div>
      </div>
      <div className="header__actions">
        <div className="header__action">
          <img
            className="header__action-icon"
            src={iconPriceSrc}
            alt="Иконка прайс-листа"
            width={HEADER_ACTION_ICON_DIMENSIONS.width}
            height={HEADER_ACTION_ICON_DIMENSIONS.height}
          />
          <a
            className="header__action-link"
            href="https://drive.google.com/file/d/1YJSsE58Co4uEeVLHjXuhn4hRS_4h0usD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Смотреть прайс-лист
          </a>
        </div>
        <div className="header__action">
          <img
            className="header__action-icon"
            src={iconRequestSrc}
            alt="Иконка отправки заявки"
            width={HEADER_ACTION_ICON_DIMENSIONS.width}
            height={HEADER_ACTION_ICON_DIMENSIONS.height}
          />
          <button className="header__action-button" onClick={handleRequestClick}>
            Отправить заявку
          </button>
          {isRequestModalOpen && <RequestModal onClose={closeRequestModal} />}
        </div>
        <div className="header__action">
          <img
            className="header__action-icon"
            src={iconCallSrc}
            alt="Иконка заказа звонка"
            width={HEADER_ACTION_ICON_DIMENSIONS.width}
            height={HEADER_ACTION_ICON_DIMENSIONS.height}
          />
          <button className="header__action-button" onClick={handleCallClick}>
            Заказать звонок
          </button>
          {isCallModalOpen && <CallModal onClose={closeCallModal} />}
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export { Header };
