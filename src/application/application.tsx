import { useMediaQuery } from "react-responsive";
import { YMaps } from "react-yandex-maps";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navigation } from "../components/navigation";
import { MobileNavigation } from "../components/mobile-navigation";
import { Header } from "../components/header";
import { MobileHeader } from "../components/mobile-header";
import { Divider } from "../components/divider";
import { About } from "../pages/about";
import { Footer } from "../components/footer";
import { Contacts } from "../pages/contacts";
import { Guarantees } from "../pages/guarantees-and-return";
import { Details } from "../pages/company-details";
import { Cooperation } from "../pages/cooperation";
import { Delivery } from "../pages/delivery-and-payment";
import { Home } from "../pages/home";
import { Privacy } from "../pages/privacy";

const Application = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <YMaps>
      <BrowserRouter>
        {isMobile ? <MobileNavigation /> : <Navigation />}
        {isMobile ? <MobileHeader /> : <Header />}
        <Divider />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/delivery" exact>
            <Delivery />
          </Route>
          <Route path="/guarantees" exact>
            <Guarantees />
          </Route>
          <Route path="/details" exact>
            <Details />
          </Route>
          <Route path="/cooperation" exact>
            <Cooperation />
          </Route>
          <Route path="/contacts" exact>
            <Contacts />
          </Route>
          <Route path="/privacy" exact>
            <Privacy />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </YMaps>
  );
};

export { Application };
