import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class IndexMinisteri extends Component {
  state = {
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });


  };

  render() {
    return (
      <div>
        <h3>Gestiona els hosptials</h3>
        
        <Link to="/alta/hospitals">
            <Button
                content = "Crea un nou hospital"
                icon = "add circle"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/hospitals">
            <Button
                content = "Dona de baixa un hospital"
                icon = "remove circle"
                primary = {true}
            />
        </Link>

        <h3>Gestiona els usuaris</h3>
        
        <Link to="/alta/usuaris">
            <Button
                content = "Crea un nou usuari"
                icon = "add circle"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/usuaris">
            <Button
                content = "Dona de baixa un usuari"
                icon = "remove circle"
                primary = {true}
            />
        </Link>


        <h3>Gestiona les farmàcies</h3>
        
        <Link to="/alta/farmacies">
            <Button
                content = "Crea una nova farmàcia"
                icon = "add circle"
                primary = {true}
            />
        </Link>

        <Link to="/baixa/farmacies">
            <Button
                content = "Dona de baixa una farmàcia"
                icon = "remove circle"
                primary = {true}
            />
        </Link>

      </div>
    );
  }
}

export default withRouter(IndexMinisteri);