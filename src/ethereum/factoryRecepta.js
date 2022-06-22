import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x7068b982e6EF1A135BDE5014FC981D6f8040086a'
);

export default instance;