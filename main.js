
let addButton = document.querySelectorAll(".add")

addButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let btn = e.target
        let item = btn.parentElement
        let img = item.querySelector("img").src
        let name = item.querySelector("h3").innerText
        let price = item.querySelector("p span").innerText
        addToCart(img, name, price)
    })
})

// ========= 1- Add to Cart =========
function addToCart(img, name, price) {
    let tbody = document.querySelector("tbody")
   
    let tr = document.createElement("tr")
    let trContent = 
        '<tr><td><img src="' + img + '"><span id="name">' + name + '</span></td><td><span id="price">' + price + 
        '</span><sup> vnd</sup></td><td><input type="number" value="1" min="1">' + 
        '</td><td><span id="remove">remove</span></td></tr>'
    tr.innerHTML = trContent
    
    let trList = tbody.querySelectorAll("tr")

    if (trList.length === 0) {
        tbody.append(tr)
    } else {
        for (let item of trList) {
            if (item.querySelector("#name").innerHTML === name) {
                alert("item is already in cart")
                return
            } 
        }
        tbody.append(tr)
    }
    removeItem(tbody)
    getTotal(tbody)
    changeOrder(tbody)
    cartNote(tbody)
}
// ========= End: Add to Cart =========
// ========= 2- get Total ========
function getTotal(tbody) {
    let items = tbody.querySelectorAll("tr")

    let amounts = 0

    items.forEach((element) => {
        let item = element
        let price = parseInt(item.querySelector("#price").innerHTML) * 1000
        let no = item.querySelector("input").value
        let amount = price * no
        amounts += amount
    }) 

    document.querySelector("#total").innerHTML = amounts.toLocaleString("de-DE") + " <sup>vnd</sup>"
}
// ========= End: Total ========

// ========= 3- Remove ========
function removeItem(tbody) {
    let items = document.querySelectorAll("tbody tr")

    for (let tr of items) {
        let removeButton = tr.querySelector("#remove")
        removeButton.addEventListener("click", (e) => {
            let item = e.target.parentElement.parentElement
            item.remove()
            getTotal(tbody)
            cartNote(tbody)
        })
    }
}


function changeOrder(tbody) {
    let items = document.querySelectorAll("tbody tr")

    for (let tr of items) {
        let change = tr.querySelector("input")
        change.addEventListener("change", () => {
            getTotal(tbody)
        })
    }
}

// ---------- Cart toggle -----------
let cartIcon = document.querySelector("#header")
let cart = document.querySelector(".cart")
let shutdown = document.querySelector("#shutdow")

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("hide")
})

shutdown.addEventListener("click", function() {
    cart.classList.toggle("hide")
})

// ---------- Cart note ---------------

function cartNote(tbody) {
    let trList = tbody.querySelectorAll("tr")
    let len = trList.length
    document.querySelector("#cart-note").innerHTML = " : " + len + " - drinks"

}

