import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x3A1dee4Ca5184636F772c72921C937AAb2b3c447'
);

console.log("Contracte Recepta:" + instance);

export default instance;