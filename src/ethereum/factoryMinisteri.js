import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x1A69bf15913B57af8A9f2C94eA5dF0344D6D2818'
);

console.log(instance);

export default instance;