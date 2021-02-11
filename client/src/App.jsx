import React, { useEffect } from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import Login from "./layout/auth/login";
import Register from "./layout/auth/register";
import privateRoute from './privateROute/userRoute'

/* investors Route */
import InvestorsDashboard from "./layout/dashboard/investors";
import Dashboard from "./layout/dashboard/investors/main";
import Profile from "./layout/dashboard/investors/profile";
import InvestmentPlans from "./layout/dashboard/investors/plan";
import Investment from "./layout/dashboard/investors/invest";
import Settings from './layout/dashboard/investors/settings'
import Details from './layout/dashboard/investors/investmentDetails'


/* Page Not Found */
import PageNotFound from "./layout/pageNotFound";

import history from "./history";

function App() {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800  dark:text-gray-800 select-none">
     
      <Router history={history}>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />

          {/* Investors Routes */}
          <InvestorsDashboard>
            <Redirect exact={true} from={"/dashboard"} to={"/dashboard/main"} />
            <Route exact path="/dashboard/main" component={Dashboard} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/plan" component={InvestmentPlans} />
            <Route exact path="/dashboard/investment" component={Investment} />
            <Route exact path="/dashboard/settings" component={Settings}/>
            <Route exact path="/dashboard/details/:detailsId" component={Details}/>
          </InvestorsDashboard>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
