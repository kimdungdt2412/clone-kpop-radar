import React from "react";
import { Outlet } from "react-router-dom";

export default function HomeTemplate() {
  return (
    <main id="container max-w-[1920px] mx-0 my-auto">
      <Outlet />
    </main>
  );
}
