"use strict";  // pidä tämä ensimmäisenä rivinä
//@ts-check 

//Funktio radiobuttoneiden lisäämiseen sivulle
//sarjat: lista[] sarjojen nimiä
function lisaaRadio(sarjat){
    //järjestetään sarjat aakkosjärjestykseen
    sarjat.sort((a, b) => a.nimi > b.nimi);
    for(let i = 0; i < sarjat.length; i++){
        //Haetaan sarjaGroup div
        let group = document.getElementById("sarjaGroup");
        //Luodaan label ja radiobutton, yhdistetään nimi, id ynnämuu tarvittava ja lisätään sivulle
        let label = document.createElement("label");
        label.setAttribute("class", "radioB");
        label.name = "sarjaGroup";
        label.textContent = sarjat[i].nimi;
        let input = document.createElement("input");
        input.type = "radio";
        input.setAttribute("name", "radioGroup");
        if(i == 0){
            input.setAttribute("checked", true);
        }
        label.appendChild(input);
        group.appendChild(label);
    }
    
}


//Funktio jolla dynaamisesti lisätään ja poistetaan jäsen-input kenttiä
function checkFields(e){
    //Suuri osa tämän funktion koodista perustuu malliin "https://appro.mit.jyu.fi/tiea2120/luennot/forms/dynaaminen.html"
    //Koodia on muokattu tehtävään sopivaksi
    let field = document.getElementById("jasenet"); // live nodelist kaikista input-elementeistä
    let inputit = field.getElementsByTagName("input");
    let laskuri = document.getElementById("jasenet").getElementsByTagName("input").length;
    if(laskuri > 2){
        addNew();
    }
    else{
        //jos alkutilanteessa molempiin lisätään tekstiä
        if(inputit[0].value != "" && inputit[1].value != ""){
            let div = document.createElement("div");
            let label = document.createElement("label");
            label.setAttribute("class", "jasenet");
            label.setAttribute("for", "jäsen"+document.getElementById("jasenet").getElementsByTagName("input").length+1);
            label.textContent = "Jäsen ";
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.addEventListener("input", addNew);
            input.setAttribute("id", "jäsen"+document.getElementById("jasenet").getElementsByTagName("input").length+1);
            document.getElementById("jasenet").appendChild(div).appendChild(label).appendChild(input);
            for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
                let label = inputit[i].parentNode;
                label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
            }
        }
    }
    
    function addNew(e) {
        let tyhja = false;  // oletuksena ei ole löydetty tyhjää

        // käydään läpi kaikki input-kentät viimeisestä ensimmäiseen
        // järjestys on oltava tämä, koska kenttiä mahdollisesti poistetaan
        // ja poistaminen sotkee dynaamisen nodeList-objektin indeksoinnin
        // ellei poisteta lopusta 
        for(let i=inputit.length-1 ; i>-1; i--) { // inputit näkyvät ulommasta funktiosta
            let input = inputit[i];

            // jos on tyhjä ja on jo aiemmin löydetty tyhjä niin poistetaan
            if ( input.value.trim() == "" && tyhja) { // ei kelpuuteta pelkkiä välilyöntejä
                inputit[i+1].parentNode.remove(); // parentNode on label, joka sisältää inputin
            }

	    // onko tyhjä?
            if ( input.value.trim() == "") {
                    tyhja = true;
            }
        }

        // jos ei ollut tyhjiä kenttiä joten lisätään yksi
        if ( !tyhja) {
            let div = document.createElement("div");
            let label = document.createElement("label");
            label.setAttribute("class", "jasenet");
            label.setAttribute("for", "jäsen"+document.getElementById("jasenet").getElementsByTagName("input").length+1);
            label.textContent = "Kenttä";
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.addEventListener("input", addNew);
            input.setAttribute("id", "jäsen" + document.getElementById("jasenet").getElementsByTagName("input").length+1);
            document.getElementById("jasenet").appendChild(div).appendChild(label).appendChild(input);
        }

        // tehdään kenttiin numerointi
        for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
                let label = inputit[i].parentNode;
                label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
        }
        if(inputit.length < 2){
            let div = document.createElement("div");
            let label = document.createElement("label");
            label.setAttribute("class", "jasenet");
            label.setAttribute("for", "jäsen");
            label.textContent = "Jäsen ";
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.addEventListener("input", checkFields);
            document.getElementById("jasenet").appendChild(div).appendChild(label).appendChild(input);
            for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
                let label = inputit[i].parentNode;
                label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
            }
        }
    }
    if(inputit.length < 2){
        let div = document.createElement("div");
        let label = document.createElement("label");
        label.setAttribute("class", "jasenet");
        label.setAttribute("for", "jäsen");
        label.textContent = "Jäsen ";
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.addEventListener("input", checkFields);
        document.getElementById("jasenet").appendChild(div).appendChild(label).appendChild(input);
        for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta
            let label = inputit[i].parentNode;
            label.firstChild.nodeValue = "Jäsen " + (i+1); // päivitetään labelin ekan lapsen eli tekstin sisältö
        }
    }
}


