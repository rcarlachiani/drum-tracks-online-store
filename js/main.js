///////////////// CAPTURA DE ELEMENTOS HTML - DOM /////////////////

let productsDOM = document.getElementsByClassName("products") // div que contiene la descripcion del producto
let addButtonDOM = document.getElementsByClassName("addButton") // Botones para añadir el producto al carrito
let counterDOM = document.getElementById("counter") // Contador de productos agregados al carrito
let showCartDOM = document.getElementById("showCart") // Boton para mostrar el carrito
let emptyCartDOM = document.getElementById("removeCart") // Boton para vaciar el carrito
let cartDOM = document.getElementById("cart") // ul vacio para generar el carrito

///////////////// MAIN CODE /////////////////

// Instanciado de carrito, productos y contador de productos
let carrito = []
let counterProducts = 0
let productsArr = []
productsArr.push(new product("1", "Rock stereo track", "U$S2", 1))
productsArr.push(new product("2", "Rock multi track", "U$S10", 1))
productsArr.push(new product("3", "Indie stereo track", "U$S2", 1))
productsArr.push(new product("4", "Indie multi track", "U$S10", 1))
productsArr.push(new product("5", "Metal stereo track", "U$S2", 1))
productsArr.push(new product("6", "Metal multi track", "U$S10", 1))

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
showCartDOM.addEventListener("click", showCart)

// Evento del boton "Empty cart"
emptyCartDOM.addEventListener("click", emptyCart)

// Creacion del contador en HTML
let counterHTML = document.createElement("h3")
counterHTML.innerHTML = " (" + counterProducts + ") "
counterDOM.appendChild(counterHTML)

///////////////// FUNCIONES /////////////////

// Funcion que construye los productos
function product (id, name, price, stock) {
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
            cartDOM.appendChild(carritoHTML)
            updateContent()
        }    
    }
}

// Funcion que muestra el carrito si es que tiene productos, quitando el display none 
function showCart () {
    if (carrito == '') {
        alert("Su carrito no contiene productos")
    } else {
        cartDOM.style.display = "block"
    }
}

// Funcion que vacia el carrito, contador del carrito, storage y el HTML creado
function emptyCart () {
    carrito = []
    cartDOM.innerHTML = ''
    counterProducts = 0
    counterHTML.innerHTML = " (" + counterProducts + ") " 
    cartDOM.style.display = "none"
    sessionStorage.clear()
    alert("Su carrito fue vaciado")
}

// Funcion que actualiza el contador del carrito
function updateContent () {
    counterProducts++
    counterHTML.innerHTML = " (" + counterProducts + ") "
}