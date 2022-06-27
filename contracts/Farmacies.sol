pragma solidity >=0.5.0 <0.9.0;

import './Ministeri.sol';
import './TokenRecepta.sol';

// Contracte dels Hospitals
contract Farmacies {

    // --------------------------------------------------------- DECLACACIONS INICIALS ---------------------------------------------------------
    
    Ministeri private mi;
    Recepta private rcp;

    address private adMinisteri;

    // Constructor del contracte
    constructor (address _contracteMinisteri, address _aRecepta) public {
        adMinisteri = _contracteMinisteri;
        mi = Ministeri(_contracteMinisteri);
        rcp = Recepta(_aRecepta);
    }



    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només les adreces validades com a farmàcies a l'SC del Ministeri podran execuar la funció
           modifier onlyByFarmaciesPropietaria(address _account)
    {
        require(
            mi.estatFarmacia(_account),             
            "Nomes farmacies"
        );      
        _;
    }
    
    
    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    
    ///// GESTIÓ DE LES RECEPTES /////

    // Funció per visual·litzar una recepta
    function visualitzaRecepta(uint _idRecepta) public view onlyByFarmaciesPropietaria(msg.sender) returns(string memory valida, string memory nomUsuari, string memory nomMetge, string memory medicament, string memory ium){
        
        // al contracte TokenRecepta es comprova que la farmàcia sigui la propietaria
        
        return rcp.visualitzaRecepta(_idRecepta, msg.sender);
        
    }


    // Funció per canviar l'estat d'una recepta
    function canviaEstatRecepta(uint _idRecepta) public onlyByFarmaciesPropietaria(msg.sender) {
        
        // al contracte TokenRecepta es comprova que la farmàcia sigui la propietaria
        
        rcp.canviaEstatRecepta(_idRecepta, msg.sender);
        
    }



    
    // Funció per enviar totes les receptes propietaries de la farmàcia al ministeri
    function enviaReceptesAlMinisteri() public onlyByFarmaciesPropietaria(msg.sender){
        
        rcp.enviaReceptesMinisteri(msg.sender);
        
    }


}