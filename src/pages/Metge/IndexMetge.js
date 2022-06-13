import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class IndexMetge extends Component {
  state = {
    address: '',
    nom: '',
    ium: '',
    any: '',
    mes: '',
    dia: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .creaRecepta(this.state.address, this.state.nom, this.state.ium, this.state.any, this.state.mes, this.state.dia)
            .send({ from: accounts[0] });           

        alert('Recepta creada!');
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
        <h3>Crea una recepta</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Adreça de l'usuari</label>
            <Input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Nom del medicament</label>
            <Input
              value={this.state.nom}
              onChange={event => this.setState({ nom: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Identificador Únic del Medicament (IUM)</label>
            <Input
              value={this.state.ium}
              onChange={event => this.setState({ ium: event.target.value })}
            />
          </Form.Field>

          Indica la data de caducitat
          <Form.Field>
            <label>Dia</label>
            <Input
              value={this.state.dia}
              onChange={event => this.setState({ dia: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Mes</label>
            <Input
              value={this.state.mes}
              onChange={event => this.setState({ mes: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Any</label>
            <Input
              value={this.state.any}
              onChange={event => this.setState({ any: event.target.value })}
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

export default withRouter(IndexMetge);
