function customerSignup() {

    var firstName = document.getElementById('fName').value;
    var lastName = document.getElementById('lName').value;
    var tel = document.getElementById('tel').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;
    var confirmPwd = document.getElementById('confirmPwd').value;
    var idUser = JSON.parse(localStorage.getItem('idkey') || '1');

    var user = {
        id: idUser,
        fName: firstName,
        lName: lastName,
        tel: tel,
        email: email,
        pwd: pwd,
        confirmPwd: confirmPwd,
        role: 'user'
    };
    var isFirstNameValid = verifLength(firstName, 3);
    // Display Error Msg
    displayErrorMsg("fNameErrorMsg", isFirstNameValid, "First Name must have at least 3 characters");

    var isLastNameValid = verifLength(lastName, 5);
    displayErrorMsg("lNameErrorMsg", isLastNameValid, "Last Name must have at least 5 characters");
    var isPwdValid = verifLength(pwd, 8);
    displayErrorMsg("pwdErrorMsg", isPwdValid, "Password must have at least 8 characters");
    var isEmailValid = verifEmail(email);
    displayErrorMsg("emailFormatErrorMsg", isEmailValid, "Invalid Email Format");
    var isEmailUnique = emailExists(email);
    displayErrorMsg("emailUniqueErrorMsg", !isEmailUnique, "Email exists");
    var isConfirmPwdMatch = compare(pwd, confirmPwd);
    displayErrorMsg("confirmPwdErrorMsg", isConfirmPwdMatch, "Confirm Pwd does not match Pwd");

    // setUser into LS : firstName >=3, lastName>=5, Pwd>=8, email:format Valid, pwd == confirmPwd
    if (isFirstNameValid && isLastNameValid && isPwdValid && isEmailValid && isConfirmPwdMatch && !isEmailUnique) {
        // create user object
        var usersTab = JSON.parse(localStorage.getItem('users') || '[]');

        usersTab.push(user);

        localStorage.setItem('users', JSON.stringify(usersTab));
        localStorage.setItem('idkey', idUser + 1);
        alert("signup clicked");
    }
}
function login() {
    var email = document.getElementById('loginEmail').value;
    var pwd = document.getElementById('loginPwd').value;
    var findedUser = searchUser(email, pwd);
    // user is correct
    if (findedUser) {
        if (findedUser.role == "admin") {
            localStorage.setItem('connectedUserId', findedUser.id);

            location.replace('admin.html');
        } else {

            localStorage.setItem('connectedUserId', findedUser.id);

            location.replace('shop.html');
        }

    }
    else {
        document.getElementById('loginMsgError').innerHTML = 'Please check Email/pwd';
        document.getElementById('loginMsgError').style.color = 'red';
    }
}
function searchUser(emailParam, pwdParam) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailParam && users[i].pwd == pwdParam) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}
function adminSignup() {

    var firstName = document.getElementById('adminFName').value;
    var lastName = document.getElementById('adminLName').value;
    var tel = document.getElementById('adminTel').value;
    var email = document.getElementById('adminEmail').value;
    var pwd = document.getElementById('adminPwd').value;
    var confirmPwd = document.getElementById('adminConfirmPwd').value;
    var fax = document.getElementById('adminFax').value;
    var adress = document.getElementById('adminAdress').value;
    var idCompany = document.getElementById('idCompany').value;
    var companyName = document.getElementById('companyName').value;
    var idUser = JSON.parse(localStorage.getItem('idkey') || '1');


    var isFirstNameValid = verifLength(firstName, 3);
    // Display Error Msg
    displayErrorMsg("fNameErrorMsg", isFirstNameValid, "First Name must have at least 3 characters");

    var isLastNameValid = verifLength(lastName, 5);
    displayErrorMsg("lNameErrorMsg", isLastNameValid, "Last Name must have at least 5 characters");
    var isPwdValid = verifLength(pwd, 8);
    displayErrorMsg("pwdErrorMsg", isPwdValid, "Password must have at least 8 characters");
    var isEmailValid = verifEmail(email);
    displayErrorMsg("emailFormatErrorMsg", isEmailValid, "Invalid Email Format");
    var isEmailUnique = emailExists(email);
    displayErrorMsg("emailUniqueErrorMsg", !isEmailUnique, "Email exists");
    var isConfirmPwdMatch = compare(pwd, confirmPwd);
    displayErrorMsg("confirmPwdErrorMsg", isConfirmPwdMatch, "Confirm Pwd does not match Pwd");

    // setUser into LS : firstName >=3, lastName>=5, Pwd>=8, email:format Valid, pwd == confirmPwd
    if (isFirstNameValid && isLastNameValid && isPwdValid && isEmailValid && isConfirmPwdMatch && !isEmailUnique) {
        // create user object
        var user = {
            id: idUser,
            fName: firstName,
            lName: lastName,
            tel: tel,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            fax: fax,
            adress: adress,
            idCompany: idCompany,
            companyName: companyName,
            role: 'admin'
        };

        var usersTab = JSON.parse(localStorage.getItem('users') || '[]');

        usersTab.push(user);

        localStorage.setItem('users', JSON.stringify(usersTab));
        localStorage.setItem('idkey', idUser + 1);

    }
}


