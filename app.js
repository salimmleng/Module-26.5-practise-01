const loadallProducts = () =>{
    fetch('https://fakestoreapi.com/products')
    .then((res) =>res.json())
    .then((data) =>{
        console.log(data)
        allProductsDisplay(data)
    })

}

const displaySingleItem = (id)=>{
    console.log(id)
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data)=>{
        console.log(data)
        const modalBody = document.getElementById("modal-body")
        modalBody.innerHTML = ""
        const div = document.createElement("div")
        div.innerHTML=`
            <img class="img-cut" src=${data.image} alt="">
            <h3 class="card-title">Title: ${data.title.slice(0,30)}</h3>
            <h2 class="card-title">Price :$${data.price}</h2>
            <p class="card-text">Description: ${data.description.slice(0,200)}</p>
            <p class="card-text">Category: ${data.category}</p>
        `
        modalBody.appendChild(div)
        const showModal = new bootstrap.Modal(document.getElementById('modal'));
        showModal.show();

        
    })
}

const allProductsDisplay = (items) =>{
    const parent = document.getElementById("product-container")
    parent.innerHTML = "";

    items.forEach((item) =>{
        console.log(item)
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
           <img src=${item.image} class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">Title: ${item.title.slice(0,30)}</h3>
                <h2 class="card-title">Price :$${item.price}</h2>
                <p class="card-text">Description: ${item.description.slice(0,100)}</p>
                <p class="card-text">Category: ${item.category}</p>
                <button class="btn btn-primary" onclick="displaySingleItem('${item.id}')">Show Details</button>
            </div>
        `
        parent.appendChild(div)
        

    })

}

const loadAllCategories =() =>{
    fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) =>{
        console.log(data)
        displayCategory(data)
    })

}



const loadProducts = (category)=>{
    console.log(category)
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) =>res.json())
    .then((data) =>{
        console.log(data)
        allProductsDisplay(data)
    })
}

const displayCategory =(categories)=>{
    const parent = document.getElementById("category-container")
    parent.innerHTML = "";
    categories.forEach((category) =>{
        console.log(category)
        const li = document.createElement("li")
        li.classList.add("dropdown-item")
        li.innerHTML = `
        <a class="text-decoration-none text-dark" href="#" onclick="loadProducts('${category.replace(/'/g, "\\'")}')">${category}</a>
        `
        parent.appendChild(li)
    })

}
loadAllCategories()
loadallProducts()

