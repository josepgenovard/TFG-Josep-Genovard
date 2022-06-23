import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0xc94439b1518AFE01eeccBD353af397e367F7be49'
);

export default instance;