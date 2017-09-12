import React, { Component } from 'react';
import classNames from 'classnames';
import history from '../../core/history';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toolsElementsCollapsed: true,
    };
  }

  render() {
    return (
      <div className="navbar-default sidebar" style={{ marginLeft: '-20px' }} role="navigation">
        <div className="sidebar-nav navbar-collapse collapse">
          <ul className="nav in" id="side-menu">
            <li>
              <a className="li-nohover"><i className="fa fa-fw" /></a>
            </li>

            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/'); }} >
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Dashboard
              </a>
            </li>

            <li className={classNames({ active: !this.state.toolsElementsCollapsed })}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ toolsElementsCollapsed: !this.state.toolsElementsCollapsed });
                  return false;
                }}
              >
                <i className="fa fa-bar-chart-o fa-fw" /> &nbsp;Tools
                <span className="fa arrow" />
              </a>
              <ul
                className={
                  classNames({
                    'nav nav-second-level': true,
                    collapse: this.state.toolsElementsCollapsed,
                  })
              }
              >
                <li>
                  <a>
                    Tool 1
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    onClick={(e) => { e.preventDefault(); history.push('/simul'); }}
                  >
                    Simulação Rendas
                  </a>
                </li>
                <li>
                  <a>
                    Tool 1
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/clientes'); }} >
                <i className="fa fa-users fa-fw" /> &nbsp;Clientes
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-cogs fa-fw" /> &nbsp;Config
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Sidebar;
