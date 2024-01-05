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
  ServerErrorPage,
  SettingPage,
  TestPage,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter basename={"/icrs/admin/dev"}>
        {/* <BrowserRouter basename={"/icrs/admin/uat"}> */}
        {/* <BrowserRouter basename={"/icrs/admin"}> */}
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/test-page" element={<TestPage />} />
            <Route path="/registrations/customer/register" element={<Registration />} />
            <Route path="/registrations" element={<CustomerRegistrations />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/settings/evaluation-config" element={<EvaluationConfigPage />} />
          </Route>
          <Route path="/registrations/customer/info" element={<RegistrationInfo />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
