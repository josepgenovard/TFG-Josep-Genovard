pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./DateTime.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import './Ministeri.sol';
import './Hospitals.sol';
import './Usuaris.sol';

contract Recepta is Ownable, ERC721 {

    using SafeMath for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private aContracteMinisteri;
    address private aMetges;
    address private aFarmacies;
    address private aUsuaris;
    address private addressMinisteri;

    Ministeri private mi;
    Hospitals private hos;

    enum estatRecepta {creada, pendent, tramitada, rebutjada}

    struct DadesRecepta {
        estatRecepta estat;
        uint caducitat;
        address idUsuari;
        address idMetge;
        string medicament;
        string ium;
    }

    struct receptesPropietat{
        uint[] ids;
    }

    constructor(address _addressMinisteri, address _contracteMinisteri, address _aHospitals) ERC721("Recepta", "RCPT") {
        mi = Ministeri(_contracteMinisteri);
        hos = Hospitals(_aHospitals);
        aContracteMinisteri = _contracteMinisteri;
        addressMinisteri = _addressMinisteri;
    }


    // Mapping per obtenir les dades d'una recepte amb el seu id
    mapping(uint => DadesRecepta) private dadesReceptaMap;

    // Mapping amb el registre de les receptes d'un usuari
    mapping(address => receptesPropietat) private receptesPropietariMap;

    //Mapping per saber posició de l'array d'un id de recepta.
    mapping(uint => uint) private PosicioArrayaMap;




    // --------------------------------------------------------- MODIFIERS ---------------------------------------------------------

    // Només l'usuari propietari
    modifier onlyByUsuariPropietari(uint _idRecepta, address _account, address _aSCUsuaris)
    {
        
        require(
            ownerOf(_idRecepta) == _account,             
            "Nomes el propietari te acces a la funcio."
        );

        require(
            aUsuaris == _aSCUsuaris,             
            "Nomes l'SC Usuaris te acces a la funcio."
        );
        _;
    }

    // Només farmàcies
    modifier onlyByPropietariFarmacies(address _account, uint _idRecepta, address _farmacia)
    {
        require(
            _account == aFarmacies,             
            "Nomes les farmacies poden executar la funcio."
        );
        
        require(
            ownerOf(_idRecepta) == _farmacia,             
            "Nomes el propietari te acces a la funcio."
        );

        _;
    }

    // Només l'adreça del contracte del Ministeri
    modifier onlyByContracteMinisteri(address _account)
    {
        require(
            _account == aContracteMinisteri,             
            "No teniu permisos per executar la funcio."
        );
        _;
    }

    // Només l'adreça del contracte del Ministeri
    modifier onlyByContracteMetges(address _account)
    {
        require(
            _account == aMetges,             
            "No teniu permisos per executar la funcio."
        );
        _;
    }

    // Només l'adreça del contracte dels usuaris
    modifier onlyByContracteUsuaris(address _account)
    {
        require(
            _account == aUsuaris,             
            "No teniu permisos per executar la funcio."
        );
        _;
    }


    // Només l'adreça del contracte de les farmàcies
    modifier onlyByContracteFarmacies(address _account)
    {
        require( 
            _account == aFarmacies, 
            "Nomes el contracte de les farmacies pot cridar aquesta funcio."
        );
        _;
    }




    // --------------------------------------------------------- EVENTS ---------------------------------------------------------
    
    
    event eventReceptaCreada(address idUsuari, address idMetge, uint idRecepta, string nomMedicament);

    event eventReceptaRebutjada(address idUsuari, uint idRecepta);

    event eventReceptaEnviada(address idUsuari, address idFarmacia, uint idRecepta);

    event eventReceptaVisualitzada(address idFarmacia, uint idRecepta);

    event eventReceptaVisualitzadaIRebutjada(address idFarmacia, uint idRecepta);
   
    

    // --------------------------------------------------------- FUNCTIONS ---------------------------------------------------------

    ///// CREACIÓ I CANVIS D'ESTAT

    // Funció per crear les receptes. Es guarden amb un id
    function crearRecepta(address _addressUsuari, address _addressMetge,string memory _nomMedicament, string memory _ium, uint16 _anyCaducitat, uint8 _mesCaducitat, uint8 _diaCaducitat) public onlyByContracteMetges(msg.sender) {
        
        require(stringLength(_nomMedicament) > 4, "S'ha d'indicar un nom de medicament (distancia minima de 5 caracters)");

        require(stringLength(_ium) == 13, "El codi unic IUM ha de tenir 13 digits");


        DadesRecepta memory dr;
        
        _tokenIds.increment();                    // Incrementam id
        uint auxIdRecepta = _tokenIds.current();  // Guardam id

        dr.estat = estatRecepta.creada;
        
        if(_anyCaducitat > 0 && _mesCaducitat > 0 && _diaCaducitat > 0) {
            // es suma 1 dia perquè el dia de caducitat també sigui vàlid (fins les 00:00 del dia següent)
            dr.caducitat = DateTime.toTimestamp(_anyCaducitat, _mesCaducitat, _diaCaducitat+1);
        } else {
            dr.caducitat = 2147483647; // Darrer numero unixtime
        }
        
        dr.idUsuari = _addressUsuari;
        dr.idMetge = _addressMetge;
        dr.medicament = _nomMedicament;
        dr.ium = _ium;

        dadesReceptaMap[auxIdRecepta] = dr;

        // Encunyam el token
        _mint(dr.idUsuari, auxIdRecepta);


        PosicioArrayaMap[auxIdRecepta] = receptesPropietariMap[dr.idUsuari].ids.length; // Guardar posició de l'array en la que es guardarà l'id
        receptesPropietariMap[dr.idUsuari].ids.push(auxIdRecepta);

        
        emit eventReceptaCreada(dr.idUsuari, dr.idMetge, auxIdRecepta, _nomMedicament);

    }

    // Funció per canviar una recepta a estat rebutjada PER L'USUARI (en el cas on l'usuari no la desitgi)
    function rebutjaRecepta(uint _idRecepta, address _adUsuari) public onlyByUsuariPropietari(_idRecepta, _adUsuari, msg.sender){
        
        require(dadesReceptaMap[_idRecepta].estat == estatRecepta.creada, "Nomes les receptes amb estat \"Creada\"");
        
        dadesReceptaMap[_idRecepta].estat = estatRecepta.rebutjada;

        // S'elimina la recepta de l'historial de l'usuari
        uint posicioRecepta = PosicioArrayaMap[_idRecepta];
        delete receptesPropietariMap[_adUsuari].ids[posicioRecepta];
        
        emit eventReceptaRebutjada(_adUsuari, _idRecepta); 

    }

    // Funció perquè un usuari envii el token d'una recepte a una farmàcia
    function enviaRecepta(uint _idRecepta, address _adUsuari, address _adFarmacia) public onlyByUsuariPropietari(_idRecepta, _adUsuari, msg.sender){
        
        require(dadesReceptaMap[_idRecepta].estat == estatRecepta.creada, "Nomes es poden enviar les receptes amb estat \"Creada\"");

        require(mi.estatFarmacia(_adFarmacia), "Nomes es poden enviar els tokens a farmacies validades");

        // Transferim la propietat del token (usuari -> farmàcia)
        transferFrom(_adUsuari, _adFarmacia, _idRecepta);

        // Canviam estat
        dadesReceptaMap[_idRecepta].estat = estatRecepta.pendent;

        // S'elimina la recepta d el'historial de l'usuari
        ///// S'elimina de l'usuari
        uint posicioRecepta = PosicioArrayaMap[_idRecepta];
        delete receptesPropietariMap[_adUsuari].ids[posicioRecepta];
        ///// Es guarda a la farmàcia
        PosicioArrayaMap[_idRecepta] = receptesPropietariMap[_adFarmacia].ids.length;
        receptesPropietariMap[_adFarmacia].ids.push(_idRecepta);

        emit eventReceptaEnviada(_adUsuari, _adFarmacia, _idRecepta);

    }

    // Funció perque la farmacia propietari visualitzi la informacio de la recepta. Automaticament es canviarà l'estat a "Tramitada" o "Rebutjada" depenent de la data de caducitat
    function visualitzaRecepta(uint _idRecepta, address _adFarmacia) public onlyByPropietariFarmacies(msg.sender, _idRecepta, _adFarmacia) 
    returns(string memory valida, string memory nomUsuari, string memory nomMetge, string memory medicament, string memory ium){
        
        require(dadesReceptaMap[_idRecepta].estat == estatRecepta.pendent, "Nomes les receptes amb estat \"Pendent\" es poden visualitzar");

        DadesRecepta memory rec = dadesReceptaMap[_idRecepta];
        
        if (block.timestamp < dadesReceptaMap[_idRecepta].caducitat) {

            dadesReceptaMap[_idRecepta].estat = estatRecepta.tramitada;

            // S'elimina la recepta d el'historial de l'usuari
            uint posicioRecepta = PosicioArrayaMap[_idRecepta];
            delete receptesPropietariMap[rec.idUsuari].ids[posicioRecepta];
            
            return ("Valida", mi.nomUsuari(rec.idUsuari), hos.nomMetge(rec.idMetge), rec.medicament, rec.ium);

            emit eventReceptaVisualitzada(_adFarmacia, _idRecepta);

        } else {

            dadesReceptaMap[_idRecepta].estat = estatRecepta.rebutjada;

            // S'elimina la recepta d el'historial de l'usuari
            uint posicioRecepta = PosicioArrayaMap[_idRecepta];
            delete receptesPropietariMap[rec.idUsuari].ids[posicioRecepta];
            
            return ("Caducada", mi.nomUsuari(rec.idUsuari), hos.nomMetge(rec.idMetge), rec.medicament, rec.ium);

            emit eventReceptaVisualitzadaIRebutjada(_adFarmacia, _idRecepta);

        }
        
    }


    // Funció perquè una farmàcia envii tots els seus tokens al Ministeri
    function enviaReceptesMinisteri(address _adFarmacia) public onlyByContracteFarmacies(msg.sender){
        
        uint[] memory receptesFarmacia = receptesPropietariMap[_adFarmacia].ids;   // Guardam les receptes de la farmàcia

        for(uint i = 0; i < receptesFarmacia.length; i++) {

            if (dadesReceptaMap[receptesFarmacia[i]].estat == estatRecepta.tramitada) { // Si té estat tramitada -> s'envia al ministeri

                transferFrom(_adFarmacia, addressMinisteri, receptesFarmacia[i]);

            } else {        // Si té estat rebutjada -> s'elimina

                _burn(receptesFarmacia[i]);

            }
            
        }

    }


    ///// FUNCIONS PER RETORNAR PARÀMETRES DE LES RECEPTES /////

    // Funció que retorna l'estat d'una recepta
    function retornaEstatRecepta(uint _idRecepta) public view onlyByContracteUsuaris(msg.sender) returns (string memory) {
        
        if (dadesReceptaMap[_idRecepta].estat == estatRecepta.creada) {
            return "creada";
        } else if (dadesReceptaMap[_idRecepta].estat == estatRecepta.pendent) {
            return "pendent";
        } else if (dadesReceptaMap[_idRecepta].estat == estatRecepta.tramitada) {
            return "tramitada";
        } else {
            return "rebutjada";
        }

    }

    // Funció que retornar les dades d'una recepte d'un usuari
    function retornaDadesRecepta(uint _idRecepta, address _adUsuari) public view onlyByContracteUsuaris(msg.sender) returns (string memory nomMetge, string memory medicament, string memory ium) {
        
        require(ownerOf(_idRecepta) == _adUsuari, "Nomes el propietari pot veure les dades de la recepta");

        DadesRecepta memory rec = dadesReceptaMap[_idRecepta];
            
        return (hos.nomMetge(rec.idMetge), rec.medicament, rec.ium);   

    }

    //Funció per retornar receptes d'un usuari
    function retornaIDsReceptes(address _adUsuari) public view onlyByContracteUsuaris(msg.sender) returns (uint[] memory) {
        
        return receptesPropietariMap[_adUsuari].ids;

    }


    
    
    ///// FUNCIONS D'AJUDA /////

    function stringLength(string memory s) private returns (uint256) {
        return bytes(s).length;
    }

    

    ///// REBRE ADRECES D'SC /////
    
    // Funció perquè el Contracte del ministeri envii l'adreça del contracte dels metges una vegada creat
    function rebAddressContracteMetges(address _aMetges) public onlyByContracteMinisteri(msg.sender) {
        aMetges = _aMetges;
    }

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte dels metges una vegada creat
    function rebAddressContracteFarmacies(address _aFarmacies) public onlyByContracteMinisteri(msg.sender) {
        aFarmacies = _aFarmacies;
    }

    // Funció perquè el Contracte del ministeri envii l'adreça del contracte dels usuaris una vegada creat
    function rebAddressContracteUsuaris(address _aUsuaris) public onlyByContracteMinisteri(msg.sender) {
        aUsuaris = _aUsuaris;
    }

}