import { supa } from "/supabase.js";



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

    data.forEach(rezept => {
      // Erstelle HTML-Elemente, um die Rezeptdaten anzuzeigen
  const rezeptElement = document.createElement('div');
  rezeptElement.innerHTML = `
  <h2>${rezept.name}</h2>
  <p>Zutaten: ${rezept.ingredients}</p>
  <p>Anweisungen: ${rezept.instructions}</p>
  `;
  rezeptContainer.appendChild(rezeptElement);
});

}
}

fav.addEventListener("click", addToFavorites);
