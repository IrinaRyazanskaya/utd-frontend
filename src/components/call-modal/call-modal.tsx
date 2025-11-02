import { useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";

import { orderCall } from "../../api/order-call";

import "./call-modal.css";
import iconCrossSrc from "./cross-icon.svg";
import iconFailureSrc from "./failure-icon.svg";
import iconSuccessSrc from "./success-icon.svg";

type RequestState = "unknown" | "pending" | "success" | "failure";

type CallModalProps = {
  onClose: () => void;
};

const CallModal: FC<CallModalProps> = ({ onClose }) => {
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [requestState, setRequestState] = useState<RequestState>("unknown");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("pending");
    orderCall(buyerName, buyerPhone)
      .then(() => {
        setRequestState("success");
      })
      .catch(() => {
        setRequestState("failure");
      });
  };

  const form = (
    <>
      <h2 className="call-modal__header">Заказать звонок</h2>
      <form className="call-modal__form" onSubmit={handleFormSubmit}>
        <label className="call-modal__lable" htmlFor="name">
          Имя: <span className="call-modal__lable-required">*</span>
        </label>
        <br />
        <input
          className="call-modal__field"
          type="text"
          id="name"
          name="name"
          value={buyerName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBuyerName(event.target.value);
          }}
          required
        />
        <br />
        <label className="call-modal__lable" htmlFor="phone">
          Телефон: <span className="call-modal__lable-required">*</span>
        </label>
        <br />
        <input
          className="call-modal__field"
          type="tel"
          id="phone"
          name="phone"
          value={buyerPhone}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBuyerPhone(event.target.value);
          }}
          required
        />
        <p className="call-modal__form-text">
          Отправляя данную форму, я подтверждаю, что ознакомлен с&nbsp;
          <a className="call-modal__form-link" target="_blank" rel="noreferrer" href="/privacy">
            политикой конфиденциальности
          </a>
          &nbsp;и согласен на хранение и обработку персональных данных.
        </p>
        <div className="call-modal__button-container">
          <input className="call-modal__send-button" type="submit" value="ОТПРАВИТЬ" />
        </div>
      </form>
    </>
  );

  const pending = (
    <div className="call-modal__pending">
      <div className="call-modal__loader"></div>
      <p>Ваша заявка отправляется</p>
    </div>
  );

  const success = (
    <div className="call-modal__success">
      <p className="call-modal__success-text">Заявка отправлена</p>
      <img className="call-modal__success-icon" src={iconSuccessSrc} alt="Галочка в круге" />
      <p>Скоро мы с Вами свяжемся</p>
    </div>
  );

  const failure = (
    <div className="call-modal__failure">
      <p className="call-modal__failure-text">Что-то пошло не так</p>
      <img className="call-modal__failure-icon" src={iconFailureSrc} alt="Грустный смайлик" />
      <p className="call-modal__failure-subtext">Не получилось отправить Вашу заявку</p>
      <button
        className="call-modal__failure-button"
        onClick={() => {
          setRequestState("unknown");
        }}
      >
        Попробовать еще раз
      </button>
    </div>
  );

  let content;

  if (requestState === "pending") {
    content = pending;
  } else if (requestState === "success") {
    content = success;
  } else if (requestState === "failure") {
    content = failure;
  } else {
    content = form;
  }

  return (
    <>
      <div className="call-modal-blackout" />
      <div className="call-modal">
        <button className="call-modal__close-button" onClick={onClose}>
          <img className="call-modal__close-icon" src={iconCrossSrc} alt="Иконка крестика" />
        </button>
        {content}
      </div>
    </>
  );
};

CallModal.displayName = "CallModal";

export { CallModal };
export type { CallModalProps };
