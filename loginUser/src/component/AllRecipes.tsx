import { useState, useEffect } from 'react';
import { Recipe } from '../models/Recipe';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AllRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // לאחסן את המתכונים
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [error, setError] = useState(null); // שגיאות
  const [selectedRecipe, setselectedRecipe] = useState<Recipe>();
  useEffect(() => {
    // קריאת API לשאיבת המתכונים
    fetch('http://localhost:3000/api/recipes')  // שים לב לכתובת ה-API שלך
      .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const mappedRecipes = data.map((recipe: any) => ({
          ...recipe,
          products: recipe.details, // כאן אנחנו ממירים את "details" ל-"products"
        }));
        setRecipes(mappedRecipes);  // הגדרת המתכונים
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);  // אם יש שגיאה, עדכון השגיאה
        setLoading(false);  // גם במקרה של שגיאה צריך להפסיק את מצב הטעינה
      });
  }, []);  // הפונקציה תרוץ רק פעם אחת בעת טעינת הקומפוננטה

  if (loading) {
    return <div>טוען...</div>;  // הצגת הודעת טעינה
  }

  if (error) {
    return <div>שגיאה: {error}</div>;  // הצגת שגיאה אם יש
  }

  const handleRecipeClick = (recipe: Recipe) => {
    setselectedRecipe(recipe);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", direction: "rtl" }}>
      <div style={{ width: "50%" }}>
        <h1>כל המתכונים</h1>
        <Grid container spacing={4}>
          {recipes.map(recipe => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ maxWidth: 345, direction: "rtl" }} onClick={() => handleRecipeClick(recipe)}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={'../../imags/food.jpg'}
                  title={recipe.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {recipe.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ width: "50%", padding: '50px', height: "100%" }}>
        {selectedRecipe ?   
          <Card sx={{ maxWidth: 345, direction: "rtl", 'css-ac9wnm-MuiPaper-root-MuiCard-root': { position: 'fixed' } }} >
            <CardMedia
              sx={{ height: 140 }}
              image={'../../imags/food.jpg'}
              title={selectedRecipe.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedRecipe.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedRecipe.products}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">לתגובות <CommentIcon /></Button>
              <Button size="small">אהבתי <FavoriteIcon /></Button>
            </CardActions>
          </Card> : <p></p>}
      </div>
    </div>
  );
}
