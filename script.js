fetch('https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json')
    .then(response => response.json())
    .then(data => {
        displayRecipes(data);
    })
    .catch(error => console.error('Erreur lors du chargement des recettes:', error));

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="ressources/images/${recipe.image}" alt="Image de ${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Recette:</strong></p>
            <p> ${recipe.description} </p>
            <p><strong>Ingrédients:</strong></p>
            <ul>
                ${recipe.ingredients.map(ingredient => `
                    <li>
                        <b> ${ingredient.ingredient} </b> <br>
                        ${ingredient.quantity ? `: ${ingredient.quantity}` : ''} 
                        ${ingredient.unit ? ingredient.unit : ''}
                    </li>
                `).join('')}
            </ul>
            
            <p><strong>Temps:</strong> ${recipe.time} min</p>
        `;
        recipeList.appendChild(recipeCard);
    });
}
