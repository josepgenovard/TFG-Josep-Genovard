import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factoryUsuari from '../../ethereum/factoryUsuari';
import web3 from '../../ethereum/web3';
import FilesVisualitzaReceptes from '../../components/FilesVisualitzaReceptes';

class Home extends Component {
    state = {
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            let compte;
            web3.eth.getAccounts(function(err, accountList) {
                if(!err) {
                    console.log("Adreça: " + accountList[0] + " connectada.");
                    compte = accountList[0];
                }
            });
            
            const idReceptes = await factoryUsuari.methods.visualitzaIDsReceptes().call({from: compte});
            let estat, medicament, ium, metge;
            for (let i = 0; i< idReceptes.length; i++) {
                
                estat.pus+h = await factoryUsuari.methods.estatRecepta(idReceptes[i]).call({from: compte});

                (metge.push, medicament.push, ium.push) = await factoryUsuari.methods.visualitzaRecepta(idReceptes[i]).call({from: compte});

            }

        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderFilesVisualitzaReceptes() {
        return this.state.visualitzaIDsReceptes((idRecepta, index) => {
            return (
                <Table.Row>
                    <Table.Cell>{this.state.idRecepta}</Table.Cell>
                    <Table.Cell>{this.state.estat}</Table.Cell>
                    <Table.Cell>{this.props.usuari}</Table.Cell>
                    <Table.Cell>{this.state.nom}</Table.Cell>
                    <Table.Cell>{this.state.ium}</Table.Cell>
                    <Table.Cell>{this.state.metge}</Table.Cell>
                    <Table.Cell>
                        <Link to={"ON S'HA DE DIRIGIR???????????????????????????????????????????????"}> 
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
