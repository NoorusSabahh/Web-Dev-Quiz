import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Typography, List, ListItem, ListItemText, ListItemButton, Paper } from '@mui/material';

const UserDashboard = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipe/recipes', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log('Recipes fetched successfully:', response.data.recipes);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  fetchRecipes();
}, [user.token]); // Include user.token as a dependency to trigger the effect when it changes

const handleRecipeClick = async (recipeId) => {
  try {
    console.log(recipeId)
    console.log(`${user.token}`)
    const response = await axios.get(`http://localhost:3001/recipe/recipe/${recipeId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    console.log('Recipe details fetched successfully:', response.data.recipe);
    setSelectedRecipe(response.data.recipe);
  } catch (error) {
    console.error('An error occurred while fetching recipe details:', error);
  }
};


  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>User Dashboard</Typography>
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '10px', color: '#666' }}>Recipes</Typography>
        <List>
          {recipes && recipes.map((recipe) => (
            <ListItem key={recipe._id} disablePadding>
              <ListItemButton onClick={() => handleRecipeClick(recipe._id)}>
                <ListItemText primary={recipe.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Modal
        open={Boolean(selectedRecipe)}
        onClose={handleClosePopup}
        aria-labelledby="recipe-details-modal"
        aria-describedby="recipe-details"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper style={{ padding: '20px', maxWidth: '80%', maxHeight: '80%', overflowY: 'auto' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '10px', color: '#333' }}>Recipe Details</Typography>
          {selectedRecipe && (
            <div>
              <Typography variant="subtitle1" gutterBottom>Name: {selectedRecipe.name}</Typography>
              <Typography variant="subtitle1" gutterBottom>Description: {selectedRecipe.description}</Typography>
              <Typography variant="subtitle1" gutterBottom>Ingredients:</Typography>
              <List>
                {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient) => (
                  <ListItem key={ingredient._id}>
                    <ListItemText primary={ingredient.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </Paper>
      </Modal>
    </div>
  );
};

export default UserDashboard;
