let cocktails;
let cocktail;
let cocktailInfoContainer;

const renderCocktails = function () {
    console.log(cocktails);
    let cocktailListContainer = document.getElementById('cocktailList');

    cocktails.forEach((cocktailObj) => {
        let cocktailItem = document.createElement('div');
        cocktailItem.classList.add('cocktail-item');

        let cocktailItemImage = document.createElement('img');
        cocktailItemImage.classList.add('cocktail-item-image');
        cocktailItemImage.src = cocktailObj.strDrinkThumb;

        let cocktailItemInfoContainer = document.createElement('div');
        cocktailItemInfoContainer.classList.add('cocktail-item-info-container');

        let cocktailItemTitle = document.createElement('h2');
        cocktailItemTitle.classList.add('cocktail-item-title');
        let cocktailItemTitleText = document.createTextNode(cocktailObj.strDrink);
        cocktailItemTitle.appendChild(cocktailItemTitleText);
        cocktailItemInfoContainer.appendChild(cocktailItemTitle);

        let cocktailItemViewMore = document.createElement('span');
        cocktailItemViewMore.classList.add('cocktail-item-view-more');
        let cocktailItemViewMoreText = document.createTextNode('View details');
        cocktailItemViewMore.appendChild(cocktailItemViewMoreText);

        cocktailItemViewMore.addEventListener('click', function () {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailObj.idDrink}`)
                .then((response) => response.json())
                .then((data) => (cocktail = data.drinks[0]))
                .then(renderCocktail);

            const cocktailInfoElement = document.getElementById('cocktailInfo');
            cocktailInfoElement.scrollIntoView();
        });

        cocktailItemInfoContainer.appendChild(cocktailItemViewMore);

        // Append to main element
        cocktailItem.appendChild(cocktailItemImage);
        cocktailItem.appendChild(cocktailItemInfoContainer);

        cocktailListContainer.appendChild(cocktailItem);
    });
};

const renderCocktail = function () {
    console.log(cocktail);
    let ingredients = [];

    // Elements
    let cocktailImage = document.getElementById('cocktailImage');
    let cocktailTitle = document.getElementById('cocktailTitle');
    let cocktailGlassText = document.getElementById('cocktailGlassText');
    let cocktailType = document.getElementById('cocktailType');
    let cocktailDirectionsText = document.getElementById('cocktailDirectionsText');
    let cocktailIngredientsContainer = document.getElementById('cocktailIngredientsContainer');

    cocktailImage.src = cocktail.strDrinkThumb;
    cocktailTitle.innerHTML = cocktail.strDrink;
    cocktailGlassText.innerHTML = cocktail.strGlass;
    cocktailType.innerHTML = cocktail.strAlcoholic;
    cocktailDirectionsText.innerHTML = cocktail.strInstructions;

    // Push all ingredients in object to ingredient array
    for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`] !== null && cocktail[`strIngredient${i}`] !== '') {
            ingredients.push(cocktail[`strIngredient${i}`]);
        } else {
            break;
        }
    }

    cocktailIngredientsContainer.innerHTML = '';
    ingredients.forEach((ingredient) => {
        let ingredientElement = document.createElement('span');
        ingredientElement.classList.add('ingredient');
        let ingredientElementText = document.createTextNode(ingredient);
        ingredientElement.appendChild(ingredientElementText);
        cocktailIngredientsContainer.appendChild(ingredientElement);
    });
};

fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => (cocktail = data.drinks[0]))
    .then(renderCocktail);

window.addEventListener('DOMContentLoaded', function () {
    cocktailInfoContainer = document.getElementById('cocktail-info');

    // Add event listener to "I'm feeling lucky" button
    let luckyButton = document.getElementById('luckyButton');
    luckyButton.addEventListener('click', function () {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then((response) => response.json())
            .then((data) => (cocktail = data.drinks[0]))
            .then(renderCocktail);
    });

    let searchBar = document.getElementById('searchBar');
    let searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function() {
        let searchBarText = searchBar.value;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarText}`)
            .then((response) => response.json())
            .then((data) => (cocktails = data.drinks))
            .then(renderCocktails);

        searchBar.value = '';
    });

    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            let searchBarText = searchBar.value;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarText}`)
            .then((response) => response.json())
            .then((data) => (cocktails = data.drinks))
            .then(renderCocktails);

        searchBar.value = '';
        }
    })
});
