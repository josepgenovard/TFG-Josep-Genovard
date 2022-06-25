import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x16fb80a7930Bd5eAf0b7F6c88E7B33e62Fc2f507'
);

console.log(instance);

export default instance;