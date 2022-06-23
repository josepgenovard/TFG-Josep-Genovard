import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

//const MinisteriFactory = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0xcE00bBf3515337EEEa0be0920D0b792e48Eddf17'
);

export default instance;