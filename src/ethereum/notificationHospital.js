import web3 from './web3';
import {HospitalABI} from '.build/HospitalABI.js';

export default (address) => {
    return new web3.eth.Contract(
        HospitalABI,
        address
    );
}