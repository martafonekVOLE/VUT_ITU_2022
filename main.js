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

    //TODO renderRecipes > defaultní čas
    //TODO ziskat informaci o stavu pole
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
        let htmlSegment = `<div class="recipe" style="background: url('${recipe.photo}'); background-size: cover;" id="${recipe.id}">
                            <div class="nameSection">
                            <h2 class="recipeName" id="${recipe.id}_recipeName">${recipe.name}</h2>
                            <div class="recipeCategory" id="${recipe.id}_recipeCategory">${recipe.category}</div>       
                            <button class="btn btn-dark invisibleButton" onclick="modalTrigger(${recipe.id})">Zobrazit podrobnosti</button>
                            <button class="btn btn-success invisibleButton" onclick="swapContent(${recipe.id})">Vařit</button>     
                            </div>                
                            <div class="ingredients" id="${recipe.id}_recipeCategory">`;
        (recipe.ingredients).forEach(ingredient => {
            htmlSegment += `<span class="col-sm-4 ingredient">${ingredient} </span>`;
        });
        htmlSegment += `</div><div class="ingredientPhoto">
                    </div>
                    </div>`;

        html += htmlSegment;
    });

    let recipeContainer = document.querySelector('.recipeContainer');
    recipeContainer.innerHTML = html;
}

function modalTrigger(id){
    if(window.localStorage.getItem('closeModal') !== null){
        window.localStorage.removeItem("closeModal");
    }

    if(modal.style.display == "block"){
        modal.style.display = "none";
    }
    else{
        modal.style.display = "block";
    }

    if(id == -10){
        var htmlContent = `<iframe src="createRecipe.html" class="formInModal" width="100%" height="400">`;
        document.getElementById("modalText").innerHTML = htmlContent;
    }
    else{
        newid = String(id);
        console.log(newid);
        var recipeID = "_recipeName";
        console.log(document.getElementById(newid.concat(recipeID)).innerHTML);
        document.getElementById("modalText").innerHTML = document.getElementById(newid.concat(recipeID)).innerHTML;
    }   
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
function checkModal(){
    if(window.localStorage.getItem('closeModal') !== null){
        modalTrigger(-1);
    }
}
var modal = document.getElementById("modal");
//TODO refresh only when necessary  -> animations
//TODO replace 4000 with var

setInterval(renderRecipes, 4000);
setInterval(checkModal, 500);
