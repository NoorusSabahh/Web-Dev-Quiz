import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar } from '@mui/material';

const AdminDashboard = ({ user }) => {
  const [ingredientData, setIngredientData] = useState({
    name: '',
    description: ''
  });

  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    selectedIngredients: [],
    availableIngredients: [],
  });

  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axios.get('http://localhost:3001/ingredient/ingredients', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (Array.isArray(res.data.data)) {
          setRecipeData({ ...recipeData, availableIngredients: res.data.data });
        } else {
          console.error('Invalid data format for availableIngredients:', res.data);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
  
    fetchIngredients();
  }, [user.token, notification]); 

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientData({ ...ingredientData, [name]: value });
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: 'http://localhost:3001/ingredient/addIngredient',
        method: 'post',
        data: ingredientData,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setIngredientData({ name: '', description: '' });
      setNotification('Ingredient added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const recipeToAdd = {
        name: recipeData.name,
        description: recipeData.description,
        selectedIngredients: recipeData.selectedIngredients
      };
      await axios({
        url: 'http://localhost:3001/recipe/addRecipe',
        method: 'post',
        data: recipeToAdd,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRecipeData({ ...recipeData, name: '', description: '', selectedIngredients: [] });
      setNotification('Recipe added successfully');
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleIngredientSelection = (ingredientId) => {
    if (recipeData.selectedIngredients.includes(ingredientId)) {
      setRecipeData({
        ...recipeData,
        selectedIngredients: recipeData.selectedIngredients.filter(id => id !== ingredientId)
      });
    } else {
      setRecipeData({
        ...recipeData,
        selectedIngredients: [...recipeData.selectedIngredients, ingredientId]
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Admin Dashboard</Typography>
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#666' }}>Add Ingredient</Typography>
        <form onSubmit={handleAddIngredient} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={ingredientData.name}
            onChange={handleIngredientChange}
            required
            style={{ marginBottom: '10px', width: '300px' }}
          />
          <TextField
            label="Description"
            name="description"
            value={ingredientData.description}
            onChange={handleIngredientChange}
            required
            multiline
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <Button type="submit" variant="contained" color="primary">Add Ingredient</Button>
        </form>
      </div>
      <div>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#666' }}>Add Recipe</Typography>
        <form onSubmit={handleAddRecipe} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleRecipeChange}
            required
            style={{ marginBottom: '10px', width: '300px' }}
          />
          <TextField
            label="Description"
            name="description"
            value={recipeData.description}
            onChange={handleRecipeChange}
            required
            multiline
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <div style={{ marginBottom: '20px', width: '300px' }}>
            <Typography variant="subtitle1" style={{ marginBottom: '10px', color: '#666' }}>Select Ingredients:</Typography>
            <div style={{ maxHeight: '150px', overflowY: 'scroll', border: '1px solid #ccc', padding: '5px' }}>
              {recipeData.availableIngredients &&
                recipeData.availableIngredients.map((ingredient) => (
                  <div 
                    key={ingredient._id} 
                    style={{ cursor: 'pointer', backgroundColor: recipeData.selectedIngredients.includes(ingredient._id) ? 'lightblue' : 'white', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}
                    onClick={() => toggleIngredientSelection(ingredient._id)} 
                  >
                    {ingredient.name}
                  </div>
                ))
              }
            </div>
          </div>
          <Button type="submit" variant="contained" color="primary" style={{ width: '300px' }}>Add Recipe</Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(notification)}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notification}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default AdminDashboard;
