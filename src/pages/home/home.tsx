import { useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";

import { CallModal } from "../../components/call-modal";
import { Divider } from "../../components/divider";
import { RequestModal } from "../../components/request-modal";

import "./home.css";
import iconCallSrc from "./call-icon.svg";
import iconDetailSrc from "./detail-icon.svg";
import iconGuaranteeSrc from "./guarantee-icon.svg";
import iconMachineSrc from "./machine-icon.svg";
import iconMapSrc from "./map-icon.svg";
import iconPercentSrc from "./percent-icon.svg";
import iconPriceSrc from "./price-icon.svg";
import iconRequestSrc from "./request-icon.svg";
import iconTrophySrc from "./trophy-icon.svg";
import iconTruckSrc from "./truck-icon.svg";

const HOME_PRICE_ICON_DIMENSIONS = { width: 16, height: 18 };
const HOME_ACTION_ICON_DIMENSIONS = { width: 18, height: 18 };
const HOME_ADVANTAGE_ICON_DIMENSIONS = { width: 116, height: 116 };
const HOME_OFFER_ICON_DIMENSIONS = { width: 100, height: 100 };
const HOME_TRUCK_ICON_DIMENSIONS = { width: 110, height: 100 };

const Home: FC = () => {
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
    <article className="home">
      <section className="home__section">
        <div className="home__main-image">
          <div className="home__main-card">
            <h1 className="home__company-name">УРАЛТЕХДЕТАЛЬ</h1>
            <ul className="home__facts-list">
              <li className="home__fact">металлообработка</li>
              <li className="home__fact">производство запчастей к а/м урал</li>
              <li className="home__fact">капитальный ремонт узлов и агрегатов</li>
              <li className="home__fact">запчасти для отечественного грузового автотранспорта</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="home__section">
        <div className="home__text-container">
          <h2 className="home__header">
            Мы занимаемся производством запасных частей к автомобилям УРАЛ и комплексной поставкой
            запасных частей для отечественного грузового автотранспорта.
          </h2>
          <p className="home__text">
            У нас Вы можете приобрести запчасти к автомобилям УРАЛ собственного производства, а
            также запчасти для&nbsp;
            <Link className="home__link" to="/about">
              других
            </Link>
            &nbsp;грузовых автомобилей от проверенных поставщиков. Все запчасти собственного
            производства проходят полный технологический цикл, работоспособность проверяется на
            стендах.
          </p>
          <h2 className="home__header">Все виды металлообработки.</h2>
          <p className="home__text">
            Имеющийся станочный парк разнообразного металлообрабатывающего оборудования с ЧПУ
            (токарного, фрезерного, электроэрозионного), позволяет выполнять любые нестандартные
            работы по всем видам металлообработки по Вашим чертежам и техническим заданиям.
          </p>
        </div>
        <div className="home__button-container">
          <a
            className="home__action-link"
            href="https://drive.google.com/file/d/1YJSsE58Co4uEeVLHjXuhn4hRS_4h0usD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="home__action-icon"
              src={iconPriceSrc}
              alt="Иконка прайс-листа"
              width={HOME_PRICE_ICON_DIMENSIONS.width}
              height={HOME_PRICE_ICON_DIMENSIONS.height}
            />
            <span className="home__price-list">СМОТРЕТЬ ПРАЙС-ЛИСТ</span>
          </a>
          <button className="home__action-button" onClick={handleRequestClick}>
            <img
              className="home__action-icon"
              src={iconRequestSrc}
              alt="Иконка отправки заявки"
              width={HOME_ACTION_ICON_DIMENSIONS.width}
              height={HOME_ACTION_ICON_DIMENSIONS.height}
            />
            ОТПРАВИТЬ ЗАЯВКУ
          </button>
          {isRequestModalOpen && <RequestModal onClose={closeRequestModal} />}
          <button className="home__action-button" onClick={handleCallClick}>
            <img
              className="home__action-icon"
              src={iconCallSrc}
              alt="Иконка заказа звонка"
              width={HOME_ACTION_ICON_DIMENSIONS.width}
              height={HOME_ACTION_ICON_DIMENSIONS.height}
            />
            ЗАКАЗАТЬ ЗВОНОК
          </button>
          {isCallModalOpen && <CallModal onClose={closeCallModal} />}
        </div>
      </section>
      <Divider />
      <section className="home__section">
        <div className="home__text-container">
          <h2 className="home__header">О компании ООО ТД «УралТехДеталь»</h2>
          <p className="home__text">
            Торговый дом «УралТехДеталь» занимается продажей и производством запасных частей к а/м
            УРАЛ уже около 16 лет. Собственные производственные и складские помещения около 600м
            <sup>2</sup>. Станочный парк по металлообработке, обжиму гидравлических и пневматических
            шлангов и изготовлению трубопроводов из медной и стальной трубы. Участок сборки и
            капитального ремонта узлов и агрегатов трансмиссии, рулевого управления и подвески а/м
            УРАЛ.
          </p>
        </div>
        <div className="home__advantages-container">
          <div className="home__advantage">
            <img
              className="home__advantage-icon"
              src={iconTrophySrc}
              alt="Иконка с кубком"
              width={HOME_ADVANTAGE_ICON_DIMENSIONS.width}
              height={HOME_ADVANTAGE_ICON_DIMENSIONS.height}
            />
            <p className="home__advantage-text">Более 15 лет на рынке автозапчастей</p>
          </div>
          <div className="home__advantage">
            <img
              className="home__advantage-icon"
              src={iconMachineSrc}
              alt="Иконка со станком"
              width={HOME_ADVANTAGE_ICON_DIMENSIONS.width}
              height={HOME_ADVANTAGE_ICON_DIMENSIONS.height}
            />
            <p className="home__advantage-text">4 станка для металлообработки</p>
          </div>
          <div className="home__advantage">
            <img
              className="home__advantage-icon"
              src={iconDetailSrc}
              alt="Иконка с деталью"
              width={HOME_ADVANTAGE_ICON_DIMENSIONS.width}
              height={HOME_ADVANTAGE_ICON_DIMENSIONS.height}
            />
            <p className="home__advantage-text">
              Более 300 наименований запчастей в наличии на складе
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="home__section home__section-column">
        <h2 className="home__header">Мы рады предложить Вам</h2>
        <div className="home__offers-container">
          <div className="home__offer">
            <img
              className="home__offer-icon"
              src={iconMapSrc}
              alt="Иконка с картой"
              width={HOME_OFFER_ICON_DIMENSIONS.width}
              height={HOME_OFFER_ICON_DIMENSIONS.height}
            />
            <p className="home__offer-text">
              Отправку заказов в любые регионы России и Ближнего Зарубежья любым удобным для Вас
              способом
            </p>
          </div>
          <div className="home__offer">
            <img
              className="home__offer-icon"
              src={iconPercentSrc}
              alt="Иконка со знаком процента"
              width={HOME_OFFER_ICON_DIMENSIONS.width}
              height={HOME_OFFER_ICON_DIMENSIONS.height}
            />
            <p className="home__offer-text">
              Специальные условия рассрочки или отсрочки платежа, а также скидки для постоянных
              клиентов
            </p>
          </div>
          <div className="home__offer">
            <img
              className="home__offer-icon"
              src={iconTruckSrc}
              alt="Иконка с грузовиком"
              width={HOME_TRUCK_ICON_DIMENSIONS.width}
              height={HOME_TRUCK_ICON_DIMENSIONS.height}
            />
            <p className="home__offer-text">
              Бесплатную доставку нашим транспортом по Миассу и до транспортных компаний оптовым
              покупателям
            </p>
          </div>
          <div className="home__offer">
            <img
              className="home__offer-icon"
              src={iconGuaranteeSrc}
              alt="Иконка с большим пальцем вверх"
              width={HOME_OFFER_ICON_DIMENSIONS.width}
              height={HOME_OFFER_ICON_DIMENSIONS.height}
            />
            <p className="home__offer-text">Гарантию на весь ассортимент продукции</p>
          </div>
        </div>
      </section>
    </article>
  );
};

Home.displayName = "Home";

export { Home };
