import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x43a2A4D37BF5C22E46499355D1d479597738539d'
);

console.log(instance);

export default instance;