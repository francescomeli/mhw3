function onResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}

function onError(error){
    console.log('Error:'+ error);
    
}
    //console.log(json.data);
    //console.log(json.data.attributes.name);
    //console.log(json.data.attributes.icon);
    //console.log(json.data.relationships.images.data[0].url);
    //console.log(json.data.attributes.description);

function onJson(json){
   const lista=document.querySelector("#risultato");
   lista.innerHTML='';
   const doc=json.data;

   if(doc){
       const tot=document.createElement("div");
       lista.appendChild(tot);
       const nome=doc.attributes.name;
       const icona=doc.attributes.icon;
       const immagine=doc.relationships.images.data[0].url;
       const descrizione=doc.attributes.description;
       const nome_res=document.createElement("h1");
       nome_res.textContent=nome;
       lista.appendChild(nome_res);
       const icona_res=document.createElement("img");
       icona_res.src=icona;
       lista.appendChild(icona_res);
       icona_res.classList.add("icona");
       const immagine_res=document.createElement("img");
       immagine_res.src=immagine;
       lista.appendChild(immagine_res);
       immagine_res.classList.add("foto");
       const descrizione_res=document.createElement("p");
       descrizione_res.textContent=descrizione;
       lista.appendChild(descrizione_res);
   }
   else{
       const niente=document.createElement("p");
       niente.textContent="Ci dispiace, lo sport che hai cercato non esiste oppure non ci sono informazioni a riguardo, prova con qualcos'altro.";
       lista.appendChild(niente);
       const non_trovata=document.createElement("img");
       non_trovata.src=["https://www.ilovetorino.com/wp-content/uploads/2014/01/Punto-di-domanda1-266x300.jpg"];
       lista.appendChild(non_trovata);
       non_trovata.classList.add("foto");
   }
}

function trovaSport(event){
    event.preventDefault();
    const input_search=document.querySelector("#sport");
    const value_search=encodeURIComponent(input_search.value);
   
    fetch("https://sports.api.decathlon.com/sports/"+value_search
    ).then(onResponse).then(onJson,onError);
    
}

const form = document.querySelector("#info");
form.addEventListener("submit",trovaSport);