function verifLength(ch, nbr) {
    // var test = false;
    // if (ch.length >= nbr) {
    //     test = true;
    // } 
    // return test;
    return (ch.length >= nbr);
}

function verifEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function compare(ch, ch1) {
    return (ch == ch1);
}

function emailExists(email) {
    // get all users from LS
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    // users = [{email}, {email}, {email}]
    var userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            userExists = true;
            break;
        }
    }
    return userExists;
}

function displayErrorMsg(id, condition, msg) {
    if (condition) {
        document.getElementById(id).innerHTML = "";
    } else {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = 'red';
    }
}







function addCategory() {
    var nameCategory = document.getElementById("categoryName").value
    var idUser = localStorage.getItem('connectedUserId');
    var idCategory = JSON.parse(localStorage.getItem('idCat') || '1');
    var category = {
        id: idCategory,
        name: nameCategory,
        idUser: idUser
    };
    var listCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    listCategories.push(category);
    localStorage.setItem('categories', JSON.stringify(listCategories));
    localStorage.setItem('idCat', idCategory + 1);
    location.replace('add-products.html')

}

function addOptions() {

    var categoriesList = JSON.parse(localStorage.getItem('categories') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId')
    var categoriesTab = "";
    for (let i = 0; i < categoriesList.length; i++) {
        if (connectedUserId == categoriesList[i].idUser) {
            categoriesTab = categoriesTab + `
       <option value=${categoriesList[i].name}>${categoriesList[i].name}</option>  `;

        }
    }
    document.getElementById('cat').innerHTML = categoriesTab;
}
function addProduct() {



    var idUser = localStorage.getItem('connectedUserId');
    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var stock = document.getElementById('productStock').value;
    var categorie = document.getElementById('cat').value;
    var isNameValid = (verifLength(name, 3))
    displayErrorMsg("NameErrorMsg", isNameValid, "Product Name must have at least 3 characters");

    if (isNameValid && price > 0 && stock > 10) {


        var idProduct = JSON.parse(localStorage.getItem('idPr') || '1');
        var product = {
            id: idProduct,
            Name: name,
            Stock: stock,
            Price: price,
            Categorie: categorie,
            idUser: idUser,
            isConfirmed: false
        };

        var products = JSON.parse(localStorage.getItem('products') || '[]');
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('idPr', idProduct + 1);
        location.replace('super-admin.html');
    }
    else {
        alert("Error");
    }
}
function displayProducts() {


    var productsList = JSON.parse(localStorage.getItem('products') || '[]');
    var idUser = localStorage.getItem('connectedUserId');
    var myProducts = getUserProducts(idUser, productsList)
    var myProductsList = "";
    for (let i = 0; i < myProducts.length; i++) {
        myProductsList = myProductsList + `
  
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                  <div class="single-product">
                      <img class="img-fluid" src="img/product/p1.jpg" alt="">
                      <div class="product-details">
                          <h6>${myProducts[i].Name}</h6>
                          <div class="price">
                              <h6>$${myProducts[i].Price}</h6>
                              <h6 class="l-through">$${myProducts[i].Price}</h6>
                          </div>
                          <div class="prd-bottom">

                              <div class="social-info">
                                  <span class="ti-bag"></span>
                                  <button onclick="goToDisplaySingleProduct(${myProducts[i].id})"class="btn hover-text">display product</button>
                              </div>
                              <div class="social-info">
                              <span class="ti-bag"></span>
                              <button onclick="deleteObject(${getObjectPositionById(myProducts[i].id,productsList)},'products')"class="btn hover-text">Delete </button>
                          </div>
                              
                          </div>
                      </div>
                  </div>
             </div>    
              
`;
    }
    document.getElementById('productId').innerHTML = myProductsList;
}

function getUserProducts(userId, productsTab) {

    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].idUser && productsTab[i].isConfirmed == true) {
            myProducts.push(productsTab[i]);

        }
    }
    return myProducts;
}





