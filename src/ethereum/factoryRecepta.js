import web3 from './web3';

const instance = new web3.eth.Contract(
    './build/ReceptaABI.json',
    '../../contracts/TokenRecepta.sol'
);

export default instance;