async function getRecipeById(id) {
    const recipes = await getRecipes();
    recipes.forEach(recipe => {
        if (recipe.id == id) {
            console.log("Retruning " + recipe.name);
            return recipe;
        }
    })
}

async function getIngredientsByRecipeId(id) {
    return getRecipeById(id).ingredients;
}

function generatePortionPicker(){
    return `
    <h2 id="recipe-detail-header" class="recipe-detail-header">Pro kolik lidí se vaří?</h2>
    <div class="portion-picker-container">
        <input type="range" class="form-range" min="0" max="10" step="1" id="customRange3" oninput="updatePortionCount()">
        <div class="portion-count" id="portionCount">Počet porcí: 5</div>
        <button type="button" style="margin: 15px; font-size: 20px; width: 25%;" class="btn btn-dark" id="portionButton" onclick="setPortionCount()">Napočítat</button>
    </div>
    `
}

function setPortionCount() {
    const range = document.getElementById("customRange3");
    const portionCount =  range.value;

    range.style.display = "none";
    document.getElementById("portionButton").style.display = "none";

    const ingredientItems = document.getElementsByClassName("ingredient-item");
    const header = document.getElementById("recipe-detail-header");
    header.style.display = "none"

    document.getElementById("ingredient-header").scrollIntoView();

}
function updatePortionCount() {
    let portionCount = document.getElementById("customRange3").value;
    document.getElementById("portionCount").innerHTML = "Počet porcí: " +  portionCount;
}

function generateIngredientDiv(name, amount, unit) {
    return `        
            <div class="ingredient-item">
                <label class="ingredient-radio-container">${name} 
                  <input class="ingredient-checkbox" type="checkbox" onchange="finishIngredientPicking()">
                  <span class="ingredient-radio-checkmark"></span>
                </label>
            </div>
    `
}

function finishIngredientPicking() {
    let ingredientChecks = document.getElementsByClassName("ingredient-checkbox");
    console.log(ingredientChecks);
    ingredientChecks.forEach((check) => {
        if (!check.checked) {
            return;
        }
    });
}

function setStepAsDone(step, id) {
    let nextID = parseInt(id) + 1;
    console.log(step + " CHANGED!");
    let stepToChange = document.getElementById(step);
    console.log(stepToChange);
    if (stepToChange.className == "step-description-hidden") {
        stepToChange.className = "step-description-visible";
    } else {
        stepToChange.className = "step-description-hidden";
        console.log("Scrolling to " + "step_" + nextID);
        document.getElementById("step_" + nextID ).scrollIntoView();
    }
}

function generateStepDiv(id, name, description, time) {
    const stepID = "step_" + id;
    const timeline = document.getElementById("timeline");
    let htmlSegment = `
            <div id=${stepID} class="step">
                <label class="ingredient-radio-container step-radio-container">
                  <input type="checkbox" onchange="setStepAsDone('${stepID+"_p"}', '${id}')">
                  <span class="ingredient-radio-checkmark step-radio-checkmark"></span>
                </label>
                <div class="step-content">
                <div class="step-header">  
                <h2 class="step-name">${name}</h2>
                `;

    //set up timer, if the step has a valid duration value for timing
    if (time > 0) {
        htmlSegment += `
            <div id="timer_wrap_${id}" class="timer-wrap" onclick="getNewTimer(${id}, ${time}, '${name}')">
            <p class="timer-text">${time}m</p>
            <svg class="timer-icon"  width="3em" height="3em"  version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 296.228 296.228" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 296.228 296.228">
              <g>
                <path d="m167.364,48.003v-23.003h10.5c6.903,0 12.5-5.597 12.5-12.5s-5.596-12.5-12.5-12.5h-59.5c-6.903,0-12.5,5.597-12.5,12.5s5.597,12.5 12.5,12.5h10.5v23.003c-59.738,9.285-105.604,61.071-105.604,123.37-3.55271e-15,68.845 56.01,124.854 124.854,124.854s124.854-56.01 124.854-124.854c0-62.299-45.866-114.085-105.604-123.37zm-19.25,223.225c-55.06,0-99.854-44.795-99.854-99.854s44.795-99.854 99.854-99.854 99.854,44.795 99.854,99.854-44.794,99.854-99.854,99.854z"/>
                <path d="m160.614,166.18v-58.889c0-6.903-5.597-12.5-12.5-12.5s-12.5,5.597-12.5,12.5v66.1c0,2.033 0.81,3.982 2.25,5.416l34.969,34.822c4.893,4.872 12.806,4.854 17.678-0.037 4.871-4.892 4.854-12.807-0.037-17.678l-29.86-29.734z"/>
              </g>
            </svg>
            </div>`;
    }

    htmlSegment += `
            </div>
            <p id="${stepID+"_p"}" class="step-description-visible">${description}</p>
            </div>
            </div>`;



    //create timeline
    return htmlSegment;
}


