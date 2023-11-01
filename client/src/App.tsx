import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  RegistrationInfo,
  Registrations,
  TestPage,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter basename="/icrs-acc-admin">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/test-page" element={<TestPage />} />
            <Route path="/registrations" element={<Registrations />} />
          </Route>
          <Route
            path="/registration-info"
            // element={<div className="h-screen border-2 border-red-600" />}
            element={<RegistrationInfo />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
