/**
 * @file recipeDetailView.js
 * @author Matěj Konopík (xkonop03@vutbr.cz)
 * @brief This file contains functions for rendering recipe detail view
 * @version 1.0
 * @date 2022-11-15
 */




/**
 * @brief finds recipe by id
 * @param id
 * @returns {Promise<void>}
 */
async function getRecipeById(id) {
    const recipes = await getRecipes();
    recipes.forEach(recipe => {
        if (recipe.id == id) {
            return recipe;
        }
    })
}



/**
 * @brief finds ingredients by recipe id
 * @param id
 * @returns {Promise<*>}
 */
async function getIngredientsByRecipeId(id) {
    return getRecipeById(id).ingredients;
}



/**
 * @brief recolors the exit button when all steps are done
 */
function checkIfAllStepsDone() {
    const stepParagraphs = document.getElementsByClassName("step-description-visible");
    let exitButton = document.getElementById("recipe-button-home");
    if (stepParagraphs.length === 0) {
        exitButton.style.background = "#a4e3a4";
        exitButton.className = "recipe-button-home-ready";
        exitButton.innerHTML = "Hotovo! Skočit domů";
    }
    else{
        exitButton.style.background = "#f6aeae";
        exitButton.className = "recipe-button-home";
        exitButton.innerHTML = "Skočit domů - chybí kroky";

    }
}



/**
 * @brief generates portion picker
 * @returns html segment for portion size picker {string}
 */
function generatePortionPicker() {
    return `
    <h1 id="recipe-detail-header" class="recipe-detail-header">Pro kolik lidí se vaří?</h1>
    <div id="portion-picker-container" class="portion-picker-container">
        <input type="range" value="1" class="form-range" min="1" max="10" step="1"  id="customRange3" oninput="updatePortionCount()">
        <div class="portion-count" id="portionCount">Počet porcí: 5</div>
        <button type="button" style="margin: 15px; font-size: 20px;" class="btn btn-dark" id="portionButton" onclick="setPortionCount()">Napočítat</button>
    </div>
    `
}



/**
 * @brief calculates and propagates ingredient amounts
 */
function setPortionCount() {
    const range = document.getElementById("customRange3");
    const portionCount = range.value;

    range.style.display = "none";
    document.getElementById("portionButton").style.display = "none";

    const header = document.getElementById("recipe-detail-header");
    header.style.display = "none"

    const ingredientItems = document.getElementsByClassName("ingredient-item");
    for (let i = 0; i < ingredientItems.length; i++) {
        let ingredient = ingredientItems[i];
        ingredient.querySelector(".ingredient-amount").innerHTML = parseInt(ingredient.querySelector(".ingredient-amount").innerHTML) * portionCount;
    }
    document.getElementById("portion-picker-container").style.boxShadow = "20px 20px 50px #a4e3a4"
}



/**
 * @brief updates the visible portion count in portionCount element
 */
function updatePortionCount() {
    let portionCount = document.getElementById("customRange3").value;
    document.getElementById("portionCount").innerHTML = "Počet porcí: " + portionCount;
}



/**
 * @brief shows visual indication of ingredient picking completion
 */
function finishIngredientPicking() {
    const ingredientCheckboxes = document.getElementsByClassName("ingredient-checkbox");
    let allChecked = true;
    for (let i = 0; i < ingredientCheckboxes.length; i++) {
        if (!ingredientCheckboxes[i].checked) {
            allChecked = false;
        }
    }
    if (allChecked) {
        document.getElementById("ingredient-container").style.boxShadow = "20px 20px 50px #a4e3a4";
        document.getElementById("step-header").scrollIntoView();
    }
    else{
        document.getElementById("ingredient-container").style.boxShadow = "20px 20px 50px dimgray";
    }
}



/**
 * @brief generates html for ingredient
 * @param name
 * @param amount
 * @param unit
 * @returns html segment {string}
 */
function generateIngredientDiv(name, amount, unit) {
    return `        
            <div class="ingredient-item">
                <label class="ingredient-radio-container">${name} 
                    <br>
                    <span class="ingredient-amount">${amount}</span>
                    <span class="ingredient-unit">${unit}</span>
                    <input class="ingredient-checkbox" type="checkbox" onchange="finishIngredientPicking()">
                    <span class="ingredient-radio-checkmark"></span>
                </label>
            </div>
    `
}



