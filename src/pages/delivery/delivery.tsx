import type { FC } from "react";
import { Link } from "react-router-dom";

import "./delivery.css";
import cardIconArrow from "./arrow-icon.svg";
import cardIconBoxSrc from "./box-icon.svg";
import iconClockSrc from "./clock-icon.svg";
import iconManagerSrc from "./manager-icon.svg";
import iconMapSrc from "./map-icon.svg";
import cardIconRequestSrc from "./request-icon.svg";
import iconRubleSrc from "./ruble-icon.svg";
import cardIconManagerSrc from "./second-manager-icon.svg";
import cardIconTruckSrc from "./second-truck-icon.svg";
import iconTruckSrc from "./truck-icon.svg";

const DELIVERY_FACT_ICON_DIMENSIONS = { width: 65, height: 65 };
const DELIVERY_FACT_TRUCK_ICON_DIMENSIONS = { width: 65, height: 75 };
const DELIVERY_CARD_REQUEST_ICON_DIMENSIONS = { width: 58, height: 60 };
const DELIVERY_CARD_ARROW_DIMENSIONS = { width: 38, height: 24 };
const DELIVERY_CARD_MANAGER_ICON_DIMENSIONS = { width: 64, height: 64 };
const DELIVERY_CARD_BOX_ICON_DIMENSIONS = { width: 60, height: 66 };
const DELIVERY_CARD_TRUCK_ICON_DIMENSIONS = { width: 60, height: 75 };

