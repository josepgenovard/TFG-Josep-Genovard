import web3 from './web3';

const instance = new web3.eth.Contract(
    './build/UsuariABI.json',
    '../../contracts/Usuari.sol'
);

export default instance;