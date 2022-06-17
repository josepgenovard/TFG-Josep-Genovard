import web3 from './web3';

const instance = new web3.eth.Contract(
    './build/MetgeABI.json',
    '../../contracts/Metge.sol'
);

export default instance;