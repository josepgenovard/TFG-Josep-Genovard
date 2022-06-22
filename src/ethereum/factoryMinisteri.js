import web3 from './web3';
import {MinisteriABI} from './build/MinisteriABI.js';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

//const MinisteriFactory = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI,
    '0xC1aC0E1C7c354c9a7fe85eEb9A49Fb498A6b827c'
);

export default instance;