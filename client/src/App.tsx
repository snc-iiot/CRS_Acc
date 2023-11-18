import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import {
  CustomerRegistrations,
  HomePage,
  LoginPage,
  NotFoundPage,
  Registration,
  RegistrationInfo,
  TestPage,
} from "./pages";

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.VITE_BASE_NAME}>
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
