import React, { Component, useState } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationHospital from '../../ethereum/notificationHospital';
import web3 from '../../ethereum/web3';

class VisualitzaReceptes extends Component {
    state = {
        numMetges:'',
        plantillaNum:'',
        plantilla:'',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {

        try {
            debugger;
            const accounts = await web3.eth.getAccounts();
            console.log("Adreça: " + accounts[0] + " connectada.");
            
            const addresscontracteHospital = await factoryMinisteri.methods.getAUsuaris().call();
            const contracteHospital = await notificationHospital(addresscontracteHospital);
            let totalReturn = await contracteHospital.methods.visualitzaPlantilla().call({from: accounts[0]});

            let numDelMetge = 1;
            for (let i = 0; i < totalReturn.length; i++) {
                if (totalReturn[i] != 0) {
                    this.setState({ plantilla: [...this.state.plantilla, totalReturn[i]] });
                    this.setState({ plantillaNum: [...this.state.plantillaNum, numDelMetge] });
                    numDelMetge++;
                }
            }

        } catch(err){
            this.setState({ errorMessage: err.message });
            console.log(err);
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderVisualitzaPlantilla() {
        return this.state.plantillaNum.map(() => {
            return (
                <Table.Row>
                    <Table.Cell>{this.state.plantillaNum}</Table.Cell>
                    <Table.Cell>{this.state.plantilla}</Table.Cell>
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
                <Link to='/'>Torna enrera</Link>
                <h3><Icon name='list' circular />&nbsp;Receptes en propietat</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Num del metge</Table.HeaderCell>
                            <Table.HeaderCell>Adreça</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderVisualitzaPlantilla()}</Table.Body>
                </Table>
                
            </div>
        );
    }
}

export default VisualitzaReceptes;
