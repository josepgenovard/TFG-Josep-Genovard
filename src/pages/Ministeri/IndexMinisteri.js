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

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!AIXÒ NO ESTÀ FET. S'HA DE GUARDAR LA VARIABLE SCDesplagats A UNA VARIABLE GLOBAL (QUE ES PUGUI ACCEDIR CADA PIC)
    let SCDesplagats = false;   // No és així que s'ha de fer

    if (SCDesplagats != true) {     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!AQUESTA VARIABLE SCDesplagats S'HA DE DECLARA A QUALQUE LLOC I CONSULTAR-SE COM TOCA (es podria guardar dins l'SC)

      const accounts = await web3.eth.getAccounts();
      console.log("Adreça: " + accounts[0] + " connectada.");
    
      // Es despleguen tots els contractes (les adreces són públiques, pel que no fa falta guardar aquestes.)
      let adressHospital, addressFarmacia, adressUsuari, addressMetge = factoryMinisteri.methods.desplegaTotsElsSC().call({from:accounts[0]});

      SCDesplagats = true;

    }
    
    

  };

  render() {
    return (
      <div>
        <h3>Gestiona els hosptials</h3>
        
        <Link to="/alta/hospitals">
            <Button
                content = "Crea un nou hospital"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/hospitals">
            <Button
                content = "Dona de baixa un hospital"
                icon = "remove user"
                primary = {true}
            />
        </Link>

        <h3>Gestiona els usuaris</h3>
        
        <Link to="/alta/usuaris">
            <Button
                content = "Crea un nou usuari"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/usuaris">
            <Button
                content = "Dona de baixa un usuari"
                icon = "remove user"
                primary = {true}
            />
        </Link>


        <h3>Gestiona les farmàcies</h3>
        
        <Link to="/alta/farmacies">
            <Button
                content = "Crea una nova farmàcia"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/farmacies">
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