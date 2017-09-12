import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Breadcrumb,
  Panel,
  Dropdown,
  Glyphicon,
  MenuItem,
  ResponsiveEmbed,
} from 'react-bootstrap';
import history from '../../core/history';
import ModalCliente from '../../components/ModalCliente';
import ModalDialog from '../../components/ModalDialog';
import Donut from '../../components/Donut';
import DatatableContra from '../../components/DatatableContra';


import s from './Cliente.css';

const title = 'AWF - Audaxys Web FrontEnd';

class Cliente extends Component {
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
    this.deleteCliente = this.deleteCliente.bind(this);
    this.mostraDialog = this.mostraDialog.bind(this);
  }

  deleteCliente() {
    this.mostraDialog(false, true,
      'Confirma?',
      'Confirma que deseja apagar o cliente?',
      () => {
        fetch(`http://localhost:3000/api/clientes/${this.props.cliente.client[0].clinum}`, {
          method: 'delete',
        }).then((data) => {
          if (data.status === 200) {
            this.mostraDialog(false, false,
              'Cliente Apagado',
              'O cliente foi apagado com sucesso!',
              () => {
                history.push('/clientes');
              });
          } else {
            this.mostraDialog(false, 'Erro', 'Houve um erro ao apagar o cliente', () => {});
            console.log(JSON.stringify(erro));
          }
        }).catch(() => {
          this.mostraDialog(false, false, 'Erro', 'Houve um erro ao apagar o cliente');
        });
      });
  }

  mostraDialog(ehErro, ehConfirm, oTitulo, aMensagem, funcaoOK) {
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
          <Breadcrumb.Item href="/clientes">
            <i className="fa fa-users" /> Clientes
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <i className="fa fa-users" /> {this.props.cliente.client[0].clinum}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h4>Cliente
                <ModalCliente
                  paises={this.props.paises}
                  cliente={this.props.cliente}
                  isError={false}
                  ehRegisto={false}
                  errorDialog={this.mostraDialog}
                />
                <ModalDialog
                  ref={instance => { this.dialog = instance; }}
                  isError={this.state.error.isError}
                  isConfirm={this.state.error.isConfirm}
                  title={this.state.error.title}
                  message={this.state.error.message}
                  actionFunc={this.state.error.actionFunc}
                />
                <Dropdown id="dropdown-cliente">
                  <Dropdown.Toggle className="transparent-button">
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="1">Opção 1</MenuItem>
                    <MenuItem eventKey="2">Etcs</MenuItem>
                    <MenuItem divider />
                    <MenuItem
                      eventKey="3"
                      onClick={this.deleteCliente}
                    ><i className="fa fa-trash" />Delete</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </h4>
              }
            >
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <p><strong>Nome</strong></p>
                </div>
                <div className="col-md-8 col-lg-8">
                  <p>{this.props.cliente.client[0].clinom}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <p><strong>Web</strong></p>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                  <a
                    className="dont-break-out"
                    href={`http://${this.props.cliente.client[0].cliwww}`}
                  >{this.props.cliente.client[0].cliwww}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <p><strong>Email</strong></p>
                </div>
                <div className="col-md-8 col-lg-8">
                  <a
                    className="dont-break-out"
                    href={`mailto:${this.props.cliente.client[0].clitlx}`}
                  >{this.props.cliente.client[0].clitlx}</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <p><strong>Telefone</strong></p>
                </div>
                <div className="col-md-8 col-lg-8">
                  <p>{this.props.cliente.client[0].clitel}</p>
                </div>
              </div>

            </Panel>
          </div>

          <div className="col-lg-6 col-md-6">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h4>Localização</h4>}
            >
              <ResponsiveEmbed a16by9>
                <embed
                  type="image/svg+xml"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB8G1i2Hwt_PIhC7LtRnBWQolyXhPbtjZE&q=${this.props.cliente.client[0].climor}`} />
              </ResponsiveEmbed>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h4>Contratos</h4>}
            >
              <DatatableContra clinum={this.props.cliente.client[0].clinum} />
            </Panel>
          </div>
          <div className="col-lg-6 col-md-6">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h4>Pipeline por tipo de proposta</h4>}
            >
              <div>
                <Donut data={this.props.data} color="#8884d8" innerRadius="60" outerRadius="80" />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

Cliente.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
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

Cliente.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Cliente);
