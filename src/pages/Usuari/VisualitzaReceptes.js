import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import DeliveryRow from '../components/DeliveryRow';

class Home extends Component {
    state = {
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const senderDeliveriesCount = await factory.methods.getSenderDeliveriesCount(accounts[0]).call();
            const receiverDeliveriesCount = await factory.methods.getReceiverDeliveriesCount(accounts[0]).call();

            const senderDeliveries = await Promise.all(
                Array(parseInt(senderDeliveriesCount))
                  .fill()
                  .map((delivery, index) => {
                    return factory.methods.senderDeliveries(accounts[0], index).call();
                  })
              );

              const receiverDeliveries = await Promise.all(
                Array(parseInt(receiverDeliveriesCount))
                  .fill()
                  .map((delivery, index) => {
                    return factory.methods.receiverDeliveries(accounts[0], index).call();
                  })
              );

            this.setState({ 
                senderDeliveries: senderDeliveries, 
                receiverDeliveries: receiverDeliveries 
            });
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderFilesVisualitzaReceptes() {
        return this.method.visualitzaIDsReceptes((idRecepta, index) => {
            return (
                <DeliveryRow
                    key={index}
                    id={idRecepta}
                />
            );
        });
    }

    render() {
        // Loading
        if (this.state.loadingPage) return (
            <div>
                <Segment style={{ height: '80vh' }}>
                    <Dimmer active inverted>
                        <Loader inverted content='Loading...' />
                    </Dimmer>
                </Segment>
            </div>
        );
      
        // Done
        return (
            <div>
                <h3><Icon name='sign in alternate' circular />&nbsp;Received deliveries</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Estat</Table.HeaderCell>
                            <Table.HeaderCell>Adreça usuari</Table.HeaderCell>
                            <Table.HeaderCell>Nom fàrmac</Table.HeaderCell>
                            <Table.HeaderCell>IUM</Table.HeaderCell>
                            <Table.HeaderCell>Nom metge</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderFilesVisualitzaReceptes()}</Table.Body>
                </Table>
                
            </div>
        );
    }
}

export default Home;
