import web3 from './web3';
import {MetgeABI} from '.build/MetgeABI.js';

export default (address) => {
    return new web3.eth.Contract(
        MetgeABI,
        address
    );
}