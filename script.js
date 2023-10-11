import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden");

// Zeigt alle Kategorien an, soll beim Laden der Startseite ausgeführt werden
async function kategorienAnzeigen() {
  const { data, error } = await supa.from("kategorien").select();
  if (data) {
    console.log(data);
    let container = document.querySelector("#kategorien");
    container.innerHTML = ''; // Leert den Container
    data.forEach(kategorie => {
      let button = document.createElement("button");
      button.className = "box kategorie-button";
      button.id = `Kategorie-id-${kategorie.id}`;
      button.innerHTML = `<h2>${kategorie.name}</h2>`;

      // Fügt einen Klick-Ereignislistener zu jedem Kategorie-Button hinzu
      button.addEventListener("click", () => {
        const kategorie_id = kategorie.id;
        rezepteDerKategorieAnzeigen(kategorie_id);
        console.log(kategorie_id);
      });

      container.appendChild(button);
    });
  }

  // Fügt den "Zurück zur Auswahl" Text hinzu
  let zurueckText = document.createElement("p");
  zurueckText.className = "zurueck-text";
  zurueckText.innerHTML = "Zurück zur Auswahl";
  zurueckText.addEventListener("click", () => {
    kategorienAnzeigen();
  });
  container.appendChild(zurueckText);
}

// Buttons mit den Rezepttiteln anzeigen, die in der angeklickten Kategorie sind
async function rezepteDerKategorieAnzeigen(kategorie_id) {
  const { data, error } = await supa.from("rezepte").select().eq("kategorie_id", kategorie_id);

  if (data) {
    let container = document.querySelector("#kategorien");
    container.innerHTML = ''; // Leert den Container
    data.forEach(rezepte => {
      let button = document.createElement("button");
      button.className = "box";
      button.setAttribute("data-recipe-id", rezepte.id);
      button.innerHTML = `<h2>${rezepte.rezeptname}</h2>`;

      // Fügt einen Klick-Ereignislistener zu jedem Rezept-Button hinzu
      button.addEventListener("click", () => {
        rezeptAufrufen(rezepte.id);
      });

      container.appendChild(button);
    });

    // Fügt den "Zurück zur Auswahl" Text hinzu
    let zurueckText = document.createElement("p");
    zurueckText.className = "zurueck-text";
    zurueckText.innerHTML = "Zurück zur Auswahl";
    zurueckText.addEventListener("click", () => {
      kategorienAnzeigen();
    });
    container.appendChild(zurueckText);
  } else {
    // Wenn keine Rezepte gefunden wurden, nur "Zurück zur Auswahl" anzeigen
    container.innerHTML = '';
    container.appendChild(zurueckText);
  }
}

// Funktion zum Weiterleiten zur Rezeptseite basierend auf rezepte.id
function rezeptAufrufen(recipeId) {
  window.location.href = `rezept.html?id=${recipeId}`;
}

// Ruft die kategorienAnzeigen-Funktion auf, wenn die Seite geladen wird
document.addEventListener("DOMContentLoaded", kategorienAnzeigen);





//-------------Generieren der Inhalte auf der Rezeptseite----------
// Function to populate the recipe content based on the recipeId
async function populateRecipeContent(recipeId) {
  const { data, error } = await supa.from("rezepte").select().eq("id", recipeId);

  if (data && data.length > 0) {
    const recipe = data[0];

    // Update the h1 tag with the rezeptname
    document.querySelector("h1").textContent = recipe.rezeptname;

    // Update the img src with the bild
    const imgElement = document.querySelector("img");
    imgElement.src = recipe.bild;
    imgElement.alt = "Beschreibung für das Bild (Bildquelle)";

    // Update the unordered list for ingredients
    const ingredientsList = document.querySelector("ul");
    ingredientsList.innerHTML = "";

    const relatedZutaten = await supa
      .from("relationstabelle")
      .select("zutaten_id")
      .eq("rezept_id", recipeId);

    if (relatedZutaten.data) {
      relatedZutaten.data.forEach(({ zutaten_id }) => {
        const zutat = supa.from("zutaten").select("zutat_name").eq("id", zutaten_id);
        if (zutat.data) {
          const liElement = document.createElement("li");
          liElement.textContent = zutat.data[0].zutat_name;
          ingredientsList.appendChild(liElement);
        }
      });
    }

    // Update the p tag with the recipe anleitung
    document.querySelector("p").textContent = recipe.anleitung;
  } else {
    console.error("Recipe not found.");
  }
}

// Get the URL parameter "id" to determine which recipe to display
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");

// Call the function to populate the content when the page loads
document.addEventListener("DOMContentLoaded", () => {
  if (recipeId) {
    populateRecipeContent(recipeId);
  }
});
