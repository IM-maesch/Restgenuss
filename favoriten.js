import { supa } from "/supabase.js";

herzkontur.addEventListener('click', function () {
      // Wechsel zum nächsten Bild
      currentIndex = (currentIndex + 1) % bilder.length;
      herzkontur.src = bilder[currentIndex]; 
  }); 

  // Beispiel: Überprüfen, ob der Benutzer eingeloggt ist
const user = supa.auth.user();

if (!user) {
  // Der Benutzer ist nicht eingeloggt, zeige eine Meldung oder leite ihn zur Anmeldung weiter.
  alert("Bitte zuerst einloggen.");
  
}
const favoritenButton = document.getElementById("favoritenButton");

favoritenButton.addEventListener("click", addToFavorites);

async function addToFavorites() {
    const user = supa.auth.user();
    console.log("hello")

    if (!user) {
      alert("Bitte zuerst einloggen.");
      return;
    }
  

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
  

  