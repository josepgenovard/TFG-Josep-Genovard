import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factoryHospital from '../../ethereum/factoryHospital';
import web3 from '../../ethereum/web3';

class AltaMetges extends Component {
  state = {
    address: '',
    nom: '',
    numcolegiat: '',
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

        await factoryHospital.methods
            .creaMetge(this.state.address, this.state.nom, this.state.numcolegiat)
            .send({ from: compte });           

        alert('Metge creat!');
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
        <h3>Crea un nou metge</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Adreça</label>
            <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Nom</label>
            <Input
              value={this.state.nom}
              onChange={event => this.setState({ nom: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Numero de Col·legiat</label>
            <Input
              value={this.state.numcolegiat}
              onChange={event => this.setState({ numcolegiat: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Crea
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(AltaMetges);
