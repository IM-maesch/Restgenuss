import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

// 1. **Alle Filme abrufen**: Hole alle Spalten aller Filme aus der Tabelle `movies`.

async function selectAllMovies() {
    const { data, error } = await supa.from("movies").select();
  
    return data;
  }

console.log('Alle Filme in der DB: ', selectAllMovies());