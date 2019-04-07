var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const ap1 = "KK4b2d56e54f2d0fce512ae2aed811f91";
module.exports = {
  //Calls the api using GET method and returns the JSON response
  callApi: function(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", ap1 + url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  }
};
