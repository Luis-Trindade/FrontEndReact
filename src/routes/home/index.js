/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export default {

  path: '/',

  async action() {
    /* const data = [
      { name: 'Page A', contratos: 600, propostas: 200 },
      { name: 'Page B', contratos: 1890, propostas: 4800 },
      { name: 'Page C', contratos: 1890, propostas: 4800 },
      { name: 'Page D', contratos: 1890, propostas: 4800 },
      { name: 'Page E', contratos: 1890, propostas: 4800 },
      { name: 'Page F', contratos: 2390, propostas: 3800 },
      { name: 'Page G', contratos: 3490, propostas: 4300 },
    ];
    */
    const resp = await fetch('http://localhost:3000/api/clientes/mapas/volnegocio', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken'),
      },
    });
    const data = await resp.json();
    if (!data) throw new Error('Failed to load the data for chart.');
    // dataFrom.forEach((item) => {
    //  data.push({ name: item.ano, contratos: item.value });
    // });
    // console.log(JSON.stringify(dataFrom));
    return <Home data={data} />;
  },

};
