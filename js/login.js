function validateForm() {
    var username = document.getElementById("U").value;
    var password = document.getElementById("P").value;
    if (!password || !username) {
        alert("Por favor, ingrese Datos.");
        return false;
    }

        localStorage.setItem('Nombre', username);
        localStorage.setItem('Contra', password);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

