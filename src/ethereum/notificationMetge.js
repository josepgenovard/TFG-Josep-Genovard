import web3 from './web3';
const MetgeABI = require('./build/MetgeABI.json');

export default (address) => {
    return new web3.eth.Contract(
        MetgeABI.abi,
        address
    );
}