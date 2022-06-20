import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri';
import web3 from '../../ethereum/web3';

class BaixaHospitals extends Component {
  state = {
    address: '',
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

      await factoryMinisteri.methods
          .baixaHospital(this.state.address)      // COM S'ESCRIU LA FUNCIÓ?
          .send({ from: compte });           // SEGUR QUE ÉS ACCOUNT[0]??????????

      alert('Hospital donat de baixa!');
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
        <h3>Dona de baixa un hospital</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Adreça</label>
            <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
          Dona de baixa
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(BaixaHospitals);
