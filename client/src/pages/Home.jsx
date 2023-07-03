import React from "react";
import "../styles/Home.scss";
import Wallpapper from "../components/Wallpapper";
import Instruct from "../components/Instruct";
import Account from "../components/Account";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container ">
        <div className="content col-12">
          <div className="row">
            <div className="content_left col-lg-7">
              <Wallpapper />
            </div>
            <div className="content_right col-lg-5">
              <Account />
            </div>
          </div>
        </div>
        <Instruct />
      </div>
    </div>
  );
};

export default Home;
