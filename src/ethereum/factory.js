import web3 from './web3';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

/*const DeliveryFactory = require('./build/EDeliveryFactory.json');     ORIGINAL!!!

const instance = new web3.eth.Contract(
    DeliveryFactory.abi,
    DeliveryFactory.address
);*/

const MinisteriFactory = require('./build/MinisteriABI.json');          // Copiar aferrar de l'arxiu ABI del remix. ESTÀ BÉ?

const instance = new web3.eth.Contract(
    MinisteriFactory.abi,
    MinisteriFactory.address
);

export default instance;