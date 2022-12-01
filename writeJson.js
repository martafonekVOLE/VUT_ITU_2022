// /** This function expects dictionary in form: 
// /*  [Json elements name : Json value]  & name of JSON file
// **/
// function writeJson(dictOfContents, jsonName){
//     //const fileSystem = require("browserify-fs");
//     var fs = require('browserify-fs');
//     //const fileSystem = import("browserify-fs");
//     let recipe = "";

//     Object.entries(dictOfContents).forEach(([key, value]) => {
//         recipe += `"${key}": "${value}",\n`;  //?? \n?
//     });
//     recipe.slice(0, -1);

//     let dataToWrite = JSON.stringify(recipe);

//     console.log(dataToWrite);

//     fs.writeFile("newRecipe.json", dataToWrite, err=>{
//         if(err){
//           console.log("Error writing file", err)
//         } else {
//           console.log('JSON data is written to the file successfully')
//         }
//        });
// }

// var dict = {
//     "Name": "Test",
//     "Value": "Test2"
// };
// writeJson(dict, "testName");


	// Requiring fs module in which
	// writeFile function is defined.
	const fs = require('fs')
	
	// Data which will write in a file.
	let data = "Learning how to write in a file."
	
	// Write data in 'Output.txt' .
	fs.writeFile('Output.txt', data, (err) => {
		
		// In case of a error throw err.
		if (err) throw err;
	})
