import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import factoryFarmacia from '../../ethereum/factory/farmacia';
import web3 from '../../ethereum/web3';

class IndexFarmacia extends Component {
  state = {
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });


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

        <a onClick={enviaReceptes}>
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

function enviaReceptes(){
  try {
    let compte;
    web3.eth.getAccounts(function(err, accountList) {
      if(!err) {
          console.log("Adreça: " + accountList[0] + " connectada.");
          compte = accountList[0];
      }
    });
    
    // FER EL SEGÜENT APPROVE AL TOKEN: setApprovalForAll([SmartContractFarmacies], true)
    
    await factoryFarmacia.methods
        .enviaReceptesAlMinisteri()
        .send({ from: compte});

    alert('Receptes enviades!');
    // Refresh, using withRouter
    this.props.history.push('/');
  } catch (err) {
    this.setState({ errorMessage: err.message });
  } finally {
    this.setState({ loading: false });
  }
}

export default withRouter(IndexFarmacia);