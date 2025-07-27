import React, { Suspense, useEffect, useState } from "react";
import AppBackdrop from "../Components/Appdrop/AppBackdrop";
import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";

const AppRoutes = () => {
  const HeaderBar = React.lazy(() => import("../Components/Header/HeaderBar"));
  const Dashboard = React.lazy(()=> import("../Components/Dashboard/Dashboard"))
  const Search = React.lazy(
    () => import("../Components/SearchPage/Search")
  );

  return (
    <Suspense fallback={<AppBackdrop show />}>
      <Routes>
        <Route
          id="Dashboard"
          path={paths.DASHBOARD}
          element={
            <div>

           
              <div className="mb-6">
                   <HeaderBar name="Dashboard" subtitle="" />
              </div>
              <Dashboard/>
          </div>
             
            
          }
        />
          <Route
          id="Search"
          path={paths.SEARCH}
          element={
            <div >
              <div className="mb-6">
                   <HeaderBar name="Search Vehicle Location" subtitle="" />
              </div>
             
              <Search/>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
