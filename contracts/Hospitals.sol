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
        uint nombreDeMetgesPlantilla;
        address[] plantilla;
    }
    
    // Mapping per obtenir un metge amb la seva adreça
    mapping(address => Metge) private MetgesMap;

    // Mapping per obtenir una plantilla amb l'adreça de l'hospital
    mapping(address => Plantilla) private PlantillaMap;

    // Mapping per saber la posició d'un metge dins de l'array de la plantilla
    mapping(address => uint) private PosicioArrayaMap;



    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només l'hospital que ha creat el metge, podrà modificar-lo
           modifier onlyByHospitalPropietari(address _metge, address _hospital)
    {
        require(
            mi.estatHopital(_hospital),             
            "Nomes els hospitals validats poden executar la funcio."
        );
        require(
            _hospital == MetgesMap[_metge].aHospital,             
            "Nomes l'hospital que ha creat el metge el pot modificar."
        );
        _;
    }

    // Només les adreces validades com a hospitals a l'SC del Ministeri podran execuar la funció
           modifier onlyByHospitals(address _account)
    {
        require(
            mi.estatHopital(_account),             
            "Nomes els hospitals validats poden executa la funcio."
        );
        _;
    }

    // Només les adreces dels SC dels Tokens hi podran accedir.
           modifier onlyByContractesTokens(address _account)
    {
        require(
            (_account == aRecepta),             
            "Nomes els contractes de tokens poden executa la funcio."
        );
        _;
    }

    // Només les adreces dels SC dels Tokens, Ministeri i Metges hi podran accedir.
           modifier onlyByContractesTokensMinisteriMetges(address _account)
    {
        require(
            (_account == aRecepta) ||(_account == aMinisteri) ||(aMetges == _account),             
            "Nomes els contractes Recepta, Volant, Ministeri o Metges poden executa la funcio."
        );
        _;
    }

    // Només l'adreça del contracte del ministeri podrà accedir
           modifier onlyByContracteMinisteri(address _account)
    {
        require(
           _account == aMinisteri,             
            "Nomes el contracte del Ministeri pot executa la funcio."
        );
        _;
    }

    
    // --------------------------------------------------------- EVENTS ---------------------------------------------------------
    
    
    event eventAltaMetge(address addressMetge, string nomMetge);

    event eventBaixaMetge(address addressMetge, string nomMetge);
   
    

    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// GESTIÓ METGES /////

    // Funció per crear un metge
    function creaMetge(address _aMetge, string memory _nom, uint _numColegiat) public{// onlyByHospitals(msg.sender){

        require(bytes(_nom).length > 8, "S'ha d'indicar un nom complet pel metge");

        require(numDigits(_numColegiat) == 9, "El numero de col.legiat ha de tenir 9 xifres");

        Metge memory m;
        m.estat = estatActor.alta;
        m.nom = _nom;
        m.numColegiat = _numColegiat;
        m.aHospital = msg.sender;
        MetgesMap[_aMetge] = m;

        PlantillaMap[msg.sender].nombreDeMetgesPlantilla ++;

        PosicioArrayaMap[_aMetge] = PlantillaMap[msg.sender].plantilla.length; // Guardar posició de l'array en la que es guardarà el metge
        PlantillaMap[msg.sender].plantilla.push(_aMetge);

        emit eventAltaMetge(_aMetge, _nom);
        
    }

    // Funció per donar de baixa a un metge
    function baixaMetge(address _aMetge) public onlyByHospitalPropietari(_aMetge, msg.sender){

        MetgesMap[_aMetge].estat = estatActor.baixa;

        PlantillaMap[msg.sender].nombreDeMetgesPlantilla --;

        // S'elimina el metge de la plantilla de l'hospital
        uint posicioMetge = PosicioArrayaMap[_aMetge];
        delete PlantillaMap[msg.sender].plantilla[posicioMetge];
        
        emit eventBaixaMetge(_aMetge, MetgesMap[_aMetge].nom);
        
    }


    // Funció perque un hospital visualitzi la seva plantilla
    function visualitzaPlantilla() public view onlyByHospitals(msg.sender) returns(uint, address[] memory) {

        return (PlantillaMap[msg.sender].nombreDeMetgesPlantilla, PlantillaMap[msg.sender].plantilla);

    }


    // Funció per saber si un metge està dins dels sitema. Només hi han d'accedir els contractes Ministeri, Metges, Receptes i Volants.
    function estatMetge(address _aMetge) public view onlyByContractesTokensMinisteriMetges(msg.sender) returns (bool){

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
    function nomMetge(address _idMetge) public view onlyByContractesTokens(msg.sender) returns (string memory){

        return MetgesMap[_idMetge].nom;
   
    }



    ///// REBRE ADREÇES D'ALTRES SC //////

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte de receptes una vegada creat
    function rebAddressContracteTokenRecepta(address _aRecepta) public onlyByContracteMinisteri(msg.sender) {
        aRecepta = _aRecepta;
    }

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte dels metges una vegada creat
    function rebAddressContracteMetges(address _aMetges) public onlyByContracteMinisteri(msg.sender) {
        aMetges = _aMetges;
    }

    

    ///// FUNCIONS D'AJUDA //////
    
    function numDigits(uint number) private pure returns (uint8) {
        uint8 digits = 0;
        while (number != 0) {
            number /= 10;
            digits++;
        }
        return digits;
    }




    //FUNCIO PER FER PROVES ÀGILS
    function CREAMETGE() public{
        creaMetge(0x617F2E2fD72FD9D5503197092aC168c91465E7f2, "nom metge", 123456789);
    }

}