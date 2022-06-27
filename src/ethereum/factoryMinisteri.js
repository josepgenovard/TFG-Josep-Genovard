import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x96bf654e3655Ec1bbF460D95eF148fbb66Aa279A'
);

console.log(instance);

export default instance;