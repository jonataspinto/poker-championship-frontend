import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "./components/modules";

import {
  Home,
  Login,
} from "./containers";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
