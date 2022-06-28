import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0xBE8B35d779db38d107B82abb7423Bf40893Ef84A'
);

console.log(instance);

export default instance;