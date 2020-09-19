let cart = {};


function mostrarcart(){
    let htmlContentToAppend = "";

        
        htmlContentToAppend += `
     

            <tr>
                <td><img src="` + cart.articles[0].src + `" class="imgart"/> </td>
                <td>`+ cart.articles[0].name+`</td>
                <td>`+ cart.articles[0].count+`</td>
                <td class="text-right">`+ cart.articles[0].currency +cart.articles[0].unitCost+`</td>
                <td></td>
                <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> Borrar </button> </td>
            </tr>              

        `
    
    document.getElementById("cartname").innerHTML += htmlContentToAppend;


}
// en caso de que halla mas de un articulo
function total(){

    let total = 0;
    for(let i = 0; i < cart.articles.length; i++){
        total+=cart.articles[i].unitCost;
    }
    document.getElementById("total").innerHTML +=cart.articles[0].currency +" "+ total;
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                cart = resultObj.data;
                mostrarcart();
                total();
            }
        });
});
