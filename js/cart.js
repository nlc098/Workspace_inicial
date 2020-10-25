let cart = {};
let envio= 0;
let subtotaltotal=0;
let porcentaje=0;
//funcion para mostrar el json y las demas funciones en el html, el ${i} en el id es para que no halla id iguales
function mostrarcart(articles){
    let htmlContentToAppend = "";

    for(let i = 0; i <  articles.length; i++){
        htmlContentToAppend += `
     
            
                <tr id="article-${i}">
                    <td><img src="` + articles[i].src + `" class="imgart"/> </td>
                    <td>`+ articles[i].name + `</td>
                    <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
                    <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="`+ articles[i].count + `" min="1"></td>
                    <td id="productSubtotal-${i}">`+ articles[i].currency +articles[i].unitCost*articles[i].count+`</td>
                    <td><button id="borrar-${i}" class="btn btn-danger" onclick="borrar(${i})">Borrar</button></td>          
                </tr>  
                    

        `
    }
    
    document.getElementById("cartname").innerHTML += htmlContentToAppend;
    update();
    addEventCount();
    
}

function borrar(num){
        let elemento= document.getElementById("article-"+num);
        elemento.style.display="none";
        cart[num].unitCost=0;
        update()
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
    console.log(sub);
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
    envio=subtotaltotal*porcentaje;
    let total = subtotaltotal + envio;
    document.getElementById("total").innerHTML = "UYU " + total;
}
//subtotalArray crea un array de los input class countArticle, recorre el arreglo y cada vez que sucende el evento "change" que modifica el value del input, modificara el td correspondiente del subtotal e invoca las funciones AllSubTotal() y Total() 
function addEventCount(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    for(let i=0;i<subtotalArray.length;i++){
        subtotalArray[i].addEventListener("change",function(){
        document.getElementById("productSubtotal-"+i).innerHTML= cart[i].currency + " "+subtotalArray[i].value* cart[i].unitCost;
        update();
    });
    }
}
//funcion que calcula el envio
function envios(){
    envio=porcentaje*subtotaltotal;
    document.getElementById("envio").innerHTML="UYU"+Math.round(envio)
}
//funcion que llama a las demas funciones
function update(){
    AllSubTotal();
    Total();
    envios();
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
        //tomo el id tarjeta y cuentabancaria y con el evento "change" desactivo los campos del radio no marcado
        document.getElementById("tarjeta").addEventListener("change",function(){
            document.getElementById("numerotarjeta").disabled =false;
            document.getElementById("venctarjetaMM").disabled =false;
            document.getElementById("venctarjetaAA").disabled =false
            document.getElementById("codigotarjeta").disabled =false;

            document.getElementById("numerobancario").disabled =true;
            document.getElementById("numerobancario").value=null;
        });
        document.getElementById("cuentabancaria").addEventListener("change",function(){
            document.getElementById("numerotarjeta").disabled =true;
            document.getElementById("venctarjetaAA").disabled =true;
            document.getElementById("venctarjetaMM").disabled =true;
            document.getElementById("codigotarjeta").disabled =true;
            document.getElementById("numerotarjeta").value=null;
            document.getElementById("venctarjetaAA").value=null;
            document.getElementById("venctarjetaMM").value=null;
            document.getElementById("codigotarjeta").value=null;

            document.getElementById("numerobancario").disabled =false;
            
        });

            //le doy valor a porcentaje según que radio eliga
            document.getElementById("premium").addEventListener("change",function(){
            porcentaje=0.15;
            Total();
            document.getElementById("envio").innerHTML="UYU"+envio; 
            });
            document.getElementById("express").addEventListener("change",function(){
                porcentaje=0.07;
                Total();
                document.getElementById("envio").innerHTML="UYU"+Math.round(envio); 
            });
            document.getElementById("standard").addEventListener("change",function(){
                porcentaje=0.05;
                Total();
                document.getElementById("envio").innerHTML="UYU"+envio; 
            });
});


//funcion para validar los campos, con querySelector me dice si el input radio esta marcado o no y con los if voy controlando que los campos no esten vacios
function validacion(){
    let metodo_envio=document.querySelector('input[name="radio"]:checked');
    let forma_pago=document.querySelector('input[name="radiof"]:checked');
    let numerotarjeta = document.getElementById("numerotarjeta").value;
    let codigotarjeta = document.getElementById("codigotarjeta").value;
    let venctarjetaMM = document.getElementById("venctarjetaMM").value;
    let venctarjetaAA = document.getElementById("venctarjetaAA").value;
    let numerobancario = document.getElementById("numerobancario").value;
    let htmlContentToAppend=" ";
    htmlContentToAppend += `
     
                    </div>
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                            <div class="card">
                                <div class="text-right cross"> <i class="fa fa-times"></i> </div>
                                <div class="card-body text-center"> <img src="https://cdn.icon-icons.com/icons2/458/PNG/128/Shy-Minion-icon_43752.png">
                                    <h4>GRACIAS!</h4>
                                    <p>Compra realizada con exito, dirigete al inicio para ver más productos si te interesa!</p> 
                                    <button class="btn btn-out btn-square continue" href="index.html">Salir</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    

        `
    
    if(!metodo_envio){
        alert("Por favor, seleccione metodo de envio");
        return false;
    }
    if(forma_pago){
        if((numerotarjeta&&codigotarjeta&&venctarjetaMM&&venctarjetaAA)||numerobancario){
            document.getElementById("gracias").innerHTML=htmlContentToAppend;
            
        }else{
            alert("Por favor, complete los campos");
            return false;
        }
    }else{
        alert("Por favor, seleccione metodo de pago");
        return false;
        
    }

}
