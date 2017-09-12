/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Clientes from './Clientes';
import fetch from '../../core/fetch';

export default {

  path: '/clientes',

  async action() {
    const resp = await fetch('http://localhost:3000/api/restricaoLst?listagem=CLIENT', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const dataFrom = await resp.json();
    if (!dataFrom) throw new Error('Failed to load the data for chart.');

    const respPais = await fetch('http://localhost:3000/api/pais/short', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const paises = await respPais.json();
    if (!paises) throw new Error('Failed to load paises.');
    const respCliente = await fetch('http://localhost:3000/api/clientes/defaults', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const cliente = await respCliente.json();
    cliente[0].clinum = undefined;
    const clientArray = {
      client: cliente,
      restocliente: [],
    };

    return (<Clientes
      optionsRestricao={dataFrom}
      paises={paises}
      cliente={clientArray}
    />
    );
  },

};
