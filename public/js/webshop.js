/**
* API die de producten laadt
*/
//Producten laden uit de database
function getAllProducts(type, url, callback) {
    //console.log("getAllproducts " + type + " " + url);

    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                var response = JSON.parse(xHttp.response);
                //console.log(response);
                callback(response);
                // succes
            } else {
                // failed
                alert('De producten kunnen momenteel niet geladen worden.')
            }
        }
    };
    xHttp.onerror = function () {
        // failed
        alert('De producten kunnen momenteel niet geladen worden.')
    };
    xHttp.open(type, url, true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    xHttp.send();
}

// Laadt één product
function getProduct(id) {
    getAllProducts("GET", "api/products/" + id, showPageProductInfo);
}

// Laadt één product
function showProductsListPage() {
    getAllProducts("GET", "api/products", showProductsP);
}

// Laat de populaire producten zien op de hoofdpagina
function showProductsP(products) {
    var productsP = document.getElementById("popular-products");

    productsP.innerHTML = "";
    products.forEach(function (product) {
        //console.log("product: " + product.id + ", " + product.name);
        productsP.innerHTML +=
            "<div class='product' id='" + product.id + "'>" +
            product.name + " " +
            "<p>€" + product.price + "</p>" + "<img src=img/products/" + product.id + ".png " + "class='product-img' alt='product-img'>" + "</div>";
    });
}

// API nieuwsbrief
function newsLetterDB() {
    var address = document.getElementById("email-input").value;
    //console.log(address);
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                // var response = JSON.parse(xHttp.response);
                //console.log(response);
                // callback(response);

                // succes
                //alert("jippoie");
                alert("Bedankt! U bent ingeschreven voor onze nieuwsbrief.");
            } else {
                // failed
                alert("Inschrijven mislukt.");
            }
        }
    };
    xHttp.onerror = function () {
        // failed
        alert("Inschrijven mislukt");
    };
    xHttp.open('POST', 'api/newsletter', true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    var input = JSON.stringify({
        email: address
    });
    xHttp.send(input);
}

// Klantgegevens API
function customerAPI() {
    var emailadress = document.getElementById("email-input2").value;
    var firstname = document.getElementById('voornaam').value;
    var lastname = document.getElementById('achternaam').value;
    var adress = document.getElementById('adres').value;
    var housenumber = document.getElementById('huisnummer').value;
    var zipcode = document.getElementById('postcode').value;
    var city = document.getElementById('woonplaats').value;
    var submitAntwoord = document.getElementById("submitAntwoord");
    //console.log(emailadress);

    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                //var response = JSON.parse(xHttp.response);
                //console.log(response);
                //callback(response);

                // succes
                submitAntwoord.innerHTML = "Bedankt! U bent ingeschreven.";
            } else {
                // failed
                submitAntwoord.innerHTML = "Aanmelden mislukt.";
            }
        }
    };
    xHttp.onerror = function () {
        // failed
        submitAntwoord.innerHTML = "Aanmelden mislukt.";
    };
    xHttp.open('POST', 'api/customer');
    xHttp.setRequestHeader('Content-Type', 'application/json');
    var input = JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        adress: adress,
        housenumber: housenumber,
        zipcode: zipcode,
        city: city,
        emailadress: emailadress
    });
    xHttp.send(input);
}

/**
* Van pagina veranderen als op een knop gedrukt wordt.
*/
//Buttton variabelen
function addButtonActions() {
    var overOnsButton = document.getElementById('button-overons');
    var homeMenuButton = document.getElementById('home-menu');
    var homeButton = document.getElementById('button-home');
    var productInfopButton = document.getElementById('page-infop');
    var emailSubmitButton = document.getElementById('email-check');
    var aanmeldenMenu = document.getElementById("aanmelden-menu");
    var customerSubmit = document.getElementById('submit-klantgegevens');

    //Button actions
    overOnsButton.addEventListener("click", function () {
        showOverOnsPage();
    });
    homeMenuButton.addEventListener("click", function () {
        showHomePage();
    });
    homeButton.addEventListener("click", function () {
        showHomePage();
    });
    productInfopButton.addEventListener("click", function () {
        showHomePage();
    });
    document.getElementById('popular-products').addEventListener("click", function (event) {
        clickOnProduct(event);
    });
    emailSubmitButton.addEventListener("click", function () {
        controle();
    });
    aanmeldenMenu.addEventListener("click", function () {
        showAanmeldPage();
    });
    customerSubmit.addEventListener("click", function () {
        controleKlant();
    });
}

// Controle email nieuwsbrief
function controle() {
    var address = document.getElementById("email-input").value;
    var at = address.indexOf("@");
    var dot = address.lastIndexOf(".");

    if (at < 1 || dot < at + 2 || dot + 2 >= address.length) {
        alert("Dit is geen geldig email adres. Probeer het opnieuw.");
        showHomePage();
    } else {
        newsLetterDB();
        showHomePage();
    }
}

// Controle email klantgegevens
function controleKlant() {
    var emailadress = document.getElementById("email-input2").value;
    var at = emailadress.indexOf("@");
    var dot = emailadress.lastIndexOf(".");

    if (at < 1 || dot < at + 2 || dot + 2 >= emailadress.length) {
        alert("U heeft een ongeldigd e-mailadres ingevuld. Probeer het opnieuw.");
        showAanmeldPage();
    } else {
        customerAPI();
        showAanmeldPage();
    }
}

/**
* het handelen van het klikken van een product
*/
function clickOnProduct(event) {
    //console.info("clickOnProduct");
    //console.info('geklikt op: ', event.target.id);

    if (event.target.id) {
        var gekliktOpProduct = document.getElementById(event.target.id);
        if (gekliktOpProduct) {
            //console.info("geklikt succes " + event.target.id);
            getProduct(event.target.id);
        }
    }
}

// Hide alle pagina's
function hideAllPages() {
    var overOnsPage = document.getElementById('page-overons');
    var homePage = document.getElementById('home');
    var productInfop = document.getElementById('product-infop');
    var aanmeldPage = document.getElementById('page-aanmelden');
    overOnsPage.style.display = 'none';
    homePage.style.display = 'none';
    productInfop.style.display = 'none';
    aanmeldPage.style.display = 'none';
}

// Show home Pagina
function showHomePage() {
    var page = document.getElementById('home');
    hideAllPages();
    page.style.display = 'block';
    document.title = "Combat Gear Almere";
}

// Show over ons Pagina
function showOverOnsPage() {
    var page = document.getElementById('page-overons');
    hideAllPages();
    page.style.display = 'block';
    document.title = "Over ons";
}

// Show aanmeld pagina
function showAanmeldPage() {
    var page = document.getElementById("page-aanmelden");
    hideAllPages();
    page.style.display = 'block';
    document.title = "Aanmelden als klant";
}

// Show Product detail page
function showPageProductInfo(product) {
    var page = document.getElementById('product-infop');
    hideAllPages();
    page.style.display = 'block';
    document.title = product.name + " details";

    //console.log("showProductInfoP: " + product);

    document.getElementById("product-name").innerHTML = product.name;
    document.getElementById("product-id").innerHTML = product.id;
    document.getElementById("product-description").innerHTML = product.description;
    document.getElementById("product-prijs").innerHTML = product.price;
    document.getElementById('image-pb').innerHTML = "<img src=img/products/" + product.id + ".png " + "class='productdetail-img' alt='productdetail-img'>";
}

// Initialize
addButtonActions();
showHomePage();
showProductsListPage();