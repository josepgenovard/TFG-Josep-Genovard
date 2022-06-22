import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
//import Header from './components/Header';

import Home from './pages/Home';

import IndexMinisteri from './pages/Ministeri/IndexMinisteri';
import AltaFarmacies from './pages/Ministeri/AltaFarmacies';
import BaixaFarmacies from './pages/Ministeri/BaixaFarmacies';
import AltaHospitals from './pages/Ministeri/AltaHospitals';
import BaixaHospitals from './pages/Ministeri/BaixaHospitals';
import AltaUsuaris from './pages/Ministeri/AltaUsuaris';
import BaixaUsuaris from './pages/Ministeri/BaixaUsuaris';

import IndexHospital from './pages/Hospital/IndexHospital';
import AltaMetges from './pages/Hospital/AltaMetges';
import BaixaMetges from './pages/Hospital/BaixaMetges';
import VisualitzaPlantilla from './pages/Hospital/VisualitzaPlantilla';

import IndexFarmacia from './pages/Farmacia/IndexFarmacia';
import VisualitzaRecepta from './pages/Farmacia/VisualitzaRecepta';

import IndexMetge from './pages/Metge/IndexMetge';

import IndexUsuari from './pages/Usuari/IndexUsuari';
import EnviaRecepta from './pages/Usuari/EnviaRecepta';
import RebutjaRecepta from './pages/Usuari/RebutjaRecepta';
import VisualitzaReceptes from './pages/Usuari/VisualitzaReceptes';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    render() {
        return (
            <Container>
                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>

                        <Route exact path='/Ministeri' component={IndexMinisteri}/>
                        <Route exact path='/Ministeri' component={AltaFarmacies}/>
                        <Route exact path='/Ministeri' component={BaixaFarmacies}/>
                        <Route exact path='/Ministeri' component={AltaHospitals}/>
                        <Route exact path='/Ministeri' component={BaixaHospitals}/>
                        <Route exact path='/Ministeri' component={AltaUsuaris}/>
                        <Route exact path='/Ministeri' component={BaixaUsuaris}/>
                        
                        <Route exact path='/Hospital' component={IndexHospital}/>
                        <Route exact path='/Hospital' component={AltaMetges}/>
                        <Route exact path='/Hospital' component={BaixaMetges}/>

                        <Route exact path='/Farmacia' component={IndexFarmacia}/>

                        <Route exact path='/Metge' component={IndexMetge}/>

                        <Route exact path='/Usuari' component={IndexUsuari}/>
                        <Route exact path='/Usuari' component={EnviaRecepta}/>
                        <Route exact path='/Usuari' component={RebutjaRecepta}/>

                    </Switch>
                </main>
            </Container>
        );
    }
}

export default App;
