//fonction de calcul du nombre d'hotes selon la formule NBH=(2^n)-2
function calculNBH(pNM) {
    return Math.pow(2, pNM) - 2;
}

// Calcul de la valeur a soustraire a pour trouver la valeur du MSR
function calculPreMSR(pNM) {
    var pPreMSR = 0;
    for (i = 0; i < pNM; i++) {
        pPreMSR = pPreMSR + Math.pow(2, i);
    }
    return pPreMSR;
}

// Calcul du nombre magique, ce nombre va nous permettre d'être utilisé dans la suite du calcul du masque de sous-réseau//
function calculNM(pCIDR) {
    return 32 - pCIDR;
}


// Soustraction de la valeur calculer par la fonction calculPreMSR pour obtenir la valeur du MSR
function calculMSR(pPreMSR) {
    return 255 - pPreMSR;
}

//fonction de controle des ip publiques/privées
function controle_ip(ip1,ip2){
    //exclusion des plages d'adresses ip publiques
        if(ip1 == 10){
            document.getElementById("Identification_de_la_classe").value;
            return true;
        }
        if(ip1 == 172 && ip2 > 15 && ip2 < 32){
            document.getElementById("Identification_de_la_classe").value;
            return true;
        }
        if(ip1 == 192 && ip2 == 168){
            document.getElementById("Identification_de_la_classe").value;
            return true;
        }
        return false;
    }


