import { useState } from "react";
import { applyRequest } from "../../api/apply-request";

import "./request-modal.css";
import iconCrossSrc from "./cross-icon.svg";
import iconFailureSrc from "./failure-icon.svg";
import iconSuccessSrc from "./success-icon.svg";

function RequestModal(props) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [comment, setComment] = useState("");
  const [requestFile, setRequestFile] = useState(null);
  const [requestState, setRequestState] = useState("unknown");

  const handleFileChange = (event) => {
    const fileName = document.querySelector(".request-modal__file-name");

    if (event.target.files.length === 1) {
      fileName.innerHTML = event.target.files[0].name;
      setRequestFile(event.target.files[0]);
    } else {
      fileName.innerHTML = "Файл не выбран";
      setRequestFile(null);
    }
  };

  const handleFormSubmit = (event) => {
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
          onChange={(event) => {
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
          onChange={(event) => {
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
          onChange={(event) => {
            setBuyerPhone(event.target.value);
          }}
          required
        />
        <p className="request-modal__lable">Комментарий к заявке:</p>
        <textarea
          className="request-modal__comment"
          name="comment"
          id="comment"
          rows="5"
          value={comment}
          onChange={(event) => {
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
      <img className="request-modal__success-icon" src={iconSuccessSrc} alt="Галочка в круге" />
      <p>Скоро мы с Вами свяжемся</p>
    </div>
  );

  const failure = (
    <div className="request-modal__failure">
      <p className="request-modal__failure-text">Что-то пошло не так</p>
      <img className="request-modal__failure-icon" src={iconFailureSrc} alt="Грустный смайлик" />
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
        <button className="request-modal__close-button" onClick={props.onClose}>
          <img className="request-modal__close-icon" src={iconCrossSrc} alt="Иконка крестика" />
        </button>
        {content}
      </div>
    </>
  );
}

export { RequestModal };
