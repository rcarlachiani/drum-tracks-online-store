///////////////// CAPTURA DE ELEMENTOS HTML - DOM /////////////////

let productsDOM = document.getElementsByClassName("products") // div que contiene la descripcion del producto
let addButtonDOM = document.getElementsByClassName("addButton") // Botones para añadir el producto al carrito

///////////////// MAIN CODE /////////////////

// Instanciado de carrito y productos
let carrito = []
let productsArr = []
productsArr.push(new Product("0", "Rock stereo track", 2, 1))
productsArr.push(new Product("1", "Rock multi track", 10, 1))
productsArr.push(new Product("2", "Indie stereo track", 2, 1))
productsArr.push(new Product("3", "Indie multi track", 10, 1))
productsArr.push(new Product("4", "Metal stereo track", 2, 1))
productsArr.push(new Product("5", "Metal multi track", 10, 1))

// Bucle que toma los hijos del contenedor "productsDOM" y reemplaza su contenido por el de los productos
for (i=0; i<productsArr.length; i++) {
    productsDOM[i].children[1].textContent = productsArr[i].name
    productsDOM[i].children[2].textContent = `u$s` + productsArr[i].price
}

// Creacion del contador del carrito en HTML
let counterHTML = document.createElement("h3")
counterHTML.innerHTML = " (" + carrito.length + ") "
$("#counter").append(counterHTML)

// Creacion de la seccion HTML del clima y consumo de la API
navigator.geolocation.getCurrentPosition(mostrarGeo)
function mostrarGeo(position){
    var lat = position.coords.latitude
    var long = position.coords.longitude
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        type: 'GET',
        data: {
            lat: lat,
            lon: long,
            appid: 'f08969ce7afd98e3b62850ecee404a35',
            dataType: 'jsonp',
            units: 'metric'
        },
        success: function (data) {
            let icono = data.weather[0].icon
            let iconoURL = 'http://openweathermap.org/img/w/' + icono + ".png"
            $('#icono').attr("src", iconoURL)
            $('#weather').append(`<p>${data.name} - ${data.weather[0].main}  -  ${data.main.temp_max}º</p>`)
        }
    })
}

// Evento del boton "Add cart" 
for (button of addButtonDOM) {
    button.addEventListener("click", addCart)
}

// Evento del boton "Show cart"
$("#showCart").on("click", showCart)

// Evento del boton "Empty cart"
$("#removeCart").on("click", emptyCart)

///////////////// FUNCIONES /////////////////

// Funcion que construye los productos
function Product (id, name, price, quantity) {
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
}

// Funcion que añade producto al carrito y ejecuta las demas funciones de actualizacion de productos 
function addCart (e) {
    let targetId = e.target.id

    let itemIp = document.getElementsByClassName("itemInput")

    for (i=0; i<carrito.length; i++){
        if (carrito[i].id === targetId) {
            let inputValue = itemIp[i]
            inputValue.value++
            carrito[i].quantity++
            cartTotal()
            return null;
        }
    }
    carrito.push(productsArr[targetId])
    renderCart(targetId)
    updateContent(targetId)
    animateBuy()
}

// Funcion que renderiza el carrito en una seccion HTML
function renderCart(targetId) {
    let carritoHTML = document.createElement("li")
    carritoHTML.innerHTML = `<input type="counter" class="itemInput" style="width: 20px; text-align: center;" value="${productsArr[targetId].quantity}">`+ " - " + productsArr[targetId].name + " - " + " u$s" + productsArr[targetId].price 
    $("#cart").append(carritoHTML)
    cartTotal()
}

// Funcion que suma el precio total de los items
function cartTotal(){
    let total = 0;
    let itemCartTotal = document.getElementById("total")
    carrito.forEach((Product)=> {
        const precio = Product.price
        total = total + precio * Product.quantity
    })
    itemCartTotal.innerHTML = `TOTAL= u$s${total}`
    storageCart()
}

//Funcion que guarda el carrito en el storage
function storageCart(){
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
}

// Funcion que carga y renderiza el carrito si existe en el storage
window.onload = function(){
    let sStorage = JSON.parse(sessionStorage.getItem('carrito'));
    if (sStorage !== null){
        for (i=0; i<sStorage.length; i++){
            carrito.push(sStorage[i])
            let carritoHTML = document.createElement("li")
            carritoHTML.innerHTML = `<input type="counter" class="itemInput" style="width: 20px; text-align: center;" value="${sStorage[i].quantity}">`+ " - " + sStorage[i].name + " - " + " u$s" + sStorage[i].price 
            $("#cart").append(carritoHTML)
            cartTotal()
            updateContent()
        }
    }    
}

// Funcion que actualiza el contador del carrito
function updateContent () {
    counterHTML.innerHTML = " (" + carrito.length + ") "
}

// Funcion que lanza un alerta animado cada vez que un producto se agrega al carrito
function animateBuy () {
    $("#alert").fadeIn()
               .delay(1000)
               .fadeOut() 
}

// Funcion que muestra el carrito si es que tiene productos, quitando el display none 
function showCart () {
    if (carrito.length == 0) {
        $("#noCart").fadeIn()
        .delay(1000)
        .fadeOut() 
    } else {
        $("#cart").slideDown()
    }
}

// Funcion que reinicia el contador, vacia el carrito, storage y el HTML creado
function emptyCart () {
    $("#cart").hide("slow")
    $("#cart").html('')
    for (i=0; i<carrito.length; i++){
        carrito[i].quantity = 1
    }
    carrito = []
    counterHTML.innerHTML = " (" + carrito.length + ") "
    let itemCartTotal = document.getElementById("total")
    itemCartTotal.innerHTML = `TOTAL= u$s0`
    sessionStorage.clear()
}