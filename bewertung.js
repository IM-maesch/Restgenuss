import { supa } from "/supabase.js";


//-------------Funktionen fürs Bewerten der Rezepte----------

//Bewertung beim Laden der Seite anzeigen
document.addEventListener("DOMContentLoaded", async () => {
  // Ist die aufgerufene Seite rezept.html?
  if (window.location.pathname.endsWith("rezept.html")) {
    const averageRatingElement = document.getElementById("averageRating");
    const totalRatingsElement = document.getElementById("totalRatings");
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    // Abrufen von bewertung und anzahl_bewertung aus der Datenbank
    const { data, error } = await supa.from("rezepte")
      .select("bewertung, anzahl_bewertungen")
      .eq("id", recipeId);

    if (error) {
      console.error("Error fetching recipe data:", error);
      return;
    }

    const recipeData = data[0];

    if (recipeData) {
      // Runden der durchschnittlichen Bewertung auf eine Nachkommastelle
      const roundedBewertung = parseFloat(recipeData.bewertung).toFixed(1);

      // Einfügen ins HTML
      averageRatingElement.textContent = `${roundedBewertung}`;
      totalRatingsElement.textContent = `${recipeData.anzahl_bewertungen}`;
    }
  }
});

// Bewertung abschicken und aktualisieren
document.addEventListener("DOMContentLoaded", async () => {
  // Eventlistener für Bewertung-abschicken-Button
  const bewertungButton = document.getElementById("bewertungButton");
  bewertungButton.addEventListener("click", async () => {
    // Abrufen der Bewertungseingabe
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    
    if (selectedRating) {
      const ratingValue = parseInt(selectedRating.value);

      // Rezept-ID aus der URL holen
      const urlParams = new URLSearchParams(window.location.search);
      const recipeId = urlParams.get("id");

      // bewertung und anzahl_bewertung aus der Datenbank holen
      const { data, error } = await supa.from("rezepte")
        .select("bewertung, anzahl_bewertungen")
        .eq("id", recipeId);

      if (error) {
        console.error("Error fetching recipe data:", error);
        return;
      }

      const recipeData = data[0];

      if (recipeData) {
        // bewertung und anzahl_bewertung neu berechnen
        const currentRating = recipeData.bewertung;
        const currentRatingsCount = recipeData.anzahl_bewertungen;

        const newRating = ((currentRating * currentRatingsCount) + ratingValue) / (currentRatingsCount + 1);
        const newRatingsCount = currentRatingsCount + 1;

        // bewertung" und "anzahl_bewertungen" in Supabase aktualisieren
        const { updateError } = await supa.from("rezepte")
          .update({ bewertung: newRating, anzahl_bewertungen: newRatingsCount })
          .eq("id", recipeId);

        if (updateError) {
          console.error("Error updating recipe data:", updateError);
        } else {
          // HTML mit den neuen Werten aktualisieren
          const averageRatingElement = document.getElementById("averageRating");
          const totalRatingsElement = document.getElementById("totalRatings");
          averageRatingElement.textContent = `${newRating.toFixed(1)}`;
          totalRatingsElement.textContent = `${newRatingsCount}`;
        }
      }
    } else {
      // Fehlerhandling, wenn keine Bewertung ausgewählt wurde
      console.error("Please select a rating.");
    }
  });
}); 