/*import { supa } from "/supabase.js";

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
    // Call a function to display recipe-buttons based on kategorie_id
    displayRecipesByCategory(kategorie_id);
    console.log(kategorie_id);
  }
});

// Buttons mit den Rezepttiteln anzeigen, die in der angeklickten Kategorie sind
async function displayRecipesByCategory(kategorie_id) {
  const { data, error } = await supa
    .from("rezepte")
    .select()
    .eq("kategorie_id", kategorie_id);
  
  if (data) {
    let container = document.querySelector("#rezeptVorschlag");
    container.innerHTML = ""; // Vorherigen Inhalt löschen
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

//-------------------------------------------------------
//Code zum öffnen der Rezeptseite

// Function to redirect to the recipe page based on the rezepte.id
function viewRecipe(event) {
  const clickedButton = event.target;
  const recipeId = clickedButton.getAttribute('data-recipe-id');
  if (recipeId) {
      window.location.href = `rezept.html?id=${recipeId}`;
  }
}

// Event listener to handle button clicks
document.addEventListener('click', function (event) {
  if (event.target && event.target.tagName === 'BUTTON') {
      viewRecipe(event);
  }
});


//-----------------------------------------------------------


//Aufruf der beiden weiter oben definierten Funktionen
console.log(showCategories());
console.log(showRezepte());

*/


import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden");

// Zeigt alle Kategorien an, soll beim Laden der Startseite ausgeführt werden
async function showCategories() {
  const { data, error } = await supa.from("kategorien").select();
  if (data) {
    console.log(data);
    let container = document.querySelector("#kategorien");
    data.forEach(kategorie => {
      let button = document.createElement("button");
      button.className = "box kategorie-button";
      button.id = `Kategorie-id-${kategorie.id}`;
      button.innerHTML = `<h2>${kategorie.name}</h2>`;

      // Add a click event listener for each category button
      button.addEventListener("click", () => {
        const kategorie_id = kategorie.id;
        displayRecipesByCategory(kategorie_id);
        console.log(kategorie_id);
      });

      container.appendChild(button);
    });
  }
}

// Buttons mit den Rezepttiteln anzeigen, die in der angeklickten Kategorie sind
async function displayRecipesByCategory(kategorie_id) {
  const { data, error } = await supa.from("rezepte").select().eq("kategorie_id", kategorie_id);

  if (data) {
    let container = document.querySelector("#rezeptVorschlag");
    container.innerHTML = ""; // Vorherigen Inhalt löschen
    data.forEach(rezepte => {
      let button = document.createElement("button");
      button.className = "box";
      button.setAttribute("data-recipe-id", rezepte.id);
      button.innerHTML = `<h2>${rezepte.rezeptname}</h2>`;

      // Add a click event listener for each recipe button
      button.addEventListener("click", () => {
        viewRecipe(rezepte.id);
      });

      container.appendChild(button);
    });
  }
}

// Function to redirect to the recipe page based on the rezepte.id
function viewRecipe(recipeId) {
  window.location.href = `rezept.html?id=${recipeId}`;
}

// Call the showCategories function when the page loads
document.addEventListener("DOMContentLoaded", showCategories);
