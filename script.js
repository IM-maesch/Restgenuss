import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")


//Zeigt alle Kategorien an, soll beim Laden der Startseite ausgeführt werden
async function showCategories() {
  const { data, error } = await supa.from("kategorien").select();
  if (data) {
    console.log(data);
    let container = document.querySelector("#kategorien");
    data.forEach(kategorie => {
      let output = `
        <button class="box kategorie-button" id="Kategorie-id-${kategorie.id}">
          <h2>${kategorie.name}</h2>
        </button>
      `;
      container.innerHTML += output;

    });
  }
}


// Add an event listener for button clicks
document.querySelector("#kategorien").addEventListener("click", function(event) {
  const clickedButton = event.target;
  if (clickedButton.classList.contains("kategorie-button")) {
    const kategorie_id = clickedButton.id.split("-")[2];
    // Call a function to display recipes based on kategorie_id
    displayRecipesByCategory(kategorie_id);
    console.log(kategorie_id);
  }
});

// Function to display recipes for a specific category
async function displayRecipesByCategory(kategorie_id) {
  const { data, error } = await supa
    .from("rezepte")
    .select()
    .eq("kategorie_id", kategorie_id);
  
  if (data) {
    let container = document.querySelector("#rezeptVorschlag");
    container.innerHTML = ""; // Clear previous content
    data.forEach(rezepte => {
      let output = `
        <button class="box">
          <h2>${rezepte.rezeptname}</h2>
        </button>
      `;
      container.innerHTML += output;
    });
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

