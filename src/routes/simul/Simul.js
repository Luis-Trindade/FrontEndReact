

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Breadcrumb,
  Panel,
} from 'react-bootstrap';
import ModalCashflow from '../../components/ModalCashflow';
import ModalDialog from '../../components/ModalDialog';

import s from './Simul.css';
import {
  Tooltip,
  XAxis, YAxis,
  CartesianGrid, Bar, BarChart,
  ResponsiveContainer } from '../../vendor/recharts';

const title = 'AWF - Audaxys Web FrontEnd';

class Simul extends Component {
  constructor(props, context) {
    super(props);
    context.setTitle(title);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    const today = `${year}-${month}-${day}`;

    const aSimul = {
      cto2dat: today,
      ctotcon: 0.00,
      ctopraz: '',
      ctoap: 'A',
      ctoper: '',
      ctoiva: '',
      cto1ren: today,
      ctojurdif: 'C',
      ctodado: 'T',
      ctovaljurdif: 0.00,
      ctotxim: '',
      qtd1: '',
      valor1: '',
      factor1: '',
      qtd2: '',
      valor2: '',
      factor2: '',
      qtd3: '',
      valor3: '',
      factor3: '',
    };
    this.state = {
      simul: aSimul,
      cashflow: [],
      error: {
        isError: false,
        isConfirm: false,
        title: 'Titulo',
        message: 'A mensagem de erro',
      },
    };
    this.changeCto2dat = this.changeCto2dat.bind(this);
    this.changeCtotcon = this.changeCtotcon.bind(this);
    this.changeCtopraz = this.changeCtopraz.bind(this);
    this.changeCtoap = this.changeCtoap.bind(this);
    this.changeCtoper = this.changeCtoper.bind(this);
    this.changeCtoiva = this.changeCtoiva.bind(this);
    this.changeCto1ren = this.changeCto1ren.bind(this);
    this.changeCtojurdif = this.changeCtojurdif.bind(this);
    this.changeCtodado = this.changeCtodado.bind(this);
    this.changeCtovaljurdif = this.changeCtovaljurdif.bind(this);
    this.changeCtotxim = this.changeCtotxim.bind(this);
    this.changeQtd1 = this.changeQtd1.bind(this);
    this.changeValor1 = this.changeValor1.bind(this);
    this.changeFactor1 = this.changeFactor1.bind(this);
    this.changeQtd2 = this.changeQtd2.bind(this);
    this.changeValor2 = this.changeValor2.bind(this);
    this.changeFactor2 = this.changeFactor2.bind(this);
    this.changeQtd3 = this.changeQtd3.bind(this);
    this.changeValor3 = this.changeValor3.bind(this);
    this.changeFactor3 = this.changeFactor3.bind(this);
    this.simulaValores = this.simulaValores.bind(this);
  }

