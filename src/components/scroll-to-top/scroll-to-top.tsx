import { type FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

ScrollToTop.displayName = "ScrollToTop";

export { ScrollToTop };
