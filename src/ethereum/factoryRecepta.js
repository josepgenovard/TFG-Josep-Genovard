import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x76594E312fD622934B67de80aD57A677378172FA'
);

console.log(instance);

export default instance;