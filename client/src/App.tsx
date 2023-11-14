import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import { NotFoundPage, RegistationPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_NAME}>
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
