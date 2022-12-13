/**
 * @brief Generates HTML for one step of the recipe preview
 * @param name
 * @param description
 * @param time
 * @returns {string}
 */
function generatePreviewStepDiv(name, description, time) {
    return `<div class="preview-step-container">
                <div class="preview-step-content">
                    <h2 class="preview-step-name">${name}</h2>
                    <p>${description}</p>
                    <div class="preview-step-time">
                        <p>${time} minut</p>
                    </div>
                </div>
            </div>`;
}



/**
 * @brief Generates HTML for all steps of the recipe preview
 * @param steps
 * @returns {string}
 */
function generatePreviewSteps(steps) {
    let htmlResponse = `<div class="preview-steps-container">`;
    for (let j = 0; j < steps.length; j++) {
        let instruction = steps[j];
        htmlResponse += generatePreviewStepDiv(instruction[0], instruction[1], instruction[2]);
    }
    htmlResponse += `</div>`;
    return htmlResponse;
}



/**
 * @brief Quits preview and runs cooking
 * @param recipeId
 */
async function startCookingFromPreview(recipeId) {
    await  modalTrigger(-1);
    await swapContent(recipeId);
}



/**
 * @brief Generates HTML for the recipe preview
 * @param recipeId
 * @returns {Promise<string>}
 */
async function renderRecipePreview(recipeId) {

    const recipes = await getRecipes();
    const recipe = recipes.find(({id}) => id == recipeId);
    let htmlResponse = `<div class="rp">
                            <h1 class="rp-header">${recipe.name}</h1>
                            <div class="rp-top-content">
                            <div class="rp-image-container">
                                <img class="rp-image" src="${recipe.image}" alt="${recipe.name}">
                            </div>
                            <div class="rp-ingredients">
                                <h2 class="rp-ingredients-header">Ingredience</h2>
                                <ul class="rp-ingredients-list">`;

    recipe.ingredients.forEach(ingredient => {
        htmlResponse += `<li>${ingredient[0]} <span class="rp-ingredient-amount">${ingredient[1]} ${ingredient[2]}</span></li>`;
    });

    htmlResponse += `</ul>
                    </div>
                    </div>  
                    <h2 class="rp-steps-header">Postup</h2>
                    <div class="rp-steps">`;
    htmlResponse += generatePreviewSteps(recipe.insctructions);
    htmlResponse += `</div>
                        <div class="rp-footer">
                            <button class="rp-button" onclick="startCookingFromPreview(${recipeId})">Začít vařit</button>
                        </div>
                    </div>`;
    return htmlResponse;
}