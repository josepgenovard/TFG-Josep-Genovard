import React, { Component, useState } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationUsuari from '../../ethereum/notificationUsuari';
import web3 from '../../ethereum/web3';

class VisualitzaReceptes extends Component {
    state = {
        ids:'',
        estat:'',
        medicament:'',
        ium:'',
        metge:'',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {

        try {
            const accounts = await web3.eth.getAccounts();
            console.log("Adreça: " + accounts[0] + " connectada.");
            
            const addresscontracteUsuaris = await factoryMinisteri.methods.getAUsuaris().call();
            const contracteUsuaris = await notificationUsuari(addresscontracteUsuaris);
            let idReceptes = await contracteUsuaris.methods.visualitzaIDsReceptes().call({from: accounts[0]});

            // Si hi ha receptes enviades o eliminades les llevam de la llista (apareixen amb id '0')
            for (let i = 0; i < idReceptes.length; i++) {
                if (idReceptes[i] != 0) {
                    this.setState({ ids: [...this.state.ids, idReceptes[i]] });
                }
            }


            let aux1, aux2;
            for (let i = 0; i< idReceptes.length; i++) {

                if(idReceptes[i] != 0) {
                    aux1 = await contracteUsuaris.methods.estatRecepta(idReceptes[i]).call({from: accounts[0]});
                    this.setState({ estat: [...this.state.estat, aux1] });

                    aux2 = await contracteUsuaris.methods.visualitzaRecepta(idReceptes[i]).call({from: accounts[0]});
                    this.setState({ metge: [...this.state.metge, aux2[0]], medicament: [...this.state.medicament, aux2[1]], ium: [...this.state.ium, aux2[2]] });
                }
                
            }

        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderFilesVisualitzaReceptes() {
        
        let idRecepta = [this.state.ids, this.state.estat, this.state.medicament, this.state.ium, this.state.metge];
        let arrayCanviat = [];
        //Canvi de files per columnes
        for(let i=0;i<this.state.ids.length;i++){
            arrayCanviat.push([])
            for(let j=0;j<idRecepta.length;j++){
                arrayCanviat[i].push(idRecepta[j][i])
            }
        }

        return arrayCanviat.map((arrayCanviat, index) => {
            return (
                <Table.Row>
                    <Table.Cell>{arrayCanviat[0]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[1]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[2]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[3]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[4]}</Table.Cell>
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
                <h1></h1>
                <Link to='/'>Torna enrere</Link>
                <h3><Icon name='list' circular />&nbsp;Receptes en propietat</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Estat</Table.HeaderCell>
                            <Table.HeaderCell>Nom fàrmac</Table.HeaderCell>
                            <Table.HeaderCell>IUM</Table.HeaderCell>
                            <Table.HeaderCell>Nom metge</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderFilesVisualitzaReceptes()}</Table.Body>
                </Table>
                
            </div>
        );
    }
}

export default VisualitzaReceptes;
