import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import factoryMinisteri from '../../ethereum/factoryMinisteri'; 
import web3 from '../../ethereum/web3';

class IndexMinisteri extends Component {
  state = {
    loading: false,
    errorMessage: ''
  };

  componentDidMount = async () => {

    this.setState({ loading: true, errorMessage: '' });

    const accounts = await web3.eth.getAccounts();
    console.log("Adreça: " + accounts[0] + " connectada.");

    // Només s'ha dexecutar una vegada, quan contractesDesplegats sigui false
    let contractesDesplegats = await factoryMinisteri.methods.getContractesDesplegats().call({from: accounts[0]});
    if (!contractesDesplegats) {

      // Es despleguen tots els contractes (les adreces són públiques, pel que no fa falta guardar aquestes.)
      let adressHospital, addressFarmacia, adressUsuari, addressMetge = factoryMinisteri.methods.desplegaTotsElsSC().call({from:accounts[0]});
      console.log("Desplagament de contractes");

    } else {
      console.log("Contractes ja desplegats");
    }
    
  };

  render() {
    return (
      <div>
        <h1></h1>
        <h3>Gestiona els hosptials</h3>
        
        <Link to="/Ministeri/AltaHospitals">
            <Button
                content = "Crea un nou hospital"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/Ministeri/BaixaHospitals">
            <Button
                content = "Dona de baixa un hospital"
                icon = "remove user"
                primary = {true}
            />
        </Link>

        <h1></h1>

        <h3>Gestiona els usuaris</h3>
        
        <Link to="/Ministeri/AltaUsuaris">
            <Button
                content = "Crea un nou usuari"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/Ministeri/BaixaUsuaris">
            <Button
                content = "Dona de baixa un usuari"
                icon = "remove user"
                primary = {true}
            />
        </Link>

        <h1></h1>

        <h3>Gestiona les farmàcies</h3>
        
        <Link to="/Ministeri/AltaFarmacies">
            <Button
                content = "Crea una nova farmàcia"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/Ministeri/BaixaFarmacies">
            <Button
                content = "Dona de baixa una farmàcia"
                icon = "remove user"
                primary = {true}
            />
        </Link>

      </div>
    );
  }
}

export default withRouter(IndexMinisteri);