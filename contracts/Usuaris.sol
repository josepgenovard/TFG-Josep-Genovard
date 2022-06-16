pragma solidity >=0.5.0 <0.9.0;

import './Ministeri.sol';
import './TokenRecepta.sol';

// Contracte dels Hospitals
contract Usuaris {

    // --------------------------------------------------------- DECLACACIONS INICIALS ---------------------------------------------------------

    Ministeri private mi;
    Recepta private rcp;


    // Constructor del contracte
    constructor (address _contracteMinisteri, address _aRecepta) public {
        mi = Ministeri(_contracteMinisteri);
        rcp = Recepta(_aRecepta);
    }

    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només les adreces validades com a usuaris a l'SC del Ministeri podran execuar la funció
           modifier onlyByUsuaris(address _account)
    {
        require(
            mi.estatUsuari(_account),             
            "Nomes usuaris"
        );
        _;
    }
 
    
    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// GESTIÓ DE LES RECEPTES /////

    
    // Funció per enviar recepta a la farmàcia. NECESSARI HAVER FET APPROVE DES DE L'USUARI
    function enviaReceptaAFarmacia(uint _idRecepta, address _adFarmacia) public onlyByUsuaris(msg.sender){ //a l'SC recepta es comprova el propietari 
        
        rcp.enviaRecepta(_idRecepta, msg.sender, _adFarmacia);
        
    }

    // Funció per rebutjar una recepta
    function rebutjaRecepta(uint _idRecepta) public onlyByUsuaris(msg.sender){ //a l'SC recepta es comprova el propietari
        
        rcp.rebutjaRecepta(_idRecepta, msg.sender);
        
    }


    ///// VISUALITZACIÓ DETALLS RECEPTES ///// 

    // Saber estat recepta o volant
    function estatRecepta(uint _idRecepta) public view onlyByUsuaris(msg.sender) returns (string memory){ //a l'SC recepta es comprova el propietari

        return rcp.retornaEstatRecepta(_idRecepta);

    }
    
    // Funció per veure totes les receptes en estat "creada"
    function visualitzaRecepta(uint _idRecepta) public view onlyByUsuaris(msg.sender) returns (string memory nomMetge, string memory medicament, string memory ium){ //a l'SC recepta es comprova el propietari

        return rcp.retornaDadesRecepta(_idRecepta, msg.sender); 

    }

    // Visualitza els ids de totes les teves receptes
    function visualitzaIDsReceptes() public view onlyByUsuaris(msg.sender) returns (uint[] memory){ //a l'SC recepta es comprova el propietari

        return rcp.retornaIDsReceptes(msg.sender); 

    }

}