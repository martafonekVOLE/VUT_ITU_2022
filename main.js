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

async function renderRecipes(option = 0) {
    if(tokenMyRecipes == true){
        option = 1;
    }
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

    var cookies = [];
    if (document.cookie && document.cookie != '')
    {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++)
        {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
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
                if (option === 1)
                {
                    if (found[0] !== "")
                    {
                       for (var key in cookies)
                       {
                            console.log(cookies[key]);
                            if (cookies[key] == unfilteredRecipe.id)
                            {
                                recipes.push(unfilteredRecipe);
                            }

                       }
                    }
                }
                else
                {
                    if (found[0] !== "")
                    {
                        recipes.push(unfilteredRecipe);
                    }
                }
            }
            
            i++;
        });
    }
    // --- END
    
    let html = '';
    if(option == 1){
    recipes.forEach(recipe => {
        //if -> cookie vs recipe.id -> if true zobraz, if false nezobraz
        for (var key in cookies)
        {
             if (cookies[key] == recipe.id)
             {
                var htmlSegment = `<div class="recipe" style="background: url('${recipe.photo}'); background-size: cover;" id="${recipe.id}">
                <div class="nameSection">
                <h2 class="recipeName" id="${recipe.id}_recipeName">${recipe.name}</h2>
                <div class="recipeCategory" id="${recipe.id}_recipeCategory">${recipe.category}</div>       
                <button class="btn btn-dark invisibleButton" onclick="modalTrigger(${recipe.id})">Zobrazit podrobnosti</button>
                <button class="btn btn-success invisibleButton" onclick="swapContent(${recipe.id})">Vařit</button>   
                <br>
                <button class="btn btn-dark invisibleButton" onclick="setCookie(${recipe.id})">Editovat</button>     
                <button class="btn btn-warning invisibleButton" onclick="unsetCookieFavourite(${recipe.id})">Unlike</button>
                </div>`;
                htmlSegment += `<div class="ingredientPhoto">
                </div>
                </div>`;
                html += htmlSegment;
            }
            else{
            }

        }
    });
    }
    else{
        recipes.forEach(recipe => {
            //if -> cookie vs recipe.id -> if true zobraz, if false nezobraz
                    let htmlSegment = `<div class="recipe" style="background: url('${recipe.photo}'); background-size: cover;" id="${recipe.id}">
                    <div class="nameSection">
                    <h2 class="recipeName" id="${recipe.id}_recipeName">${recipe.name}</h2>
                    <div class="recipeCategory" id="${recipe.id}_recipeCategory">${recipe.category}</div>       
                    <button class="btn btn-dark invisibleButton" onclick="modalTrigger(${recipe.id})">Zobrazit podrobnosti</button>
                    <button class="btn btn-success invisibleButton" onclick="swapContent(${recipe.id})">Vařit</button>   
                    <br>
                    <button class="btn btn-dark invisibleButton" onclick="setCookie(${recipe.id})">Editovat</button>`
                    var tokenReady = false;
                    for (var key in cookies){
                        if(cookies[key] == recipe.id){
                            tokenReady = true;
                        }
                    }

                    if(!tokenReady){
                        htmlSegment += `<button class="btn btn-danger invisibleButton" onclick="setCookieFavourite(${recipe.id})">Like</button>`;
                    }     
                    else{
                        htmlSegment += `<button class="btn btn-warning invisibleButton" onclick="unsetCookieFavourite(${recipe.id})">Unlike</button>`;
                    }

                    htmlSegment += `</div><div class="ingredientPhoto"></div></div>`;

            html += htmlSegment;
        });
    }

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

function setCookieFavourite(id)
{
    var now = new Date();
    now.setTime(now.getTime() + (1000*60*60*24*365));
    document.cookie = `id_favourite${id}=${id}; expires=${now}`;
    renderRecipes();
}
function unsetCookieFavourite(id)
{
    document.cookie = `id_favourite${id}=${id} ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
    renderRecipes();

}

async function modalTrigger(id){
    console.log("modal fired");
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
        var htmlContent = `<iframe src="createRecipe.html" class="formInModal" style="position: absolute" width="100%" height="200%">`;
        document.getElementById("modalText").innerHTML = htmlContent;
    }
    else if(id == -20){
        var htmlContent = `<iframe src="editJson2.php" class="formInModal" style="position: absolute" width="100%" height="200%">`;
        document.getElementById("modalText").innerHTML = htmlContent;
    }
    else{
        newid = String(id);
        console.log(newid);
        var recipeID = "_recipeName";
        if(document.getElementById(newid.concat(recipeID)) != null){
            console.log(document.getElementById(newid.concat(recipeID)).innerHTML);
            document.getElementById("modalText").innerHTML = await renderRecipePreview(id);
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

async function refreshContent(id){
    document.querySelector('.recipeContent').innerHTML = await renderRecipe(id);
    if(document.getElementById("recipe-header") != null){
        document.getElementById("recipe-header").scrollIntoView();
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
    //fastRenderValid = setInterval(function() {renderRecipes(1);}, 500);
    fastRenderValid = setInterval(renderRecipes, 500);
}

function slowRender()
{
    clearInterval(fastRenderValid);
    refreshInterval = 5000;
    slowRenderValid = setInterval(renderRecipes, 5000);
}
// --- END


function fillDoc()
{     
    document.getElementById("filter").value = document.getElementById("filterMain").value; 
}  

function swapPages()
{     
    if (document.getElementById("displayLandingPage").style.display == "none") 
    {         
        document.getElementById("displayLandingPage").style.display = "block";         
        document.getElementById("displayLandingPage").style.height = "100%";         
        document.getElementById("displayRecipes").style.display = "none";     
    }     
    else
    {         
        document.getElementById("displayLandingPage").style.height = "100vh";         
        document.getElementById("displayLandingPage").style.display = "none";         
        document.getElementById("displayRecipes").style.display = "block";         
        fillDoc();         
        fastRender();         
        slowRender();//Todo fix!     
    }  
}
function showLiked(){
    swapPages();
    tokenMyRecipes = true;
    renderRecipes();
}
function enableLiked(){
    tokenMyRecipes = true;
    renderRecipes();
}
function disableLiked(){
    tokenMyRecipes = false;
    renderRecipes();
}

var tokenMyRecipes = false;
var refreshInterval = 5000;
renderRecipes();

var fastRenderValid = 0;
var slowRenderValid = 0;

slowRenderValid = setInterval(renderRecipes, refreshInterval);
setInterval(checkModal, 500);




