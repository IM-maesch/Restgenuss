import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

// 1. **Alle Filme abrufen**: Hole alle Spalten aller Filme aus der Tabelle `movies`.

async function showCategories() {
  const { data, error } = await supa.from("kategorien").select();
  if(data)
  {
    let container= document.querySelector("#kategorien");
    data.forEach(kategorie=>{
    console.log(kategorie); 
    let output=`
      <button onclick="handleClick(1)" class="box">
        <h2>${kategorie.name}</h2>
      </button>
      `;
    container.innerHTML+=output;
    })   
  }
};
  
async function showRezepte() {
  const { data, error } = await supa.from("rezepte").select();
  if(data)
  {
    let container= document.querySelector("#rezeptVorschlag");
    data.forEach(rezepte=>{
    console.log(rezepte); 
    let output=`
      <button onclick="handleClick(1)" class="box">
        <h2>${rezepte.rezeptname}</h2>
      </button>
    `;
    container.innerHTML+=output;
    }) 
  }
}


  
/*
return data;
*/

console.log(showCategories());
console.log(showRezepte());