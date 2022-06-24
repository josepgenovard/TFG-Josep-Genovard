import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x1dc4FAEb5d5505e4b2154882A228BBA78BF1C2C2'
);

console.log(instance);

export default instance;