//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "index.html");
});

app.post("/", function(req, res){

	const urlHeader = "https://pokeapi.co/api/v2/";
	const subHeader = "pokemon/"

	var pokemonName = String(req.body.pokemonName);

	const url = urlHeader + subHeader + pokemonName + "/";

	https.get(url, function(response){
		response.on("data", function(data){
			const pokemonData = JSON.parse(data);

			const name = pokemonData.species.name; //str
			const abilities = pokemonData.abilities; // [{name: "lightning-rod"}]
			const pokemonNumber = pokemonData.id; // int
			const baseStats = pokemonData.stats; // {base_stat: 90, stat{name:"speed"}}
			const types = pokemonData.stats; // [{name: "electric"}]
			const height = pokemonData.height; // int
			const weight = pokemonData.weight; // int

			res.write("<h1>#"+pokemonNumber+" " + name+"</h1>");

			res.write("<h3>Height</h3>");
			res.write("<p>"+height+"</p>");

			res.write("<h3>Weight</h3>");
			res.write("<p>"+weight+"</p>");


			res.write("<h3>Types</h3>");
			for (type in types){
				res.write("<p>"+type.name+"<p>");
			}

			res.write("<h3>Abilities</h3>");
			for (ability in abilities){
				res.write("<p>"+ability.name+"<p>");
			}

			res.write("<h3>Base Stats</h3>");
			for (bs in baseStats){
				for (type in types){
					res.write("<h6>"+bs.stat.name+"<h6>");
					res.write("<p>"+bs.base_stat+"<p>");
				}
			}

			res.send();

		})
	})
});

app.listen(3000, function(){
	console.log("Server started on port 3000");
});
