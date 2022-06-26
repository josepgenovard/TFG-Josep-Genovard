import web3 from './web3';
const ReceptaABI = require('./build/ReceptaABI.json');

const instance = new web3.eth.Contract(
    ReceptaABI.abi,
    '0x88dFc5D6d00036C0254Fa5AE9d86061c2ff0Ab17'
);

console.log(instance);

export default instance;