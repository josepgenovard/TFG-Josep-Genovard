import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Table, Input } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import factoryRecepta from '../../ethereum/factoryRecepta'; 
import notificationFarmacia from '../../ethereum/notificationFarmacia';
import web3 from '../../ethereum/web3';

class IndexFarmacia extends Component {
  state = {
    id:'',
    idImprimir:'',
    validesa:'',
    nomUsusari:'',
    nomMetge:'',
    nomMedicament:'',
    ium:'',
    account:'',
    visualitzacioDemana: false,
    addressContracte:'',
    contracteFarmacia:'',
    loading: false,
    errorMessage: '',
    errorMessageDos:''
  };

  componentDidMount = async () => {

    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Adreça: " + accounts[0] + " connectada.");
        
        const addresscontracteFarmacies = await factoryMinisteri.methods.getAFarmacies().call();
        const contracteFarm = await notificationFarmacia(addresscontracteFarmacies);
        this.setState({contracteFarmacia: contracteFarm, account: accounts[0], addressContracte: addresscontracteFarmacies});

    } finally {
    }
  }


  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    try {
      debugger;
      let dadesRecepta = await this.state.contracteFarmacia.methods.visualitzaRecepta(this.state.id).send({ from: this.state.account});
      
      this.setState({idImprimir: this.state.id, validesa: dadesRecepta[0], nomUsusari: dadesRecepta[1], nomMetge: dadesRecepta[2], nomMedicament: dadesRecepta[3], ium: dadesRecepta[4]});
  
      this.setState({visualitzacioDemana: true});
      
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }


  enviaReceptes = async event => {

    this.setState({ loading: true, errorMessageDos: '' });
    try {
      
      let aprovat = await factoryRecepta.methods.isApprovedForAll(this.state.account, this.state.addressContracte).call({ from: this.state.account });
      
      if(!aprovat) {
        // Es fa aprove per permetre al contracte de les farmàcies pugui transferir els tokens
      await factoryRecepta.methods.setApprovalForAll(this.state.addressContracte, true).send({ from: this.state.account });
      }
      
      // Es crida al contracte Farmàcies i s'executa la funció d'enviar receptes
      await this.state.contracteFarmacia.methods.enviaReceptesAlMinisteri().send({ from: this.state.account});
  
      alert('Receptes enviades!');
      
    } catch (err) {
      this.setState({ errorMessageDos: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };


  render() {
    do{
      if(this.state.visualitzacioDemana) {
        return (
          <div>
            <h1></h1>
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
    
            <Table fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Validesa</Table.HeaderCell>
                        <Table.HeaderCell>Nom Usuari</Table.HeaderCell>
                        <Table.HeaderCell>Nom Metge</Table.HeaderCell>
                        <Table.HeaderCell>Nom fàrmac</Table.HeaderCell>
                        <Table.HeaderCell>IUM</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{this.state.idImprimir}</Table.Cell>
                    <Table.Cell>{this.state.validesa}</Table.Cell>
                    <Table.Cell>{this.state.nomUsusari}</Table.Cell>
                    <Table.Cell>{this.state.nomMetge}</Table.Cell>
                    <Table.Cell>{this.state.nomMedicament}</Table.Cell>
                    <Table.Cell>{this.state.ium}</Table.Cell>
                  </Table.Row>
                </Table.Body>
            </Table>
    
    
            <h1></h1>
            
            <h3>Gestiona receptes</h3>
    
            <Form error={!!this.state.errorMessageDos}>
              <Message error header="ERROR" content={this.state.errorMessageDos} />
              <a onClick={() => this.enviaReceptes()}>
                  <Button
                      primary loading={this.state.loading}
                      content = "Envia totes les receptes al Ministeri"
                      icon = "send"
                      primary = {true}
                  />
              </a>
            </Form>
    
          </div>
        );
      } else {
        return (
          <div>
            <h1></h1>
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
    
    
            <h1></h1>
            
            <h3>Gestiona receptes</h3>
    
            <Form error={!!this.state.errorMessageDos}>
              <Message error header="ERROR" content={this.state.errorMessageDos} />
              <a onClick={() => this.enviaReceptes()}>
                  <Button
                      primary loading={this.state.loading}
                      content = "Envia totes les receptes al Ministeri"
                      icon = "send"
                      primary = {true}
                  />
              </a>
            </Form>
    
          </div>
        );
      }
    } while(!this.state.visualitzacioDemana);
    
    
  }
}

export default withRouter(IndexFarmacia);