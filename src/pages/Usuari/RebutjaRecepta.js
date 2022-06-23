import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Icon } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationUsuari from '../../ethereum/notificationUsuari';
import web3 from '../../ethereum/web3';

class RebutjaRecepta extends Component {
  state = {
    id: '',
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Adreça: " + accounts[0] + " connectada.");

      const addresscontracteUsuaris = await factoryMinisteri.methods.getAUsuaris();
      const contracteUsuaris = notificationUsuari(addresscontracteUsuaris);
      await contracteUsuaris.methods.rebutjaRecepta(this.state.id).send({ from: accounts[0] });

      alert('Recepta rebutjada!');

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
        <Link to='/'>Torna enrera</Link>
        <h3><Icon name='remove' circular />&nbsp;Rebutja recepta</h3>

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