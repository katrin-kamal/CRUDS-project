let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAllProducts = document.getElementById("deleteAllProducts");
let search = document.getElementById("search");
let mood = "create";
let ex ;

//get total
function getTotal(){
    if (price.value !=""){
      let totalResult = (+price.value + +taxes.value + +ads.value)-+discount.value;
      total.innerHTML = totalResult;
      total.style.backgroundColor = "green";
    }else{
        total.style.backgroundColor = "rgb(132, 12, 12)";
        total.innerHTML = "0";
    }
}

//create new product
 let newProducts=[] ;
 
  if(localStorage.new != null){
   newProducts = JSON.parse(localStorage.new);
  }else{
   newProducts= [];
  }
  

  function checkProducts(){
  if(newProducts.length <1){
     deleteAllProducts.style.display ="none"
  }else{
     deleteAllProducts.style.display ="block"
  }}
  
//clear inputs
function clearInputs(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}

//show data
function showData(){
    let table ="";

    for(let i=0 ; i<newProducts.length ; i++){
        table += `<tr>
        <td>${i+1}</td>
        <td>${newProducts[i].title}</td>
        <td>${newProducts[i].price}</td>
        <td>${newProducts[i].taxes}</td>
        <td>${newProducts[i].ads}</td>
        <td>${newProducts[i].discount}</td>
        <td>${newProducts[i].total}</td>
        <td>${newProducts[i].category}</td>
        <td><button id="update" onclick = "updateData(${i})">update</button></td>
        <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
        </tr>`
        }
    document.getElementById("tbody").innerHTML = table;
    checkProducts()
    }

    submit.onclick = () => {
      let dataOfProduct = {
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: total.innerHTML,
          category: category.value,
      };

    if(title.value !="" 
       && price.value !="" 
       && category.value !=""
       && count.value <= 100 ){
      if(mood ==="create"){
        if(count.value >1){
         for(let r=0 ; r<count.value ; r++){
             newProducts.push(dataOfProduct)
            }
        }else{
          newProducts.push(dataOfProduct)
      }clearInputs()
    }else{
        newProducts[ex] = dataOfProduct;
        submit.innerHTML ="create";
        count.style.display = "block";
        clearInputs()
    }}else{
    }


      localStorage.setItem("new", JSON.stringify(newProducts)); 
      showData();
      deleteAllProducts.style.display ="block";
      deleteAllProducts.innerHTML = `delete all products (${newProducts.length})`
      getTotal()
  }
    
    
window.onload = showData()

//delete product
let deletePro = document.getElementById("delete")

function deleteProduct(i){
newProducts.splice(i,1);
localStorage.new = JSON.stringify (newProducts);

deleteAllProducts.innerHTML = `delete all products (${newProducts.length})`
if(newProducts.length == 0){
    deleteAllProducts.style.display ="none";
}else{
    deleteAllProducts.style.display ="block";
}
showData()
}

//delete all
function deleteAll(){
    localStorage.clear();
    deleteAllProducts.style.display ="none";
    newProducts=[];
    showData()
    }

//update
function updateData(i){
     submit.innerHTML = "update";
     title.value = newProducts[i].title;
     price.value = newProducts[i].price;
     taxes.value = newProducts[i].taxes;
     ads.value = newProducts[i].ads;
     discount.value = newProducts[i].discount;
     category.value = newProducts[i].category;
     getTotal();
     count.style.display ="none";
     mood = "update";
     ex = i ;
     scrollY({
        top:0,
        behavior:smooth,
     })
    }

//search
let moodOfSearch = "title";
function searchMood(id){
    search.focus();
    
 if(id == "searchByTitle"){
    search.placeholder = "search by title";
    moodOfSearch = "title";
}else{
    search.placeholder = "search by category";
    moodOfSearch = "category" ;

}} 


function searchProduct(value){
    let table ="";
    if(moodOfSearch=="title"){
        for(let i=0 ; i<newProducts.length ; i++){
            if(newProducts[i].title.includes(value)){
            table += `<tr>
            <td>${i+1}</td>
            <td>${newProducts[i].title}</td>
            <td>${newProducts[i].price}</td>
            <td>${newProducts[i].taxes}</td>
            <td>${newProducts[i].ads}</td>
            <td>${newProducts[i].discount}</td>
            <td>${newProducts[i].total}</td>
            <td>${newProducts[i].category}</td>
            <td><button id="update" onclick = "updateData(${i})">update</button></td>
            <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
            </tr>`
            document.getElementById("tbody").innerHTML = table;
            }}
    }else{
                for(let i=0 ; i<newProducts.length ; i++){
                    if(newProducts[i].category.includes(value)){
                    table += `<tr>
                    <td>${i+1}</td>
                    <td>${newProducts[i].title}</td>
                    <td>${newProducts[i].price}</td>
                    <td>${newProducts[i].taxes}</td>
                    <td>${newProducts[i].ads}</td>
                    <td>${newProducts[i].discount}</td>
                    <td>${newProducts[i].total}</td>
                    <td>${newProducts[i].category}</td>
                    <td><button id="update" onclick = "updateData(${i})">update</button></td>
                    <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
                    </tr>`
                    }
                }}
                document.getElementById("tbody").innerHTML = table;
            }