import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

// 1. **Alle Filme abrufen**: Hole alle Spalten aller Filme aus der Tabelle `movies`.

async function selectAllCategories() {
    const { data, error } = await supa.from("Kategorien").select();
  
    return data;
  }

console.log(selectAllCategories());