import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factoryUsuari from '../../ethereum/factoryUsuari';
import web3 from '../../ethereum/web3';

class RebutjaRecepta extends Component {
  state = {
    id: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      let compte;
      web3.eth.getAccounts(function(err, accountList) {
        if(!err) {
            console.log("Adreça: " + accountList[0] + " connectada.");
            compte = accountList[0];
        }
      });

      await factoryUsuari.methods
          .rebutjaRecepta(this.state.id)
          .send({ from: compte });

      alert('Recepta rebutjada!');
      // Refresh, using withRouter
      this.props.history.push('/');

    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }

  };

  render() {
    return (
        <div>
        <Link to='/'>Torna enrera</Link>
        <h3>Rebutja recepta</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Identificador de la recepta</label>
            <Input
              value={this.state.id}
              onChange={event => this.setState({ id: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Rebutja
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(RebutjaRecepta);