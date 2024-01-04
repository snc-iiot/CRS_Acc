import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import { NotFoundPage, RegistationPage, SuccessPage } from "./pages";

const App = () => {
  return (
    // <BrowserRouter basename="/icrs/customer/dev">
    // <BrowserRouter basename="/icrs/customer/uat">
    <BrowserRouter basename="/icrs/customer">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<RegistationPage />} />
        </Route>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
