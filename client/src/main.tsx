import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/index.css";
import "@/styles/custom.css";

// import { DevTools } from "jotai-devtools";

// import { TailwindIndicator } from "./tailwind-indicators.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider>
        <App />
        {/* <DevTools /> */}
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>,
);
