import type { FC } from "react";

import "./guarantees-and-return.css";
import doc from "./Образец акта рекламации.docx";

const Guarantees: FC = () => {
  return (
    <article className="guarantees">
      <h2 className="guarantees__header">Гарантии</h2>
      <p className="guarantees__facts">
        На все запчасти распространяется гарантия заводов-производителей.
        <br />
        Все вопросы, связанные с условиями и сроками гарантии, Вы можете задать нашим менеджерам.
      </p>
      <ul className="guarantees__contacts-list">
        <li className="guarantees__contacts">
          <strong className="guarantees__contacts-label">По телефонам:</strong>
          <a className="guarantees__contact-link" href="tel:+73513264004">
            +7 (3513) 264-004
          </a>
          <a className="guarantees__contact-link" href="tel:+79193151000">
            +7 (919) 315-10-00
          </a>
        </li>
        <li className="guarantees__contacts">
          <strong className="guarantees__contacts-label">По электронной почте:</strong>
          <a className="guarantees__contact-link" href="mailto:gruz_74@mail.ru">
            gruz_74@mail.ru
          </a>
        </li>
      </ul>
      <h2 className="guarantees__header">Возврат</h2>
      <strong className="guarantees__facts">
        Порядок обмена или возврата продукции ненадлежащего качества.
      </strong>
      <p className="guarantees__facts">
        При обнаружении недостатков качества полученной продукции необходимо:
      </p>
      <ol className="guarantees__rules-list">
        <li className="guarantees__rule">
          Поставить в известность менеджера осуществлявшего отгрузку.
        </li>
        <li className="guarantees__rule">
          В случае <strong>обмена</strong> вместе с некачественной продукцией необходимо отправить
          следующий пакет документов:
          <ul className="guarantees__explanations-list">
            <li className="guarantees__explanation">
              копия документа, по которому приобретено изделие (накладная, счет-фактура с датой
              продажи);
            </li>
            <li className="guarantees__explanation">
              акт рекламации или претензию в отдел продаж ООО ТД «УралТехДеталь».
            </li>
          </ul>
          В акте указать следующее:
          <ul className="guarantees__documents-list">
            <li className="guarantees__document">Дата</li>
            <li className="guarantees__document">Номер акта (претензии)</li>
            <li className="guarantees__document">Название организации</li>
            <li className="guarantees__document">ФИО составителя</li>
            <li className="guarantees__document">Наименование изделия</li>
            <li className="guarantees__document">Описание дефекта или причина возврата</li>
            <li className="guarantees__document">Подпись</li>
          </ul>
        </li>
        <li className="guarantees__rule">
          В случае <strong>возврата</strong> продукции к выше перечисленным документам необходимо
          приложить накладную и счет фактуру на возврат.
        </li>
      </ol>
      <a className="guarantees__download-link" href={doc} download>
        Скачать образец акта рекламации
      </a>
    </article>
  );
};

Guarantees.displayName = "Guarantees";

export { Guarantees };
