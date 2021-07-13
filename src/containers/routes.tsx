import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { Journey } from "./Journey";
import { Profile } from "./Profile";
import { Layout } from "../components/modules";
import { AuthProvider, JourneyProvider, PlayerProvider } from "../contexts";

export const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <JourneyProvider>
        <PlayerProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/rodadas" component={Journey} />
              <Route path="/meu-perfil" component={Profile} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </PlayerProvider>
      </JourneyProvider>
    </AuthProvider>
  </BrowserRouter>
);
