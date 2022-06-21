import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import notificationFarmacia from '../../ethereum/notificationFarmacia';
import web3 from '../../ethereum/web3';

class IndexFarmacia extends Component {
  state = {
    account:'',
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
      const addresscontracteFarmacies = await factoryMinisteri.methods.aFarmacies();
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
        <h3>Gestiona receptes</h3>
        
        <Link to="/visualitza/recepta">
            <Button
                content = "Visualitza recepta"
                icon = "send"
                primary = {true}
            />
        </Link>

        <a onClick={() => this.enviaReceptes}>
            <Button
                content = "Envia totes les receptes al Ministeri"
                icon = "send"
                primary = {true}
            />
        </a>

        <h3>Visualitza receptes</h3>

      </div>
    );
  }
}

export default withRouter(IndexFarmacia);