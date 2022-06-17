import web3 from './web3';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

//const MinisteriFactory = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    './build/MinisteriABI.json',
    '../../contracts/Ministeri.sol'
);

export default instance;