import web3 from './web3';
const HospitalABI = require('./build/HospitalABI.json');

export default (address) => {
    return new web3.eth.Contract(
        HospitalABI.abi,
        address
    );
}