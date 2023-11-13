import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import ApiClient from "./core/api/api-client";
import { NotFoundPage, RegistationPage } from "./pages";

const App = () => {
  const apiClient = new ApiClient({
    accessToken: "123",
  });
  const getLocations = async () => {
    const result2 = await apiClient?.get("/description/locations");
    console.table(result2);
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
