import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
// import { DevTools } from "jotai-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/index.css";
import "@/styles/custom.css";
import { TailwindIndicator } from "./tailwind-indicators.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider>
        {/* <DevTools  /> */}
        <App />
        <ToastContainer />
        <TailwindIndicator />
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>,
);
