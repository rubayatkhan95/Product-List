function reducer(actualPrice) {
    return actualPrice + (actualPrice * 0.15);
}

function fetchPriceList() {
    fetch("https://test-schema.herokuapp.com/vegetables").then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }).then(responseData => {
        const productList = responseData.data.map(product => {
            let reducedProductList = {
                name : product.name,
                price : reducer(product.price)
            }
            return  reducedProductList;
        })

        const filteredProductList = productList.filter(item => {
            if (item.price > 50) return item
        }) 

        const htmlListShow = filteredProductList.map(product => {
           return `
                <div class = "product">
                    <p class = "product-name">Name : ${product.name}</p>
                    <p class = "product-price">Price : ৳ ${product.price}</p>
                </div>`
        }).join("")

        const headerText =  `<h1 class="header-text">Price List</h1>`

        document.querySelector("#app").insertAdjacentHTML("afterbegin",headerText);
        document.querySelector("#list").insertAdjacentHTML("afterbegin",htmlListShow);

    }).catch(error => {
        console.log(error)
    })
}

fetchPriceList();
