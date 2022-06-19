import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class EnviaRecepta extends Component {
  state = {
    address: '',
    id: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
        const accounts = await web3.eth.getAccounts();
        
        // FER EL SEGÜENT APPROVE AL TOKEN: approve([SmartContractUsuaris], this.state.id)
        
        await factoryUsuari.methods
            .enviaReceptaAFarmacia(this.state.id, this.state.address)
            .send({ from: accounts[0] });          

        alert('Recepta enviada!');
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
        <h3>Envia recepta a una farmàcia</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          
          <Form.Field>
            <label>Id de la recepta</label>
            <Input
              value={this.state.id}
              onChange={event => this.setState({ id: event.target.value })}
            />
          </Form.Field>
          
          <Form.Field>
            <label>Adreça de la farmàcia</label>
            <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Envia
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(EnviaRecepta);