//fonction Main - fonction d'appel des autres fonctions.
var calculateur = function () {
    //entrants utilisateur- definition des variables
    var CIDR = document.getElementById("Ane_de_Florent_CIDR").value;
    var ip1 = document.getElementById("Ane_de_Florent_Ip1").value;
    var ip2 = document.getElementById("Ane_de_Florent_Ip2").value;
    var ip3 = document.getElementById("Ane_de_Florent_Ip3").value;
    var ip4 = document.getElementById("Ane_de_Florent_Ip4").value;
    var MSR1, MSR2, MSR3, MSR4 =255;


    console.log("Entrants : " + ip1 + "." + ip2 + "." + ip3 + "." + ip4 + "/" + CIDR);

	// clean des champs masqués avant les controles et calculs.
	document.getElementById("Ane_de_Florent_erreur").value="";


    //test de conformité des entrants

	// Controle du format : uniquement des nombres sont autoris�s.
	// Controle des longueurs (max 3 pour les ip, max 2 pour CIDR)
	if (!controleNumbers(ip1) || ip1.length>3){
		// si probleme de type ou de longueur sur ip1
        console.log("Erreur de format de ip1");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip1 invalide : vous devez entrer un nombre entre 1 et 3 chiffre(s) au niveau du 1eme octet. ";
    }
    if (!controleNumbers(ip2) || ip2.length>3){
		// si probleme de type ou de longueur sur ip2
        console.log("Erreur de format de ip2");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip2 invalide : vous devez entrer un nombre entre 1 et 3 chiffre(s) au niveau du 2eme octet. ";
    }
    if (!controleNumbers(ip3) || ip3.length>3){
		// si probleme de type ou de longueur sur ip3
        console.log("Erreur de format de ip3");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip3 invalide : vous devez entrer un nombre entre 1 et 3 chiffre(s) au niveau du 3eme octet. ";
    }
    if (!controleNumbers(ip4) || ip4.length>3){
		// si probleme de type ou de longueur sur ip4
        console.log("Erreur de format de ip4");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip4 invalide : vous devez entrer un nombre entre 1 et 3 chiffre(s) au niveau du 4eme octet. ";
    }
    if (!controleNumbers(CIDR) || CIDR.length>2){
		// si probleme de type ou de longueur sur CIDR
        console.log("Erreur de format de CIDR");
        document.getElementById("Ane_de_Florent_erreur").value += "CIDR invalide : Erreur, vous devez entrer un nombre entre 1 et 2 chiffre(s) au niveau du CIDR. ";
    }

	//si présence d'une erreur bloquante, on arrete la suite des calculs.
    if (document.getElementById("Ane_de_Florent_erreur").value != "") {
        return;
    }

	// Controle des valeurs
    //Controle de ip1 si vide, <0 ou >255
    if (ip1 == "" || ip1 < 0 || ip1>255) {
        console.log("Ip1 invalide. ");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip1 invalide : le nombre doit être compris entre 1 et 255. ";
    }
    //Controle de ip2 si vide, <0 ou >255
    if (ip2 == "" || ip2 < 0 || ip2>255) {
        console.log("Ip2 invalide. ");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip2 invalide : le nombre doit être compris entre 1 et 255. ";
    }
    //Controle de ip3 si vide, <0 ou >255
    if (ip3 == "" || ip3 < 0 || ip3>255) {
        console.log("Ip3 invalide. ");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip3 invalide : le nombre doit être compris entre 1 et 255. ";
    }
    //Controle de ip4 si vide, <0 ou >255
    if (ip4 == "" || ip4 < 0 || ip4>255) {
        console.log("Ip4 invalide. ");
        document.getElementById("Ane_de_Florent_erreur").value += "Ip4 invalide : le nombre doit être compris entre 1 et 255. ";
    }
    //Controle de CIDR si vide, <0 ou >32
    if (CIDR < 0 || CIDR > 32 || CIDR ==""){
        console.log("CIDR invalide. ");
        document.getElementById("Ane_de_Florent_erreur").value += "CIDR invalide : le nombre doit être compris entre 1 et 32. ";
    }

	//si présence d'une erreur bloquante, on arrete la suite des calculs.
    if (document.getElementById("Ane_de_Florent_erreur").value != "") {
        return;
    }

	// Controle des adresses privées sur les champs en entrée-Inverse de la fonction controle_ip ligne 27 - appel de la fonction
    if(!controle_ip(ip1,ip2)){
        console.log("Adresse réservée. Seules les adresses privées sont autorisées.");
        document.getElementById("Ane_de_Florent_erreur").value += "Adresse réservée. Seules les adresses privées sont autorisées. Merci de la modifier. ";
    }

	// fin des controles sur les entrants

    //si présence d'une erreur bloquante, on arrete la suite des calculs.
    if (document.getElementById("Ane_de_Florent_erreur").value != "") {
        return;
    }

	 //conditions CIDR = Classe (connaitre la classe via le CIDR) -> Marie Briand, 2017
    // controle si CIDR = 8
     if (CIDR==8)
     {
        document.getElementById("Identification_de_la_classe").value = "Classe A ";
        console.log("Cette adresse IP est de la CLasse A ");
     }
    // controle si CIDR = 16
     else if (CIDR==16)
     {
        document.getElementById("Identification_de_la_classe").value = "Classe B ";
        console.log("Cette adresse IP est de la Classe B ");
     }
    // controle si CIDR = 24
     else if (CIDR==24)
     {
        document.getElementById("Identification_de_la_classe").value = "Classe C ";
        console.log("Cette adresse IP est de la Classe C ");
     }
    // controle si CIDR = 32
	else if (CIDR==32)
     {
         document.getElementById("Ane_de_Florent_erreur").value += "cas particulier. Vous ne pourrez avoir qu'une seule machine au sein de votre réseau avec un CIDR de 32. ";
        console.log("Vous ne pourrez avoir qu'une seule machine au sein de votre réseau avec un CIDR de 32.")
     }
    // controle si CIDR = 0
    else if (CIDR==0)
     {
        document.getElementById("Ane_de_Florent_erreur").value += "cas particulier. Vous aurez tous vos ports ouverts avec un CIDR de 0, ce qui pourrait engendrer des problèmes de sécurité. ";
        console.log("Vous ne pouvez pas utiliser un CIDR de 0 à moins que vous ne vouliez tous vos ports ouverts. ")
     }
    // controle si CIDR différents des valeurs renseign�s plus haut
     else
     {

        document.getElementById("Identification_de_la_classe").value = "Hors-classe ";

        console.log("Cette adresse IP est hors Classe");
     }

    //conversion
    //conversion du 1er octet de l'adresse ip en binaire
    //appel de la fonction convert avec comme parametre ip1
    var ipbin1 = convert(ip1);
    console.log("IP1 en binaire est :" + ipbin1);
    //conversion du 2eme octet de l'adresse ip en binaire
    //appel de la fonction convert avec comme parametre ip2
    var ipbin2 = convert(ip2);
    console.log("IP2 en binaire est :" + ipbin2);
    //conversion du 3eme octet de l'adresse ip en binaire
    //appel de la fonction convert avec comme parametre ip3
    var ipbin3 = convert(ip3);
    console.log("IP3 en binaire est :" + ipbin3);
    //conversion du 4eme octet de l'adresse ip en binaire
    //appel de la fonction convert avec comme parametre ip4
    var ipbin4 = convert(ip4);
    console.log("IP4 en binaire est :" + ipbin4);
    // init des variables

    var newNM = 0;

    var MSR1, MSR2, MSR3, MSR4 = 255;
    var preMSR = 0;
// Calcul du MSR sans utiliser la fonction calculMSR
    //appel de la fonction calcul du nombre magique
        var NM = calculNM(CIDR);
    //condition pour isoler l'octet sur lequel on travail-on soustraiera 8 16 ou 24 selon l'octet qui va etre modifié grace au modulo8
        if (NM < 8) {
            // octet MSR concerné = 4
            newNM = NM % 8;
            preMSR = calculPreMSR(newNM);
            MSR4 = 255 - preMSR;
            MSR1 = 255;
            MSR2 = 255;
            MSR3 = 255;
        }
        if (NM >= 8 && NM < 16) {
            // octet MSR concerné = 3
            newNM = NM % 8;
            preMSR = calculPreMSR(newNM);
            MSR3 = 255 - preMSR;
            MSR1 = 255;
            MSR2 = 255;
            MSR4 = 0;
        }
        if (NM >= 16 && NM < 24) {
            // octet MSR concerné = 2
            newNM = NM % 8;
            preMSR = calculPreMSR(newNM);
            MSR2 = 255 - preMSR;
            MSR1 = 255;
            MSR4 = 0;
            MSR3 = 0;
        }
        if (NM >= 24) {
            // octet MSR concerné = 1
            newNM = NM % 8;
            preMSR = calculPreMSR(newNM);
            MSR1 = 255 - preMSR;
            MSR4 = 0;
            MSR3 = 0;
            MSR2 = 0;
        }

    //convertion du MSR en binaire-appel de la fonction convert avec comme parametre MSR
    var MSRbin1 = convert(MSR1);
    var MSRbin2 = convert(MSR2);
    var MSRbin3 = convert(MSR3);
    var MSRbin4 = convert(MSR4);

    //appel de la fonction et logique NETID-on compare le 1er octet de l'adresse ip avec le 1er octet du MSR, puis on réitere pour le 2nd octet etc ...
    var NETIDbin1=net_id(ipbin1,MSRbin1);
    var NETIDbin2=net_id(ipbin2,MSRbin2);
    var NETIDbin3=net_id(ipbin3,MSRbin3);
    var NETIDbin4=net_id(ipbin4,MSRbin4);
    //convertion du NETID binaire en décimal- appel de la fonction decimal avec comme parametre le net ID en binaire
    var NETID1=decimal(NETIDbin1);
    var NETID2=decimal(NETIDbin2);
    var NETID3=decimal(NETIDbin3);
    var NETID4=decimal(NETIDbin4);
    //calcul WildCard- appel de la fonction wildcard avec comme parametre les octets de notre masque de sous réseau
    var WC1=wildcard(MSR1);
    var WC2=wildcard(MSR2);
    var WC3=wildcard(MSR3);
    var WC4=wildcard(MSR4);

    //calcul Broadcast-appel de la fonction pour calculer la broadcast en utilisant le NETID et la wildcard calculée précédemment
    var BC1=broadcast(WC1,NETID1);
    var BC2=broadcast(WC2,NETID2);
    var BC3=broadcast(WC3,NETID3);
    var BC4=broadcast(WC4,NETID4);

    // Controle des adresses privées sur le scope ip- on utilise la broadcast (derniere adresse du réseau) pour vérifier si elle se trouve dans une plage privée ou publique
    if(!controle_ip(BC1,BC2)){
        console.log("Adresse du Broadcast calculée réservée. Le scope d'adresse obtenu est en partie réservé. Merci de modifier votre demande.");
        document.getElementById("Ane_de_Florent_erreur").value += "Adresse réservée : Le scope d'adresses obtenu est en partie réservé. Merci de modifier votre demande. ";
    }
	// batterie de console.log pour tester les résultat en console
        console.log('mon nombre magique est : ' + NM);
        console.log('mon exposant est : ' + newNM);
        console.log('mon PreMSR est : ' + preMSR);
        console.log("mon MSR est " + MSR1 + "." + MSR2 + "." + MSR3 + "." + MSR4);
    console.log("mon NETID est " + NETID1 + "." + NETID2 + "." + NETID3 + "." + NETID4);
    console.log("mon WildCard  " + WC1 + "." + WC2 + "." + WC3 + "." + WC4);
    console.log("mon broadcast " + BC1 + "." + BC2 + "." + BC3 + "." + BC4);
    // affichage de notre adresse de broadcast
    document.getElementById("Adresse_de_Broadcast").value =BC1 + "." + BC2 + "." + BC3 + "." + BC4;
    console.log("mon IP  binaire est " + ipbin1 + "." + ipbin2 + "." + ipbin3 + "." + ipbin4);
    console.log("mon MSR binaire est " + MSRbin1 + "." + MSRbin2 + "." + MSRbin3 + "." + MSRbin4);
    console.log("mon NETID bin   est " + NETIDbin1 + "." + NETIDbin2 + "." + NETIDbin3 + "." + NETIDbin4);
    // affichage de notre masque de sous réseau
    document.getElementById("Masque_de_sous_reseau").value =MSR1 + "." + MSR2 + "." + MSR3 + "." + MSR4;
    //affichage de notre NetID
    document.getElementById("Identifiant_reseau").value =NETID1 + "." + NETID2 + "." + NETID3 + "." + NETID4;
        console.log("la première adresse attribuable à un hote est : " + NETID1 + "." + NETID2 + "." + NETID3 + "." + (NETID4+1));
    //affichage de la premiere adresse de notre scope IP
    document.getElementById("Premiere_adresse_attribuable").value =NETID1 + "." + NETID2 + "." + NETID3 + "." + (NETID4+1);
        console.log("la dernière adresse attribuable à un hote est : "+BC1 + "." + BC2 + "." + BC3 + "." + (BC4-1));
    //affichage de la derniere adresse de notre scope IP
     document.getElementById("Derniere_adresse_attribuable").value =BC1 + "." + BC2 + "." + BC3 + "." + (BC4-1);
        console.log("l'ensemble des adresses attribuables est : ");
        console.log("l'identification de la classe est : ");
    //appel du nombre d'hote
        var NBH = calculNBH(NM);
        console.log('mon NBH est : ' + NBH);
    //affichage du nombre d'hotes
        document.getElementById("Total_adresse_attribuable").value =NBH;

}

