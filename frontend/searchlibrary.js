

function sendSearchTitlesRequest() {

  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', `http://localhost:3000/Catalogue`, true);  //true = return as JSON
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onload = function() {
      // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
      let response = xhttp.response;
      console.log(response);

      }

  xhttp.send();
}
