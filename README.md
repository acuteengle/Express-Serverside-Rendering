This app is a simple HTML page where you can search a Pokemon's name and get information about it back

The form submit hits server.js to handle the POST request and then makes a request to the Pokemon API where it then decodes the response and formats it to be returned to the client

Basic error handling:

-   Can handle case sensitivity (if the input has capital letters)
-   Can handle if an input doesn't match a Pokemon in the API (Pokemon Not Found response)