//funktio jolla tarkistetaan että on annettu kaikki tarvittavat tiedot ja tallennetaan jos on
function tarkista(e){
    e.preventDefault();
    //Tarkistetaan että nimi on hyväksyttävä
    let nimi = document.getElementById("nimi");
    for(let i = 0; i < data.joukkueet.length; i++){
        if(data.joukkueet[i].nimi.toUpperCase().trim() == nimi.value.toUpperCase().trim()){
            nimi.setCustomValidity("Tämän niminen joukkue on jo");
            break;
        }
        else{
            nimi.setCustomValidity("");
        }
    }

    if(nimi.value.toUpperCase().trim().length < 2){
        nimi.setCustomValidity("Nimen on oltava vähintään 2 merkkiä pitkä");
    }

    //Lasketaan onko tarpeeksi nimiä ja tallennetaan löytyneet listaan
    let jasenet = document.getElementById("jasenet");
    let jasenlista = [];
    let laskuri = 0;
    
    for (let i = 0 ; i < jasenet.getElementsByTagName("input").length; i++){
        if(jasenet.getElementsByTagName("input")[i].value){
            jasenlista.push(jasenet.getElementsByTagName("input")[i].value);
            laskuri++;
        }
    }

    //Tarkistetaan että on annettu vähintään kaksi jäsentä
    if(laskuri < 2){
        jasenet.getElementsByTagName("input")[0].setCustomValidity("Anna vähintään kaksi nimeä");    
    }
    else{
        jasenet.getElementsByTagName("input")[0].setCustomValidity("");
    }
    

    //Tyhjennetään lista ja täytetään se uudelleen päivitetyillä tiedoilla
    if(document.getElementsByTagName("form")[0].reportValidity()){
        //haetaan valittu sarja
        let valittuSarja;
        let radiot = document.getElementById("sarjaGroup").getElementsByClassName("radioB");
        for(let i = 0; i < radiot.length; i++){
            if(radiot[i].childNodes[1].checked){
                valittuSarja = (radiot[i].childNodes[0].textContent);
                break;
            }
        }
        let sarjaID;
        for(let i = 0; i < data.sarjat.length; i++){
            if(data.sarjat[i].nimi == valittuSarja){
                sarjaID = data.sarjat[i].id;
                break;
            }
        }
        
        //Haetaan suurin id ja lisätään siihen 1
        let suurinID = 0;
        for(let i = 0; i < data.joukkueet.length; i++){
            if(data.joukkueet[i].id > suurinID){
                suurinID = data.joukkueet[i].id;
            }
        }
        suurinID = suurinID + 1;

        let joukkue = {nimi:nimi.value, jasenet:jasenlista, id:suurinID, rastit:[], leimaustapa:[0],sarja:sarjaID};
        data.joukkueet.push(joukkue);
        
        //Tyhjentää listan
        while(document.getElementById("listaus").firstChild){
            document.getElementById("listaus").removeChild(document.getElementById("listaus").firstChild);
        }
        listaa();
    }
}

//Funktio joukkueiden listaamiseen sivulle
function listaa(){
    let joukkuelista = [];
    let lista = document.getElementById("listaus");
    for(let i = 0; i < data.joukkueet.length; i++){
        let li = document.createElement("li");
        let nimet = [];
        li.textContent = data.joukkueet[i].nimi + " ";

        //Haetaan sarjan nimi, lisätään se strong elementtiin ja lisätään elementti joukkueen li-elementin ensimmäiseksi lapseksi 
        let sarjaID = data.joukkueet[i].sarja;
        let sarjaNimi;
        for(let j = 0; j < data.sarjat.length; j++){
            if(sarjaID == data.sarjat[j].id){
                sarjaNimi = data.sarjat[j].nimi;
                continue;
            }
        }
        let stronk = document.createElement("strong");
        stronk.textContent = sarjaNimi;
        li.appendChild(stronk);

        //Luodaan uusi lista johon sijoitetaan jäsenten nimet, sitten lisätään se joukkueen li-elementin toiseksi lapseksi
        let ul = document.createElement("ul");
        for(let j = 0; j < data.joukkueet[i].jasenet.length; j++){
            let nimi = document.createElement("li");
            nimi.textContent = data.joukkueet[i].jasenet[j];
            nimet.push(nimi);
        }
        nimet.sort((a, b) => a.textContent.toUpperCase() > b.textContent.toUpperCase());
        for(let j = 0; j < nimet.length; j++){
            ul.appendChild(nimet[j]);
        }
        li.appendChild(ul);
        joukkuelista.push(li);
    }

    //Järjestetään joukkue aakkosjärjestykseen
    joukkuelista.sort((a, b) => a.textContent.toUpperCase() > b.textContent.toUpperCase());
    for(let i = 0; i < joukkuelista.length; i++){
        lista.appendChild(joukkuelista[i]);
    }
}

window.addEventListener("load", function() {
    console.log(data);
    let sarjat = [];
    for(let i = 0; i < data.sarjat.length; i++){
        sarjat.push(data.sarjat[i]);
    }
    lisaaRadio(sarjat);

    let inputit = document.getElementById("jasenet").getElementsByTagName("input"); // live nodelist kaikista input-elementeistä
    inputit[0].addEventListener("input", checkFields);
    inputit[1].addEventListener("input", checkFields);

    let nappi = document.getElementById("nappi");
    nappi.addEventListener("click", tarkista);
    listaa();
});