/**
 * @brief once the step is marked as done, this function hides the description
 */
function setStepAsDone(step, id) {
    let nextID = parseInt(id) + 1;
    const stepParagraphToChange = document.getElementById(step);
    const stepContainer = document.getElementById("step_" + id);
    if (stepParagraphToChange.className === "step-description-hidden") {
        stepParagraphToChange.className = "step-description-visible";
        stepContainer.style.boxShadow = "20px 20px 50px dimgray";
    } else {
        stepParagraphToChange.className = "step-description-hidden";

        stepContainer.style.boxShadow = "20px 20px 50px #a4e3a4";
        const nextStep = document.getElementById("step_" + nextID);
        if (nextStep != null) {
            nextStep.scrollIntoView();
        }
    }
    checkIfAllStepsDone();
}



/**
 * @brief generates html for step div
 * @param id
 * @param name
 * @param description
 * @param time
 * @returns html segment {string}
 */
function generateStepDiv(id, name, description, time) {
    const stepID = "step_" + id;
    const timeline = document.getElementById("timeline");
    let htmlSegment = `
            <div id=${stepID} class="step">
                <label class="ingredient-radio-container step-radio-container">
                  <input type="checkbox" onchange="setStepAsDone('${stepID + "_p"}', '${id}')">
                  <span class="ingredient-radio-checkmark step-radio-checkmark"></span>
                </label>
                <div class="step-content" style="width: 100%">
                <div class="step-header">  
                <h2 class="step-name">${name}</h2>`;
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
            <p id="${stepID + "_p"}" class="step-description-visible">${description}</p>
            </div>
            </div>`;
    return htmlSegment;
}



/**
 * @brief generates complete html for recipe detail view
 * @param recipeId
 * @returns html segment as promise {Promise<string>}
 */
async function renderRecipe(recipeId) {
    const recipes = await getRecipes();
    const recipe = recipes.find(({id}) => id == recipeId);


    let htmlResponse = `<div class="recipe-detail"><div class="recipe-header"><a class="home-btn" href="index.html"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 330.242 330.242" style="height: 50px" xml:space="preserve">
                        <path d="M324.442,129.811l-41.321-33.677V42.275c0-6.065-4.935-11-11-11h-26c-6.065,0-11,4.935-11,11v14.737l-55.213-44.999c-3.994-3.254-9.258-5.047-14.822-5.047c-5.542,0-10.781,1.782-14.753,5.019L5.8,129.81c-6.567,5.351-6.173,10.012-5.354,12.314c0.817,2.297,3.448,6.151,11.884,6.151h19.791v154.947c0,11.058,8.972,20.053,20,20.053h62.5c10.935,0,19.5-8.809,19.5-20.053
                                v-63.541c0-5.446,5.005-10.405,10.5-10.405h42c5.238,0,9.5,4.668,9.5,10.405v63.541c0,10.87,9.388,20.053,20.5,20.053h61.5
                                c11.028,0,20-8.996,20-20.053V148.275h19.791c8.436,0,11.066-3.854,11.884-6.151C330.615,139.822,331.009,135.161,324.442,129.811z"/>
                                </svg>
                                </a>
                                <div class="recipe-name">
                                    <h1>${recipe.name}</h1>
                                    <div class="recipe-category">
                                        ${recipe.category}
                                    </div>
                                </div>
                                <img onclick="refreshContent(${recipeId})" class="refresh-btn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADkklEQVRoge3ay4sdRRQG8J8apwcSh0yiiahgQPExi5i4Uoi6EWWCaBa+MDv3Ecl/ERMfQdGdunEbHyhokIAIQUQiKjqZJEQYo6BGMIkLzUjGRd07dldX37m3b/e9UfJBQd+pqnO+b7pOnXo0l3Bx4bIGbU3jXmzDDG7CBqzu1P+BX3EC3+EwDuFsgxxqI8NOfIi/sTRgWcRBPNGx1Qs78At+xsNNCZjEbvxYg3xV+Qm7egjK+zrVhIhZYXg0JSAuJ3F/wm/crjYm8eoKJI5gHx7FZiFursRE53kzHsfz+KqHnQt4TfHtNCJkI76ocHoGe3BrDbu3C8LPVtg+jGs7bYcWsgnHE4bOYy/W1jEa4Wq8IAR/7OcYbkj8fSBslBbxrTBMmsadmEv4S8Vk35iUHk4H/Jsb2sAU3kv4rS0kFdiv44rGKFdjFd5K+B9YyGyi4wHtidiO7xM+hxKSYT7qNI+rmuVewILBRPQlZHfU4bx2AjuPHzQsJFNedjzXAvEYs0JGb0zIzqjxGc3kiZHjI0Uhe8ZLpx6mlZfidZYdY8cORRFHxktnMFyee94W1R0aJZFhkRdyW1T32SiJDIu8kFuiuvlREmkSpxVjZN146VRiu7DVPSXknxL+UhQyMTJqgyG/JjuZavBfEJIpcvyzW5GPkXNRpzYXiXURc1rmnBfyW9Toutbo1Mf10e/T3Ye8kONRo4sxq8ecljnnhcxFje5qjU593B39jjmDRxQD6cuWSdXBN4ocH0o1Wqu8aIyz/Tgxo7zhm+pW5ofW7/g46vx02+wGQMzloB4n+U8pb6ymW6PWP9YLU22e25O9OmRC6s932Ncux77wkiKnBX0k7GeVx+Id7XFcEVuVj1J39dMxw9GoY9vHQVVYLdxu5bkcs/Kl0DIejDov4W2jOWXsYhXejThckL476YlXlMW8YXRHpm8m/O+vYyzD5wlj72BNA2SrsEb5TSwJO9baK/INwpiMjc5hy3B8k9iqHJ/dGL1mWOObpMUsCpczTewk1wtTbOqiZx43NuAD4c2khtmSkF33CkuIQTEj5Kk42eWH09BvIkaGlyscdsvXwlt6TMg964RxPSH817cIl6EvKi8A49lpv5Z3qQ9ID7WmylE1pti6yPCMetcBVWVB7w8GWsWEsHj7QDpQVyqLeL9jY6hh1ORHNVO4D/cI9+c3C4HaXdqcE74lOSFM35/iE+VDj0v4X+Af+WMCZtXzpW0AAAAASUVORK5CYII=" alt="refresh">
                        </div>`;

    //render portion counter
    htmlResponse += generatePortionPicker();

    htmlResponse += `   <h1 class="ingredient-header">Nachystej si ingredience</h1>
                        <div id="ingredient-container" class="ingredient-container">`;
    //render ingredients
    recipe.ingredients.forEach((ingredient) => {
        htmlResponse += generateIngredientDiv(ingredient[0], ingredient[1], ingredient[2]);
    })

    //render recipes

    htmlResponse += `
                </div>
                <div class="steps-container">
                <h1 id="step-header" class="steps-header">Jde se vařit</h1>
                `;

    for (let j = 0; j < recipe.insctructions.length; j++) {
        let instruction = recipe.insctructions[j];
        htmlResponse += generateStepDiv(j, instruction[0], instruction[1], instruction[2]);
    }
    htmlResponse += `</div><div class="recipe-footer">
                        <button id="recipe-button-home" class="recipe-button-home" onclick="window.location.href = 'index.html'">Skočit domů - chybí kroky</button>
                        <button id="recipe-button-restart" class="recipe-button-restart" onclick="refreshContent('${recipeId})">Začít znovu</button>
                    </div>
                    <div class="timer_container" id="timer_container"></div></div>`;
    return htmlResponse;
}



/**
 * @brief creates and renders floating timer for a step
 * @param id
 * @param minutes
 * @param name
 */
function getNewTimer(id, minutes, name) {
    if (document.getElementById("timer_" + id)) {
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
    const downloadTimer = setInterval(async function function1() {
        let loaderRef = document.getElementById("loader_" + id);
        let seconds_filled;
        if (seconds < 10 && seconds >= 0) {
            seconds_filled = "0" + seconds;
        } else {
            seconds_filled = seconds;
        }
        document.getElementById("timer_remaining_" + id).innerHTML = minutes + ":" + seconds_filled + " zbývá";
        if (seconds === 0) {
            minutes--;
            seconds += 60;
        }
        seconds--;

        loaderRef.style.width = ((parseInt(minutes) + parseInt(seconds) / 60) / parseInt(minutes_original) * 100 + "%");

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


