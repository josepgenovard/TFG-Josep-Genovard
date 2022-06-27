import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Icon } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationHospital from '../../ethereum/notificationHospital';
import web3 from '../../ethereum/web3';

class BaixaMetges extends Component {
  state = {
    address: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Adreça: " + accounts[0] + " connectada.");

      const addresscontracteHospitals = await factoryMinisteri.methods.getAHospitals().call();
      let contracteHospital = await notificationHospital(addresscontracteHospitals);

      await contracteHospital.methods.baixaMetge(this.state.address).send({ from: accounts[0] });           

      alert('Metge donat de baixa!');
      window.location.reload();

    } catch (err) {
        this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }

  };

  render() {
    return (
      <div>
        <h1></h1>
        <Link to='/'>Torna enrere</Link>
        <h3><Icon name='remove user' circular />&nbsp;Dona de baixa un metge</h3>
        
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

export default withRouter(BaixaMetges);