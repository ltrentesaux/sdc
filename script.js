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
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut tortor porttitor, condimentum mauris ac, dignissim tellus. Integer at posuere lacus. Donec vitae ipsum elit. Integer vehicula mattis tempor. Aliquam ac congue diam. Nunc ut sollicitudin justo. Praesent mattis tellus non neque congue, non vehicula nunc facilisis. Vivamus nec arcu lectus. Praesent maximus vitae tortor sit amet finibus. Morbi efficitur orci sit amet erat ullamcorper suscipit. Aliquam aliquam, est vel aliquet maximus, mauris mauris finibus mi, ut ullamcorper metus quam nec lacus. Sed efficitur sed sem id ultricies. Vivamus in justo elit. Etiam nec malesuada quam, ut sagittis turpis. Maecenas sit amet turpis eleifend nibh vehicula consectetur eget eu magna. 
            </p>
            <p><strong>Ingrédients:</strong></p>
            <ul>
                ${recipe.ingredients.map(ingredient => `
                    <li>
                        ${ingredient.ingredient} 
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
