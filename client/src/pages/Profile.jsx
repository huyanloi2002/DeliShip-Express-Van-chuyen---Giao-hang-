import React, { Suspense, lazy } from "react";
import Loading from "../components/Loading";

const Account = lazy(() => import("../components/Account"));
const MyListParcel = lazy(() => import("../components/MyListParcel"));
const EditProfile = lazy(() => import("../components/EditProfile"));

const Profile = () => {
  return (
    <div className="profile mt-3">
      <div className="profile_content col-md-12 px-2">
        <div className="row">
          <div className="profile_account col-lg-7">
            <Suspense fallback={<Loading />}>
              <Account />
            </Suspense>
          </div>
          <div className="edit_profile col-lg-5">
            <Suspense fallback={<Loading />}>
              <EditProfile />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="list_your_parcel col-md-12 px-5 pb-3 pt-1">
        <Suspense fallback={<Loading />}>
          <MyListParcel />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
