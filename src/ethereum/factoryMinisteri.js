import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x957D680A7DECfdcA58549cC9070a58f669193893'
);

console.log(instance);

export default instance;