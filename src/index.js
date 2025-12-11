import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Addbook from "./Pages/Addbook";
import Viewbook from "./Pages/Viewbook";
import Login from "./Pages/Login";
// just to create url and on which url which page should displayed
const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/addbook",
        element: <Addbook></Addbook>,
      },
      {
        path: "/viewbook",
        element: <Viewbook></Viewbook>,
      },
      {
        path: "*",
        element: <h1>Page not found </h1>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();