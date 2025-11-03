import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./navigation.css";

const createNavLinkClassName = (baseClass: string, activeClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${baseClass} ${activeClass}` : baseClass;
  };
};

const itemLinkClassName = createNavLinkClassName(
  "navigation__item-link",
  "navigation__item-link_active",
);
const subMenuLinkClassName = createNavLinkClassName(
  "navigation__sub-menu-link",
  "navigation__sub-menu-link_active",
);

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
          <NavLink className={itemLinkClassName} to="/" end>
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className={itemLinkClassName} to="/about" end>
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
                  <NavLink className={subMenuLinkClassName} to="/delivery" end>
                    Доставка и оплата
                  </NavLink>
                </li>
                <li className="navigation__sub-menu-item">
                  <NavLink className={subMenuLinkClassName} to="/guarantees" end>
                    Гарантии и возврат
                  </NavLink>
                </li>
                <li className="navigation__sub-menu-item">
                  <NavLink className={subMenuLinkClassName} to="/details" end>
                    Реквизиты
                  </NavLink>
                </li>
              </ul>
            </nav>
          </details>
        </li>
        <li className="navigation__item">
          <NavLink className={itemLinkClassName} to="/cooperation" end>
            Сотрудничество
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className={itemLinkClassName} to="/contacts" end>
            Контакты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";

export { Navigation };
