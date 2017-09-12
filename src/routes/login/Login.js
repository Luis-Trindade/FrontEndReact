/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormControl, Checkbox } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import history from '../../core/history';

const title = 'Log In';

class Login extends Component {

  constructor(props, context) {
    super(props);
    context.setTitle(title);
    this.state = {
      utilizador: '',
      pass: '',
      userValid: true,
      passValid: true,
      credValid: true,
    };
    this.changeUtilizador = this.changeUtilizador.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.validaUtilizador = this.validaUtilizador.bind(this);
    this.validaPassword = this.validaPassword.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    console.log('TESTE TECLA!');
    console.log(event.key);
    if (event.key == 'Enter') {
      this.submitHandler(e);
    }
  }

  submitHandler(e) {
    const credentials = {
      name: this.state.utilizador,
      password: this.state.pass,
    };
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((response) => response.json())
      .then((responseJson) => {
        localStorage.setItem('authToken', responseJson.token);
        this.setState({ credValid: true });
        // e.preventDefault();
        window.location.href = '/';
      }).catch((erro) => {
        this.setState({ credValid: false });
      });
  }

  changeUtilizador(event) {
    this.setState({ utilizador: event.target.value });
  }

  validaUtilizador(event) {
    if (event.target.value === '') {
      this.setState({ userValid: false });
    } else {
      this.setState({ userValid: true });
    }
  }

  changePassword(event) {
    this.setState({ pass: event.target.value });
  }
  validaPassword(event) {
    if (event.target.value === '') {
      this.setState({ passValid: false });
    } else {
      this.setState({ passValid: true });
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <Panel bsStyle="primary" header={<h1>Faça login</h1>} className="login-panel">

          <form
            role="form"
          >
            <fieldset>
              <div className="form-group">
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder="Utilizador"
                  name="name"
                  onChange={this.changeUtilizador}
                  onBlur={this.validaUtilizador}
                />
              </div>
              {this.state.userValid ?
                null :
                (<div className="error-msg" >Utilizador Obrigatório</div>)}
              <div className="form-group">
                <FormControl
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.changePassword}
                  onBlur={this.validaPassword}
                />
              </div>
              {this.state.passValid ?
                null :
                (<div className="error-msg" >Password Obrigatória</div>)}
              {this.state.credValid ?
                null :
                (<div className="error-msg" >Autenticação Inválida</div>)}
              <Button
                bsSize="large"
                bsStyle="info"
                onClick={this.submitHandler}
                block
              >Login</Button>
            </fieldset>
          </form>
        </Panel>

      </div>

    );
  }
}


Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
