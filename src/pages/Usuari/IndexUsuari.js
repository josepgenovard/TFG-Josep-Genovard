import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';

class IndexUsuari extends Component {
  state = {
    loading: false,
    errorMessage: ''
  };


  render() {
    return (
      <div>
        <h1></h1>
        <h3>Gestiona les teves receptes</h3>
        
        <Link to="/Usuari/EnviaRecepta">
            <Button
                content = "Envia recepta a una farmàcia"
                icon = "send"
                primary = {true}
            />
        </Link>

        <Link to="/Usuari/RebutjaRecepta">
            <Button
                content = "Rebutja recepta"
                icon = "remove"
                primary = {true}
            />
        </Link>

        <h1></h1>

        <h3>Visualitza receptes</h3>
        
        <Link to="/Usuari/VisualitzaReceptes">
            <Button
                content = "Visualitza receptes"
                icon = "eye"
                primary = {true}
            />
        </Link>

      </div>
    );
  }
}

export default withRouter(IndexUsuari);