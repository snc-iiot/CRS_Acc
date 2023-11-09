import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import { NotFoundPage, RegistationPage } from "./pages";
import { fetchGetLocations } from "./services/api/test";

const App = () => {
  const getLocations = async () => {
    const result = await fetchGetLocations();
    console.table(result);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<RegistationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
