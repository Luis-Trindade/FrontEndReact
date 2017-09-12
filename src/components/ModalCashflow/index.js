import React, { Component, PropTypes } from 'react';
import { Button,
        Modal,
} from 'react-bootstrap';

class ModalCashflow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <span>
        <Button bsStyle="default" onClick={this.open}>CashFlow</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="modal-header-primary" closeButton>
            <Modal.Title>Cashflow de rendas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Capital Inicial</th>
                  <th>Valor</th>
                  <th>Capital</th>
                  <th>Juro</th>
                  <th>Imposto</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cashflow.map((opt) => {
                  return (
                    <tr key={opt.datainiper}>
                      <th>{ opt.datainiper }</th>
                      <td>{ opt.capinicio }</td>
                      <td>{ opt.valor }</td>
                      <td>{ opt.juro }</td>
                      <td>{ opt.capital }</td>
                      <td>{ opt.imposto }</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.close}>OK</Button>
          </Modal.Footer>

        </Modal>
      </span>
    );
  }


}

ModalCashflow.propTypes = {
  cashflow: PropTypes.arrayOf(
    PropTypes.shape({
      datainiper: PropTypes.date,
      capinicio: PropTypes.number,
      valor: PropTypes.number,
      juro: PropTypes.number,
      capital: PropTypes.number,
      imposto: PropTypes.number,
    })
  ),
};


export default ModalCashflow;
