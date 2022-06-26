import React, { Component, useState } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import notificationHospital from '../../ethereum/notificationHospital';
import web3 from '../../ethereum/web3';

class VisualitzaReceptes extends Component {
    state = {
        plantillaNum:'',
        plantilla:'',
        nomMetge:'',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {

        try {
            const accounts = await web3.eth.getAccounts();
            console.log("Adreça: " + accounts[0] + " connectada.");
            
            const addresscontracteHospital = await factoryMinisteri.methods.getAHospitals().call();
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

            const addresscontracteMetges = await factoryMinisteri.methods.getAMetges().call();
            let nomMet;
            for (let i = 0; i < this.state.plantilla.length; i++) {
                nomMet = await contracteHospital.methods.nomMetge(this.state.plantilla[i]).call({from: addresscontracteMetges});
                this.setState({ nomMetge: [...this.state.nomMetge, nomMet] });
            }
            

        } catch(err){
            this.setState({ errorMessage: err.message });
            console.log(err);
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderVisualitzaPlantilla() {
        let arrayPlantilla = [this.state.plantillaNum, this.state.plantilla, this.state.nomMetge];
        let arrayCanviat = [];

        //Canvi de files per columnes
        for(let i=0;i<this.state.plantillaNum.length;i++){
            arrayCanviat.push([])
            for(let j=0;j<arrayPlantilla.length;j++){
                arrayCanviat[i].push(arrayPlantilla[j][i])
            }
        }

        return arrayCanviat.map((arrayCanviat, index) => {
            return (
                <Table.Row>
                    <Table.Cell>{arrayCanviat[0]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[1]}</Table.Cell>
                    <Table.Cell>{arrayCanviat[2]}</Table.Cell>
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
                            <Table.HeaderCell>Nom del metge</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderVisualitzaPlantilla()}</Table.Body>
                </Table>
                
            </div>
        );
    }
}

export default VisualitzaReceptes;
