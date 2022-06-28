import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x4DdbacDA4AdD382aBa4c2d9D370518b87f8eBC00'
);

console.log(instance);

export default instance;