const Delivery: FC = () => {
  return (
    <article className="delivery">
      <h2 className="delivery__header">Доставка запчастей</h2>
      <div className="delivery__container">
        <div className="delivery__fact-card">
          <img
            className="delivery__icon"
            src={iconMapSrc}
            alt="Иконка с картой"
            width={DELIVERY_FACT_ICON_DIMENSIONS.width}
            height={DELIVERY_FACT_ICON_DIMENSIONS.height}
          />
          <p className="delivery__advantages">
            Отправка заказов в любые регионы России и Ближнего Зарубежья любым удобным для Вас
            способом
          </p>
        </div>
        <div className="delivery__fact-card">
          <img
            className="delivery__icon"
            src={iconTruckSrc}
            alt="Иконка с грузовиком"
            width={DELIVERY_FACT_TRUCK_ICON_DIMENSIONS.width}
            height={DELIVERY_FACT_TRUCK_ICON_DIMENSIONS.height}
          />
          <p className="delivery__advantages">
            Доставка до транспортных компаний оптовым покупателям осуществляется нашим транспортом
            бесплатно
          </p>
        </div>
        <div className="delivery__fact-card">
          <img
            className="delivery__icon"
            src={iconRubleSrc}
            alt="Иконка со знаком рубля"
            width={DELIVERY_FACT_ICON_DIMENSIONS.width}
            height={DELIVERY_FACT_ICON_DIMENSIONS.height}
          />
          <p className="delivery__advantages">
            Транспортный сбор в размере 300 рублей распространяется только на заказы с суммой
            покупки менее 1 500 рублей
          </p>
        </div>
        <div className="delivery__fact-card">
          <img
            className="delivery__icon"
            src={iconClockSrc}
            alt="Иконка с часами"
            width={DELIVERY_FACT_ICON_DIMENSIONS.width}
            height={DELIVERY_FACT_ICON_DIMENSIONS.height}
          />
          <p className="delivery__advantages">
            Отгрузка заказа осуществляется на следующий день от подачи заявки, при условии наличия
            товара на складе
          </p>
        </div>
        <div className="delivery__fact-card">
          <img
            className="delivery__icon"
            src={iconManagerSrc}
            alt="Иконка с менеджером"
            width={DELIVERY_FACT_ICON_DIMENSIONS.width}
            height={DELIVERY_FACT_ICON_DIMENSIONS.height}
          />
          <p className="delivery__advantages delivery__advantages-long">
            Срок комплектации и отгрузки комплексных заказов дополнительно обсуждается с менеджером,
            закрепленным за Вашей организацией
          </p>
        </div>
      </div>
      <h3 className="delivery__subtitle">Варианты доставки через транспортные компании:</h3>
      <ul className="delivery__companies-list">
        <li className="delivery__company">
          ТК Пэк (
          <a
            className="delivery__company-link"
            href="https://pecom.ru/services-are/shipping-request/"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Луч (
          <a
            className="delivery__company-link"
            href="https://xn----stbeziy.xn--p1ai/calc-pro"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК GTD (
          <a
            className="delivery__company-link"
            href="https://miass.gtdel.com/"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Ратэк (
          <a
            className="delivery__company-link"
            href="https://rateksib.com/branches/69/index.html"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Энергия (
          <a
            className="delivery__company-link"
            href="https://nrg-tk.ru/client/calculator/"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Грузлайн (
          <a
            className="delivery__company-link"
            href="https://gruzline.net/rasschitat-stoimost-dostavki"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Экспресс-Авто (
          <a
            className="delivery__company-link"
            href="http://expressauto.ru/autokalkulyator"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Байкал-Сервис (
          <a
            className="delivery__company-link"
            href="https://www.baikalsr.ru/"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК Деловые Линии (
          <a
            className="delivery__company-link"
            href="https://www.dellin.ru/"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
        <li className="delivery__company">
          ТК ЖелДорЭкспедиция (
          <a
            className="delivery__company-link"
            href="https://www.jde.ru/online/calculator.html"
            target="_blank"
            rel="noreferrer"
          >
            расчет&nbsp;стоимости&nbsp;доставки
          </a>
          )
        </li>
      </ul>
      <p className="delivery__text">
        Стоимость доставки до Вашего города рассчитывается индивидуально по тарифам выбранной
        транспортной компании.
      </p>
      <p className="delivery__text">
        Доставка по Миассу осуществляется нашим транспортом бесплатно.
      </p>
      <h2 className="delivery__header">Самовывоз</h2>
      <p className="delivery__text">
        Заказ можно получить на складе по адресу г. Миасс, ул. Тургоякское шоссе, дом № 3/16,
        помещение 1, предварительно связавшись с нашим менеджером по телефону.
      </p>
      <h2 className="delivery__header">Оплата</h2>
      <p className="delivery__text">Вы можете оплатить Ваш заказ следующими способами:</p>
      <ul className="delivery__payment-list">
        <li className="delivery__payment">Оплата наличными (при самовывозе).</li>
        <li className="delivery__payment">Оплата безналичным расчетом на основании счета.</li>
      </ul>
      <p className="delivery__text">Отгрузка заказа производится после 100% оплаты счета.</p>
      <p className="delivery__text">
        Для постоянных и надежных клиентов специальные условия рассрочки или отсрочки платежа, а
        также скидки — все условия индивидуальны и обсуждаются с менеджером.
      </p>
      <Link className="delivery__button-link" to="/details">
        РЕКВИЗИТЫ
      </Link>
      <h2 className="delivery__header delivery__last-header">Как происходит заказ?</h2>
      <div className="delivery__cards">
        <div className="delivery__card">
          <img
            className="delivery__card-icon"
            src={cardIconRequestSrc}
            alt="Иконка заполнения заявки"
            width={DELIVERY_CARD_REQUEST_ICON_DIMENSIONS.width}
            height={DELIVERY_CARD_REQUEST_ICON_DIMENSIONS.height}
          />
          <p className="delivery__card-text">
            Вы отправляете заявку любым удобным способом (по телефону, по эл. почте или на сайте)
          </p>
        </div>
        <img
          className="delivery__arrow"
          src={cardIconArrow}
          alt="Иконка стрелки вправо"
          width={DELIVERY_CARD_ARROW_DIMENSIONS.width}
          height={DELIVERY_CARD_ARROW_DIMENSIONS.height}
        />
        <div className="delivery__card">
          <img
            className="delivery__card-icon"
            src={cardIconManagerSrc}
            alt="Иконка менеджера"
            width={DELIVERY_CARD_MANAGER_ICON_DIMENSIONS.width}
            height={DELIVERY_CARD_MANAGER_ICON_DIMENSIONS.height}
          />
          <p className="delivery__card-text">
            Менеджеры обработают Вашу заявку и отправят <br /> вам коммерческое предложение
          </p>
        </div>
        <img
          className="delivery__arrow"
          src={cardIconArrow}
          alt="Иконка стрелки вправо"
          width={DELIVERY_CARD_ARROW_DIMENSIONS.width}
          height={DELIVERY_CARD_ARROW_DIMENSIONS.height}
        />
        <div className="delivery__card">
          <img
            className="delivery__card-icon"
            src={cardIconBoxSrc}
            alt="Иконка коробки"
            width={DELIVERY_CARD_BOX_ICON_DIMENSIONS.width}
            height={DELIVERY_CARD_BOX_ICON_DIMENSIONS.height}
          />
          <p className="delivery__card-text">
            После согласования условий оплаты и доставки мы комплектуем Ваш заказ
          </p>
        </div>
        <img
          className="delivery__arrow"
          src={cardIconArrow}
          alt="Иконка стрелки вправо"
          width={DELIVERY_CARD_ARROW_DIMENSIONS.width}
          height={DELIVERY_CARD_ARROW_DIMENSIONS.height}
        />
        <div className="delivery__card">
          <img
            className="delivery__card-icon"
            src={cardIconTruckSrc}
            alt="Иконка грузовика"
            width={DELIVERY_CARD_TRUCK_ICON_DIMENSIONS.width}
            height={DELIVERY_CARD_TRUCK_ICON_DIMENSIONS.height}
          />
          <p className="delivery__card-text">
            В течение дня после оплаты отгружаем Ваш заказ и осуществляем доставку выбранным Вами
            способом
          </p>
        </div>
      </div>
    </article>
  );
};

Delivery.displayName = "Delivery";

export { Delivery };
