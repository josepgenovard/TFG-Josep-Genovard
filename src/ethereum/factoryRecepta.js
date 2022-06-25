import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0xC22b9Ef6687a2c526c5506B6C8d5055f6772444E'
);

console.log(instance);

export default instance;