async function getRecipes() {
    let url = 'recipe.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        return;
    }
}

async function renderRecipes() {
    let recipes = await getRecipes();
    let html = '';
    recipes.forEach(recipe => {
        let htmlSegment = `<div class="recipe">
                            <h2 class="recipeName">${recipe.name}</h2>
                            <div class="recipeCategory">${recipe.category}</div>
                            <div class="ingredients">`;
        (recipe.ingredients).forEach(ingredient => {
            htmlSegment += `<span class="col-sm-4 ingredient">${ingredient} </span>`;
        });
        htmlSegment += `</div><div class="ingredientPhoto">
                    <img width="200px" src="${recipe.photo}">
                    </div>
                    </div>`;

        html += htmlSegment;
    });

    let recipeContainer = document.querySelector('.recipeContainer');
    recipeContainer.innerHTML = html;

    setInterval(function() {
        var previous = null;
        var current = null;
        jQuery.getJSON("recipe.json", function(json) {       //TODO error, $.getJSON is not defined
            current = JSON.stringify(json);            
            if (previous && current && previous !== current) {
                console.log('refresh');
                renderRecipes();
            }
            previous = current;
        });                       
    }, 2000); 
}
setInterval(renderRecipes, 500);