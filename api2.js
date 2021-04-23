//Credenziali mie spotify
const client_id="15355e34f1ec424e93e84a102f5a39dc";
const client_secret="201267ce8ee3437cb6ccac749de415f7";

function onJson(json) {
    const lista = document.querySelector("#risultato");
    lista.innerHTML = '';
    const risultati = json.playlists.items;
    let num_ris = risultati.length;
    if(num_ris > 5){
      num_ris = 5;
    }

    for(let i=0; i<num_ris; i++){
      const singleplaylist_data = risultati[i];
      const titolo = singleplaylist_data.name;
      const immagine = singleplaylist_data.images[0].url;
      const singleplaylist = document.createElement("div");
      singleplaylist.classList.add("singleplaylist");
      const img = document.createElement("img");
      img.src = immagine;
      const tit = document.createElement("span");
      tit.textContent = titolo;
      singleplaylist.appendChild(img);
      singleplaylist.appendChild(tit);
      lista.appendChild(singleplaylist);
    }
}
  
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}
  
function trovaMusica(event){
    event.preventDefault();
    const playlist_input = document.querySelector("#playlist");
    const playlist_value = encodeURIComponent(playlist_input.value);
    console.log('Eseguo ricerca: ' + playlist_value);
    fetch("https://api.spotify.com/v1/search?type=playlist&q=" + playlist_value,{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
}
  
function onTokenJson(json){
    token = json.access_token;
}
function onTokenResponse(response){
    return response.json();
}

//Credenziali spotify
const client_id="--";
const client_secret="--";

let token;
fetch("https://accounts.spotify.com/api/token",{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
}
).then(onTokenResponse).then(onTokenJson);
  
const form = document.querySelector("#musica");
form.addEventListener("submit", trovaMusica);