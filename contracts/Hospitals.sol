pragma solidity >=0.5.0 <0.9.0;

import './Ministeri.sol';

// Contracte dels Hospitals
contract Hospitals {

    // --------------------------------------------------------- DECLACACIONS INICIALS ---------------------------------------------------------

    Ministeri private mi;

    enum estatActor {alta, baixa}
    address private aMinisteri;
    address private aMetges;
    address private aRecepta;
    

    // Constructor del contracte
    constructor (address _contracteMinisteri) public {
        
        mi = Ministeri(_contracteMinisteri);
        aMinisteri = _contracteMinisteri;

    }

    // Estructura dels Metges
        struct Metge 
    {
        address aMetge;
        estatActor estat;
        string nom;
        uint numColegiat;
        address aHospital;
    }

    // Estructura de la plantilla de cada hospital
        struct Plantilla
    {
        address[] plantilla;
    }
    
    // Mapping per obtenir un metge amb la seva adreça
    mapping(address => Metge) private MetgesMap;

    // Mapping per obtenir una plantilla amb l'adreça de l'hospital
    mapping(address => Plantilla) private PlantillaMap;

    // Mapping per saber la posició d'un metge dins de l'array de la plantilla
    mapping(address => uint) private PosicioArrayaMap;



    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només les adreces validades com a hospitals a l'SC del Ministeri podran execuar la funció
           modifier onlyByHospitals(address _account)
    {
        require(
            mi.estatHopital(_account),             
            "Nomes hospitals"
        );
        _;
    }

    // Només les adreces dels SC de Receptes, Ministeri i Metges hi podran accedir.
           modifier onlyByContractes(address _account)
    {
        require(
            (_account == aRecepta) ||(_account == aMinisteri) ||(aMetges == _account),             
            "SC sender no valid"
        );
        _;
    }

    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// GESTIÓ METGES /////

    // Funció per crear un metge
    function creaMetge(address _aMetge, string memory _nom, uint _numColegiat) public onlyByHospitals(msg.sender){

        require(bytes(_nom).length > 8, "Indicar nom");

        Metge memory m;
        m.estat = estatActor.alta;
        m.nom = _nom;
        m.numColegiat = _numColegiat;
        m.aHospital = msg.sender;
        MetgesMap[_aMetge] = m;

        PosicioArrayaMap[_aMetge] = PlantillaMap[msg.sender].plantilla.length; // Guardar posició de l'array en la que es guardarà el metge
        PlantillaMap[msg.sender].plantilla.push(_aMetge);
        
    }

    // Funció per donar de baixa a un metge
    function baixaMetge(address _aMetge) public onlyByHospitals(msg.sender){

        require(msg.sender == MetgesMap[_aMetge].aHospital, "Nomes hospital propietari");

        MetgesMap[_aMetge].estat = estatActor.baixa;

        // S'elimina el metge de la plantilla de l'hospital
        uint posicioMetge = PosicioArrayaMap[_aMetge];
        delete PlantillaMap[msg.sender].plantilla[posicioMetge];
        
    }


    // Funció perque un hospital visualitzi la seva plantilla
    function visualitzaPlantilla() public view onlyByHospitals(msg.sender) returns(address[] memory) {

        return (PlantillaMap[msg.sender].plantilla);

    }


    // Funció per saber si un metge està dins dels sitema. Només hi han d'accedir els contractes Ministeri, Metges, Receptes i Volants.
    function estatMetge(address _aMetge) public view onlyByContractes(msg.sender) returns (bool){

        address adHospital = MetgesMap[_aMetge].aHospital;

        if(mi.estatHopital(adHospital)) { // L'hospital al qual pertany també té estat alta
                
            if (MetgesMap[_aMetge].numColegiat != 0) { // El metge té estat alta
                if(MetgesMap[_aMetge].estat == estatActor.alta) {
                    return true;
                }
            }
        }
        
        return false;
        
    }

    // Funció per retornar el nom d'un metge amb la seva adreça
    function nomMetge(address _idMetge) public view onlyByContractes(msg.sender) returns (string memory){

        return MetgesMap[_idMetge].nom;
   
    }



    ///// REBRE ADREÇES D'ALTRES SC //////

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte de receptes una vegada creat
    function rebAddressContracteTokenRecepta(address _aRecepta) public onlyByContractes(msg.sender) {
        aRecepta = _aRecepta;
    }

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte dels metges una vegada creat
    function rebAddressContracteMetges(address _aMetges) public onlyByContractes(msg.sender) {
        aMetges = _aMetges;
    }

    
    
}