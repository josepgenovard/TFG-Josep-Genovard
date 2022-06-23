import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationUsuari from '../../ethereum/notificationUsuari';
import web3 from '../../ethereum/web3';

class VisualitzaReceptes extends Component {
    state = {
        loadingPage: true,
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
            const idReceptes = await contracteUsuaris.methods.visualitzaIDsReceptes().call({from: accounts[0]});
            
            let estat, medicament, ium, metge;
            for (let i = 0; i< idReceptes.length; i++) {
                
                estat.push(await contracteUsuaris.methods.estatRecepta(idReceptes[i]).call({from: accounts[0]}));

                let aux = await contracteUsuaris.methods.visualitzaRecepta(idReceptes[i]).call({from: accounts[0]});

                metge.push(aux[0]);
                medicament.push(aux[1]);
                ium.push(aux[2]);

            }

        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderFilesVisualitzaReceptes() {
        return (
            <Table.Row>
                <Table.Cell>{this.state.idRecepta}</Table.Cell>
                <Table.Cell>{this.state.estat}</Table.Cell>
                <Table.Cell>{this.props.usuari}</Table.Cell>
                <Table.Cell>{this.state.nom}</Table.Cell>
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
                <h1></h1>
                <Link to='/'>Torna enrera</Link>
                <h3><Icon name='list' circular />&nbsp;Receptes en propietat</h3>
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

export default VisualitzaReceptes;
