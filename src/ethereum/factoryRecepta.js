import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x696E0F9cff6e189c28a21cC819275B22e4Af6527'
);

export default instance;