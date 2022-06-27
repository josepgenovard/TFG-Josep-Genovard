import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Button, Message, Input, Icon } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import factoryRecepta from '../../ethereum/factoryRecepta'; 
import notificationUsuari from '../../ethereum/notificationUsuari';
import web3 from '../../ethereum/web3';

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
      console.log("Adreça: " + accounts[0] + " connectada.");
        
      // Es fa aprove per permetre al contracte dels usuaris pugui transferir els tokens
      const addresscontracteUsuaris = await factoryMinisteri.methods.getAUsuaris().call();
      await factoryRecepta.methods.approve(addresscontracteUsuaris, this.state.id).send({ from: accounts[0] });
      
      const contracteUsuaris = await notificationUsuari(addresscontracteUsuaris);
      await contracteUsuaris.methods.enviaReceptaAFarmacia(this.state.id, this.state.address).send({ from: accounts[0] });          

      alert('Recepta enviada!');
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
        <h3><Icon name='send' circular />&nbsp;Envia recepta a una farmàcia</h3>
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
