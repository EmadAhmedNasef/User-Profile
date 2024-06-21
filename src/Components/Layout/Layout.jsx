import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Bottom from "../Footer/Bottom";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={style.host}>
      <Header />
      <div className={style.hoost}>
        <Outlet />
      </div>
      <Bottom />
    </div>
  );
}
