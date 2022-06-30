import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0xB5456aA43148aC5ea2C1240252623F4a5d12990a'
);

console.log(instance);

export default instance;