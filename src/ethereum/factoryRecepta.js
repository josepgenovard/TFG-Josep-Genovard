import web3 from './web3';
import {ReceptaABI} from './build/ReceptaABI.js';

const instance = new web3.eth.Contract(
    ReceptaABI,
    '0x3DED928143230a2B4Cb063d45ea1242014450df0'
);

export default instance;