function enviaForm(formName){
  const formElement = document.getElementById(formName);
  const respuesta = document.getElementById("respuesta");
  const data = new FormData(formElement);
  const value = Object.fromEntries(data.entries());
  const http = new XMLHttpRequest();
  http.open("POST", 'backend.php', true);
  http.setRequestHeader("Content-Type", "application/json");
  http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) { 
              respuesta.innerHTML = this.responseText;
          }
      }
  http.send(JSON.stringify({ value }));
}