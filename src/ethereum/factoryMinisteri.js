import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x6e870eb41fA27aEd859CFf4Bfd52f23b20DBb8c2'
);

console.log(instance);

export default instance;