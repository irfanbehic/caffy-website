import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Privacy, Support } from "./pages/LegalPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <HashRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
          </Routes>
          <Footer />
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
