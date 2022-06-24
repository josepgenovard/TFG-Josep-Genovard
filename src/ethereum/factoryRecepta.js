import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x713ace34cC45E25CDcE0470b3a4e903910d7305c'
);

console.log(instance);

export default instance;