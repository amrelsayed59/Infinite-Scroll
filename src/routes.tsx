import React, { lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import PublicRoute from './components/PublicRoute';
import Jobs from "./modules/jobs/Job";
import Skills from "./modules/jobs/Skill";
import Search from './modules/jobs/Search';
//lazy Jobs Module
const jobs = lazy(() => import("./modules/jobs"));


const Routes: React.SFC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute component={jobs} path="/" exact />
      <PublicRoute component={Search} path="/search"  />
      <PublicRoute component={Jobs} path="/jobs/:id" />
      <PublicRoute component={Skills} path="/skills/:id" />
      {/* Error404 Routes */}
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
