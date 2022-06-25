import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message, Form } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationUsuari from '../../ethereum/notificationUsuari';
import web3 from '../../ethereum/web3';


class FilesVisualitzaReceptes extends Component {
  state = {
    ids:'',
    estat:'',
    medicament:'',
    ium:'',
    metge:'',
    loading: false,
    errorMessage: '',
  };


  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Adreça: " + accounts[0] + " connectada.");
    
    const addresscontracteUsuaris = await factoryMinisteri.methods.getAUsuaris().call();
    const contracteUsuaris = await notificationUsuari(addresscontracteUsuaris);
    const idReceptes = await contracteUsuaris.methods.visualitzaIDsReceptes().call({from: accounts[0]});
    this.setState({ids: idReceptes});

    let aux1, aux2;
    for (let i = 0; i< idReceptes.length; i++) {
        
        aux1 = await contracteUsuaris.methods.estatRecepta(idReceptes[i]).call({from: accounts[0]});
        this.setState({ estat: [...this.state.estat, aux1] });

        aux2 = await contracteUsuaris.methods.visualitzaRecepta(idReceptes[i]).call({from: accounts[0]});
        this.setState({ metge: [...this.state.metge, aux2[0]], medicament: [...this.state.medicament, aux2[1]], ium: [...this.state.ium, aux2[2]] });

    }
  }

  render() {
    return (
      <Table.Row>
          <Table.Cell>{this.state.ids}</Table.Cell>
          <Table.Cell>{this.state.estat}</Table.Cell>
          <Table.Cell>{this.state.medicament}</Table.Cell>
          <Table.Cell>{this.state.ium}</Table.Cell>
          <Table.Cell>{this.state.metge}</Table.Cell>
          <Table.Cell>
              <Link to={"/"}> 
              <Button animated='vertical' color='blue'>
                  <Button.Content hidden>View</Button.Content>
                  <Button.Content visible>
                  <Icon name='eye' />
                  </Button.Content>
              </Button>
              </Link>
              <Message error header="ERROR" content={this.state.errorMessage} hidden={!this.state.errorMessage} />
          </Table.Cell>
      </Table.Row>
    );
  }
}

export default FilesVisualitzaReceptes;
