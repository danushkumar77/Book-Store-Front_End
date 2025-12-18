import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Addbook from "./Pages/Requestbook";
import Viewbook from "./Pages/Viewbook";
import Login from "./Pages/Login";
import Requestbook from "./Pages/Requestbook";
import Cart from "./Pages/Cart";
import Confirm from "./Pages/Confirm";
import ProtectedRoute from "./Pages/ProtectedRoute";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/Requestbook",
        element: <Requestbook></Requestbook>
      },
      {
        path: "/viewbook",
        element: <Viewbook></Viewbook>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/confirm",
        element: <Confirm></Confirm>,
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