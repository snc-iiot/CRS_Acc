import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import {
  CustomerRegistrations,
  EvaluationConfigPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  Registration,
  RegistrationInfo,
  SettingPage,
  TestPage,
} from "./pages";

function App() {
  return (
    <>
      {/* <BrowserRouter basename={"/icrs/admin"}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/test-page" element={<TestPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/customer-registrations"
              element={<CustomerRegistrations />}
            />
            <Route path="/settings" element={<SettingPage />} />
            <Route
              path="/settings/evaluation-config"
              element={<EvaluationConfigPage />}
            />
          </Route>
          <Route path="/registration-info" element={<RegistrationInfo />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
