var product = {};
let comentario ={};
var products = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];
        
        htmlContentToAppend += `
        <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
              </div>
        `
    }
    document.getElementById("productImage").innerHTML += htmlContentToAppend;
}


function showComentarios(array){

    let htmlContentToAppend = "";
   


    for(let i = 0; i < array.length; i++){
        let coment = array[i];
        htmlContentToAppend += `
            <div class="coment">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ coment.user +"  "+ `<span class="fa fa-star checked"></span> `.repeat(coment.score) +
                    `<span class="fa fa-star"></span> `.repeat(5-coment.score) +`</h4>
                    <small class="text-muted">` + coment.dateTime + `</small>
                </div>
                <div>
                    <p class="mb-1">` +coment.description+ `</p>
                    
                </div>
        
        </div>
            </div>    
        `

        document.getElementById("comentario").innerHTML = htmlContentToAppend;
        
    }
}

function relacionados(){

    let htmlContentToAppend = "";
    let a =product.relatedProducts;
    for(let i = 0; i < a.length; i++){
        htmlContentToAppend += `
                <div class="card-group">
                    <div class="card-img-top" style="width: 30rem;">
                    <a href="product-info.html" class="list-group-item list-group-item-action">
                    <img class="card-img-top" src="` + products[a[i]].imgSrc + `" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">`+ products[a[i]].name +`</h5>
                        <p class="card-text">` + products[a[i]].description + `</p>
                        <h3 class="text-muted"><b>` +"US$ "+ products[a[i]].cost + `</b></h3>
                    </div>
                    <a>
                    </div>
                </div>
             
            `
             document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}
function agregarcomentario(){
    let texto= document.getElementById("texto").value;
    let usuario=localStorage.getItem("Nombre");
    let stars= document.getElementById("estrellas").value;
    var f = new Date()
    let htmlContentToAppend = "";
        htmlContentToAppend += `
            <div class="coment">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+usuario+ `<span class="fa fa-star checked"></span> `.repeat(stars) +
                    `<span class="fa fa-star"></span> `.repeat(5-stars) +`</h4>
                    <small class="text-muted">` + f.getFullYear() + "-"+0+ (f.getMonth() +1) + "-" +f.getDate()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds()+ `</small>
                </div>
                <div>
                    <p class="mb-1">` +texto+ `</p>  
                </div>
        
        </div>
            </div>    
        `

        document.getElementById("comentario").innerHTML += htmlContentToAppend;

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productcategoryHTML = document.getElementById("productcat");
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productcostHTML = document.getElementById("productcost");
            

            
            productcategoryHTML.innerHTML = product.category;
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productcostHTML.innerHTML = product.currency + " ";
            productcostHTML.innerHTML += product.cost;
            

            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    products = resultObj.data;
                    relacionados();
        
                 }
            });
            
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentario = resultObj.data;
            showComentarios(comentario);

         }
    });
    

});
