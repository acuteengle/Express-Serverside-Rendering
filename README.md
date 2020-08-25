This app uses Express routes and EJS to do server side rendering. The default get route returns the index.ejs template. The homepage has a form that takes in a Pokemon's name as a text input. On submit of the form, server.js handles the POST request where it then makes a request to the Pokemon API to get the Pokemon data, decodes the response, and renders the pokemon.ejs template with a data object. 

EJS then decodes the data object and properly populates the data in the pokemon.ejs template.

Basic error handling:
-   Can handle case sensitivity (if the input has capital letters)
-   Can handle if an input doesn't match a Pokemon in the API (Pokemon Not Found response)

