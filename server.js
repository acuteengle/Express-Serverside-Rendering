//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

	const urlHeader = "https://pokeapi.co/api/v2/";
	const subHeader = "pokemon/"

	// Gets the fields from the front end form
	var pokemonName = String(req.body.pokemonName);

	const url = urlHeader + subHeader + pokemonName;

	console.log(url);

	https.get(url, (response) => {
		let data = '';

		// A chunk of data has been recieved.
		response.on('data', (chunk) => {
		 data += chunk;
		});

		// The whole response has been received. Print out the result.
		response.on('end', () => {

			const pokemonData = JSON.parse(data);

			const name = pokemonData.species.name; //str
			const abilities = pokemonData.abilities; // [{name: "lightning-rod"}]
			const pokemonNumber = pokemonData.id; // int
			const stats = pokemonData.stats; // {base_stat: 90, stat{name:"speed"}}
			const types = pokemonData.types; // [{name: "electric"}]
			const height = pokemonData.height; // int
			const weight = pokemonData.weight; // int

			res.write("<h1>"+name+" (#"+pokemonNumber+")"+"</h1>");


			res.write("<h3>Height</h3>");
			res.write("<p>"+height+"</p>");

			res.write("<h3>Weight</h3>");
			res.write("<p>"+weight+"</p>");


			res.write("<h3>Types</h3>");
			res.write("<ul>");
			for (const type of types){
				res.write("<li>"+type.type.name+"</li>");
			}
			res.write("</ul>");

			res.write("<h3>Abilities</h3>");
			res.write("<ul>");
			for (const ability of abilities){
				res.write("<li>"+ability.ability.name+"</li>");
			}
			res.write("</ul>");


			res.write("<h3>Base Stats</h3>");
			res.write("<ul>");
			for (const stat of stats){
				res.write("<li>"+stat.stat.name+ ": "+stat.base_stat+"</li>");
			}
			res.write("</ul>");

			res.send();
  		});
	});
});

app.listen(3000, function(){
	console.log("Server started on port 3000");
});
