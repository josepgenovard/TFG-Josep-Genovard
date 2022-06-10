pragma solidity >=0.5.0 <0.9.0;

import './DateTime.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import './Hospitals.sol';
import './TokenRecepta.sol';
import './Farmacies.sol';
import './Usuaris.sol';
import './Metges.sol';


// Contracte del Ministeri de Sanitat (l'Autoritat Jeràrquica)
contract Ministeri {

    // --------------------------------------------------------- DECLACACIONS INICIALS ---------------------------------------------------------
    
    address private ContracteEntitat;

    //DateTime private dt;
    Hospitals private hos;
    Recepta private tr;

    address private Owner;

    // Adreces dels diferents contractes
    address private aDateTime;
    address private aTokenRecepta;
    address private aHospitals;
    address private aFarmacies;
    address private aUsuaris;
    address private aMetges;


    enum estatActor {alta, baixa}


    // Constructor del contracte
    constructor (/*address _aDateTime*/) public {
        ContracteEntitat = address(uint160(address(this)));
        Owner = msg.sender;
        aDateTime = 0x92482Ba45A4D2186DafB486b322C6d0B88410FE7;
    }

    // Estructura dels Hospital
        struct Hospital 
    {
        estatActor estat;
        string nom;
    } 
   
    // Estructura dels Usuaris
        struct Usuari 
    {
        estatActor estat;
        string nom;
    }
   
    // Estructura de les Farmàcies
        struct Farmacia
    {
        estatActor estat;
        string nom;
    }




    // Mapping per obtenir les dades d'un hospital amb la seva adreça
    mapping(address => Hospital) private HospitalsMap;

    // Mapping per obtenir les dades d'un usuari amb la seva adreça
    mapping(address => Usuari) private UsuarisMap;

    // Mapping per obtenir les dades d'una farmàcia amb la seva adreça
    mapping(address => Farmacia) private FarmaciesMap;


    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només l'adreça del Ministeri de Sanitat
           modifier onlyByMinisteri(address _account)
    {
        require(
            _account == Owner,             
            "Nomes el ministeri pot executar la funcio."
        );
        _;
    }

    // Només les adreces dels contractes desplegats (TokenRecepta, Hospitals, Usuaris, Farmacies)
           modifier onlyByContractesSC(address _account)
    {
        require(
            (_account == aTokenRecepta) || (_account == aUsuaris) || (_account == aHospitals) || (_account == aFarmacies),             
            "Nomes les adreces dels SC desplagats pel ministeri tenen acces a la funcio."
        );
        _;
    }


    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// FUNCIONS PER DESPLAGAR ALTRES CONTRACTES /////

    // Funció per iniciar tots els contractes amb una sola funció
    function despelegaTotsElsSC() public onlyByMinisteri(msg.sender) returns (address hospital, address farmacies, address usuaris, address metges, address token){
        // Hospitals
        aHospitals = address(new Hospitals(ContracteEntitat));
        hos = Hospitals(aHospitals);

        // TokenRecepta
        aTokenRecepta = address(new Recepta(Owner, ContracteEntitat, aHospitals));
        tr = Recepta(aTokenRecepta);
        //Informar al contracte Hospitals de l'adreça que té
        hos.rebAddressContracteTokenRecepta(aTokenRecepta);

        // Metges
        aMetges = address(new Metges(aHospitals, aTokenRecepta));
        //Informar als contractes Hospitals i TokenRecepta de l'adreça que té
        hos.rebAddressContracteMetges(aMetges);
        tr.rebAddressContracteMetges(aMetges);

        // Farmacies
        aFarmacies = address(new Farmacies(ContracteEntitat, aTokenRecepta));
        //Informar al contracte TokenRecepta de l'adreça que té
        tr.rebAddressContracteFarmacies(aFarmacies);

        // Usuaris
        aUsuaris = address(new Usuaris(ContracteEntitat, aTokenRecepta));
        //Informar al contracte TokenRecepta de l'adreça que té
        tr.rebAddressContracteUsuaris(aUsuaris);
        

        return (aHospitals, aFarmacies, aUsuaris, aMetges, aTokenRecepta);
    }
    
    
    
    ///// GESTIÓ HOSPITALS /////

    // Funció per crear un hospital
    function creaHospital(address _aHospital, string memory _nom) public{// onlyByMinisteri(msg.sender){

        require(bytes(_nom).length > 2, "S'ha d'indicar un nom per l'Hospital");

        Hospital memory h;
        h.estat = estatActor.alta;
        h.nom = _nom;
        HospitalsMap[_aHospital] = h;
          
    }

    // Funció per donar de baixa a un hospital (des de l'adreça del propi ministeri)
    function baixaHospital(address _aHospital) public onlyByMinisteri(msg.sender){

        require(HospitalsMap[_aHospital].estat == estatActor.alta, "Nomes es poden donar de baixa els hospitals amb estat \"alta\"");

        HospitalsMap[_aHospital].estat = estatActor.baixa;

    }




    ///// GESTIÓ USUARIS /////

    // Funció per crear un usuari
    function creaUsuari(address _aUsuari, string memory _nom) public{// onlyByMinisteri(msg.sender){

        require(bytes(_nom).length > 8, "S'ha d'indicar un nom sencer de l'usuari. Exemple: \"Nom Llinatge Llinatge\"");

        Usuari memory u;
        u.estat = estatActor.alta;
        u.nom = _nom;
        UsuarisMap[_aUsuari] = u;
        
    }

    // Funció per donar de baixa a un usuari (des de l'adreça del propi ministeri)
    function baixaUsuari(address _aUsuari) public onlyByMinisteri(msg.sender){

        require(UsuarisMap[_aUsuari].estat == estatActor.alta, "Nomes es poden donar de baixa els usuaris amb estat \"alta\"");

        UsuarisMap[_aUsuari].estat = estatActor.baixa;
        
    }
   


    ///// GESTIÓ FARMÀCIES /////

    // Funció per crear una farmàcia
    function creaFarmacia(address _aFarmacia, string memory _nom) public{// onlyByMinisteri(msg.sender){

        require(bytes(_nom).length > 2, "S'ha d'indicar un nom per la farmacia");

        Farmacia memory f;
        f.estat = estatActor.alta;
        f.nom = _nom;
        FarmaciesMap[_aFarmacia] = f;

    }

    // Funció per donar de baixa a una farmacia (des de l'adreça del propi ministeri)
    function baixaFarmacia(address _aFarmacia) public onlyByMinisteri(msg.sender){

        require(FarmaciesMap[_aFarmacia].estat == estatActor.alta, "Nomes es poden donar de baixa les farmacies amb estat \"alta\"");

        FarmaciesMap[_aFarmacia].estat = estatActor.baixa;
        
    }



    ///// ALTRES FUNCIONS D'AJUDA /////

    // Funció per saber si un hospital està certificat. Només es pot utilitzar cridant-la des de l'SC dels hospitals
    function estatHopital(address _address) public view onlyByContractesSC(msg.sender) returns (bool){

        if (bytes(HospitalsMap[_address].nom).length != 0) {
            if(HospitalsMap[_address].estat == estatActor.alta) {
                return true;
            }
        }

        return false;
           
    }


    // Funció per saber si un usuari està validat al sistema
    function estatUsuari(address _address) public view onlyByContractesSC(msg.sender) returns (bool){

        if (bytes(UsuarisMap[_address].nom).length != 0) {
            if(UsuarisMap[_address].estat == estatActor.alta) {
                return true;
            }
        }

        return false;
   
    }


    // Funció per retornar el nom d'un usuari amb la seva adreça
    function nomUsuari(address _idUsuari) public view onlyByContractesSC(msg.sender) returns (string memory){

        return UsuarisMap[_idUsuari].nom;
   
    }

    
    // Funció per saber si una farmàcia està validada al sistema (la poden cridar els SC farmacies i receptes)
    function estatFarmacia(address _address) public view onlyByContractesSC(msg.sender) returns (bool){
  
        if (bytes(FarmaciesMap[_address].nom).length != 0) {
            if(FarmaciesMap[_address].estat == estatActor.alta) {
                return true;
            }
        }

        return false;
   
    }




    // FUNCIÓ PER AGILITZAR PROVES
    function CREAACTORS() public {
        creaHospital(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, "nom hospital");
        creaFarmacia(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, "nom farmacia");
        creaUsuari(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, "nom usuari");
    } 
    
}