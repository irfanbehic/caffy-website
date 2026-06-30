import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./lib/theme";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Privacy, Support } from "./pages/LegalPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirst = useRef(true);
  useEffect(() => {
    // Skip the initial mount: on a slow connection React hydrates AFTER the
    // user has already started scrolling the prerendered HTML, and a scrollTo(0,0)
    // here would yank them back to the top ("jumps up while scrolling" bug).
    // Only reset scroll on real route changes (e.g. /privacy → /).
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
