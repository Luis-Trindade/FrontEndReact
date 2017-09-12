

import React, { Component, PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Breadcrumb,
  Panel,
} from 'react-bootstrap';
import DatatableClientes from '../../components/DatatableClientes';
import ModalCliente from '../../components/ModalCliente';
import ModalDialog from '../../components/ModalDialog';
import s from './Clientes.css';


const title = 'AWF - Audaxys Web FrontEnd';

// function Clientes(props, context) {
class Clientes extends Component {
  constructor(props, context) {
    super(props);
    context.setTitle(title);
    this.state = {
      error: {
        isError: false,
        isConfirm: false,
        title: 'Titulo',
        message: 'A mensagem de erro',
      },
      showModal: false,
    };
    this.trataErros = this.trataErros.bind(this);
  }

  trataErros(ehErro, ehConfirm, oTitulo, aMensagem, funcaoOK) {
    const oErro = this.state.error;
    oErro.isConfirm = ehConfirm;
    oErro.isError = ehErro;
    oErro.title = oTitulo;
    oErro.message = aMensagem;
    oErro.actionFunc = funcaoOK;

    this.setState({ error: oErro });
    this.dialog.open();
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <i className="fa fa-dashboard" /> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <i className="fa fa-users" /> Clientes
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-lg-12">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h2>Clientes
                <ModalCliente
                  paises={this.props.paises}
                  cliente={this.props.cliente}
                  ehRegisto
                  errorDialog={this.trataErros}
                />
                <ModalDialog
                  ref={instance => { this.dialog = instance; }}
                  isError={this.state.error.isError}
                  isConfirm={this.state.error.isConfirm}
                  title={this.state.error.title}
                  message={this.state.error.message}
                />
              </h2>
              }
            >
              <DatatableClientes optionsRestricao={this.props.optionsRestricao}/>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

Clientes.propTypes = {
  optionsRestricao: PropTypes.arrayOf(PropTypes.shape({
    codigo: PropTypes.string.isRequired,
  })).isRequired,
  paises: PropTypes.arrayOf(
    PropTypes.shape({
      codigo: PropTypes.string.isRequired,
      nomepais: PropTypes.string.isRequired,
    }),
  ),
  cliente: PropTypes.shape({
    client: PropTypes.arrayOf(
      PropTypes.shape({
        clinum: PropTypes.number,
        clinom: PropTypes.string,
        climor: PropTypes.string,
        climor2: PropTypes.string,
        clicop: PropTypes.number,
        clicop2: PropTypes.string,
        cliloc: PropTypes.string,
        clitel: PropTypes.string,
        clitlx: PropTypes.string,
        cliwww: PropTypes.string,
        clipais: PropTypes.string,
        clinfis: PropTypes.string,
        clibanco: PropTypes.string,
        clitcli: PropTypes.string,
        cliehsucursal: PropTypes.string,
        cliivacaixa: PropTypes.string,
      }),
    ),
    restocliente: PropTypes.arrayOf(
      PropTypes.shape({
        datanascimento: PropTypes.date,
      }),
    ),
  }),
};
Clientes.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Clientes);
