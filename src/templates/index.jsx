import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function HomeTemplate() {
  return (
    <>
      <Header />
      <main id="container max-w-[1920px] mx-0 my-auto">
        <Outlet />
      </main>
    </>
  );
}