function searchProductById(id) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');

    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            findedProduct = products[i];
            break;
        }
    }
    return findedProduct;
}
function displayEditForm() {
    var selectedIdProduct = localStorage.getItem("selectedIdProduct");
    var findedProduct = searchProductById(selectedIdProduct);
    var editForm = `
    <div class="row">
      <div class="col-lg-12">
				<div class="login_form_inner">
						<h3>Edit Product</h3>
					<div class="row login_form" >
                         <label for="">  Price </label>
						<div class="col-md-12 form-group">
							<input type="text" class="form-control" id="newPriceId" value=${findedProduct.Price}>
						</div>
                           <label for="">  Stock </label>
							<div class="col-md-12 form-group">
							<input type="text" class="form-control" id="newStockId" value=${findedProduct.Stock}>
							</div>
                           <div class="col-md-12 form-group">
                          <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()"> Validate Edit </button>
                           </div>
                  </div>
               </div>
       </div>
    </div>
                            
    `;
    document.getElementById('editFormDiv').innerHTML = editForm;

}
function validateEdit() {
    var newPrice = document.getElementById('newPriceId').value;
    var newStock = document.getElementById('newStockId').value;
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var selectedIdProduct = localStorage.getItem("selectedIdProduct");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectedIdProduct) {
            products[i].Price = newPrice;
            products[i].Stock = newStock;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("products.html");
}
function deleteProduct(pos) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    products.splice(pos, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}
function generateProductsTable() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');


    var productsTable = `   
        <table class="table">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
            
        </tr>`


    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed == false) {
            productsTable = productsTable + `   
        <tr>
            <td >${products[i].Name}</td>
            <td >${products[i].Price}</td>
            <td >${products[i].Stock}</td>
            <td >${products[i].Categorie}</td>

            <td > 	<button class="btn btn-danger" onclick="deleteProduct(${i})" > Delete</button>
            <button class="btn btn-success" onclick="confirmProduct(${products[i].id})"> Confirm</button>
						
            </td>
        </tr>`
        }
        else {
            productsTable = productsTable + `   
        <tr>
            <td >${products[i].Name}</td>
            <td >${products[i].Price}</td>
            <td >${products[i].Stock}</td>
            <td >${products[i].Categorie}</td>

            <td > 	<button class="btn btn-danger" onclick="deleteProduct(${i})" > Delete</button>
            <button class="btn btn-success" > Confirmed</button>
						
            </td>
        </tr>`}

    }
    productsTable = productsTable + `</table>`
    document.getElementById('tabProducts').innerHTML = productsTable;
}

