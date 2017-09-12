/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Cliente from './Cliente';
import fetch from '../../core/fetch';

export default {

  path: '/cliente/:clinum',

  async action({path}) {
    const data = [];
    const resp = await fetch('http://localhost:3000/api/clientes/mapas/pipeline', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const dataFrom = await resp.json();
    if (!dataFrom) throw new Error('Failed to load the data for chart.');
    dataFrom.forEach((item) => {
      data.push({ name: item.label, value: item.value });
    });
    const respPais = await fetch('http://localhost:3000/api/pais/short', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const paises = await respPais.json();
    const clinum = path.split('/')[2];

    const respCliente = await fetch(`http://localhost:3000/api/clientes/${clinum}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const cliente = await respCliente.json();
    if (!cliente) throw new Error('Failed to load cliente.');
    return <Cliente data={data} paises={paises} cliente={cliente} />;
  },

};
