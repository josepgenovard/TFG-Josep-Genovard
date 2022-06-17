import web3 from './web3';

const instance = new web3.eth.Contract(
    './build/FarmaciaABI.json',
    '../../contracts/Farmacia.sol'
);

export default instance;