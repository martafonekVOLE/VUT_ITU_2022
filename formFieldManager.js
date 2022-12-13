function checkContent(){   
    var tokenGo = false;
    if(window.localStorage.getItem("currNumber") == null){
        if(window.localStorage.getItem("currNumber2") != null){
            currNumber = window.localStorage.getItem("currNumber2");
            window.localStorage.removeItem("currNumber");
            console.log(currNumber);
            tokenGo = true;
        }
        else{
            var currNumber = 1;
            var currIngredient = null;
        }
    }
    else{
        var currNumber = window.localStorage.getItem("currNumber");
        currNumber = parseInt(currNumber);
        if(currNumber == 1 || tokenGo){
            var currIngredient = document.getElementById("ingredients"+(currNumber)+"1");
        }
        else{
            var currIngredient = document.getElementById("ingredients"+(currNumber-1)+"1");
        }
    }
    if(currNumber == 1 || tokenGo){
        var content = document.getElementById("auto-fill-content"+(currNumber));
    }
    else{
        var content = document.getElementById("auto-fill-content"+(currNumber-1));
    }

    if(content != null){
        if(content.innerHTML == null || content.innerHTML.trim() == ""){
            var newField = `<h3 id="${currNumber}"></h3>`; 
            newField += `<input type="text" class="col-sm-5" placeholder="Jméno ingredience" required name="ingredients${currNumber}1" id="ingredients${currNumber}1">`;
            newField += `<input type="number" class="col-sm-3" placeholder="Množství ingredience" required name="ingredients${currNumber}2" id="ingredients${currNumber}2">`;
            newField += `<input type="text" class="col-sm-3" placeholder="Jednotka" required name="ingredients${currNumber}3" id="ingredients${currNumber}3">`; //TODO replace dropdown
            newField += `<span class="col-sm-1" onclick="removeIngredient(${currNumber})">&times;</span>`;
            newField += `</div>`;
            content.innerHTML = newField;
            if(tokenGo){
                window.localStorage.removeItem("currNumber2");
                tokenGo = false;
                var nextNumber = parseInt(currNumber)+1;
            }
            else{
                window.localStorage.removeItem("currNumber");
                var nextNumber = (currNumber)+1;
            }
            window.localStorage.setItem("currNumber", nextNumber);
            console.log('here:');
            console.log(window.localStorage.getItem("currNumber"));
            if(currNumber != 1 && tokenGo){    
                setInterval(document.getElementById("ingredients"+(currNumber-1)+"1").focus(), 100);
            }
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
    var tokenGo = false;
    if(window.localStorage.getItem("currDesc") == null){
        if(window.localStorage.getItem("currDesc2") != null){
            currDesc = window.localStorage.getItem("currDesc2");
            window.localStorage.removeItem("currDesc2");
            console.log(currDesc);
            tokenGo = true;
        }
        else{
            var currDesc = 1;
            var currIngredient = null;
        }
    }
    else{
        var currDesc = window.localStorage.getItem("currDesc");
        currDesc = parseInt(currDesc);
        if(currDesc == 1 || tokenGo){
            var currIngredient = document.getElementById("desc"+(currDesc)+"1");
        }
        else{
            var currIngredient = document.getElementById("desc"+(currDesc-1)+"1");
        }
    }
    if(currDesc == 1 || tokenGo){
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
            if(tokenGo){
                window.localStorage.removeItem("currDesc2");
                tokenGo = false;
                var nextNumber = parseInt(currDesc)+1;
            }
            else{
                window.localStorage.removeItem("currDesc");
                var nextNumber = (currDesc)+1;
            }
            window.localStorage.setItem("currDesc", nextNumber);
            console.log('here:');
            console.log(window.localStorage.getItem("currDesc"));
            if(currDesc != 1 && tokenGo){    
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
        alert("Recept musí obsahovat alespoň jednu ingredienci!");
    }
    else{
        var currNumber = parseInt(window.localStorage.getItem("currNumber"));
        window.localStorage.removeItem("currNumber");
        currNumber = ingNumber;
        window.localStorage.setItem("currNumber", currNumber);
        document.getElementById("auto-fill-content"+ingNumber).remove();
    }
}

function removeDesc(ingNumber){
    if(ingNumber == 1){
        alert("Recept musí obsahovat alespoň jednu položku postupu!");
    }
    else{
        var currDesc = parseInt(window.localStorage.getItem("currDesc"));
        window.localStorage.removeItem("currDesc");
        currDesc = ingNumber;
        window.localStorage.setItem("currDesc", currDesc);
        document.getElementById("auto-fill-desc"+ingNumber).remove();
    }
}

window.localStorage.removeItem("currNumber");
window.localStorage.removeItem("currDesc");
setInterval(checkContent, 100);
setInterval(checkDesc, 100);
