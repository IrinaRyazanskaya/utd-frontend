import { useState } from "react";
import type { FC } from "react";
import { HashLink } from "react-router-hash-link";
import { Divider } from "../../components/divider";
import { RequestModal } from "../../components/request-modal";
import { CallModal } from "../../components/call-modal";
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
              <li className="home__fact">производство запчастейк к а/м урал</li>
              <li className="home__fact">
                поставка запчастей для отечественного грузового автотранспорт
              </li>
              <li className="home__fact">металлообработка</li>
              <li className="home__fact">капитальный ремонт узлов и агрегатов</li>
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
            <HashLink className="home__link" smooth to="/about#top">
              других
            </HashLink>
            &nbsp;грузовых автомобилей от проверенных поставщиков. Все запчасти собственного
            производства проходят полный технологический цикл, работоспособность проверяется на
            стендах.
          </p>
          <h2 className="home__header">Все виды металлообработки.</h2>
          <p className="home__text">
            Имеющийся станочный парк разнообразного металлообрабатывающего оборудования с ЧПУ
            (токарного, фрезерного, электроэррозионного), позволяет выполнять любые нестандартные
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
            <img className="home__action-icon" src={iconPriceSrc} alt="Иконка прайс-листа" />
            <span className="home__price-list">СМОТРЕТЬ ПРАЙС-ЛИСТ</span>
          </a>
          <button className="home__action-button" onClick={handleRequestClick}>
            <img className="home__action-icon" src={iconRequestSrc} alt="Иконка отправки заявки" />
            ОТПРАВИТЬ ЗАЯВКУ
          </button>
          {isRequestModalOpen && <RequestModal onClose={closeRequestModal} />}
          <button className="home__action-button" onClick={handleCallClick}>
            <img className="home__action-icon" src={iconCallSrc} alt="Иконка заказа звонка" />
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
            <img className="home__advantage-icon" src={iconTrophySrc} alt="Иконка с кубком" />
            <p className="home__advantage-text">Более 15 лет на рынке автозапчастей</p>
          </div>
          <div className="home__advantage">
            <img className="home__advantage-icon" src={iconMachineSrc} alt="Иконка со станком" />
            <p className="home__advantage-text">4 станка для металлообработки</p>
          </div>
          <div className="home__advantage">
            <img className="home__advantage-icon" src={iconDetailSrc} alt="Иконка с деталью" />
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
            <img className="home__offer-icon" src={iconMapSrc} alt="Иконка с картой" />
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
            />
            <p className="home__offer-text">
              Специальные условия рассрочки или отсрочки платежа, а также скидки для постоянных
              клиентов
            </p>
          </div>
          <div className="home__offer">
            <img className="home__offer-icon" src={iconTruckSrc} alt="Иконка с грузовиком" />
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
