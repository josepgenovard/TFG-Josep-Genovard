import web3 from './web3';
const UsuariABI = require('./build/UsuariABI.json');

export default (address) => {
    return new web3.eth.Contract(
        UsuariABI.abi,
        address
    );
}