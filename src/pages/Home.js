import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import web3 from '../ethereum/web3';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        compte : '',
        boolMinisteri: false,
        boolHospital: false,
        boolMetge: false,
        boolUsuari: false,
        boolFarmacia: false,
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };

    componentDidMount = async () => {
        
        const compteMinisteri = '0x5735cff62509A9bab97DF7c4c51D495564170639';
        const compteHospital = '0xdb3123BB5317e491e1cb051bF8Ac3F0C1Def1CC6';
        const compteMetge = '0xf8e827D246788105559187aC1E168706B68DEFa5';
        const compteUsuari = '0x8998021b33514FEdC0987c6C6e0acF00b20a5C35';
        const compteFarmacia = '0x5E35807490b1a5FAB608b3bb67583fDE4F7FFA2E';

        const accounts = await web3.eth.getAccounts();
        const compte = accounts[0];
        console.log("Adreça: " + compte + " connectada.");
        
        if(compte == compteMinisteri) {                // MINISTERI
            console.log("S'ha connectat el Ministeri.");
            this.setState({ boolMinisteri: true });
            

        } else if(compte == compteHospital) {          // HOSPITAL
            console.log("S'ha connectat l'Hospital.");
            this.setState({ boolHospital: true });

        } else if(compte == compteMetge) {             // METGE
            console.log("S'ha connectat el Metge.");
            this.setState({ boolMetge: true });

        } else if(compte == compteUsuari) {            // USUARI
            console.log("S'ha connectat l'Usuari.");
            this.setState({ boolUsuari: true });

        } else if(compte == compteFarmacia) {          // FARMÀCIA
            console.log("S'ha connectat la Farmàcia.");
            this.setState({ boolFarmacia: true });

        } else {                                            // UNA ALTRE ADREÇA
            console.log("El compte connectat no és de cap actor. En concret és " + compte);
            //document.write("És necessari que l'adreça seleccionada es correspongui amb la d'un actor.");

        }

        //this.render();  // TORNAM A CRIDAR EL RENDER.
    }
    
    render(){

        
        if(this.state.boolMinisteri) {                // MINISTERI
            console.log("Ministeri RENDER");
            return (
                <div>
                    <Redirect to='/Ministeri/IndexMinisteri'/>
                </div>
            );
            
        } else if(this.state.boolHospital) {          // HOSPITAL
            console.log("Hospital RENDER");
            return (
                <div>
                    <Redirect to='/Hospital/IndexHospital'/>
                </div>
            );

        } else if(this.state.boolMetge) {             // METGE
            console.log("Metge RENDER");
            return (
                <div>
                    <Redirect to='/Metge/IndexMetge'/>
                </div>
            );

        } else if(this.state.boolUsuari) {            // USUARI
            console.log("Usuari RENDER");
            return (
                <div>
                    <Redirect to='/Usuari/IndexUsuari'/>
                </div>
            );

        } else if(this.state.boolFarmacia) {          // FARMÀCIA
            console.log("Farmàcia RENDER");
            return (
                <div>
                    <Redirect to='/Farmacia/IndexFarmacia'/>
                </div>
            );

        } else {                                            // UNA ALTRE ADREÇA
            console.log("No hi ha res conectat, encara");
            return (
                <div>
                    <h1>Seleccionau un actor vàlid...</h1>
                </div>
            );
        }
        
    }
}


export default Home;



/* PROBLEMA AMB AQUESTA OPCIÓ. EL RETURN S'EXECUTA ABANS QUE LES ACCIONS PER DETECTAR L'ADREÇA I ES CONSIDERA QUE CAP ACTOR ESTÀ CONNECTAT
import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import web3 from '../ethereum/web3';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        compte : '',
        loadingPage: true,
        loading: false,
        errorMessage: ''
    };
    
    render(){

        let boolMinisteri, boolHospital, boolMetge, boolUsuari, boolFarmacia = false;
        
        const compteMinisteri = '0x5735cff62509A9bab97DF7c4c51D495564170639';
        const compteHospital = '0xdb3123BB5317e491e1cb051bF8Ac3F0C1Def1CC6';
        const compteMetge = '0xf8e827D246788105559187aC1E168706B68DEFa5';
        const compteUsuari = '0x8998021b33514FEdC0987c6C6e0acF00b20a5C35';
        const compteFarmacia = '0x5E35807490b1a5FAB608b3bb67583fDE4F7FFA2E';

        const accounts = await web3.eth.getAccounts();
        const compte = accounts[0];
        console.log("Adreça: " + compte + " connectada.");
        
        if(compte == compteMinisteri) {                // MINISTERI
            console.log("S'ha connectat el Ministeri.");
            boolMinisteri = true;
            

        } else if(compte == compteHospital) {          // HOSPITAL
            console.log("S'ha connectat l'Hospital.");
            boolHospital = true;

        } else if(compte == compteMetge) {             // METGE
            console.log("S'ha connectat el Metge.");
            boolMetge = true;

        } else if(compte == compteUsuari) {            // USUARI
            console.log("S'ha connectat l'Usuari.");
            boolUsuari = true;

        } else if(compte == compteFarmacia) {          // FARMÀCIA
            console.log("S'ha connectat la Farmàcia.");
            boolFarmacia = true;

        } else {                                            // UNA ALTRE ADREÇA
            console.log("El compte connectat no és de cap actor. En concret és " + compte);
            //document.write("És necessari que l'adreça seleccionada es correspongui amb la d'un actor.");

        }
        
        if(boolMinisteri) {                // MINISTERI
            console.log("S'ha connectat el Ministeri PROVA");
            return (
                <div>
                    <Link to='/Ministeri/IndexMinisteri'/>
                </div>
            );
            
        } else if(boolHospital) {          // HOSPITAL
            return (
                <div>
                    <Link to='/Ministeri/IndexMinisteri'/>
                </div>
            );

        } else if(boolMetge) {             // METGE
            return (
                <div>
                    <Link to='/Ministeri/IndexMinisteri'/>
                </div>
            );

        } else if(boolUsuari) {            // USUARI
            return (
                <div>
                    <Link to='/Ministeri/IndexMinisteri'/>
                </div>
            );

        } else if(boolFarmacia) {          // FARMÀCIA
            return (
                <div>
                    <Link to='/Ministeri/IndexMinisteri'/>
                </div>
            );

        } else {                                            // UNA ALTRE ADREÇA
            console.log("No hi ha res conectat");
            return (
                <div>
                    <h1>Seleccionau un actor vàlid...</h1>
                </div>
            );

        }
    }
}


export default Home;*/