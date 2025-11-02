import { useState } from "react";
import type { FC } from "react";

import { CallModal } from "../call-modal";
import { RequestModal } from "../request-modal";

import "./mobile-header.css";
import iconCallSrc from "./call-icon.svg";
import iconEmailSrc from "./email-icon.svg";
import iconPhoneSrc from "./phone-icon.svg";
import iconPriceSrc from "./price-icon.svg";
import iconRequestSrc from "./request-icon.svg";
import iconSmartphoneSrc from "./smartphone-icon.svg";

const MobileHeader: FC = () => {
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
    <header className="mobile-header">
      <div className="mobile-header__contacts">
        <div className="mobile-header__phones">
          <div className="mobile-header__phone">
            <img className="mobile-header__phone-icon" src={iconPhoneSrc} alt="Иконка телефона" />
            <a className="mobile-header__phone-number" href="tel:+73513264004">
              +7 (3513) 264-004
            </a>
          </div>
          <div className="mobile-header__phone">
            <img
              className="mobile-header__phone-icon"
              src={iconSmartphoneSrc}
              alt="Иконка мобильного телефона"
            />
            <a className="mobile-header__phone-number" href="tel:+79193151000">
              +7 (919) 315-10-00
            </a>
          </div>
        </div>
        <div className="mobile-header__emails">
          <div className="mobile-header__email">
            <img className="mobile-header__email-icon" src={iconEmailSrc} alt="Иконка email" />
            <a className="mobile-header__email-address" href="mailto:gruz_74@mail.ru">
              gruz_74@mail.ru (отдел продаж)
            </a>
          </div>
          <div className="mobile-header__email">
            <img className="mobile-header__email-icon" src={iconEmailSrc} alt="Иконка email" />
            <a className="mobile-header__email-address" href="mailto:89193151000@mail.ru">
              89193151000@mail.ru (отдел закупок)
            </a>
          </div>
        </div>
      </div>
      <div className="mobile-header__actions">
        <div className="mobile-header__action">
          <img className="mobile-header__action-icon" src={iconPriceSrc} alt="Иконка прайс-листа" />
          <a
            className="mobile-header__action-link"
            href="https://drive.google.com/file/d/1YJSsE58Co4uEeVLHjXuhn4hRS_4h0usD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Смотреть прайс-лист
          </a>
        </div>
        <div className="mobile-header__action">
          <img
            className="mobile-header__action-icon"
            src={iconRequestSrc}
            alt="Иконка отправки заявки"
          />
          <button className="mobile-header__action-button" onClick={handleRequestClick}>
            Отправить заявку
          </button>
          {isRequestModalOpen && <RequestModal onClose={closeRequestModal} />}
        </div>
        <div className="mobile-header__action">
          <img
            className="mobile-header__action-icon"
            src={iconCallSrc}
            alt="Иконка заказа звонка"
          />
          <button className="mobile-header__action-button" onClick={handleCallClick}>
            Заказать звонок
          </button>
          {isCallModalOpen && <CallModal onClose={closeCallModal} />}
        </div>
      </div>
    </header>
  );
};

MobileHeader.displayName = "MobileHeader";

export { MobileHeader };
