
// let response = fetch('recepie.json')
//     .then (response => {
//         response.json();
//         console.log(response.status); //200
//     })
//     .catch(error =>{
//         console.log("An Error has occured while parsing .json");
//     });

async function getRecipe() {
    let url = 'recipe.json';
    try{
        let response = await fetch(url);
        return await response.json();
    }
    catch(error){
        console.log("An Error has occured while fetching json.");
    }
}

async function renderRecipe(){
    let recipes = getRecipe();
    let html = '';
    recipes.forEach(recipe =>{
        let htmlSegment = '<div class="user"> <h2>${recipe.id}</h2>';
        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderRecipe();