  changeCto2dat(event) {
    const novoSimul = this.state.simul;
    novoSimul.cto2dat = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtotcon(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctotcon = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtopraz(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctopraz = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtoap(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctoap = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtoper(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctoper = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtoiva(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctoiva = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCto1ren(event) {
    const novoSimul = this.state.simul;
    novoSimul.cto1ren = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtojurdif(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctojurdif = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtodado(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctodado = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtovaljurdif(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctovaljurdif = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeCtotxim(event) {
    const novoSimul = this.state.simul;
    novoSimul.ctotxim = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeQtd1(event) {
    const novoSimul = this.state.simul;
    novoSimul.qtd1 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeValor1(event) {
    const novoSimul = this.state.simul;
    novoSimul.valor1 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeFactor1(event) {
    const novoSimul = this.state.simul;
    novoSimul.factor1 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeQtd2(event) {
    const novoSimul = this.state.simul;
    novoSimul.qtd2 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeValor2(event) {
    const novoSimul = this.state.simul;
    novoSimul.valor2 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeFactor2(event) {
    const novoSimul = this.state.simul;
    novoSimul.factor2 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeQtd3(event) {
    const novoSimul = this.state.simul;
    novoSimul.qtd3 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeValor3(event) {
    const novoSimul = this.state.simul;
    novoSimul.valor3 = event.target.value;
    this.setState({ simul: novoSimul });
  }
  changeFactor3(event) {
    const novoSimul = this.state.simul;
    novoSimul.factor3 = event.target.value;
    this.setState({ simul: novoSimul });
  }

  preencheGrupoRendasAuto() {
    console.log('Grupos rendas auto');
  }

  simulaValores() {
    console.log(JSON.stringify(this.state.simul));
    const oSimul = this.state.simul;
    const gruposrendas = [];
    if (this.state.simul.qtd1) {
      gruposrendas[0] = {};
      gruposrendas[0].quantidade = this.state.simul.qtd1;
      gruposrendas[0].valor = this.state.simul.valor1;
      gruposrendas[0].factor = this.state.simul.factor1;
    }
    if (this.state.simul.qtd2) {
      gruposrendas[1] = {};
      gruposrendas[1].quantidade = this.state.simul.qtd2;
      gruposrendas[1].valor = this.state.simul.valor2;
      gruposrendas[1].factor = this.state.simul.factor2;
    }
    if (this.state.simul.qtd3) {
      gruposrendas[2] = {};
      gruposrendas[2].quantidade = this.state.simul.qtd3;
      gruposrendas[2].valor = this.state.simul.valor3;
      gruposrendas[2].factor = this.state.simul.factor3;
    }
    oSimul.gruposrendas = gruposrendas;

    fetch('http://localhost:3000/api/simul', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oSimul),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        const oSimulRetorno = responseJson.simul;
        if (responseJson.gruposrendas[0]) {
          oSimulRetorno.qtd1 = responseJson.gruposrendas[0].quantidade;
          oSimulRetorno.valor1 = responseJson.gruposrendas[0].valor;
          oSimulRetorno.factor1 = responseJson.gruposrendas[0].factor;
        }
        if (responseJson.gruposrendas[1]) {
          oSimulRetorno.qtd2 = responseJson.gruposrendas[1].quantidade;
          oSimulRetorno.valor2 = responseJson.gruposrendas[1].valor;
          oSimulRetorno.factor2 = responseJson.gruposrendas[1].factor;
        }
        if (responseJson.gruposrendas[2]) {
          oSimulRetorno.qtd3 = responseJson.gruposrendas[2].quantidade;
          oSimulRetorno.valor3 = responseJson.gruposrendas[2].valor;
          oSimulRetorno.factor3 = responseJson.gruposrendas[2].factor;
        }
        this.setState({
          simul: oSimulRetorno,
          cashflow: responseJson.cashflow,
        });
      }).catch((erro) => {
        this.trataErros(true, false, 'Erro', 'Erro ao efectuar a simulação');
        console.log('ERRO');
        console.log(JSON.stringify(erro));
      });
  }

  trataErros(ehErro, ehConfirm, oTitulo, aMensagem) {
    const oErro = this.state.error;
    oErro.isConfirm = ehConfirm;
    oErro.isError = ehErro;
    oErro.title = oTitulo;
    oErro.message = aMensagem;
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
            <i className="fa fa-bar-chart-o" /> Simulação
          </Breadcrumb.Item>
        </Breadcrumb>
        <ModalDialog
          ref={instance => { this.dialog = instance; }}
          isError={this.state.error.isError}
          isConfirm={this.state.error.isConfirm}
          title={this.state.error.title}
          message={this.state.error.message}
        />
        <div className="row">
          <div className="col-lg-12">
            <Panel
              bsStyle="primary"
              className="panel-heading-audaxys"
              header={<h4>Simulador</h4>}
            >
              <form
                className="form-horizontal"
                id="simul_form" name="simul_form"
              >
                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="cto2dat">Data Início</label>
                  <div className="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      id="cto2dat" name="cto2dat"
                      value={this.state.simul.cto2dat}
                      onChange={this.changeCto2dat}
                    />
                  </div>
                  <label className="col-sm-2" htmlFor="ctotcon">Valor</label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      step="0.01" min="0.00"
                      className="form-control"
                      id="ctotcon" name="ctotcon"
                      value={this.state.simul.ctotcon}
                      onChange={this.changeCtotcon}
                      required
                    />
                  </div>
                </div>
                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="ctopraz">Prazo</label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      id="ctopraz" name="ctopraz"
                      value={this.state.simul.ctopraz}
                      required onChange={this.changeCtopraz}
                    />
                  </div>
                  <label className="col-sm-2" htmlFor="ctoper">Período</label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      min="1" max="12"
                      className="form-control"
                      id="ctoper" name="ctoper"
                      value={this.state.simul.ctoper}
                      required onChange={this.changeCtoper}
                    />
                  </div>
                </div>
                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="ctoap">A/P</label>
                  <div className="col-sm-3">
                    <label className="radio-inline " htmlFor="ctoap"><b>Antecipado</b></label>
                    <input
                      type="radio"
                      name="ctoap"
                      value="A"
                      checked={this.state.simul.ctoap === 'A'}
                      onChange={this.changeCtoap}
                    />
                    <label className="radio-inline" htmlFor="ctoap"><b>Postecipado</b></label>
                    <input
                      type="radio"
                      name="ctoap"
                      value="P"
                      checked={this.state.simul.ctoap === 'P'}
                      onChange={this.changeCtoap}
                    />
                  </div>
                  <label className="col-sm-2" htmlFor="ctoiva">IVA</label>
                  <div className="col-sm-3">
                    <select
                      className="form-control"
                      id="ctoiva" name="ctoiva"
                      value={this.state.simul.ctoiva}
                      onChange={this.changeCtoiva}
                    >
                      {this.props.iva.map(opt => {
                        return (
                          <option
                            key={opt.codigo}
                            value={opt.codigo}
                          >{opt.descricao}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="cto1ren">Data 1ª renda</label>
                  <div className="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      id="cto1ren" name="cto1ren"
                      value={this.state.simul.cto1ren}
                      onChange={this.changeCto1ren}
                    />
                  </div>
                  <label className="col-sm-2" htmlFor="ctojurdif">Juros Diferidos</label>
                  <div className="col-sm-3">
                    <select
                      className="form-control"
                      id="ctojurdif" name="ctojurdif"
                      value={this.state.simul.ctojurdif}
                      onChange={this.changeCtojurdif}
                    >
                      <option value="C">Calcula</option>
                      <option value="S">Impõe Valor</option>
                      <option value="N">Não tem</option>
                    </select>
                  </div>
                </div>
                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="ctodado">Dado</label>
                  <div className="col-sm-3">
                    <select
                      className="form-control"
                      id="ctodado" name="ctodado"
                      value={this.state.simul.ctodado}
                      onChange={this.changeCtodado}
                    >
                      <option value="T">Taxa</option>
                      <option value="R">Rendas</option>
                    </select>
                  </div>
                  <label className="col-sm-2" htmlFor="ctovaljurdif">Valor Juros Diferidos</label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      step="0.01" min="0.00"
                      className="form-control"
                      id="ctovaljurdif" name="ctovaljurdif"
                      value={this.state.simul.ctovaljurdif}
                      onChange={this.changeCtovaljurdif}
                      disabled={this.state.simul.ctojurdif === 'C'
                                || this.state.simul.ctojurdif === 'N'}
                    />
                  </div>
                </div>
                <div className="row field-padding">
                  <label className="col-sm-2" htmlFor="ctotxim">Taxa</label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      step="0.0001"
                      className="form-control"
                      id="ctotxim" name="ctotxim"
                      value={this.state.simul.ctotxim}
                      onChange={this.changeCtotxim}
                      disabled={this.state.simul.ctodado === 'R'}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-7">
                    <div className="panel panel-info">
                      <div className="panel-heading panel-heading-audaxys">Grupos de Rendas</div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th name="qtd">Qtd</th>
                            <th>Valor</th>
                            <th>Factor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><input
                              className="form-control"
                              type="number"
                              id="qtd1" name="qtd1"
                              min="1"
                              value={this.state.simul.qtd1}
                              onChange={this.changeQtd1}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="valor1" name="valor1"
                              value={this.state.simul.valor1}
                              onChange={this.changeValor1}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="factor1" name="factor1"
                              value={this.state.simul.factor1}
                              onChange={this.changeFactor1}
                            /></td>
                          </tr>
                          <tr>
                            <td><input
                              className="form-control"
                              type="number"
                              id="qtd2" name="qtd2"
                              min="1"
                              value={this.state.simul.qtd2}
                              onChange={this.changeQtd2}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="valor2" name="valor2"
                              value={this.state.simul.valor2}
                              onChange={this.changeValor2}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="factor2" name="factor2"
                              value={this.state.simul.factor2}
                              onChange={this.changeFactor2}
                            /></td>
                          </tr>
                          <tr>
                            <td><input
                              className="form-control"
                              type="number"
                              id="qtd3" name="qtd3"
                              min="1"
                              value={this.state.simul.qtd3}
                              onChange={this.changeQtd3}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="valor3" name="valor3"
                              value={this.state.simul.valor3}
                              onChange={this.changeValor3}
                            /></td>
                            <td><input
                              className="form-control"
                              type="number"
                              step="0.01" min="0.00"
                              id="factor3" name="factor3"
                              value={this.state.simul.factor3}
                              onChange={this.changeFactor3}
                            /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="btn-group-vertical" role="group" aria-label="...">
                    <button
                      type="button"
                      id="calc_button"
                      className="btn btn-info"
                      value="validate"
                      onClick={this.simulaValores}
                    >Calcula
                    </button>
                    <ModalCashflow cashflow={this.state.cashflow} />
                    <button
                      type="button"
                      id="cfgrafico_button"
                      className="btn btn-default"
                      data-toggle="modal"
                      data-target="#cfgrafico-dialog"
                    >Gráfico
                    </button>
                  </div>
                </div>
              </form>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

Simul.propTypes = {
  iva: PropTypes.arrayOf(PropTypes.shape({
    codigo: PropTypes.number,
    descricao: PropTypes.string,
  })).isRequired,
};
Simul.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Simul);
