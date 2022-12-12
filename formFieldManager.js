function checkContent(){   
    if(window.localStorage.getItem("currNumber") == null){
        var currNumber = 1;
        var currIngredient = null;
    }
    else{
        var currNumber = window.localStorage.getItem("currNumber");
        currNumber = parseInt(currNumber);
        if(currNumber == 1){
            var currIngredient = document.getElementById("ingredients"+(currNumber)+"1");
        }
        else{
            var currIngredient = document.getElementById("ingredients"+(currNumber-1)+"1");
        }
    }
    if(currNumber == 1){
        var content = document.getElementById("auto-fill-content"+(currNumber));
    }
    else{
        var content = document.getElementById("auto-fill-content"+(currNumber-1));
    }

    if(content.innerHTML == null || content.innerHTML.trim() == ""){
        var newField = `<h3 id="${currNumber}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Jméno ingredience" required name="ingredients${currNumber}1" id="ingredients${currNumber}1">`;
        newField += `<input type="number" class="col-sm-3" placeholder="Množství ingredience" required name="ingredients${currNumber}2" id="ingredients${currNumber}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Jednotka" required name="ingredients${currNumber}3" id="ingredients${currNumber}3">`; //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeIngredient(${currNumber})">&times;</span>`;
        newField += `</div>`;
        content.innerHTML = newField;
        window.localStorage.removeItem("currNumber");
        var nextNumber = currNumber+1;
        window.localStorage.setItem("currNumber", nextNumber);
        console.log(window.localStorage.getItem("currNumber"));
        if(currNumber != 1){    
            setInterval(document.getElementById("ingredients"+(currNumber-1)+"1").focus(), 100);
        }
    }

    if(currIngredient !== document.activeElement){
        return;
    }
    else{
        var newField = `<div class="mb-3" id="auto-fill-content${currNumber}"><h3 id="${currNumber}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Jméno ingredience" name="ingredients${currNumber}1" id="ingredients${currNumber}1">`;
        newField += `<input type="number" class="col-sm-3" placeholder="Množství" name="ingredients${currNumber}2" id="ingredients${currNumber}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Jednotka" name="ingredients${currNumber}3" id="ingredients${currNumber}3">`;
         //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeIngredient(${currNumber})">&times;</span></div>`;
        content.innerHTML += newField;
        window.localStorage.removeItem("currNumber");
        var nextNumber = currNumber+1;
        window.localStorage.setItem("currNumber", nextNumber);
        console.log(window.localStorage.getItem("currNumber"));
        setInterval(document.getElementById("ingredients"+(currNumber-1)+"1").focus(), 100);
    }
}

function checkDesc(){   
    if(window.localStorage.getItem("currDesc") == null){
        var currDesc = 1;
        var currIngredient = null;
    }
    else{
        var currDesc = window.localStorage.getItem("currDesc");
        currDesc = parseInt(currDesc);
        if(currDesc == 1){
            var currIngredient = document.getElementById("desc"+(currDesc)+"1");
        }
        else{
            var currIngredient = document.getElementById("desc"+(currDesc-1)+"1");
        }
    }
    if(currDesc == 1){
        var content = document.getElementById("auto-fill-desc"+(currDesc));
    }
    else{
        var content = document.getElementById("auto-fill-desc"+(currDesc-1));
    }

    if(content != null){
        if(content.innerHTML == null || content.innerHTML.trim() == ""){
            var newField = `<h3 id="${currDesc}"></h3>`; 
            newField += `<input type="text" class="col-sm-5" placeholder="Název kroku" required name="desc${currDesc}1" id="desc${currDesc}1">`;
            newField += `<input type="text" class="col-sm-3" placeholder="Popis" required name="desc${currDesc}2" id="desc${currDesc}2">`;
            newField += `<input type="text" class="col-sm-3" placeholder="Čas provádění (v minutách)" name="desc${currDesc}3" id="desc${currDesc}3">`; //TODO replace dropdown
            newField += `<span class="col-sm-1" onclick="removeIngredient(${currDesc})">&times;</span>`;
            newField += `</div>`;
            content.innerHTML = newField;
            window.localStorage.removeItem("currDesc");
            var nextNumber = currDesc+1;
            window.localStorage.setItem("currDesc", nextNumber);
            console.log(window.localStorage.getItem("currDesc"));
            if(currDesc != 1){    
                setInterval(document.getElementById("desc"+(currDesc-1)+"1").focus(), 100);
            }
        }
    }


    if(currIngredient !== document.activeElement){
        return;
    }
    else{
        var newField = `<div class="mb-3" id="auto-fill-desc${currDesc}"><h3 id="${currDesc}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Název kroku" name="desc${currDesc}1" id="desc${currDesc}1">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Popis" name="desc${currDesc}2" id="desc${currDesc}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Čas provádění (v minutách)" name="desc${currDesc}3" id="desc${currDesc}3">`;
         //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeDesc(${currDesc})">&times;</span></div>`;
        content.innerHTML += newField;
        window.localStorage.removeItem("currDesc");
        var nextNumber = currDesc+1;
        window.localStorage.setItem("currDesc", nextNumber);
        console.log(window.localStorage.getItem("currDesc"));
        setInterval(document.getElementById("desc"+(currDesc-1)+"1").focus(), 100);
    }
}


function removeIngredient(ingNumber){
    console.log(ingNumber);
    if(ingNumber == 1){
        alert("Recept musí obsahovat alespoň jednu inkredienci!");
    }
    else{
        var currNumber = parseInt(window.localStorage.getItem("currNumber"));
        window.localStorage.removeItem("currNumber");
        currNumber = currNumber - 1;
        window.localStorage.setItem("currNumber", currNumber);
        document.getElementById("auto-fill-content"+ingNumber).style.display = "none";
    }
}

function removeDesc(ingNumber){
    if(ingNumber == 1){
        alert("Recept musí obsahovat alespoň jednu inkredienci!");
    }
    else{
        var currDesc = parseInt(window.localStorage.getItem("currDesc"));
        window.localStorage.removeItem("currDesc");
        currDesc = currDesc - 1;
        window.localStorage.setItem("currDesc", currDesc);
        document.getElementById("auto-fill-desc"+ingNumber).style.display = "none";
    }
}

window.localStorage.removeItem("currNumber");
window.localStorage.removeItem("currDesc");
setInterval(checkContent, 100);
setInterval(checkDesc, 100);
