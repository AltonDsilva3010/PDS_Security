import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../Css/output.css";
import { Provider } from "react-redux";

import { routers } from "./utils/routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./ReduxStore/store.jsx";

const router = createBrowserRouter(routers);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        {/* Add Taostt Container */}
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