//fonction toBin permettant de convertir en binaire
function toBin(value) {

    return (value >>> 0).toString(2);
}
// fonction permettant de faire le ET logique en comparant notre adresse ip en binaire et notre MSR en binaire
function net_id(pIPbin,pMSRbin) {
    //var adresse_ipbinaire = "10111010001110100101111010111001";
    //var MSRbinaire = "11101011011110101001010011101010";
    var final = "";
    //console.log("IP  est : " + pIPbin);
    //console.log("MSR est : " + pMSRbin);
    //boucle de condition, on effectue la boucle pour 1 octet soit 8 bits
    for (var j = 0; j < 8; j++) {
        //condition de comparaison, 1 et 1 renvoi 1 sinon 0
        if (pIPbin[j] == '1' && pMSRbin[j] == '1') {
            final += '1';
        } else {
            final += '0';
        }

    }
    //console.log("NET ID  : " + final);
return final;
}

//fonction de convertion du décimal en binaire et ajouter des 0 manquants si la longueur est <8
function convert(pDecimal){
    //console.log("pDecimal :"+pDecimal);
    //appel de la fonction toBin
    var pBinaire = toBin(pDecimal);
    while (pBinaire.length < 8) {
        pBinaire = "0" + pBinaire;
        //console.log("pBinaire :"+pBinaire);
    }
    //console.log("pBinaire :"+pBinaire);
    return pBinaire;
}

//fonction de convertion du binaire en décimal
function decimal(pBinaire) {
    //var binary = "1101000";
    var digit = parseInt(pBinaire, 2);
    console.log("decimal: "+digit);
return digit;
}
//fonction calcul de la wildcard équivalent a faire un masque a 255 pour chaque octet et on lui soustraie la valeur du MSR
function wildcard(pMSR){
    return 255-pMSR;
}
//fonction de calcul de la broadcast - on adition la wildcard au NetID
function broadcast(pWC,pNET){
    return pNET+pWC;
}

//fonction de controle des champs pour l'utilisateur pour éviter tout ce qui n'est pas un nombre
function controleNumbers(pString){
        var reg=new RegExp("^[0-9]*$","g");
        //pString va le remplacer / var ip1 = document.getElementById("MonChamp-Ip1").value;
        if (reg.test(pString)){
            console.log("RegEx : "+pString+" est valide");
            return true;
        }else{
            document.getElementById("Ane_de_Florent_erreur").value = "Caractères incorrects, veuillez entrer un ou plusieurs chiffre(s). ";
            console.log("RegEx : "+pString+" est invalide");
            return false;
        }
}
