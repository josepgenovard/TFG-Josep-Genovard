import web3 from './web3';
import {MinisteriABI} from '.build/MinisteriABI.js';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

//const MinisteriFactory = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI,
    '0x60f9226Ad90BD3d51BDB9521F151B9a2D3d549B5'
);

export default instance;