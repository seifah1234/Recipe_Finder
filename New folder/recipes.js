document.addEventListener("DOMContentLoaded", function () {
    const favoriteButtons = document.querySelectorAll('.add-to-favorites');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.recipe_card');

            const title = card.querySelector('h2').innerText;
            const description = card.querySelector('p:nth-of-type(2)').innerText.replace("Description: ", "");
            const ingredientsList = card.querySelectorAll('ul li');
            const image = card.querySelector('img').src;

            const ingredients = Array.from(ingredientsList).map(li => li.innerText);

            const recipe = {
                title,
                description,
                ingredients,
                image
            };

            const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const alreadyExists = existingFavorites.some(r => r.title === recipe.title);

            if (!alreadyExists) {
                existingFavorites.push(recipe);
                localStorage.setItem('favorites', JSON.stringify(existingFavorites));
                alert("Recipe added to favorites!");
            } else {
                alert("This recipe is already in your favorites.");
            }
        });
    });
});
