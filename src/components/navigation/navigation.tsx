import { NavLink, useLocation } from "react-router-dom";
import type { FC } from "react";
import "./navigation.css";

const Navigation: FC = () => {
  const location = useLocation();
  const customerPaths: readonly string[] = ["/delivery", "/guarantees", "/details"];
  const isCustomerPath = customerPaths.some((path) => path === location.pathname);
  const customerTriggerClass = isCustomerPath ? "navigation__trigger-content_active" : "";

  const handleMenuMouseEnter = () => {
    const menu = document.querySelector<HTMLDetailsElement>(".navigation__sub-menu-container");
    if (menu) {
      menu.open = true;
    }
  };
  const handleMenuMouseLeave = () => {
    const menu = document.querySelector<HTMLDetailsElement>(".navigation__sub-menu-container");
    if (menu) {
      menu.open = false;
    }
  };

  return (
    <nav className="navigation">
      <ul className="navigation__items">
        <li className="navigation__item">
          <NavLink
            className="navigation__item-link"
            activeClassName="navigation__item-link_active"
            to="/"
            exact
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className="navigation__item-link"
            activeClassName="navigation__item-link_active"
            to="/about"
            exact
          >
            О компании
          </NavLink>
        </li>
        <li className="navigation__item">
          <details
            className="navigation__sub-menu-container"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <summary className="navigation__trigger">
              <div className={"navigation__trigger-content " + customerTriggerClass}>
                Покупателю
              </div>
            </summary>
            <nav className="navigation__sub-menu">
              <ul className="navigation__sub-menu-items">
                <li className="navigation__sub-menu-item">
                  <NavLink
                    className="navigation__sub-menu-link"
                    activeClassName="navigation__sub-menu-link_active"
                    to="/delivery"
                    exact
                  >
                    Доставка и оплата
                  </NavLink>
                </li>
                <li className="navigation__sub-menu-item">
                  <NavLink
                    className="navigation__sub-menu-link"
                    activeClassName="navigation__sub-menu-link_active"
                    to="/guarantees"
                    exact
                  >
                    Гарантии и возврат
                  </NavLink>
                </li>
                <li className="navigation__sub-menu-item">
                  <NavLink
                    className="navigation__sub-menu-link"
                    activeClassName="navigation__sub-menu-link_active"
                    to="/details"
                    exact
                  >
                    Реквизиты
                  </NavLink>
                </li>
              </ul>
            </nav>
          </details>
        </li>
        <li className="navigation__item">
          <NavLink
            className="navigation__item-link"
            activeClassName="navigation__item-link_active"
            to="/cooperation"
            exact
          >
            Сотрудничество
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className="navigation__item-link"
            activeClassName="navigation__item-link_active"
            to="/contacts"
            exact
          >
            Контакты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";

export { Navigation };
