// Helper Functions
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Close Popups on Outside Click
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target.id);
    }
});

// Add Ingredient Functionality
document.getElementById('add-ingredient-button').addEventListener('click', () => {
    openPopup('ingredient-popup');
});

document.getElementById('save-ingredient-button').addEventListener('click', () => {
    const ingredient = document.getElementById('ingredient-input').value.trim();
    if (ingredient) {
        let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
        ingredients.push(ingredient);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        document.getElementById('ingredient-input').value = '';
        closePopup('ingredient-popup');
    }
});

// Create Recipe Functionality
document.getElementById('create-recipe-button').addEventListener('click', () => {
    openPopup('recipe-popup');
});

document.getElementById('add-dropdown-button').addEventListener('click', () => {
    populateDropdown();
});

function populateDropdown() {
    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const dropdownContainer = document.getElementById('dropdown-container');
    const dropdown = document.createElement('select');
    dropdown.className = 'dropdown';

    ingredients.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.textContent = ingredient;
        dropdown.appendChild(option);
    });

    dropdownContainer.appendChild(dropdown);
}

// Event Listener for Create Recipe Button
document.getElementById('create-recipe-btn').addEventListener('click', () => {
    const dropdowns = document.querySelectorAll('#dropdown-container select');
    const recipeName = document.getElementById('recipe-name-input').value.trim();
    const ingredients = [];

    dropdowns.forEach(dropdown => {
        ingredients.push(dropdown.value);
    });

    if (recipeName && ingredients.length > 0) {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push({ name: recipeName, ingredients: ingredients });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        document.getElementById('recipe-name-input').value = '';
        document.getElementById('dropdown-container').innerHTML = '';
        closePopup('recipe-popup');
    }
});

// Manage Ingredients Functionality
document.getElementById('manage-ingredients-button').addEventListener('click', () => {
    openPopup('manage-ingredients-popup');
    displayIngredients();
});

function displayIngredients() {
    const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';

    ingredients.forEach((ingredient, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            ingredients.splice(index, 1);
            localStorage.setItem('ingredients', JSON.stringify(ingredients));
            listItem.remove();
        });
        listItem.appendChild(deleteButton);
        ingredientsList.appendChild(listItem);
    });
}

// Manage Recipes Functionality
document.getElementById('manage-recipes-button').addEventListener('click', () => {
    openPopup('manage-recipes-popup');
    displayRecipes();
});

function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipesList = document.getElementById('recipes-list');
    recipesList.innerHTML = '';

    recipes.forEach((recipe, recipeIndex) => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.name;
        const ingredientsList = document.createElement('ul');

        recipe.ingredients.forEach((ingredient, ingredientIndex) => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = ingredient;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.addEventListener('click', () => {
                recipe.ingredients.splice(ingredientIndex, 1);
                if (recipe.ingredients.length === 0) {
                    recipes.splice(recipeIndex, 1);
                }
                localStorage.setItem('recipes', JSON.stringify(recipes));
                ingredientItem.remove();
                if (recipe.ingredients.length === 0) {
                    listItem.remove();
                }
            });
            ingredientItem.appendChild(deleteButton);
            ingredientsList.appendChild(ingredientItem);
        });

        const deleteRecipeButton = document.createElement('button');
        deleteRecipeButton.textContent = 'Delete Recipe';
        deleteRecipeButton.className = 'delete-btn';
        deleteRecipeButton.addEventListener('click', () => {
            recipes.splice(recipeIndex, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            listItem.remove();
        });

        listItem.appendChild(ingredientsList);
        listItem.appendChild(deleteRecipeButton);
        recipesList.appendChild(listItem);
    });
}
