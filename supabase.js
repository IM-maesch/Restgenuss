console.log("Initialisierung Supabase");

// Supabase Initialisierung

// Hier URL und Key eintragen
const supabaseUrl = 'https://ijtfbvtcexijparxbcwb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdGZidnRjZXhpanBhcnhiY3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTY4MjgsImV4cCI6MjAxMTg5MjgyOH0.JyeCX3_3_wiKU5TRUcdT_MXcoS6bs2eXYKQEJzA2Bco'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }



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
  
