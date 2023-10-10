import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")


//Zeigt alle Kategorien an, soll beim Laden der Startseite ausgeführt werden
async function showCategories() {
  const { data, error } = await supa.from("kategorien").select();
  if(data)
  {
    let container= document.querySelector("#kategorien");
    data.forEach(kategorie=>{
    console.log(kategorie); 
    let output=`
      <button class="box kategorie-button" id="Kategorie-id-${kategorie.id}">
        <h2>${kategorie.name}</h2>
      </button>
      `;
    container.innerHTML+=output;
    })   
  }
};

//Zeigt nach dem Ausführen alle Rezepte von jeder Kategorie an
async function showRezepte() {
  const { data, error } = await supa.from("rezepte").select();
  if(data)
  {
    let container= document.querySelector("#rezeptVorschlag");
    data.forEach(rezepte=>{
    console.log(rezepte); 
    let output=`
      <button class="box">
        <h2>${rezepte.rezeptname}</h2>
      </button>
    `;
    container.innerHTML+=output;
    }) 
  }
}




//Beim Klick auf die Kategorie sollen alle Rezepte der Kategorie angezeigt werden.
//Javascript holt die ID des Buttons in HTML
//document.getElementById("demo").onclick = function() {myFunction()};

function myFunction() {
  //document.getElementById("rezeptVorschlag").innerHTML = ${kategorie_id}"; //Hier sollten nun alle Rezepte der jeweiligen Kategorie angezeigt werden

}
/*
return data;
*/


//Aufruf der beiden weiter oben definierten Funktionen
console.log(showCategories());
console.log(showRezepte());

