import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../login/login';
import Register from '../register/register';

export default function LoginRegister(){
  return (
    <div className="wrapper">
    <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
