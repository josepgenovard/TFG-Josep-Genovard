import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x003eC22145Cc5c034F37896f3dDACBf88142864b'
);

console.log(instance);

export default instance;