async function renderRecipe(recipeId) {
    const recipes = await getRecipes();
    console.log(recipes);
    console.log("RID: " + recipeId);
    const recipe = recipes.find(({id}) => id == recipeId);
    console.log(recipe);

    let htmlResponse = `<div class="recipe-detail"><h1>${recipe.name}</h1>`;

    //render portion counter
    htmlResponse += generatePortionPicker();

    htmlResponse += `   <h2 class="ingredient-header">Nachystej si ingredience</h2>
                        <div class="ingredient-container">`;
    //render ingredients
    recipe.ingredients.forEach((ingredient) => {
        htmlResponse += generateIngredientDiv(ingredient);
    })

    //render recipes

    htmlResponse += `
                </div>
                <div class="steps-container">
                <h2 class="steps-header">Jde se vařit</h2>
                `;
    let i = 0;
    recipe.steps.forEach((step) => {
        console.log("STEP:" + step);
        htmlResponse += generateStepDiv(i, step.name, step.description, step.time);
        i++;
    });
    htmlResponse += `<div class="timer_container" id="timer_container"></div></div></div>`;
    console.log(htmlResponse);
    return htmlResponse;
}



function getNewTimer(id, minutes, name) {
    if(document.getElementById("timer_" + id)){
        return;
    }
    let sourceButton = document.getElementById("timer_wrap_" + id);
    sourceButton.style.background = "#f6aeae";

    //create timer wrap
    const newTimer = document.createElement("div");
    newTimer.classList.add("timer");
    newTimer.id = "timer_" + id;
    newTimer.textContent = "Časovač: " + name;


    const quitButton = document.createElement("button");
    quitButton.textContent = "Ukončit";
    quitButton.addEventListener('click', () => {
        sourceButton.style.background = "#a4e3a4";
        quitButton.parentElement.parentElement.removeChild(newTimer);
        clearTimeout(downloadTimer)
    });
    quitButton.classList.add("timer_quit_button");


    const loaderWrap = document.createElement("div");
    loaderWrap.classList.add("loader-wrap");
    const loader = document.createElement("div");
    loader.id = "loader_" + id;
    loader.classList.add("timer_loader");
    loaderWrap.appendChild(loader);
    newTimer.appendChild(loaderWrap);

    const timerRemaining = document.createElement("div");
    timerRemaining.classList.add("timer_remaining");
    timerRemaining.id = "timer_remaining_" + id;
    newTimer.appendChild(timerRemaining);





    //find parent and append
    const parentElement = document.getElementById("timer_container");
    parentElement.appendChild(newTimer);

    let seconds = 0;
    let minutes_original = minutes;
    const downloadTimer = setInterval(function function1(){
        let loaderRef = document.getElementById("loader_" + id);
        document.getElementById("timer_remaining_" + id).innerHTML = minutes + ":" + seconds + " zbývá";
        if(seconds === 0){
            minutes--;
            seconds+=60;
        }
        seconds--;

        loaderRef.style.width = ((parseInt(minutes) + parseInt(seconds)/60)/parseInt(minutes_original)*100 + "%");

        let timerParent;
        if (minutes <= 0 && seconds <= 0) {
            clearInterval(downloadTimer);
            timerParent = document.getElementById("timer_remaining_" + id);
            timerParent.innerHTML = "Hotovo!";
            timerParent.parentElement.style.background = "#ea9292";
            const audio = new Audio('ding.wav');
            audio.play();
        }
    }, 1000);
    newTimer.appendChild(quitButton);
}