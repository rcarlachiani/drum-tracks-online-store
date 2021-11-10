///////////////// CAPTURA DE ELEMENTOS HTML - DOM /////////////////

let productsDOM = document.getElementsByClassName("products") // div que contiene la descripcion del producto
let addButtonDOM = document.getElementsByClassName("addButton") // Botones para añadir el producto al carrito

///////////////// MAIN CODE /////////////////

// Instanciado de carrito y productos
let carrito = []
let productsArr = []
productsArr.push(new Product("1", "Rock stereo track", "U$S2", 1))
productsArr.push(new Product("2", "Rock multi track", "U$S10", 1))
productsArr.push(new Product("3", "Indie stereo track", "U$S2", 1))
productsArr.push(new Product("4", "Indie multi track", "U$S10", 1))
productsArr.push(new Product("5", "Metal stereo track", "U$S2", 1))
productsArr.push(new Product("6", "Metal multi track", "U$S10", 1))

// Bucle que toma los hijos del contenedor "productsDOM" y reemplaza su contenido por el de los productos
for (i=0; i<productsArr.length; i++) {
    productsDOM[i].children[1].textContent = productsArr[i].name
    productsDOM[i].children[2].textContent = productsArr[i].price
}

// Evento del boton "Add cart" 
for (button of addButtonDOM) {
    button.addEventListener("click", addCart)
}

// Evento del boton "Show cart"
$("#showCart").on("click", showCart)

// Evento del boton "Empty cart"
$("#removeCart").on("click", emptyCart)

// Creacion del contador en HTML
let counterHTML = document.createElement("h3")
counterHTML.innerHTML = " (" + carrito.length + ") "
$("#counter").append(counterHTML)

///////////////// FUNCIONES /////////////////

// Funcion que construye los productos
function Product (id, name, price, stock) {
    this.id = id
    this.name = name
    this.price = price
    this.stock = stock
}

// Funcion que añade producto al storage y al carrito, creando el producto en una porcion de HTML vacio, oculto con display none y sumando al contador
function addCart (e) {
    let targetId = e.target.id
    for (i=0; i<productsArr.length; i++) {
        let productId = productsArr[i].id
        if (productId == targetId) {
            carrito.push(productsArr[i].name + " - " + productsArr[i].price)
            let carritoJSON = JSON.stringify(productsArr[i])
            sessionStorage.setItem(productId, carritoJSON)
            alert("Se agrego " + " '" + productsArr[i].name + "' " +  " al carrito")
            let carritoHTML = document.createElement("li")
            carritoHTML.innerHTML = productsArr[i].name + " - " + productsArr[i].price 
            $("#cart").append(carritoHTML)
            updateContent()
        }    
    }
}

// Funcion que muestra el carrito si es que tiene productos, quitando el display none 
function showCart () {
    if (carrito.length == 0) {
        alert("Su carrito no contiene productos")
    } else {
        $("#cart").css("display", "block")
    }
}

// Funcion que reinicia el contador, vacia el carrito, storage y el HTML creado
function emptyCart () {
    carrito = []
    counterHTML.innerHTML = " (" + carrito.length + ") " 
    $("#cart").css("display", "none")
    $("#cart").html('')
    sessionStorage.clear()
    alert("Su carrito fue vaciado")
}

// Funcion que actualiza el contador del carrito
function updateContent () {
    counterHTML.innerHTML = " (" + carrito.length + ") "
}