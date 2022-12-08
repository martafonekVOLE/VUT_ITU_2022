/**
 * File: Main.js
 * 
 * Author: Martin Pech (xpechm00)
 */

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
    searchFor = "";
    searchFor = document.getElementById('filter').value;

    // Search by filter
    if (searchFor !== "")
    {
        let unfilteredRecipes = recipes;
        recipes = [];

        let expression = `^${searchFor}*`;
        let regex = new RegExp(expression, 'igu');

        i = 0;

        unfilteredRecipes.forEach(unfilteredRecipe => {

            const found = unfilteredRecipe.name.match(regex);

            if (found)
            {
                if (found[0] !== "")
                {
                    recipes.push(unfilteredRecipe);
                }
            }
            
            i++;
        });
    }

    
    let html = '';
    recipes.forEach(recipe => {
        let htmlSegment = `<div class="recipe" id="${recipe.id}">
                            <button onclick="modalTrigger(${recipe.id})">modal</button>
                            <button onclick="swapContent(${recipe.id})">swap</button>
                            <h2 class="recipeName" id="${recipe.id}_recipeName">${recipe.name}</h2>
                            <div class="recipeCategory" id="${recipe.id}_recipeCategory">${recipe.category}</div>
                            <div class="ingredients" id="${recipe.id}_recipeCategory">`;
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
}

function modalTrigger(id){
    if(modal.style.display == "block"){
        modal.style.display = "none";
    }
    else{
        modal.style.display = "block";
    }

    newid = String(id);
    console.log(newid);
    var recipeID = "_recipeName";
    console.log(document.getElementById(newid.concat(recipeID)).innerHTML);
    document.getElementById("modalText").innerHTML = document.getElementById(newid.concat(recipeID)).innerHTML;
}

function swapContent(id){
    newid = String(id);
    console.log(newid);
    var recipeID = "_recipeName";
    var recipeName = (document.getElementById(newid.concat(recipeID)).innerHTML);
    
    if(document.getElementById("mainContent").classList.contains('recipeContainer')){
        document.getElementById("mainContent").classList.remove('recipeContainer');
        document.getElementById("mainContent").style.display = 'none';
    }
    else{
        document.getElementById("mainContent").classList.add('recipeContainer');
        document.getElementById("mainContent").style.display = 'block';
    }

    if(document.getElementById("mainContent2").classList.contains('recipeContent')){
        document.getElementById("mainContent2").classList.remove('recipeContent');
        document.getElementById("mainContent2").style.display = 'none';
    }
    else{
        document.getElementById("mainContent2").classList.add('recipeContent');
        document.getElementById("mainContent2").style.display = 'block';

        document.querySelector('.recipeContent').innerHTML = renderMe(recipeName); 
        
        //Possibility: 
        //Pass args to another functions that fills HTML form - this then prints
    }
}

function renderMe(recipeName){
    return ("HELLO" + recipeName);
}
var modal = document.getElementById("modal");
setInterval(renderRecipes, 500);
