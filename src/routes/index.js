/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import jwtdecode from 'jwt-decode';
import React from 'react';
import App from '../components/App';


// Child routes
import home from './home';
import login from './login';
import error from './error';
import simul from './simul';
import clientes from './clientes';
import cliente from './cliente';

import Header from '../components/Header';

export default [

  {
    path: '/login',
    children: [
      login,
    ],
    async action({ next, render, context }) {
      const component = await next();
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },


  {
    path: '/',

  // keep in mind, routes are evaluated in order
    children: [
      home,
      simul,
      clientes,
      cliente,
      // place new routes before...
      // content,
      error,
    ],

    async action({ next, render, context }) {
      const component = await next();
      let token = localStorage.getItem('authToken');
      if (token === null) {
        window.location.href = '/login';
      } else {
        const decoded = jwtdecode(token);
        if (decoded.exp < new Date().getTime() / 1000) { /* nao ha milisegundos no exp */
          localStorage.removeItem('authToken');
          token = null;
          window.location.href = '/login';
        }
        // console.log('inside dasdboard component', component);
        if (component === undefined) return component;
        return render(
          <div>
            <Header />
            <div id="page-wrapper" className="page-wrapper">
              <App context={context}>{component}</App>
            </div>
          </div>
        );
      }
    },
  },
  {
    path: '/error',
    children: [
      error,
    ],
    async action({ next, render, context }) {
      const component = await next();
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },
];
