import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Icon, Form, Button, Message, Input } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class IndexUsuari extends Component {
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
        <h3>Gestiona les teves receptes</h3>
        
        <Link to="/envia/recepta">
            <Button
                content = "Envia recepta a una farmàcia"
                icon = "send"
                primary = {true}
            />
        </Link>

        <Link to="/rebutja/recepta">
            <Button
                content = "Rebutja recepta"
                icon = "remove"
                primary = {true}
            />
        </Link>

        <h3>Visualitza receptes</h3>
        
        <Link to="/visualitza/receptes">
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