function generateUsersTable() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');


    var usersTable = `   
        <table class="table">
        <tr>
            <th>First Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Role</th>
            <th>Actions</th>

        </tr>`
    for (let i = 0; i < users.length; i++) {
        usersTable = usersTable + `   
        <tr>
            <td >${users[i].fName}</td>
            <td >${users[i].lName}</td>
            <td >${users[i].email}</td>
            <td >${users[i].tel}</td>
            <td >${users[i].role}</td>
            <td > 	<button class="btn btn-danger" > Delete</button> </td>
        </tr>`
    };
    usersTable = usersTable + `</table>`
    document.getElementById('tabUsers').innerHTML = usersTable;
}
function confirmProduct(id) {

    var products = JSON.parse(localStorage.getItem('products') || '[]');

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirmed = true;

            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
location.reload();
}
function displayStoreProduct() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var confirmedProducts = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed == true) {
            confirmedProducts = confirmedProducts + `
  
              <!-- single product -->
              <div class="col-lg-3 col-md-6">
                <div class="single-product">
                      <img class="img-fluid" src="img/product/p1.jpg" alt="">
                    <div class="product-details">
                          <h6>${products[i].Name}</h6>
                          <div class="price">
                              <h6>$${products[i].Price}</h6>
                              <h6 class="l-through">$${products[i].Price}</h6>
                              <h6>${products[i].Categorie}</h6>
                          </div>
                        <div class="prd-bottom">

                              <div class="social-info">
                                  <span class="ti-bag"></span>
                                  <button onclick="goToDisplaySingleProduct(${products[i].id})"class="btn hover-text">Display</button>
                              </div>
                              <div class="social-info">
                                  <span class="lnr lnr-heart"></span>
                                  <button onclick="goToWishListProducts(${products[i].id})" class="btn hover-text">WishList</button>
                              </div>
                             
                              <a href="" class="social-info">
                              <span class="lnr lnr-move"></span>
                              <p class="hover-text">view more</p>
                              </a>
                          
                              
                        </div>
                    </div>
                </div>
             </div>    
              
`};
    }
    document.getElementById('productsDiv').innerHTML = confirmedProducts;

}
function goToWishListProducts(idProduct) {
  
    var connectedUserId = localStorage.getItem('connectedUserId');
    var wishList= JSON.parse(localStorage.getItem('wishList') || '[]');
    var wishProductId = JSON.parse(localStorage.getItem('wishProductIdKey') || '1');
    var wishProduct = {
        id: wishProductId,
        userId: connectedUserId,
        productId: idProduct
    }
    wishList.push(wishProduct);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    localStorage.setItem("wishProductIdKey", wishProductId + 1);
    location.replace("wishList.html")
}

function displayWishList(){
    var connectedUserId = localStorage.getItem('connectedUserId');
    var wishList= JSON.parse(localStorage.getItem('wishList') || '[]');
    var   myWishList=[];
    for (let i = 0; i <wishList.length; i++) {
        if(connectedUserId==wishList[i].userId){
            myWishList.push(wishList[i]);
        }}
        var wishListTable ="";
      if ( myWishList.length==0) {
         wishListTable =`
        <div class="text-center "style="position: relative; left: 400px">
        <h2>No WishList Products</h2>
         </div>`
     } else{ 
       wishListTable = `   
        <table class="table">
        <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            
            <th>Actions</th>

        </tr>`
   
        for (let i = 0; i <myWishList.length; i++) {
           
        wishListTable = wishListTable + `   
        <tr>
            <td >${(searchProductById(myWishList[i].productId)).Name}</td>
            <td >${(searchProductById(myWishList[i].productId)).Price}</td>
            <td >${(searchProductById(myWishList[i].productId)).Categorie}</td>
            
            <td > 	<button class="btn btn-success" onclick="goToDisplaySingleProduct(${(searchProductById(myWishList[i].productId)).id})"> Reserve</button> 
                  <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(myWishList[i].id,wishList)},'wishList')" > Delete</button>
            </td>
        </tr>`
    }};
    wishListTable = wishListTable + `</table>`
    document.getElementById('wishListId').innerHTML = wishListTable;
} 

function goToDisplaySingleProduct(idProduct) {
    localStorage.setItem("selectedIdProduct", idProduct);
    location.replace("singleProduct%20.html")
}
function serachUserById(id) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}


