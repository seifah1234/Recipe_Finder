class Recipe {
    constructor(id, name, course, description, instructions, duration, rate, image){
        this.id = id;
        this.name = name;
        this.course = course;
        this.description = description;
        this.instructions = instructions;
        this.duration = duration;
        this.rate = rate;
        this.image = image;
    }
}

class Ingredient {
    constructor(id, recipeId, name, quantity){
        this.id = id;
        this.name = name;
        this.recipeId = recipeId;
        this.quantity = quantity;
    }
}

let recipes = [];
if(localStorage.getItem('recipes')){
    recipes = JSON.parse(localStorage.getItem('recipes'));
    console.log(recipes)
}

let ingredients = [];
if(localStorage.getItem('ingredients')){
    ingredients = JSON.parse(localStorage.getItem('ingredients'));
    console.log(ingredients);
}


function fetchRecipes(){
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe_card';
        card.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Course:</strong> ${recipe.course}</p>
            <p><strong>Description:</strong> ${recipe.description}</p>
            <p><strong>Ingredients:</strong></p>
            <ul class="ingredients">
            </ul>
            <div class="buttons">
                <button id="edit_recipe" type="button">Edit</button>
                <button id="delete_recipe" type="button">Delete</button>
            </div>
        `;

        card.querySelector('#delete_recipe').addEventListener('click', () => {
            let recipesDelete = [];
            recipes.forEach(recipeD => {
                if(recipe.id != recipeD.id){
                    recipesDelete.push(recipeD);
                }
            });
            localStorage.setItem('recipes', JSON.stringify(recipesDelete));
            fetchRecipes();
        })

        card.querySelector('#edit_recipe').addEventListener('click', () => {
            window.location.href = `/details.html?id=${recipe.id}`;
        })
        
        ingredients.forEach(ingredient => {
            if(ingredient.recipeId == recipe.id){
                const ingredientRow = document.createElement('li');
                ingredientRow.innerHTML = `
                    ${ingredient.name} - ${ingredient.quantity}
                `;
                card.querySelector('.ingredients').append(ingredientRow);
            }
        });



        document.querySelector('.data').appendChild(card);
    });
}

document.querySelector('.add').addEventListener('click', () => {
    window.location.href = '/details.html';
});

fetchRecipes();