let chai = require("chai");
const { ethers } = require("hardhat");
const expect = require('chai').expect;

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const MinisteriFactory = require('../src/ethereum/build/MinisteriABI.json');
const ReceptaFactory = require('../src/ethereum/build/ReceptaABI.json');

describe("Funcions", function() {

  let tokenSC, ministeriSC, hospitalSC, metgeSC, usuariSC, farmaciaSC, dateTimeSC;
  const ministeri = 0x5735cff62509A9bab97DF7c4c51D495564170639;
  let hospital, hospital2, metge, farmacia, usuari;
  let user1SCaddr, user2SCaddr;
  let user, lab, user2_Inst;
  let pubKey1, privKey1;
  let pubKey1New;
  let pubKey2;

  it("Desplega DateTime", async function () {
    const DateTime = await ethers.getContractFactory('DateTime');
    dateTimeSC = await DateTime.deploy();
    await dateTimeSC.deployed(); 

    expect(dateTimeSC.address).to.not.be.undefined;
  });
  
  it("Address asignment", async function(){
    [hospital, hospital2, metge, farmacia, usuari] = await ethers.getSigners();
  })

  it("Desplega TokenRecepta smart contract", async function () {
    const TokenRecepta = await ethers.getContractFactory('Recepta', {
      libraries: {
        DateTime: dateTimeSC.address,
      },
    });
    tokenSC = await TokenRecepta.deploy();
    await tokenSC.deployed(); 

    expect(tokenSC.address).to.not.be.undefined;
  });

  it("Desplega Ministeri smart contract", async function () {
    const Ministeri = await ethers.getContractFactory('Ministeri');
    ministeriSC = await Ministeri.deploy(tokenSC.address);
    await ministeriSC.deployed(); 

    expect(ministeriSC.address).to.not.be.undefined;
  });

  it("Desplega altres smart contracts", async function () {

    let adressHospital, addressFarmacia, adressUsuari, addressMetge = ministeriSC.desplegaTotsElsSC();
    
    // Hospital
    const hospitalsAddress = await ministeriSC.getAHospitals();
    const Hospital = await ethers.getContractFactory('Hospitals');
    hospitalSC = Hospital.attach(hospitalsAddress);

    // Metge
    const metgesAddress = await ministeriSC.getAMetges();
    const Metge = await ethers.getContractFactory('Metges');
    metgeSC = Metge.attach(metgesAddress);

    // Usuari
    const usuarisAddress = await ministeriSC.getAUsuaris();
    const Usuari = await ethers.getContractFactory('Usuaris');
    usuariSC = Usuari.attach(usuarisAddress);

    // Farmàcia
    const farmaciessAddress = await ministeriSC.getAFarmacies();
    const Farmacia = await ethers.getContractFactory('Farmacies');
    farmaciaSC = Farmacia.attach(farmaciessAddress);


    expect(adressHospital || addressFarmacia || adressUsuari || addressMetge).to.not.be.undefined;
  });

  it("Nou hospital", async function (){
    const nomHosp = 'Hospital de Maria';
    
    await ministeriSC.creaHospital(hospital.address, nomHosp);
    
  })

  it("Nou hospital", async function (){
    const nomHosp = 'Hospital de Maria de la Salut';
    
    await ministeriSC.creaHospital(hospital2.address, nomHosp);
    
  })

  it("Elimina hospital", async function (){
    
    await ministeriSC.baixaHospital(hospital2.address);
    
  })

  it("Nou usuari", async function (){
    const nomUs = 'Maria del Mar Genovard Oliver';
    
    await ministeriSC.creaUsuari(usuari.address, nomUs);
    
  })

  it("Nova farmacia", async function (){
    const nomFarm = 'Farmàcia Quintana';
    
    await ministeriSC.creaFarmacia(farmacia.address, nomFarm);
    
  })

  it("Nou metge", async function (){
    const nomMetge = 'Pedro Oliver Auba';
    const numCol = 123456789;

    await hospitalSC.creaMetge(metge.address, nomMetge, numCol);    
  })

  it("Nova recepta", async function (){
    const nomMedicament = 'Ibuprofeno 600 g';
    const ium = '1234567890123';
    const any = 2022;
    const mes = 6;
    const dia = 20;

    await metgeSC.connect(metge).creaRecepta(usuari.address, nomMedicament, ium, any, mes, dia);    
  })  

  it("Rebutja recepta", async function (){
    const id = 1;

    await usuariSC.connect(usuari).rebutjaRecepta(id);
    
  })

  for (let i = 2; i < 4; i++) { // Dues receptes caducades
    it("Nova recepta", async function (){
      const nomMedicament = 'Ibuprofeno 600 g';
      const ium = '1234567890123';
      const any = 2022;
      const mes = 6;
      const dia = 20;
  
      await metgeSC.connect(metge).creaRecepta(usuari.address, nomMedicament, ium, any, mes, dia);    
    })
  }

  for (let i = 4; i < 12; i++) { // Vuit receptes no caducades
    it("Nova recepta", async function (){
      const nomMedicament = 'Ibuprofeno 600 g';
      const ium = '1234567890123';
      const any = 2022;
      const mes = 7;
      const dia = 20;
  
      await metgeSC.connect(metge).creaRecepta(usuari.address, nomMedicament, ium, any, mes, dia);    
    })
  }

  for (let i = 2; i < 12; i++){ // S'envien les 10 receptes no rebutjades
    it("Envia recepta a farmacia", async function (){
      
      await tokenSC.connect(usuari).approve(usuariSC.address, i);
      await usuariSC.connect(usuari).enviaReceptaAFarmacia(i, farmacia.address);
      
    })
  }
  
  for (let i = 2; i < 12; i++){ // Es tramiten les 10 receptes
    it("Tramita recepta", async function (){
      
      await farmaciaSC.connect(farmacia).canviaEstatRecepta(i);
      
    })
  }

  it("Envia receptes al Ministeri", async function (){
    
    await tokenSC.connect(farmacia).setApprovalForAll(farmaciaSC.address, true);
    await farmaciaSC.connect(farmacia).enviaReceptesAlMinisteri();
    
  })
  
})