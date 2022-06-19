import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import web3 from '../ethereum/web3';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        account : 0x5735cff62509A9bab97DF7c4c51D495564170639,
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };


    render() {
        try {

            web3.eth.getAccounts(function(err, accountList) {
                if(!err) {
                    console.log("Adreça: " + accountList[0] + " connectada.");
                    //this.renderCanviaPagina(accountList[0]);

                    const compteMinisteri = 0x5735cff62509A9bab97DF7c4c51D495564170639;
                    const compteHospital = 0xdb3123BB5317e491e1cb051bF8Ac3F0C1Def1CC6;
                    const compteMetge = 0xf8e827D246788105559187aC1E168706B68DEFa5;
                    const compteUsuari = 0x8998021b33514FEdC0987c6C6e0acF00b20a5C35;
                    const compteFarmacia = 0x5E35807490b1a5FAB608b3bb67583fDE4F7FFA2E;

                    if(accountList[0] == compteMinisteri) {                // MINISTERI
                        console.log("S'ha connectat el Ministeri.");
                        //window.location = './Ministeri/IndexMinisteri';
                        return (
                            <Redirect to='/ministeri/index/ministeri.js'/>
                        );
                        

                    } else if(accountList[0] == compteHospital) {          // HOSPITAL
                        console.log("S'ha connectat l'Hospital.");
                        window.location = "./Hospital/IndexHospital.js";

                    } else if(accountList[0] == compteMetge) {             // METGE
                        console.log("S'ha connectat el Metge.");
                        window.location = "./Metge/IndexMetge.js";

                    } else if(accountList[0] == compteUsuari) {            // USUARI
                        console.log("S'ha connectat l'Usuari.");
                        window.location = "./Usuari/IndexUsuari.js";

                    } else if(accountList[0] == compteFarmacia) {          // FARMÀCIA
                        console.log("S'ha connectat la Farmàcia.");
                        window.location = "./Farmacia/IndexFarmacia.js";

                    } else {                                            // UNA ALTRE ADREÇA
                        console.log("El compte connectat no és de cap actor. En concret és " + accountList[0]);
                        document.write("És necessari que l'adreça seleccionada es correspongui amb la d'un actor.");

                    }
                }
            });
            

        } catch{
            this.setState({ loadingPage: false })
            
        }
        
        return (
            <div>
                <h1>Preparant la teva pàgina</h1>
            </div>
        );
    }
}


export default Home;