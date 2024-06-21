import React, { useContext } from "react";
import style from "./Home.module.css";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <div className={`text-gray-600 text-center shadow-lg ${style.host}`}>
        <h1>Welcome {user?.name} </h1>
      </div>
    </>
  );
}
