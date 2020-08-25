//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("index", {});
});

app.post("/", function (req, res) {
    const urlHeader = "https://pokeapi.co/api/v2/";
    const subHeader = "pokemon/";

    // Gets the fields from the front end form
    var pokemonName = String(req.body.pokemonName).toLowerCase();

    const url = urlHeader + subHeader + pokemonName;

    console.log(url);

    https.get(url, (response) => {
        let data = "";

        // A chunk of data has been recieved.
        response.on("data", (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        response.on("end", () => {
            if (data == "Not Found") {
                res.render("pokemon", { found: false });
            } else {
                const pokemonData = JSON.parse(data);

                const responseData = {
                    found: true,
                    name: pokemonData.species.name,
                    sprite: pokemonData.sprites.front_default,
                    abilities: pokemonData.abilities,
                    pokemonNumber: pokemonData.id,
                    stats: pokemonData.stats,
                    types: pokemonData.types,
                    height: pokemonData.height,
                    weight: pokemonData.weight
                }
                res.render("pokemon", responseData);
            }
        });
    });
});

app.use(express.static("public"));

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
