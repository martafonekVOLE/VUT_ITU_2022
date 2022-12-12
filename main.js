/**
 * @file main.js
 * 
 * @author Martin Pech (xpechm00)
 * @author David Konečný (xkonec83)
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
    // Event listeners for slow and fast render - David Konečný (xkonec83)
    const filter = document.getElementById("filter");
    if(filter){
        filter.addEventListener('focus', fastRender);
        filter.addEventListener('blur', slowRender);    
    }
    // --- END

    let recipes = await getRecipes();
    searchFor = "";
    if(document.getElementById('filter') != null){
        searchFor = document.getElementById('filter').value;
    }

    // Search by filter - David Konečný (xkonec83)
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
    // --- END
    
    let html = '';
    recipes.forEach(recipe => {
        let htmlSegment = `<div class="recipe" style="background: url('${recipe.photo}'); background-size: cover;" id="${recipe.id}">
                            <div class="nameSection">
                            <h2 class="recipeName" id="${recipe.id}_recipeName">${recipe.name}</h2>
                            <div class="recipeCategory" id="${recipe.id}_recipeCategory">${recipe.category}</div>       
                            <button class="btn btn-dark invisibleButton" onclick="modalTrigger(${recipe.id})">Zobrazit podrobnosti</button>
                            <button class="btn btn-success invisibleButton" onclick="swapContent(${recipe.id})">Vařit</button>   
                            <button class="btn btn-success invisibleButton" onclick="setCookie(${recipe.id})">Edit</button>     

                            </div>`;
        htmlSegment += `<div class="ingredientPhoto">
                    </div>
                    </div>`;

        html += htmlSegment;
    });

    let recipeContainer = document.querySelector('.recipeContainer');
    if(recipeContainer != null){
        recipeContainer.innerHTML = html;
    }
}

function setCookie(id){
    var now = new Date();
    now.setTime(now.getTime() + (10000));
    document.cookie = `id=${id}; expires=${now}`;
    modalTrigger(-20);
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
        var htmlContent = `<iframe src="createRecipe.html" class="formInModal" style="position: absolute" width="100%" height="100%">`;
        document.getElementById("modalText").innerHTML = htmlContent;
    }
    else if(id == -20){
        var htmlContent = `<iframe src="editJson2.php" class="formInModal" style="position: absolute" width="100%" height="100%">`;
        document.getElementById("modalText").innerHTML = htmlContent;
    }
    else{
        newid = String(id);
        console.log(newid);
        var recipeID = "_recipeName";
        if(document.getElementById(newid.concat(recipeID)) != null){
            console.log(document.getElementById(newid.concat(recipeID)).innerHTML);
            document.getElementById("modalText").innerHTML = document.getElementById(newid.concat(recipeID)).innerHTML;
        }
    }   
}

async function swapContent(id){
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

        document.querySelector('.recipeContent').innerHTML = await renderRecipe(id);
        
        //Possibility: 
        //Pass args to another functions that fills HTML form - this then prints
    }
}

function checkModal(){
    if(window.localStorage.getItem('closeModal') !== null){
        modalTrigger(-1);       
    }
}
var modal = document.getElementById("modal");

// Slow and fast render switching - David Konečný (xkonec83)
function fastRender()
{
    clearInterval(slowRenderValid);
    refreshInterval = 500;
    fastRenderValid = setInterval(renderRecipes, 500);
}

function slowRender()
{
    clearInterval(fastRenderValid);
    refreshInterval = 5000;
    slowRenderValid = setInterval(renderRecipes, 5000);
}
// --- END


var refreshInterval = 5000;
renderRecipes();

var fastRenderValid = 0;
var slowRenderValid = 0;

slowRenderValid = setInterval(renderRecipes, refreshInterval);
setInterval(checkModal, 500);




