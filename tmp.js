function checkingredients(){   
    var tokenGo = false;
    if(window.localStorage.getItem("currNumber") == null){
        if(window.localStorage.getItem("currNumber2") != null){
            currNumber = window.localStorage.getItem("currNumber2");
            window.localStorage.removeItem("currNumber2");
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
        var content = document.getElementById("auto-fill-ingredients"+(currNumber));
    }
    else{
        var content = document.getElementById("auto-fill-ingredients"+(currNumber-1));
    }

    if(content != null){
        if(content.innerHTML == null || content.innerHTML.trim() == ""){
            var newField = `<h3 id="${currNumber}"></h3>`; 
            newField += `<input type="text" class="col-sm-5" placeholder="Název kroku" required name="ingredients${currNumber}1" id="ingredients${currNumber}1">`;
            newField += `<input type="text" class="col-sm-3" placeholder="Popis" required name="ingredients${currNumber}2" id="ingredients${currNumber}2">`;
            newField += `<input type="text" class="col-sm-3" placeholder="Čas provádění (v minutách)" name="ingredients${currNumber}3" id="ingredients${currNumber}3">`; //TODO replace dropdown
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
        var newField = `<div class="mb-3" id="auto-fill-ingredients${currNumber}"><h3 id="${currNumber}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Název kroku" name="ingredients${currNumber}1" id="ingredients${currNumber}1">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Popis" name="ingredients${currNumber}2" id="ingredients${currNumber}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Čas provádění (v minutách)" name="ingredients${currNumber}3" id="ingredients${currNumber}3">`;
         //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeingredients(${currNumber})">&times;</span></div>`;
        content.innerHTML += newField;
        window.localStorage.removeItem("currNumber");
        var nextNumber = currNumber+1;
        window.localStorage.setItem("currNumber", nextNumber);
        console.log(window.localStorage.getItem("currNumber"));
        setInterval(document.getElementById("ingredients"+(currNumber-1)+"1").focus(), 100);
    }
}
