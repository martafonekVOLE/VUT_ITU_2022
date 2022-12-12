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
        var content = document.getElementById("auto-fill-content"+(currDesc));
    }
    else{
        var content = document.getElementById("auto-fill-content"+(currDesc-1));
    }

    if(content.innerHTML == null || content.innerHTML.trim() == ""){
        var newField = `<h3 id="${currDesc}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Jméno ingredience" required name="desc${currDesc}1" id="desc${currDesc}1">`;
        newField += `<input type="number" class="col-sm-3" placeholder="Množství ingredience" required name="desc${currDesc}2" id="desc${currDesc}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Jednotka" required name="desc${currDesc}3" id="desc${currDesc}3">`; //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeIngredient(${currDesc})">&times;<span>`;
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

    if(currIngredient !== document.activeElement){
        return;
    }
    else{
        var newField = `<div class="mb-3" id="auto-fill-content${currDesc}"><h3 id="${currDesc}"></h3>`; 
        newField += `<input type="text" class="col-sm-5" placeholder="Jméno ingredience" name="desc${currDesc}1" id="desc${currDesc}1">`;
        newField += `<input type="number" class="col-sm-3" placeholder="Množství" name="desc${currDesc}2" id="desc${currDesc}2">`;
        newField += `<input type="text" class="col-sm-3" placeholder="Jednotka" name="desc${currDesc}3" id="desc${currDesc}3">`;
         //TODO replace dropdown
        newField += `<span class="col-sm-1" onclick="removeIngredient(${currDesc})">&times;<span></div>`;
        content.innerHTML += newField;
        window.localStorage.removeItem("currDesc");
        var nextNumber = currDesc+1;
        window.localStorage.setItem("currDesc", nextNumber);
        console.log(window.localStorage.getItem("currDesc"));
        setInterval(document.getElementById("desc"+(currDesc-1)+"1").focus(), 100);
    }
}