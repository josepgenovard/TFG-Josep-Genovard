import web3 from './web3';
const MinisteriABI = require('./build/MinisteriABI.json');

const instance = new web3.eth.Contract(
    MinisteriABI.abi,
    '0x8d301A816e21D04b6CC1D812A2af7cda2bd3fB51'
);

console.log("Contracte Ministeri:" + instance);

export default instance;