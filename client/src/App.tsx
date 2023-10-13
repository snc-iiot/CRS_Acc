import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, NotFoundPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter basename="/icrs-acc">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
