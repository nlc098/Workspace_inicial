function validateForm() {
    var username = document.getElementById("U").value;
    var password = document.getElementById("P").value;
    if (username == null || username == "") {
        alert("Por favor, ingrese el nombre de usuario.");
        return false;
    }
    if (password == null || password == "") {
        alert("Por favor, ingrese la contraseña.")
        return false; 
    } sessionStorage.setItem('log','Yes');   
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});


