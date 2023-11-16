import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import "@/styles/style.css";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";

// import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      {/* <Toaster position="top-right" /> */}
      <App />
      <DevTools />
    </Provider>
  </React.StrictMode>,
);
