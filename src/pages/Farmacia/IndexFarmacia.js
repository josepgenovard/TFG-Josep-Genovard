import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import factoryRecepta from '../../ethereum/factoryRecepta'; 
import notificationFarmacia from '../../ethereum/notificationFarmacia';
import web3 from '../../ethereum/web3';

class IndexFarmacia extends Component {
  state = {
    account:'',
    id:'',
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      

    } finally {
      this.setState({ loadingPage: false })
    }
  }


  enviaReceptes = async event => {

    this.setState({ loading: true, errorMessage: '' });
    try {
            
      // Es fa aprove per permetre al contracte de les farmàcies pugui transferir els tokens
      const addresscontracteFarmacies = await factoryMinisteri.methods.getAFarmacies();
      await factoryRecepta.methods.setApprovalForAll(addresscontracteFarmacies, true).send({ from: this.state.account });
      
      // Es crida al contracte Farmàcies i s'executa la funció d'enviar receptes
      const contracteFarmacia = notificationFarmacia(addresscontracteFarmacies);
      await contracteFarmacia.methods.enviaReceptesAlMinisteri().send({ from: this.state.account});
  
      alert('Receptes enviades!');
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };


  render() {
    return (
      <div>
        
        <h3>Visualitza una recepta</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Id de la recepta</label>
            <Input
              value={this.state.id}
              onChange={event => this.setState({ id: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button
                primary loading={this.state.loading}
                content = "Visualitza recepta"
                icon = "send"
                primary = {true}
            />
        </Form>



        
        <h3>Gestiona receptes</h3>
        

        <a onClick={() => this.enviaReceptes}>
            <Button
                content = "Envia totes les receptes al Ministeri"
                icon = "send"
                primary = {true}
            />
        </a>

      </div>
    );
  }
}

export default withRouter(IndexFarmacia);