import React, { lazy, Suspense } from "react";
import "../styles/Parcels.scss";
import Loading from "../components/Loading";

const Wallpapper = lazy(() => import("../components/Wallpapper"));
const Account = lazy(() => import("../components/Account"));
const MyListParcel = lazy(() => import("../components/MyListParcel"));

const Parcels = () => {
  return (
    <div className="parcels ">
      <div className="parcels_container">
        <div className="content_top col-12">
          <div className="row">
            <div className="content_left col-lg-7">
              <Suspense fallback={<Loading />}>
                <Wallpapper />
              </Suspense>
            </div>
            <div className="content_right col-lg-5">
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="content_bottom col-12">
          <Suspense fallback={<Loading />}>
            <MyListParcel />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Parcels;
