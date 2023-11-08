/*import { supa } from "/supabase.js";



// Beispiel: Überprüfen, ob der Benutzer eingeloggt ist
const user = supa.auth.user();

if (!user) {
  alert("Bitte zuerst einloggen.");
} else {
  document.getElementById('userStatus').textContent = `Authenticated as: ${user.id}`
}

const fav = document.getElementById("favoritenButton");

if(fav){
fav.addEventListener('click', function () {
      // Wechsel zum nächsten Bild
      currentIndex = (currentIndex + 1) % bilder.length;
      fav.src = bilder[currentIndex]; 
  }); }


  
  async function addToFavorites() {
    const user = supa.auth.user();
    console.log("Benutzer-ID:", user.id)

    
    
    console.log("Benutzer-ID:", user.id);
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");
    console.log("Rezept-ID:", recipeId);
    
    // Füge das Rezept in die relation_fav_rezept Liste hinzu
    const { data, error } = await supa
    .from("user_faved_rezept")
    .insert([
      { user_id: user.id, rezept_id: recipeId }
    ]);
  
    if (error) {
      console.error("Fehler beim Hinzufügen des Rezepts zu den Favoriten:", error);
    } else {
      alert("Rezept wurde zu den Favoriten hinzugefügt!");
    }
  }
  

        // Daten von Supabase abrufen um in favoriten.html zu implementieren
        
if (user) {
  const { data, error } = await supa
  .from('user_faved_rezept')
  .select('rezept_id')
  .eq('user_id', user.id)
  
  if (error) {
    console.error('Fehler beim Abrufen der favorisierten Rezepte:', error);
  } else {
    // Hier kannst du mit den abgerufenen Daten arbeiten (z. B. sie auf deiner Webseite anzeigen)
    console.log('Favorisierte Rezepte:', data);
    // Zeige die Rezepte auf deiner Webseite an
    
    
    // Annahme: data enthält die abgerufenen Rezeptdaten
    const rezeptContainer = document.getElementById('rezeptContainer');
    
    let rezept = data[0].rezept_id;
    console.log(rezept);

    data.forEach(rezept => {
      // Erstelle HTML-Elemente, um die Rezeptdaten anzuzeigen
  const rezeptElement = document.createElement('div');
  
  rezeptElement.innerHTML = `<h2>${rezept.rezeptname}</h2>`;
  rezeptContainer.appendChild(rezeptElement);
});

}
}

fav.addEventListener("click", addToFavorites);
*/


/*
import { supa } from "/supabase.js";

// Beispiel: Überprüfen, ob der Benutzer eingeloggt ist
const user = supa.auth.user();

if (!user) {
  alert("Bitte zuerst einloggen.");
} else {
  document.getElementById('userStatus').textContent = `Authenticated as: ${user.id}`;
}

const fav = document.getElementById("favoritenButton");

if (fav) {
  fav.addEventListener('click', function () {
    // Wechsel zum nächsten Bild
    currentIndex = (currentIndex + 1) % bilder.length;
    fav.src = bilder[currentIndex];
  });
}

// Funktion, um ein Rezept basierend auf seiner ID abzurufen
async function getRezeptByID(rezeptID) {
  const { data, error } = await supa.from('rezepte').select('rezeptname').eq('id', rezeptID);

  if (error) {
    console.error('Fehler beim Abrufen des Rezepts:', error);
    return null;
  }

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

async function addToFavorites() {
  const user = supa.auth.user();
  console.log("Benutzer-ID:", user.id);

  console.log("Benutzer-ID:", user.id);
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  console.log("Rezept-ID:", recipeId);

  // Füge das Rezept in die relation_fav_rezept Liste hinzu
  const { data, error } = await supa
    .from("user_faved_rezept")
    .insert([
      { user_id: user.id, rezept_id: recipeId }
    ]);

  if (error) {
    console.error("Fehler beim Hinzufügen des Rezepts zu den Favoriten:", error);
  } else {
    alert("Rezept wurde zu den Favoriten hinzugefügt!");
  }
}

// Daten von Supabase abrufen, um in favoriten.html zu implementieren
if (user) {
  const { data, error } = await supa
    .from('user_faved_rezept')
    .select('rezept_id')
    .eq('user_id', user.id);

  if (error) {
    console.error('Fehler beim Abrufen der favorisierten Rezepte:', error);
  } else {
    // Hier kannst du mit den abgerufenen Daten arbeiten (z. B. sie auf deiner Webseite anzeigen)
    console.log('Favorisierte Rezepte:', data);
    // Zeige die Rezepte auf deiner Webseite an

    const rezeptContainer = document.getElementById('rezeptContainer');

    // Iteriere über die abgerufenen Rezept-IDs
    data.forEach(async (favedRezept) => {
      const rezeptData = await getRezeptByID(favedRezept.rezept_id);

      if (rezeptData) {
        // Erstelle HTML-Elemente, um die Rezeptdaten anzuzeigen
        const rezeptElement = document.createElement('div');
        rezeptElement.innerHTML = `<h2>${rezeptData.rezeptname}</h2>`;
        rezeptContainer.appendChild(rezeptElement);
      }
    });
  }
}

fav.addEventListener("click", addToFavorites);
*/




import { supa } from "/supabase.js";

// Beispiel: Überprüfen, ob der Benutzer eingeloggt ist
const user = supa.auth.user();

if (!user) {
  alert("Bitte zuerst einloggen.");
} else {
  document.getElementById('userStatus').textContent = `Authenticated as: ${user.id}`;
}

// Funktion, um zur Rezeptseite zu gelangen
function rezeptAufrufen(recipeId) {
  window.location.href = `rezept.html?id=${recipeId}`;
}

// Funktion, um ein Rezept basierend auf seiner ID abzurufen
async function getRezeptByID(rezeptID) {
  const { data, error } = await supa.from('rezepte').select('rezeptname, bild').eq('id', rezeptID);

  if (error) {
    console.error('Fehler beim Abrufen des Rezepts:', error);
    return null;
  }

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

// Funktion zum Anzeigen der favorisierten Rezepte
async function anzeigenFavorisierteRezepte() {
  if (user) {
    const { data, error } = await supa
      .from('user_faved_rezept')
      .select('rezept_id')
      .eq('user_id', user.id);

    if (error) {
      console.error('Fehler beim Abrufen der favorisierten Rezepte:', error);
    } else {
      const rezeptContainer = document.getElementById('rezeptContainer');

      // Iteriere über die abgerufenen Rezept-IDs
      data.forEach(async (favedRezept) => {
        const rezeptData = await getRezeptByID(favedRezept.rezept_id);

        if (rezeptData) {
          // Erstelle HTML-Elemente, um die Rezeptdaten anzuzeigen und den Link zur Rezeptseite
          const rezeptElement = document.createElement('div');
          const rezeptLink = document.createElement('a');
          rezeptLink.href = `rezept.html?id=${rezeptData.id}`; // Hier die URL zur Rezeptseite eintragen
          rezeptLink.textContent = rezeptData.rezeptname;
          rezeptLink.addEventListener('click', (e) => {
            e.preventDefault();
            rezeptAufrufen(rezeptData.id);
          });
          // Füge das Rezeptbild hinzu
          const rezeptBild = document.createElement('img');
          rezeptBild.src = rezeptData.bild_url;
          rezeptBild.alt = rezeptData.rezeptname;

          rezeptLink.appendChild(rezeptBild);
          rezeptElement.appendChild(rezeptLink);
          rezeptContainer.appendChild(rezeptElement);
        }
      });
    }
  }
}

anzeigenFavorisierteRezepte();
