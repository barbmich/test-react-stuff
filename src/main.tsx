import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="custom/basename/path">
      <App />
    </BrowserRouter>
    <BrowserRouter basename="other/basename/path">
      <Routes>
        <Route path="/">
          <div>root</div>
        </Route>
        <Route path="/about">
          <div>about</div>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
