import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri';
import web3 from '../../ethereum/web3';

class BaixaFarmacies extends Component {
  state = {
    address: '',
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Adreça: " + accounts[0] + " connectada.");

      await factoryMinisteri.methods.baixaFarmacia(this.state.address).send({ from: accounts[0] });

      alert('Farmàcia donada de baixa!');
      
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
        <h3>Dona de baixa una farmàcia</h3>
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

export default withRouter(BaixaFarmacies);