import web3 from './web3';
import {ReceptaABI} from '.build/ReceptaABI.js';

const instance = new web3.eth.Contract(
    ReceptaABI,
    '0x30c4D9024db5eB55D59fF7adD602E71ce9b777c3'
);

export default instance;