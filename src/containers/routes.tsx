import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { Journey } from "./Journey";
import { Profile } from "./Profile";
import { Layout } from "../components/modules";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/jornadas" component={Journey} />
        <Route path="/profile" component={Profile} />
      </Layout>
    </Switch>
  </BrowserRouter>
);
