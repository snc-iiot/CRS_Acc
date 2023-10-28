import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import { LoginPage, OverviewPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<OverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
