//---------------------Bewertungen für Rezepte verwalten---------------------

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/submitRating', (req, res) => {
  const rating = req.body.rating;
  // Perform the database update (update average rating and count).
  // Calculate the new average rating and update the rating count.
  // This is a simplified example; you'll need to adjust it to your Supabase setup.
  const newAverageRating = calculateAverageRating(rating);
  const newRatingCount = incrementRatingCount();
  res.json({ success: true, averageRating: newAverageRating, ratingCount: newRatingCount });
});

function calculateAverageRating(newRating) {
  // Retrieve the current average rating from the database and calculate the new average.
  // Ensure to properly update the average rating value in your database.
  // You might need to fetch the current average rating, calculate the new average, and update it.
  return updatedAverageRating;
}

function incrementRatingCount() {
  // Retrieve the current rating count from the database and increment it.
  // Ensure to properly update the rating count in your database.
  // You might need to fetch the current rating count, increment it, and update it.
  return updatedRatingCount;
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
