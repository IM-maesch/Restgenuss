import { supa } from "/supabase.js";


// Beispiel: Überprüfen, ob der Benutzer eingeloggt ist
const user = supa.auth.user();

if (!user) {
  alert("Bitte zuerst einloggen.");
} else {
  document.getElementById('userStatus').textContent = `Authenticated as: ${user.id}`;
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
  }
}

    // Annahme: data enthält die abgerufenen Rezeptdaten
    const rezeptContainer = document.getElementById('rezeptContainer');
   
  


// Funktion, um zur Rezeptseite zu gelangen
function rezeptAufrufen(recipeId) {
  window.location.href = `rezept.html?id=${recipeId}`;
}

// Funktion, um ein Rezept basierend auf seiner ID abzurufen
async function getRezeptByID(rezeptID) {
  const { data, error } = await supa.from('rezepte').select('*').eq('id', rezeptID);

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
      
      // Remove duplicates based on rezept_id
      const uniqueRecipes = [...new Set(data.map(item => item.rezept_id))];

      // Iteriere über die abgerufenen, eindeutigen Rezept-IDs
      uniqueRecipes.forEach(async (rezeptId) => {
        const rezeptData = await getRezeptByID(rezeptId);

        if (rezeptData) {
          // Erstelle HTML-Elemente, um die Rezeptdaten anzuzeigen und den Button zur Rezeptseite
          const rezeptButton = document.createElement('button');
          rezeptButton.className = 'box';
          rezeptButton.setAttribute('data-recipe-id', rezeptData.id);
          
          // Set the background image for the button
          rezeptButton.style.backgroundImage = `url(${rezeptData.bild})`;

          // Create an <h2> tag for the recipe name and set its text content
          const h2 = document.createElement('h2');
          h2.textContent = rezeptData.rezeptname;

          // Füge einen Klick-Ereignislistener zum Button hinzu
          rezeptButton.addEventListener('click', () => {
            rezeptAufrufen(rezeptData.id);
          });

          // Append the <h2> tag to the button
          rezeptButton.appendChild(h2);

          rezeptContainer.appendChild(rezeptButton);
        }
      });
    }
  }
}

anzeigenFavorisierteRezepte();



fav.addEventListener("click", addToFavorites);