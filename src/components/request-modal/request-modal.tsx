import { useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";

import { applyRequest } from "../../api/apply-request";

import "./request-modal.css";
import iconCrossSrc from "./cross-icon.svg";
import iconFailureSrc from "./failure-icon.svg";
import iconSuccessSrc from "./success-icon.svg";

type RequestState = "unknown" | "pending" | "success" | "failure";

const REQUEST_MODAL_STATE_ICON_DIMENSIONS = { width: 250, height: 250 };
const REQUEST_MODAL_CLOSE_ICON_DIMENSIONS = { width: 16, height: 16 };

type RequestModalProps = {
  onClose: () => void;
};

const RequestModal: FC<RequestModalProps> = ({ onClose }) => {
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [requestFile, setRequestFile] = useState<File | null>(null);
  const [requestState, setRequestState] = useState<RequestState>("unknown");

  const updateFileName = (text: string) => {
    const fileNameElement = document.querySelector<HTMLDivElement>(".request-modal__file-name");
    if (fileNameElement) {
      fileNameElement.textContent = text;
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files?.item(0) ?? null;

    if (file) {
      updateFileName(file.name);
    } else {
      updateFileName("Файл не выбран");
    }

    setRequestFile(file);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("pending");
    applyRequest(buyerName, buyerEmail, buyerPhone, comment, requestFile)
      .then(() => {
        setRequestState("success");
      })
      .catch(() => {
        setRequestState("failure");
      });
  };

  const form = (
    <>
      <h2 className="request-modal__header">Отправить заявку</h2>
      <form className="request-modal__form" onSubmit={handleFormSubmit}>
        <p className="request-modal__lable">Файл заявки:</p>
        <input
          className="request-modal__field-file"
          type="file"
          id="file"
          name="file"
          multiple={false}
          onChange={handleFileChange}
        />
        <label className="request-modal__file-wrapper" htmlFor="file">
          <div className="request-modal__file-name">Файл не выбран</div>
          <div className="request-modal__file-button">Выбрать</div>
        </label>
        <label className="request-modal__lable" htmlFor="name">
          Имя: <span className="request-modal__lable-required">*</span>
        </label>
        <br />
        <input
          className="request-modal__field"
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
        <label className="request-modal__lable" htmlFor="email">
          E-mail: <span className="request-modal__lable-required">*</span>
        </label>
        <br />
        <input
          className="request-modal__field"
          type="email"
          id="email"
          name="email"
          value={buyerEmail}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBuyerEmail(event.target.value);
          }}
          required
        />
        <br />
        <label className="request-modal__lable" htmlFor="phone">
          Телефон: <span className="request-modal__lable-required">*</span>
        </label>
        <br />
        <input
          className="request-modal__field"
          type="tel"
          id="phone"
          name="phone"
          value={buyerPhone}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBuyerPhone(event.target.value);
          }}
          required
        />
        <p className="request-modal__lable">Комментарий к заявке:</p>
        <textarea
          className="request-modal__comment"
          name="comment"
          id="comment"
          rows={5}
          value={comment}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setComment(event.target.value);
          }}
        ></textarea>
        <p className="request-modal__form-text">
          Отправляя данную форму, я подтверждаю, что ознакомлен с&nbsp;
          <a className="request-modal__form-link" target="_blank" rel="noreferrer" href="/privacy">
            политикой конфиденциальности
          </a>
          &nbsp;и согласен на хранение и обработку персональных данных.
        </p>
        <div className="request-modal__button-container">
          <input className="request-modal__send-button" type="submit" value="ОТПРАВИТЬ" />
        </div>
      </form>
    </>
  );

  const pending = (
    <div className="request-modal__pending">
      <div className="request-modal__loader"></div>
      <p>Ваша заявка отправляется</p>
    </div>
  );

  const success = (
    <div className="request-modal__success">
      <p className="request-modal__success-text">Заявка отправлена</p>
      <img
        className="request-modal__success-icon"
        src={iconSuccessSrc}
        alt="Галочка в круге"
        width={REQUEST_MODAL_STATE_ICON_DIMENSIONS.width}
        height={REQUEST_MODAL_STATE_ICON_DIMENSIONS.height}
      />
      <p>Скоро мы с Вами свяжемся</p>
    </div>
  );

  const failure = (
    <div className="request-modal__failure">
      <p className="request-modal__failure-text">Что-то пошло не так</p>
      <img
        className="request-modal__failure-icon"
        src={iconFailureSrc}
        alt="Грустный смайлик"
        width={REQUEST_MODAL_STATE_ICON_DIMENSIONS.width}
        height={REQUEST_MODAL_STATE_ICON_DIMENSIONS.height}
      />
      <p>Не получилось отправить Вашу заявку</p>
      <button
        className="request-modal__failure-button"
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
      <div className="request-modal-blackout" />
      <div className="request-modal">
        <button className="request-modal__close-button" onClick={onClose}>
          <img
            className="request-modal__close-icon"
            src={iconCrossSrc}
            alt="Иконка крестика"
            width={REQUEST_MODAL_CLOSE_ICON_DIMENSIONS.width}
            height={REQUEST_MODAL_CLOSE_ICON_DIMENSIONS.height}
          />
        </button>
        {content}
      </div>
    </>
  );
};

RequestModal.displayName = "RequestModal";

export { RequestModal };
export type { RequestModalProps };
