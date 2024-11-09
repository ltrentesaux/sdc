let selectedIngredients = [];
let selectedAppliance = [];
let selectedUstensils = [];

document.addEventListener('DOMContentLoaded', () => {
    // Charger les données JSON et initialiser les filtres
    fetch('https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json')
        .then(response => response.json())
        .then(data => {
            displayRecipes(data);
            updateRecipeCount(data.length); // Met à jour le nombre de recettes
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));

    // Charger les listes pour les filtres
    fetch('ressources/listes.json')
        .then(response => response.json())
        .then(data => {
            populateSelect('ingredient-filter', data.Ingredients);
            populateSelect('appliance-filter', data.Appareils);
            populateSelect('util-filter', data.Ustensiles);
        })
        .catch(error => console.error('Erreur lors du chargement des listes:', error));

    // Écouter les changements sur les filtres
    document.getElementById('ingredient-filter').addEventListener('change', handleFilterChange);
    document.getElementById('appliance-filter').addEventListener('change', handleFilterChange);
    document.getElementById('util-filter').addEventListener('change', handleFilterChange);
});

// Fonction pour remplir les options des selects avec Choices.js
function populateSelect(selectId, items) {
    const selectElement = document.getElementById(selectId);
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });

    new Choices(selectElement, {
        searchEnabled: true,
        itemSelectText: '',
        shouldSort: false,
        placeholderValue: selectElement.options[0].text,
    });
}

function handleFilterChange(event) {
    const filterType = event.target.id;
    const value = event.target.value;

    if (value) {
        if (filterType === 'ingredient-filter' && !selectedIngredients.includes(value)) {
            selectedIngredients.push(value);
        } else if (filterType === 'appliance-filter' && !selectedAppliance.includes(value)) {
            selectedAppliance.push(value);
        } else if (filterType === 'util-filter' && !selectedUstensils.includes(value)) {
            selectedUstensils.push(value);
        }
        updateActiveFiltersDisplay();
        filterRecipes();
    }
}

function updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.getElementById('active-filters');
    activeFiltersContainer.innerHTML = ''; // Vider le conteneur

    [...selectedIngredients, ...selectedAppliance, ...selectedUstensils].forEach(item => {
        const filterDiv = document.createElement('div');
        filterDiv.classList.add('active-filter');
        filterDiv.innerHTML = `
            <span>${item}</span>
            <button onclick="removeFilter('${item}')">❌</button>
        `;
        activeFiltersContainer.appendChild(filterDiv);
    });
}

function removeFilter(item) {
    selectedIngredients = selectedIngredients.filter(ing => ing !== item);
    selectedAppliance = selectedAppliance.filter(app => app !== item);
    selectedUstensils = selectedUstensils.filter(ust => ust !== item);
    updateActiveFiltersDisplay();
    filterRecipes();
}

function filterRecipes() {
    fetch('https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json')
        .then(response => response.json())
        .then(data => {
            const filteredRecipes = data.filter(recipe => {
                const matchesIngredients = selectedIngredients.length === 0 || selectedIngredients.every(ing =>
                    recipe.ingredients.some(ingredient => ingredient.ingredient === ing)
                );
                const matchesAppliance = selectedAppliance.length === 0 || selectedAppliance.includes(recipe.appliance);
                const matchesUstensils = selectedUstensils.length === 0 || selectedUstensils.every(ust =>
                    recipe.ustensils.includes(ust)
                );

                // La recette est affichée seulement si elle satisfait tous les filtres actifs
                return matchesIngredients && matchesAppliance && matchesUstensils;
            });

            displayRecipes(filteredRecipes);
            updateRecipeCount(filteredRecipes.length);
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));
}



function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="ressources/images/recettes/${recipe.image}" alt="Image de ${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Recette:</strong></p>
            <p>${recipe.description}</p>
            <p><strong>Ingrédients:</strong></p>
            <ul>
                ${recipe.ingredients.map(ingredient => `
                    <li>
                        <b>${ingredient.ingredient}</b> <br>
                        ${ingredient.quantity ? `${ingredient.quantity} ` : ''} 
                        ${ingredient.unit ? ingredient.unit : ''}
                    </li>
                `).join('')}
            </ul>
            <p><strong>Temps:</strong> ${recipe.time} min</p>
        `;
        recipeList.appendChild(recipeCard);
    });
}

function updateRecipeCount(count) {
    const recipeCountElement = document.getElementById('recipe-count');
    recipeCountElement.textContent = count; // Met à jour l'élément avec le nombre de recettes
}
