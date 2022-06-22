import web3 from './web3';
import {FarmaciaABI} from './build/FarmaciaABI.js';

export default (address) => {
    return new web3.eth.Contract(
        FarmaciaABI,
        address
    );
}