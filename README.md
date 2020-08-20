This app contains an HTML page with a form that takes in a Pokemon's name as a text input. On submit of the form, server.js handles a POST request where it then makes a request to the Pokemon API to get the Pokemon data, decodes the response, and returns HTML to the client. This is server side rendering.

Must start the server by running node server.js

Basic error handling:
-   Can handle case sensitivity (if the input has capital letters)
-   Can handle if an input doesn't match a Pokemon in the API (Pokemon Not Found response)
