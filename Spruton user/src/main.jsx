import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./context/store";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const ton_url =
  "https://763mc0kh-3000.euw.devtunnels.ms/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TonConnectUIProvider manifestUrl={ton_url}>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </TonConnectUIProvider>
);
