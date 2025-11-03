import { type FC } from "react";
import { Routes, Route } from "react-router-dom";

import { Divider } from "../components/divider";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { MobileHeader } from "../components/mobile-header";
import { MobileNavigation } from "../components/mobile-navigation";
import { Navigation } from "../components/navigation";
import { ScrollToTop } from "../components/scroll-to-top";
import { About } from "../pages/about";
import { Details } from "../pages/company-details";
import { Contacts } from "../pages/contacts";
import { Cooperation } from "../pages/cooperation";
import { Delivery } from "../pages/delivery-and-payment";
import { Guarantees } from "../pages/guarantees-and-return";
import { Home } from "../pages/home";
import { Privacy } from "../pages/privacy";

import "./application.css";

const Application: FC = () => {
  return (
    <>
      <div className="application__page-header_desktop">
        <Navigation />
        <Header />
      </div>
      <div className="application__page-header_mobile">
        <MobileNavigation />
        <MobileHeader />
      </div>
      <Divider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/guarantees" element={<Guarantees />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cooperation" element={<Cooperation />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
};

Application.displayName = "Application";

export { Application };
