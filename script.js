import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden");


// Ruft die kategorienAnzeigen-Funktion auf, wenn die Seite geladen wird
document.addEventListener("DOMContentLoaded", kategorienAnzeigen);


// Zeigt alle Kategorien an, soll beim Laden der Startseite ausgeführt werden
async function kategorienAnzeigen() {
  const { data, error } = await supa.from("kategorien").select();
  if (data) {
    let container = document.querySelector("#kategorien");
    container.innerHTML = ''; // Leert den Container
    data.forEach(kategorie => {
      let button = document.createElement("button");
      button.className = "kategorie-box kategorie-button";
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
      
      // Set the background image for the button
      button.style.backgroundImage = `url(${rezepte.bild})`;

      // Create an <h2> tag for the recipe name and set its text content
      let h2 = document.createElement("h2");
      h2.textContent = rezepte.rezeptname;
      
      // Append the <h2> tag to the button
      button.appendChild(h2);

      // Fügt einen Klick-Ereignislistener zu jedem Rezept-Button hinzu
      button.addEventListener("click", () => {
        rezeptAufrufen(rezepte.id);
      });

      container.appendChild(button);
    });

    // Fügt den "Zurück zur Auswahl" Text hinzu
    let zurueckText = document.createElement("p");
    zurzueckText.className = "zurueck-text";
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




//-------------Anzeigen von zufälligen Rezepten auf der Startseite----------


// Funktion, um zufällige Rezept-Buttons anzuzeigen
async function displayRandomRecipeButtons() {
  const rezeptVorschlag = document.querySelector("#rezeptVorschlag");

  if (rezeptVorschlag) {

    // Alle gültigen Rezept-IDs aus der "rezepte"-Tabelle abrufen
    const { data: allRecipeIds, error: recipeIdsError } = await supa
      .from("rezepte")
      .select("id")
      .order("id");

    if (recipeIdsError) {
      console.error("Fehler beim Abrufen der Rezept-IDs:", recipeIdsError);
      return;
    }

    if (allRecipeIds && allRecipeIds.length > 0) {
      const uniqueRecipeIds = Array.from(new Set(allRecipeIds.map((id) => id.id)));

      // Die eindeutigen Rezept-IDs mischen, um eine zufällige Reihenfolge zu erhalten
      for (let i = uniqueRecipeIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueRecipeIds[i], uniqueRecipeIds[j]] = [uniqueRecipeIds[j], uniqueRecipeIds[i]];
      }

      // Die ersten 6 eindeutigen Rezepte anzeigen
      const randomRecipeIds = uniqueRecipeIds.slice(0, 6);

      randomRecipeIds.forEach(async (id) => {
        // Details des Rezepts basierend auf der ID abrufen
        const { data: recipe, error: recipeError } = await supa.from("rezepte").select().eq("id", id);

        if (recipeError) {
          console.error(`Fehler beim Abrufen des Rezepts mit ID ${id}:`, recipeError);
        }

        if (recipe && recipe.length > 0) {
          const recipeData = recipe[0];
        
          const button = document.createElement("button");
          button.className = "box recipe-button";
          button.setAttribute("data-recipe-id", recipeData.id);
        
          // Set the background image for the button
          button.style.backgroundImage = `url(${recipeData.bild})`;
        
          // Create an <h2> tag for the recipe name and set its text content
          let h2 = document.createElement("h2");
          h2.textContent = recipeData.rezeptname;
        
          // Append the <h2> tag to the button
          button.appendChild(h2);
        
          // Event listener to open the recipe when clicked
          button.addEventListener("click", () => {
            rezeptAufrufen(recipeData.id);
          });
        
          rezeptVorschlag.appendChild(button);
        }      
      });
    }
  }
}

// Aufrufen der Funktion zum Anzeigen zufälliger Rezeptbuttons, wenn die Seite geladen wird
document.addEventListener("DOMContentLoaded", () => {
  displayRandomRecipeButtons();
});




//-------------Generieren der Inhalte auf der Rezeptseite----------

// Anzeigen des Favoriten-Herz oben rechts
document.addEventListener('DOMContentLoaded', function () {
  const herzkontur = document.getElementById('herzkontur');
  const bilder = ['img/Heart_Kontur.svg', 'img/Heart_filled.svg'];
  let currentIndex = 0;

});

// Rezept-Anzeigen-Funktion
async function populateRecipeContent(recipeId) {
  const { data, error } = await supa.from("rezepte").select().eq("id", recipeId);

  if (data && data.length > 0) {
    const recipe = data[0];

    // Rezeptname einfüllen in h1-Tag
    document.querySelector("h1").textContent = recipe.rezeptname;

    // Bild-URL als source ins img-Tag (mit ID "rezeptBild") einfüllen
    const imgElement = document.querySelector("#rezeptBild"); // Update with the ID of the correct img tag
    imgElement.src = recipe.bild;
    imgElement.alt = "Beschreibung für das Bild (Bildquelle)";

    // Leert die Liste der Zutaten (mit ID "zutaten-liste")
    const ingredientsList = document.querySelector("#zutaten-liste");
    ingredientsList.innerHTML = '';

    // Fetch related zutaten based on recipe ID from the "relationstabelle"
    const relatedZutaten = await supa
      .from("relationstabelle")
      .select("zutaten_id")
      .eq("rezept_id", recipeId);

    if (relatedZutaten.data) {
      for (const { zutaten_id } of relatedZutaten.data) {
        // Fetch the zutat_name for each zutaten_id
        const zutatData = await supa.from("zutaten").select("zutat_Name").eq("id", zutaten_id);

        if (zutatData.data && zutatData.data.length > 0) {
          const zutatName = zutatData.data[0].zutat_Name;
          const liElement = document.createElement("li");
          liElement.textContent = zutatName;
          ingredientsList.appendChild(liElement);
        }
      }
    }

    // Rezeptanleitung in p-Tag einfüllen
    document.querySelector("p").textContent = recipe.anleitung;
  } else {
    console.error("Rezept wurde nicht gefunden.");
  }
}

// Aufrufen der Rezept-Anzeigen-Funktion beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  if (recipeId) {
    populateRecipeContent(recipeId);
  }
});






//-------------Funktionen für Magic Link----------
// Funktion, um Magic Link zu senden
async function sendMagicLink() {
  const email = document.getElementById('emailInput').value;
  const { error } = await supa.auth.signIn({ email });
  
  if (error) {

      console.error("Error sending magic link: ", error.message);
  } else {
      alert("Magic link sent to ", email);
  }
}
// Eventlistener für Magic Link Button
document.getElementById('sendMagicLinkButton').addEventListener('click', sendMagicLink);

// Funktion, um User Status zu aktualisieren
function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');
  
  if (user) {
      userStatusElement.textContent = `Authenticated as: ${user.id}`;
      console.log(user)
  } else {
      userStatusElement.textContent = "Not authenticated.";
  }
}

// Prüfe und zeige den initialen User Status an
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Listener, für Änderungen des Auth Status
// UserStatus wird aktualisiert, wenn sich der Auth Status ändert
supa.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
      console.log("User signed in: ", session.user);
      updateUserStatus(session.user);
  } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
      updateUserStatus(null);
  }
});


//http://resteverwerten:3000/ (URL, die zuvor bei Supabase hinterlegt war)