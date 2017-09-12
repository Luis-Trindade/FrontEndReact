import React, { Component, PropTypes } from 'react';
import { Button,
        Modal,
} from 'react-bootstrap';
import fetch from '../../core/fetch';

class ModalCliente extends Component {
  static defaultProps = {
    paises: [],
    cliente: {
      clinum: '',
      clinom: '',
      climor: '',
      climor2: '',
      clicop: '',
      clicop2: '',
      cliloc: '',
      clitel: '',
      clitlx: '',
      cliwww: '',
      clipais: '',
      clinfis: '',
      clibanco: '',
      clitcli: '',
      cliehsucursal: '',
      cliivacaixa: '',
      datanascimento: '',
    },
    ehRegisto: true,
    errorDialog: null,
  };
  constructor(props) {
    super(props);
    // const oCliente = props.cliente;
    const oCliente = {};
    oCliente.clinum = props.cliente.client[0].clinum;
    oCliente.clinom = props.cliente.client[0].clinom;
    oCliente.climor = props.cliente.client[0].climor;
    oCliente.climor2 = props.cliente.client[0].climor2;
    oCliente.clicop = props.cliente.client[0].clicop;
    oCliente.clicop2 = props.cliente.client[0].clicop2;
    oCliente.cliloc = props.cliente.client[0].cliloc;
    oCliente.clitel = props.cliente.client[0].clitel;
    oCliente.clitlx = props.cliente.client[0].clitlx;
    oCliente.cliwww = props.cliente.client[0].cliwww;
    oCliente.clipais = props.cliente.client[0].clipais;
    oCliente.clinfis = props.cliente.client[0].clinfis;
    oCliente.clibanco = props.cliente.client[0].clibanco;
    oCliente.clitcli = props.cliente.client[0].clitcli;
    oCliente.cliehsucursal = props.cliente.client[0].cliehsucursal;
    oCliente.cliivacaixa = props.cliente.client[0].cliivacaixa;
    if (oCliente.clitcli === 'P') {
      oCliente.datanascimento = props.cliente.restocliente[0].datanascimento;
    }
    this.state = {
      cliente: oCliente,
      emailValid: true,
      siteValid: true,
      nifValid: true,
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.RegModCliente = this.RegModCliente.bind(this);
    this.changeClitcli = this.changeClitcli.bind(this);
    this.changeClinfis = this.changeClinfis.bind(this);
    this.changeClipais = this.changeClipais.bind(this);
    this.changeClinom = this.changeClinom.bind(this);
    this.changeClimor = this.changeClimor.bind(this);
    this.changeClimor2 = this.changeClimor2.bind(this);
    this.changeClicop = this.changeClicop.bind(this);
    this.changeClicop2 = this.changeClicop2.bind(this);
    this.changeClitlx = this.changeClitlx.bind(this);
    this.changeCliwww = this.changeCliwww.bind(this);
    this.changeCliloc = this.changeCliloc.bind(this);
    this.changeClitel = this.changeClitel.bind(this);
    this.changeDatanascimento = this.changeDatanascimento.bind(this);
    this.changeCliehsucursal = this.changeCliehsucursal.bind(this);
    this.changeClibanco = this.changeClibanco.bind(this);
    this.changeCliivacaixa = this.changeCliivacaixa.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  RegModCliente() {
    let regModUrl = 'http://localhost:3000/api/clientes/';
    let httpMethod = 'post';
    if (!this.props.ehRegisto) {
      regModUrl = `http://localhost:3000/api/clientes/${this.state.cliente.clinum}`;
      httpMethod = 'put';
    }
    const oCliente = {
      clinum: this.state.cliente.clinum,
      clinom: this.state.cliente.clinom,
      climor: this.state.cliente.climor,
      climor2: this.state.cliente.climor2,
      clicop: this.state.cliente.clicop,
      clicop2: this.state.cliente.clicop2,
      cliloc: this.state.cliente.cliloc,
      clitel: this.state.cliente.clitel,
      clitlx: this.state.cliente.clitlx,
      cliwww: this.state.cliente.cliwww,
      clipais: this.state.cliente.clipais,
      clinfis: this.state.cliente.clinfis,
      clibanco: this.state.cliente.clibanco,
      clitcli: this.state.cliente.clitcli,
      cliehsucursal: this.state.cliente.cliehsucursal,
      cliivacaixa: this.state.cliente.cliivacaixa,
      restocliente: [{ datanascimento: this.state.cliente.datanascimento }],
    };
    fetch(regModUrl, {
      method: httpMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oCliente),
    }).then((response) => response.json())
      .then((responseJson) => {
        const oNovoCliente = {
          clinum: responseJson.client.clinum,
          clinom: responseJson.client.clinom,
          climor: responseJson.client.climor,
          climor2: responseJson.client.climor2,
          clicop: responseJson.client.clicop,
          clicop2: responseJson.client.clicop2,
          cliloc: responseJson.client.cliloc,
          clitel: responseJson.client.clitel,
          clitlx: responseJson.client.clitlx,
          cliwww: responseJson.client.cliwww,
          clipais: responseJson.client.clipais,
          clinfis: responseJson.client.clinfis,
          clibanco: responseJson.client.clibanco,
          clitcli: responseJson.client.clitcli,
          cliehsucursal: responseJson.client.cliehsucursal,
          cliivacaixa: responseJson.client.cliivacaixa,
          datanascimento: responseJson.restocliente.datanascimento,
        };
        this.setState({
          cliente: oNovoCliente,
        });
        if (!this.props.ehRegisto) {
          this.props.errorDialog(false, false,
            'Cliente Modificado',
            'Cliente modificado com sucesso', () => {});
          this.close();
        } else {
          this.props.errorDialog(false, false,
            'Cliente Registado',
            `Cliente registado com sucesso com o número ${oNovoCliente.clinum}`, () => {});
          this.close();
        }
      }).catch((erro) => {
        console.log('ERRO');
        console.log(JSON.stringify(erro));
        if (!this.props.ehRegisto) {
          this.props.errorDialog(false, false,
            'Erro',
            'Erro ao modificar o cliente', () => {});
          this.close();
        } else {
          this.props.errorDialog(false, false,
            'Erro',
            'Erro ao registar o cliente', () => {});
          this.close();
        }
      });
  }

  changeClitcli(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clitcli = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClipais(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clipais = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClinfis(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clinfis = event.target.value;
    this.setState({ cliente: novoCliente });
    fetch(`http://localhost:3000/api/clientes/valida_nif?nif=${event.target.value}`, {
      method: 'get',
    }).then((data) => {
      if (data.status === 200) {
        this.setState({ nifValid: true });
      } else {
        this.setState({ nifValid: false });
      }
    }).catch(() => {
      this.setState({ nifValid: false });
    });
  }
  changeClinom(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clinom = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClimor(event) {
    const novoCliente = this.state.cliente;
    novoCliente.climor = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClimor2(event) {
    const novoCliente = this.state.cliente;
    novoCliente.climor2 = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClicop(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clicop = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClicop2(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clicop2 = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeCliloc(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clilop = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClitlx(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clitlx = event.target.value;
    this.setState({ cliente: novoCliente });
    const valido = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    this.setState({ emailValid: valido });
  }
  changeCliwww(event) {
    const novoCliente = this.state.cliente;
    novoCliente.cliwww = event.target.value;
    this.setState({ cliente: novoCliente });
    const valido = event.target.value.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~??+#-]*[\w@?^=%&amp;\/??~+#-])?/);
    this.setState({ siteValid: valido });
  }
  changeClitel(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clitel = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeDatanascimento(event) {
    const novoCliente = this.state.cliente;
    novoCliente.datanascimento = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeCliehsucursal(event) {
    const novoCliente = this.state.cliente;
    novoCliente.cliehsucursal = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeClibanco(event) {
    const novoCliente = this.state.cliente;
    novoCliente.clibanco = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  changeCliivacaixa(event) {
    const novoCliente = this.state.cliente;
    novoCliente.cliivacaixa = event.target.value;
    this.setState({ cliente: novoCliente });
  }
  render() {
    return (
      <span>
        <Button bsStyle="success" bsSize="small" className="btn-circle" onClick={this.open}>
          <i className="fa fa-plus" />
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="modal-header-primary" closeButton>
            { this.props.ehRegisto ? (
              <Modal.Title>Inserir Cliente</Modal.Title>
            ) : (
              <Modal.Title>Modificar Cliente</Modal.Title>
            )
            }
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <div className="row field-padding">
                <label htmlFor="clinum" className="col-sm-2">Código</label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="clinum"
                    defaultValue={this.state.cliente.clinum}
                    disabled
                  />
                </div>
                <label className="radio-inline col-sm-1" htmlFor="clitcli" ><b>Empresa</b></label>
                <input
                  className="col-sm-2"
                  type="radio"
                  name="clitcli"
                  value="E" checked={this.state.cliente.clitcli === 'E'}
                  onChange={this.changeClitcli}
                />
                <label className="radio-inline col-sm-1" htmlFor="clitcli"><b>Particular</b></label>
                <input
                  className="col-sm-2"
                  type="radio"
                  name="clitcli"
                  value="P" checked={this.state.cliente.clitcli === 'P'}
                  onChange={this.changeClitcli}
                />
              </div>

              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="clipais">Nacionalidade</label>
                <div className="col-sm-3">
                  <select
                    className="form-control"
                    id="nacionalidade" name="clipais"
                    onChange={this.changeClipais}
                    value={this.state.cliente.clipais}
                  >
                    {this.props.paises.map((opt) => {
                      return (
                        <option
                          key={opt.codigo}
                          value={opt.codigo}
                        >{opt.nomepais}</option>
                      );
                    })}
                  </select>
                </div>
                <label className="col-sm-3" htmlFor="clinfis">NIF</label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nif" name="clinfis"
                    value={this.state.cliente.clinfis}
                    onChange={this.changeClinfis}
                  />
                </div>
              </div>
              {this.state.nifValid ? null : (<div className="col-sm-offset-9 error-msg" >NIF inválido</div>)}
              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="clinom">Nome</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="nome" name="clinom"
                    value={this.state.cliente.clinom}
                    onChange={this.changeClinom}
                    required
                  />
                </div>
              </div>
              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="climor">Morada</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="morada" name="climor"
                    value={this.state.cliente.climor}
                    onChange={this.changeClimor}
                  />
                </div>
              </div>
              <div className="row field-padding">
                <div className="col-sm-2" />
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="morada2" name="climor2"
                    value={this.state.cliente.climor2}
                    onChange={this.changeClimor2}
                  />
                </div>
              </div>
              <div className="row field-padding">
                <div className="col-sm-2" />
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    id="codpostal1" name="clicop"
                    value={this.state.cliente.clicop}
                    onChange={this.changeClicop}
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    id="codpostal2" name="clicop2"
                    value={this.state.cliente.clicop2}
                    onChange={this.changeClicop2}
                  />
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    id="localidade" name="cliloc"
                    value={this.state.cliente.cliloc}
                    onChange={this.changeCliloc}
                  />
                </div>
              </div>
              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="clitlx">Email</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="email" name="clitlx"
                    value={this.state.cliente.clitlx}
                    onChange={this.changeClitlx}
                  />
                </div>
              </div>
              {this.state.emailValid ? null : (<div className="col-sm-offset-2 error-msg" >Email inválido</div>)}
              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="cliwww">Website</label>
                <div className="col-sm-9 ">
                  <input
                    type="text"
                    className="form-control"
                    id="website" name="cliwww"
                    disabled={this.state.cliente.clitcli === 'P'}
                    value={this.state.cliente.cliwww}
                    onChange={this.changeCliwww}
                  />
                </div>
              </div>
              {this.state.siteValid ? null : (<div className="col-sm-offset-2 error-msg" >URL inválido</div>)}
              <div className="row field-padding">
                <label className="col-sm-2" htmlFor="clitel">Telefone</label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="telefone" name="clitel"
                    value={this.state.cliente.clitel}
                    onChange={this.changeClitel}
                  />
                </div>
                <label className="col-sm-3" htmlFor="datanascimento">Nascido a</label>
                <div className="col-sm-3">
                  <input
                    type="date"
                    className="form-control"
                    id="datanascimento" name="datanascimento"
                    disabled={ this.state.cliente.clitcli === 'E' }
                    value={this.state.cliente.datanascimento}
                    onChange={this.changeDatanascimento}
                  />
                </div>
              </div>

              <div className="row field-padding">
                <div className="col-sm-2" />
                <label
                  className="checkbox-inline col-sm-2"
                  id="cliehsucursal"
                  htmlFor="cliemsucursal"
                ><input
                  type="checkbox"
                  value={this.state.cliente.cliehsucursal}
                  checked={this.state.cliente.cliehsucursal === 'S'}
                  name="cliehsucursal"
                  onChange={this.changeCliehsucursal}
                />Sucursal</label>
                <label
                  className="checkbox-inline col-sm-2"
                  id="cliivacaixa"
                  htmlFor="cliivacaixa"
                ><input
                  type="checkbox"
                  value={this.state.cliente.cliivacaixa}
                  name="cliivacaixa"
                  checked={this.state.cliente.cliivacaixa === 'S'}
                  onChange={this.changeCliivacaixa}
                />Iva caixa</label>
                <label
                  className="checkbox-inline col-sm-2"
                  id="clibanco"
                  htmlFor="clibanco"
                ><input
                  type="checkbox"
                  value={this.state.cliente.clibanco}
                  name="clibanco"
                  checked={this.state.cliente.clibanco === 'S'}
                  onChange={this.changeClibanco}
                />Cli Banco</label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.RegModCliente}>Guardar</Button>
            <Button bsStyle="danger" onClick={this.close}>Cancelar</Button>
          </Modal.Footer>

        </Modal>
      </span>
    );
  }


}

ModalCliente.propTypes = {
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
  ehRegisto: PropTypes.bool.isRequired,
  errorDialog: PropTypes.func,
};


export default ModalCliente;
