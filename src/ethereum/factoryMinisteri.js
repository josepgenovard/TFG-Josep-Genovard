import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0xF03F1C9071a6FEDfd45d68b60Bbc20E294c8Ed7F'
);

console.log(instance);

export default instance;