function displayProductInfoByUserRole() {
    var connectedUserId = localStorage.getItem('connectedUserId');
   
    var productInfoBloc = "";
    if(connectedUserId){ 
    var findedUser = serachUserById(connectedUserId);
    if (findedUser.role == "admin") {
        productInfoBloc = `
        <div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<ul class="list">
							<li><span>Category</span> <span id="prCategory"></span></li>
							<li><a href="#"><span>Availibility</span> : In Stock</a></li>
						</ul>
						<h4 id="prStock"></h4>
						
						
							<button class="btn btn-warning" onclick="displayEditForm()"> Edit Product</button>
						
					
					</div>
					<div id="editFormDiv"> </div>
        `
    }
    else {
        productInfoBloc = `
        <div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<ul class="list">
							<li><span>Category</span> <span id="prCategory"></span></li>
							<li><a href="#"><span>Availibility</span> : In Stock</a></li>
						</ul>
						<h4 id="prStock"></h4>
							<input class="form-control" id="reservedQty" type="number" placeholder="Insert Quantity"><br>
                            <span id="qtyErrorMsg"></span>
                            <button class="btn btn-warning" onclick="reserve()" > Reserve Product</button>
						
					
					</div>
				
        `;
    }}
    else{
        productInfoBloc = `
        <div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<ul class="list">
							<li><span>Category</span> <span id="prCategory"></span></li>
							<li><a href="#"><span>Availibility</span> : In Stock</a></li>
						</ul>
						<h4 id="prStock"></h4>
							
                            <button class="btn btn-warning" onclick="goToLogin()" > Login</button>
						
					
					</div>
				
        `
    }
    document.getElementById('productInfo').innerHTML = productInfoBloc;

}
function goToLogin() {
    location.replace("login.html")
}
function reserve() {
    var connectedUserId = localStorage.getItem('connectedUserId');
    var selectedIdProduct = localStorage.getItem("selectedIdProduct");
    var qty = document.getElementById('reservedQty').value;
    var findedProduct = searchProductById(selectedIdProduct);
    if (findedProduct.Stock >= qty) {
        var orderId = JSON.parse(localStorage.getItem('orderIdKey') || '1');
        var orders = JSON.parse(localStorage.getItem('orders') || '[]');

        var order = {
            id: orderId,
            qty: qty,
            userId: connectedUserId,
            productId: selectedIdProduct
        }
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("orderIdKey", orderId + 1);
        updateProductStock(selectedIdProduct, qty);
        location.replace("basket.html");
    } else {
        displayErrorMsg("qtyErrorMsg", findedProduct.Stock >= qty, "unavailable Quantity");
    }

}
function updateProductStock(id, qty) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].Stock -= qty;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
}
function basket() {
    var orders = JSON.parse(localStorage.getItem('orders') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myOrders = userOrders(orders, connectedUserId);
    var userBasket ="" ;
    if(myOrders.length==0){
        userBasket =`
        <div class="text-center">
       <h2>No Reserved Products</h2>
         </div>`
    }

    else{
        userBasket =  `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>`
    var total = 0;

    for (let i = 0; i < myOrders.length; i++) {
        var order = myOrders[i];
        var total = total + (searchProductById(order.productId).Price) * order.qty;
        userBasket +=
            `
        <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${searchProductById(order.productId).Name}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${searchProductById(order.productId).Price}</h5>
            </td>
            <td>
                <h5>${order.qty}</h5>
            </td>
            <td>
                <h5>${(searchProductById(order.productId).Price) * order.qty}</h5>
            </td>
            <td > 
            	<button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(order.id,orders)},'orders')" > Delete</button> 
                </td>
        </tr>`
    }
    userBasket +=
        ` 
        <tr>
            <td>

            </td>
            <td>

            </td>
            <td>
                <h5>Subtotal</h5>
            </td>
            <td>
                <h5>$${total}</h5>
            </td>
        </tr>
        <tr class="shipping_area">
            <td>

            </td>
            <td>

            </td>
            <td>
                <h5>Shipping</h5>
            </td>
           
            <td>
            ${shippingPrice(total)}
            </td>
        </tr>
        <tr class="out_button_area">
            <td>

            </td>
            <td>

            </td>
            <td>

            </td>
            <td>
                <div class="checkout_btn_inner d-flex align-items-center">
                    
                    <a class="primary-btn" href="#">Proceed to checkout</a>
                </div>
            </td>
        </tr>
    </tbody>
</table>
    `}
        ;
    userBasket = userBasket + `</table>`
    document.getElementById('userBasketId ').innerHTML = userBasket;
}

function userOrders(orders, userId) {

    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (userId == orders[i].userId) {
            myOrders.push(orders[i]);

        }
    }
    return myOrders;
}
function shippingPrice(price) {
    return (price >= 300) ? `free` : `7$`;
}
function storeOrders() {
    var orders = JSON.parse(localStorage.getItem('orders') || '[]');
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
   var myProducts= getUserProducts(connectedUserId, products);
   var myOrders=  `   
            <table class="table">
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>First Name</th>
                <th>Last Name</th>
    
            </tr>`
            for (let i = 0; i < orders.length; i++) {
                for (let j = 0; j < myProducts.length; j++){
                    if(orders[i].productId==myProducts[j].id){
                        myOrders = myOrders + `   
            <tr>
                <td >${searchProductById(myProducts[j].id).Name}</td>
                <td >${searchProductById(myProducts[j].id).Price}</td>
                <td >${orders[i].qty}</td>
                <td >${searchProductById(myProducts[j].id).Price*orders[i].qty}</td>
                <td >${serachUserById(orders[i].userId).fName}</td>
                <td >${serachUserById(orders[i].userId).lName}</td>
                
            </tr>`
        };
       
        }

    }
    myOrders = myOrders + `</table>`
    document.getElementById('myOrdersId').innerHTML = myOrders;
}
function profile() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var findedUser = serachUserById(connectedUserId);
    var profileForm = `
    <div class="row">
      <div class="col-lg-12">
				<div class="login_form_inner">
						<h2>Your Profil</h2>
					<div class="row login_form" >
                         <label  for="">  First Name </label>
						<div class="col-md-12 form-group">
							<h5 >${findedUser.fName}</h5>
						</div>
                           <label for="">  Last Name </label>
							<div class="col-md-12 form-group">
							<h5>${findedUser.lName}</h5>
							</div>
                            <label for="">  Tel </label>
							<div class="col-md-12 form-group">
							<h5>${findedUser.tel}</h5>
							</div>
                            <label for=""> Email </label>
							<div class="col-md-12 form-group">
							<h5>${findedUser.email}</h5>
							</div>
                           <div class="col-md-12 form-group">
                          <button type="submit" value="submit" class="primary-btn" onclick="edit()"> Edit </button>
                           </div>
                  </div>
               </div>
       </div>
    </div>
    <div id="editProfileId">  
   
    </div>
                            
    `;
    document.getElementById('profileId').innerHTML = profileForm;
}
function edit() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var findedUser = serachUserById(connectedUserId);
    var editProfile = `
    <div class="row">
      <div class="col-lg-12">
				<div class="login_form_inner">
						<h3>Edit Profile</h3>
					
                            <label for="">  Tel </label>
							<div class="col-md-12 form-group">
							<input type="text" class="form-control" id="newTelId" value=${findedUser.tel}>
							</div>
                            <label for=""> Email </label>
							<div class="col-md-12 form-group">
							<input type="text" class="form-control" id="newEmailId" value=${findedUser.email}>
							</div>
                           <div class="col-md-12 form-group">
                          <button type="submit" value="submit" class="primary-btn" onclick="profileEdit()"> Edit </button>
                           </div>
                  </div>
               </div>
       </div>
    </div>
    
                            
    `;
    document.getElementById('editProfileId').innerHTML = editProfile;
}
function profileEdit() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var newTel = document.getElementById('newTelId').value;
    var newEmail = document.getElementById('newEmailId').value;

    var connectedUserId = localStorage.getItem('connectedUserId');

    for (let i = 0; i < users.length; i++) {
        if (connectedUserId == users[i].id) {


            users[i].tel = newTel;
            users[i].email = newEmail;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    location.replace("profile.html");
}
function displayHeader() {
   
    var connectedUserId = localStorage.getItem('connectedUserId');
   
    var styleHeader = "";
    if(connectedUserId) {
        var findedUser = serachUserById(connectedUserId);
            if (findedUser.role == "admin") {
                styleHeader = `
            
                    <ul class="nav navbar-nav menu_nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item submenu dropdown active">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">Products</a>
								<ul class="dropdown-menu">
									<li class="nav-item active"><a class="nav-link" href="products.html">Products List</a></li>
									<li class="nav-item"><a class="nav-link" href="add-products.html">Add Products</a></li>
									<li class="nav-item"><a class="nav-link" href="add-category.html">Add Category</a></li>
								</ul>
							</li>
                            <li class="nav-item"><a class="nav-link" href="profile.html">welcome ${findedUser.fName}</a></li>
                    <li class="nav-item"><a class="nav-link" href="store-orders.html">Orders</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="logOut()" href="#">Log Out</a></li>
                    
                 </ul>
						`
            }
            //if ( users[i].role=="user") 
            else {
            styleHeader = `
       
                        <ul class="nav navbar-nav menu_nav ml-auto">
                           <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                           <li class="nav-item"><a class="nav-link" href="profile.html">welcome ${findedUser.fName}</a></li>
                           <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                           <li class="nav-item"><a class="nav-link" href="basket.html">Basket</a></li>
                           <li class="nav-item"><a class="nav-link" href="wishList.html">WishList</a></li>
                           <li class="nav-item"><a class="nav-link" onclick="logOut()" href="#">Log Out</a></li>
                           
                        </ul>
						
				`
            }
        }
//if (connectedUserId != users[i].id) 
        else {
        styleHeader = `
        
              
                   <ul class="nav navbar-nav menu_nav ml-auto">
                       <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                       <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                       <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                       <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                       <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                       <li class="nav-item submenu dropdown active">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">SignUp</a>
								<ul class="dropdown-menu">
									<li class="nav-item active"><a class="nav-link" href="customer-signUp.html">Simple User</a></li>
									<li class="nav-item"><a class="nav-link" href="admin-signUp.html">Admin</a></li>
									
								</ul>
							</li>
                   </ul>
                   `

        }
   
    document.getElementById('navbarSupportedContent').innerHTML = styleHeader;
}
function search() {

    var products= JSON.parse(localStorage.getItem('products') || '[]');
    var SearchName= document.getElementById('searchNameId').value;
    var SearchCategory= document.getElementById('searchCategoryId').value;
    resultSearch="";
    for (let i = 0; i < products.length; i++) {
        if(SearchName==products[i].Name ||SearchCategory==products[i].Categorie){
            resultSearch = resultSearch +`
            
            <div class="col-lg-4 col-md-3">
            <div class="single-product">
                  <img class="img-fluid" src="img/product/p1.jpg" alt="">
                <div class="product-details">
                      <h6>Product Name: ${products[i].Name}</h6>
                      <div class="price">
                          <h6>Product Price: $${products[i].Price}</h6>
                          <h6 class="l-through">$${products[i].Price}</h6>
                          <h6>Product Category: ${products[i].Categorie}</h6>
                          <h6>Product Stock: ${products[i].Stock}</h6>
                      </div>
                   
                       <div class="social-info">
                             
                              <button onclick="reserve()"class="btn btn-danger">Reserve</button>
                        </div>
                           
                    
                </div>
            </div>
         </div> 
         
          
`
        }
       
        
    }
    document.getElementById('searchId').innerHTML = resultSearch;
}
function logOut() {
    localStorage.removeItem("connectedUserId");
    location.replace("index.html");
    
}
function deleteObject(pos,key) {
    var objects = JSON.parse(localStorage.getItem(key) || '[]');
    objects.splice(pos,1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}
function getObjectPositionById(id,tab) {
   
    for(var i=0;i<tab.length;i++){
        if(tab[i].id==id){
         var   pos=i;
            break;
        }
    }
    return pos;
}
function productList() {

    var products = JSON.parse(localStorage.getItem('products') || '[]');
    
    var productsTab = "";
    for (let i = 0; i < products.length; i++) {
        {
            productsTab = productsTab + `
       <option value=${products[i].id}>${products[i].Name}</option>  `;

        }
    }
    document.getElementById('productListId').innerHTML = productsTab;
}
function goToInvoice() {
    var qty=document.getElementById('qtyId').value;
        var productId=document.getElementById('productListId').value;

     localStorage.setItem('qtyOrder',qty );
     localStorage.setItem('productOrder', productId);
     location.replace("invoice.html");
}


    function displayInvoice(){
var today=new Date();
var dateTime=today.toLocaleString();
document.getElementById('dateNow').innerHTML = dateTime;


        var qty=localStorage.getItem('qtyOrder');
        var productId=localStorage.getItem('productOrder');
       
        var product = searchProductById(productId);
        
       
        var invoicesTable =`
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th>Product Name</th>
                <th class="right">Price</th>
                <th class="center">Qty</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                
                <td class="left strong">${product.Name}</td>
                <td class="left">${product.Price}</td>
                <td class="right">${qty}</td>
                
            </tr>
           
        </tbody>
    </table>`;
    document.getElementById('invoicesTableId').innerHTML = invoicesTable;
   var total=` <table class="table table-clear">
    <tbody>
        <tr>
            <td class="left">
                <strong class="text-dark">Total</strong>
            </td>
            <td class="right">${product.Price*qty}</td>
        </tr>
        
    </tbody>
</table>`
document.getElementById('totalId').innerHTML = total;
}