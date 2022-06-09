const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../src/ethereum/build/EDeliveryFactory.json');
const compiledDelivery = require('../src/ethereum/build/EDelivery.json');
const { experimentalAddHardhatNetworkMessageTraceHook } = require('hardhat/config');
const { ethers } = require('hardhat');

let factoryContract;
let deliveryContract;
let deliveryContractAddress;
let owner, address1, address2; 

const MESSAGE = "Hola, com va tot?";

// To prevent warning "MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added. Use emitter.setMaxListeners() to increase limit"
require('events').EventEmitter.defaultMaxListeners = 0;

beforeEach(async () => {
  
  //Contract deployment
  [owner, address1, address2] = await ethers.getSigners();

  const FactoryContract = await ethers.getContractFactory("EDeliveryFactory"); 
  const DeliveryContract = await ethers.getContractFactory('EDelivery')

  factoryContract = await FactoryContract.deploy();

  await factoryContract.connect(owner).createDelivery([address1.address, address2.address ], MESSAGE);

  const addresses = await factoryContract.connect(owner).getDeliveries();
  
  deliveryContract = DeliveryContract.attach(addresses[0]);

});

describe('Certified eDelivery Contract', () => {
  it('deploys a factory and a delivery', () => {
    assert.ok(factoryContract.address);
    assert.ok(deliveryContract.address);
  });

  it("message is correct", async function() {
    let message = await deliveryContract.connect(address1).message();
    assert.equal(message, MESSAGE);
  });
});
