let cart = {};
let envio= 3123;
let subtotaltotal=0;
//funcion para mostrar el json y las demas funciones en el html, el ${i} en el id es para que no halla id iguales
function mostrarcart(articles){
    let htmlContentToAppend = "";

    for(let i = 0; i <  articles.length; i++){
        htmlContentToAppend += `
     

            <tr>
                <td><img src="` + articles[i].src + `" class="imgart"/> </td>
                <td>`+ articles[i].name + `</td>
                <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
                <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="`+ articles[i].count + `" min="1"></td>
                <td id="productSubtotal-${i}">`+ articles[i].currency +articles[i].unitCost*articles[i].count+`</td>
                
            </tr>              

        `
    }
   
    document.getElementById("cartname").innerHTML += htmlContentToAppend;
    AllSubTotal();
    Total();
    addEventCount();
    
}
// en caso de que halla mas de un articulo, recibe el count y la posicion del articulo en el arreglo, el if es para cuando el unitCost esta en USD
function SubTUnitario(count,index){
    let sub=0;
    if(cart[index].currency==="USD"){
        sub = cart[index].unitCost*count*40;

    }else{
        sub = cart[index].unitCost*count;
    }
    return sub;
}

//subtotalArray crea un array de los input class countArticle, recorre el arreglo invocando la funcion SubTUnitario que recibe el value del los input y la posicion
function AllSubTotal(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    let subtotal =0;
    for(let i=0;i<subtotalArray.length;i++){
        subtotal += SubTUnitario(subtotalArray[i].value,i);
    }
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;
    subtotaltotal=subtotal; 

}

function Total(){
    let total = subtotaltotal;
    document.getElementById("total").innerHTML = "UYU " + total;
}
//subtotalArray crea un array de los input class countArticle, recorre el arreglo y cada vez que sucende el evento "change" que modifica el value del input, modificara el td correspondiente del subtotal e invoca las funciones AllSubTotal() y Total() 
function addEventCount(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    for(let i=0;i<subtotalArray.length;i++){
        subtotalArray[i].addEventListener("change",function(){
        document.getElementById("productSubtotal-"+i).innerHTML= cart[i].currency + " "+subtotalArray[i].value* cart[i].unitCost;
        AllSubTotal();
        Total();
    });

    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                cart = resultObj.data.articles;
                mostrarcart(cart);
            }
        });
        
});
