import "./styles/app.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import { LoggedInRoute } from "../../routes";

import { Header } from "../Header";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import { UserProvider } from "../../store/userStore";
import { EmailHandler } from "../../utils/emailHandler";

import { Portfolio } from "../../pages/portfolio";
import { Contact } from "../../pages/contact";
import { Admin } from "../../pages/admin";
import { ResetPassword } from "../../pages/admin/resetPassword";
import { ConfirmPassword } from "../../pages/confirmPassword/confirmPassword";
import { PasswordChanged } from "../../pages/confirmPassword/passwordChanged";
import { TryAgain } from "../../pages/confirmPassword/tryAgain";

export function App() {
  return (
    <div className="app">
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/try-again">
              <TryAgain />
            </Route>
            <Route exact path="/__/auth/action">
              <EmailHandler />
            </Route>
            <Route exact path="/confirmpassword">
              <ConfirmPassword />
            </Route>
            <Route exact path="/account/password_reset_complete">
              <PasswordChanged />
            </Route>
            <Route exact path="/contact">
              <Header />
              <Contact />
            </Route>
            <Route exact path="/">
              <Header />
              <Portfolio />
            </Route>
            <LoggedInRoute path="/forgot-password">
              <ResetPassword />
            </LoggedInRoute>
            <LoggedInRoute path="/admin">
              <Admin />
            </LoggedInRoute>
          </Switch>
          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}
