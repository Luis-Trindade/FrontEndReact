/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Simul from './Simul';
import fetch from '../../core/fetch';

export default {

  path: '/simul',

  async action() {
    const respIva = await fetch('http://localhost:3000/api/iva/short', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const iva = await respIva.json();
    if (!iva) throw new Error('Failed to load iva.');

    return <Simul iva={iva} />;
  },

};
