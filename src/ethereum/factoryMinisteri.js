import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

//const MinisteriFactory = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x957D680A7DECfdcA58549cC9070a58f669193893'
);

export default instance;