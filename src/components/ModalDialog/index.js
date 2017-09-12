import React, { Component, PropTypes } from 'react';
import { Button,
        Modal,
} from 'react-bootstrap';

class ModalDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.actionClose = this.actionClose.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  actionClose() {
    this.setState({ showModal: false });
    this.props.actionFunc();
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <span>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header className="modal-header-primary" closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.message}
          </Modal.Body>
          <Modal.Footer>
            {this.props.isConfirm ? (
              <div>
                <Button bsStyle="info" onClick={this.actionClose}>OK</Button>
                <Button bsStyle="danger" onClick={this.close}>Cancelar</Button>
              </div>
            ) :
              <Button bsStyle="info" onClick={this.actionClose}>OK</Button>}
          </Modal.Footer>

        </Modal>
      </span>
    );
  }


}

ModalDialog.propTypes = {
  isError: PropTypes.bool.isRequired,
  isConfirm: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionFunc: PropTypes.func,
  redirect: PropTypes.string,
};


export default ModalDialog;
