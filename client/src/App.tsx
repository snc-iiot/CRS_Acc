import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import { LoginPage, NotFoundPage, TestPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter basename="/icrs-acc">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/test-page" element={<TestPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
