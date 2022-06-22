import web3 from './web3';
const FarmaciaABI = require('./build/FarmaciaABI.json');

export default (address) => {
    return new web3.eth.Contract(
        FarmaciaABI.abi,
        address
    );
}