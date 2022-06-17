import web3 from './web3';

const instance = new web3.eth.Contract(
    './build/HospitalABI.json',
    '../../contracts/Hospital.sol'
);

export default instance;