import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Dots from "../components/Dots/Dots";
import Loading from "../components/Loading/Loading";

export default function HomeTemplate() {
  return (
    <>
      <Header />
      <main id="container max-w-[1920px] mx-0 my-auto">
        <Outlet />
      </main>
      <Dots />
    </>
  );
}
