/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

import $ from 'jquery';
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar';
import history from '../../core/history';

import Sidebar from '../Sidebar';

const logo = require('./logo.png');

function logoutUser(e) {
  localStorage.removeItem('authToken');
  e.preventDefault();
  history.push('/login');
}

function Header() {
  return (
    <div id="wrapper" className="content">
      <Navbar fluid style={{ margin: 0 }}>
        <Brand>
          <span>
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Audaxys" title="Audaxys" />
            </a>
            <button
              type="button"
              className="navbar-toggle"
              onClick={() => { toggleMenu(); }}
              style={{ position: 'absolute', right: 0, top: 0 }}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </span>
        </Brand>
        <ul className="nav navbar-top-links navbar-right">

          <NavDropdown title={<i className="fa fa-user fa-fw" /> } id='navDropdown4'>
            <MenuItem eventKey="1">
              <span> <i className="fa fa-user fa-fw" /> User Profile </span>
            </MenuItem>
            <MenuItem eventKey="2">
              <span><i className="fa fa-gear fa-fw" /> Settings </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3">
              <span><i className="fa fa-circle-o fa-fw" /> Light Theme</span>
            </MenuItem>
            <MenuItem eventKey="4" >
              <span><i className="fa fa-circle fa-fw" /> Dark Theme</span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="5" onClick={(event) => { logoutUser(event); }}>
              <span> <i className="fa fa-sign-out fa-fw" /> Logout </span>
            </MenuItem>
          </NavDropdown>

        </ul>
        <Sidebar />
      </Navbar>
    </div>
  );
}
function toggleMenu(){
  if ($(".navbar-collapse").hasClass('collapse')) {
    $(".navbar-collapse").removeClass('collapse');
  } else {
    $(".navbar-collapse").addClass('collapse');
  }
}

export default Header;
