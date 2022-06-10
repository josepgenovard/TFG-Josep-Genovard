import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class Home extends Component {
    state = {
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const compteMinisteri = 0x5735cff62509A9bab97DF7c4c51D495564170639;
            const compteHospital = 0xdb3123BB5317e491e1cb051bF8Ac3F0C1Def1CC6;
            const compteMetge = 0xf8e827D246788105559187aC1E168706B68DEFa5;
            const compteUsuari = 0x8998021b33514FEdC0987c6C6e0acF00b20a5C35;
            const compteFarmacia = 0x5E35807490b1a5FAB608b3bb67583fDE4F7FFA2E;

            if(accounts[0] == compteMinisteri) {                // MINISTERI
                console.log("S'ha connectat el Ministeri.");
                location.replace("/Ministeri/index.js")

            } else if(accounts[0] == compteHospital) {          // HOSPITAL
                console.log("S'ha connectat l'Hospital.");
                location.replace("/Hospital/index.js")

            } else if(accounts[0] == compteMetge) {             // METGE
                console.log("S'ha connectat el Metge.");
                location.replace("/Metge/index.js")

            } else if(accounts[0] == compteUsuari) {            // USUARI
                console.log("S'ha connectat l'Usuari.");
                location.replace("/Usuari/index.js")

            } else if(accounts[0] == compteFarmacia) {          // FARMÀCIA
                console.log("S'ha connectat la Farmàcia.");
                location.replace("/Farmacia/index.js")

            } else {                                            // UNA ALTRE ADDREÇA
                console.log("El compte connectat no és de cap actor.");
                document.write("És necessari que l'adreça seleccionada es correspongui amb la d'un actor.");

            }
        } finally {
            this.setState({ loadingPage: false })
        }
    } 
}


export default Home;