import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x372Ff50c08e285420Fa6Eba18C2c79723B11ba44'
);

console.log(instance);

export default instance;