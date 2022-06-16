pragma solidity >=0.5.0 <0.9.0;

import './Ministeri.sol';
import './Hospitals.sol';
import './TokenRecepta.sol';

// Contracte dels Hospitals
contract Metges {

    // --------------------------------------------------------- DECLACACIONS INICIALS ---------------------------------------------------------

    Hospitals private h;
    Recepta private rcp;

    // Constructor del contracte
    constructor (address _contracteHospitals, address _aRecepta) public {
        h = Hospitals(_contracteHospitals);
        rcp = Recepta(_aRecepta);
    }


    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només les adreces validades com a metge a l'SC dels hospitals podran execuar la funció
           modifier onlyByMetges(address _account)
    {
        require(
            h.estatMetge(_account),             
            "Nomes metges"
        );
        _;
    }

    
    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// GESTIÓ DE LES RECEPTES /////

    // Funció per crear una recepte de medicament
    function creaRecepta(address _addressUsuari, string memory _nomMedicament, string memory _ium, uint16 _anyCaducitat, uint8 _mesCaducitat, uint8 _diaCaducitat) public{// onlyByMetges(msg.sender){
        
        rcp.crearRecepta(_addressUsuari, msg.sender, _nomMedicament, _ium, _anyCaducitat, _mesCaducitat, _diaCaducitat);
        
    }

}