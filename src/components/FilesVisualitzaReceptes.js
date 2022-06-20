import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Icon, Message, Form } from 'semantic-ui-react';
import notification from '../ethereum/notification';

class FilesVisualitzaReceptes extends Component {
  state = {
    idRecepta: '',
    estat: '',
    nom: '',
    ium: '',
    metge: '',
    loading: false,
    errorMessage: '',
  };

  componentDidMount = async () => {

    // COM SE LI PASSA EL COMPTE??

    let idRecepta = await usuariContract.methods.visualitzaIDsReceptes().call({from: XXXXXXXXXX});
    let estat, nom, ium, metge;


    for (let i = 0; i< idRecepta.length; i++) {
      
      estat.push = await usuariContract.methods.estatRecepta(idRecepta[i]).call({from: usuari});

      (metge.push, medicament.push, ium.push) = await usuariContract.methods.visualitzaRecepta(idRecepta[i]).call({from: usuari});

    }
    
    

    this.setState({ 
    idRecepta: idRecepta,
    estat: estat,
    nom: nom,
    ium: ium,
    metge: metge
    });
  }

  onView = async () => {
    /*const campaign = Campaign(this.props.address);

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });*/
  };

  onAccept = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });
    
    try {
      // Refresh
      alert('Delivery accepted!');
      this.setState({ state: 'accepted' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };

  onFinish = async (contractAddress) => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      // Refresh
      alert('Delivery finished!');
      this.setState({ state: 'finished' });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
        this.setState({ loading: false });
    }
  };

  render() {
      return (
          <Table.Row>
              <Table.Cell>{this.state.idRecepta}</Table.Cell>
              <Table.Cell>{this.state.estat}</Table.Cell>
              <Table.Cell>{this.props.usuari}</Table.Cell>
              <Table.Cell>{this.state.nom}</Table.Cell>
              <Table.Cell>{this.state.ium}</Table.Cell>
              <Table.Cell>{this.state.metge}</Table.Cell>
              <Table.Cell>
                {
                  this.props.sent ? (
                    <Button animated='vertical' color='blue' onClick={() => this.onFinish(this.props.delivery)} disabled={this.state.state!=='accepted'} loading={this.state.loading}>
                      <Button.Content hidden>Finish</Button.Content>
                      <Button.Content visible>
                        <Icon name='send' />
                      </Button.Content>
                    </Button>
                  ) : (
                    <Button animated='vertical' color='blue' onClick={() => this.onAccept(this.props.delivery)} disabled={this.state.state!=='created'} loading={this.state.loading}>
                      <Button.Content hidden>Accept</Button.Content>
                      <Button.Content visible>
                        <Icon name='check' />
                      </Button.Content>
                  </Button>
                  )
                }
                <Link to={"/deliveries/"+this.props.delivery}>
                  <Button animated='vertical' color='blue' onClick={this.onView}>
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
