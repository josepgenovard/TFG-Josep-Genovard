import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';

class IndexHospital extends Component {
  state = {
    loading: false,
    errorMessage: ''
  };


  render() {
    return (
      <div>
        <h1></h1>
        <h3>Gestiona la plantilla</h3>
        
        <Link to="/Hospital/AltaMetges">
            <Button
                content = "Crea un nou metge"
                icon = "add user"
                primary = {true}
            />
        </Link>

        <Link to="/Hospital/BaixaMetges">
            <Button
                content = "Dona de baixa un metge"
                icon = "remove user"
                primary = {true}
            />
        </Link>

        <Link to="/visualitza/plantilla">
            <Button
                content = "Visualitza la plantilla"
                icon = "users"
                primary = {true}
            />
        </Link>

       
      </div>
    );
  }
}

export default withRouter(IndexHospital);