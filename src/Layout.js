import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header /> {/* always visible */}
      <main style={{ padding: "20px", textAlign: "center" }}>
        <Outlet /> {/* page content will render here */}
      </main>
    </>
  );
}
  