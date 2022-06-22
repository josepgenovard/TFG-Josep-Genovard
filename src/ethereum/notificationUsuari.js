import web3 from './web3';
import {UsuariABI} from './build/UsuariABI.js';

export default (address) => {
    return new web3.eth.Contract(
        UsuariABI,
        address
    );
}