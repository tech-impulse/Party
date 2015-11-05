/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName) {

    console.log("DisplayNode-> Nodes es " + data.result);
    console.log(data);

    var len = data.nodes.length;

    if (parseInt(len) < parseInt(data.columns)) {
        len = data.columns;
    }
    var alturaMin = parseInt(W_WIDTH * 0.7);
    var filas = len / data.columns; //isMain
    var count = 1;
    
    var aux = parseInt( alturaMin / filas ); //altura de la patanlla por el% del div partido por el numero de filas
    
    var alturaBox = ( aux / W_WIDTH) * 100; //obtenemos el valor en % 

    console.log("*Filas "+filas+" Altura min "+alturaMin+"  Altura es : " + alturaBox +" aux "+aux);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        if (originNode == 0) {
            loadMenu(data);
            //var imagen_partyfiesta = "<div><img src='css/icons/logo.png'></div>";
            var imagen_partyfiesta = "";
        } else {
            var imagen_partyfiesta = "";
            updateBackButton(originNode, originName);
            //$("#divHeader").show();
        }
        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        var extra = "";
        console.log("Tipo " + type);

        switch (type) {
        case "horizontal":
            {
                htmlContent = /* "<center>" + imagen_partyfiesta + "</center>" +*/ grid;
                //position = "a";
                for (var i = 0; i < data.nodes.length; i++) {

                    //solo se mostrar en el menu inicial de la app getNodes(0) diferenciamos entre los diferentes bloques del menu principal
                    if (originNode == 0) {

                        //comprobamos si existe algun nodo principal
                        console.log("Este es el principal??? " + data.nodes[i].isMain);
                        if (parseInt(data.nodes[i].isMain) == 1) {
                            console.log("este es el principal " + data.nodes[i].isMain);
                            var valorSwitch = 7;
                        } else {
                            var valorSwitch = parseInt(data.nodes[i].type);
                        }
                        switch (valorSwitch) {
                        case 1: //catalogo
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0)';
                            break;
                        case 2: //promos
                            extra = '';
                            break;
                        case 3: // asis fistas
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ')';
                            break;
                        case 4: // asis disfra
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ')';
                            break;
                        case 5: // sugerencias
                            extra = 'displayPantallaSugerencias()';
                            break;
                        case 6: // fuera tienda
                            extra = '';
                            break;
                        case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ')';
                            break;
                        }
                    } else extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')';


                    if (position < parseInt(data.columns)) { //numero maximo de columnas que tendra la pantalla
                        switch (position) {
                        case 0:
                            block = '<div class="ui-block-a" onclick="' + extra + '" style="height:' + alturaBox + '%">';
                            break;
                        case 1:
                            block = '<div class="ui-block-b" onclick="' + extra + '" style="height:' + alturaBox + '%">'; //style="height:' + alturaBox + '%"
                            break;
                        case 2:
                            block = '<div class="ui-block-c" onclick="' + extra + '" style="height:' + alturaBox + '%">';
                            break;
                        case 3:
                            block = '<div class="ui-block-d" onclick="' + extra + '" style="height:' + alturaBox + '%">';
                            break;
                        case 4:
                            block = '<div class="ui-block-e" onclick="' + extra + '" style="height:' + alturaBox + '%">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="' + extra + '" style="height:' + alturaBox + '%">';
                    }

                    if ( /*(position + 1) == parseInt(data.columns) && count < filas && */ valorSwitch == 7) { //despues de la primera fila se mostrara el elemento principal

                        console.log("Entramos para mostrar el nuevo elemeto");
                        var element2 = '<div class="ui-block-a" style="width: 25%;height:' + alturaBox + '%"></div><div class="ui-block-b" style="width: 50%;height:' + alturaBox + '%"><a data-role="button" data-theme="f" style="background-color: lightgray;"><img src="' +
                            data.nodes[i].linkext + '" style="width: 100px;height: 100px;" ><br><strong>' + data.nodes[i].name +
                            '</strong></a></div><div class="ui-block-c" style="width: 25%;height:' + alturaBox + '%"></div>';

                        var element = block + '<div><a data-role="button" data-theme="f"><img src="' +
                            data.nodes[i].linkext + '" style="width: 85px;height: 85px;height:' + alturaBox + '%"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';

                        count++;
                        htmlContent = htmlContent + element + element2;

                    } else {

                        var element = block + '<div><a data-role="button" data-theme="f"><img src="' +
                            data.nodes[i].linkext + '" style="width: 85px;height: 85px;height:' + alturaBox + '%"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';
                        htmlContent = htmlContent + element;

                    }

                    //console.log(element);

                    //htmlContent = htmlContent + element;
                    /*if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }*/
                    position++;
                }

                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                //$("#divContent").css({'position': 'absolute','top':'25%','width': '97%','margin-right': '1%'});//'position': 'relative','top':'0%','width': '100%'
                $("#divContent").trigger('create');

                break;
            };
        case "vertical":
            {
                htmlContent = grid + " <div class='ui-block-a' style='width:66%;height:" + alturaBox + "%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
                for (var i = 0; i < data.nodes.length; i++) {

                    console.log("Is party? " + data.nodes[i].isParty);

                    switch (i) { //color para los botones
                    case 0:
                        var bacgroundColor = "mediumvioletred";
                        break;

                    case 1:
                        var bacgroundColor = "gold";
                        break;

                    case 2:
                        var bacgroundColor = "darkorange";
                        break;

                    case 3:
                        var bacgroundColor = "yellowgreen";
                        break;

                    case 4:
                        var bacgroundColor = "dodgerblue";
                        break;

                    }

                    if (data.nodes[i].name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')" style="background-color:' + bacgroundColor + ';">' + data.nodes[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')" style="background-color:' + bacgroundColor + ';">' + data.nodes[i].name + '</a>';
                    }
                    htmlContent = htmlContent + element;
                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                //$("#divHeader_menu").hide();
                break;
            };
        }

    } else {

        console.log("Error en el envio de parametros");

    }

}




function displayProducts(data, originNode, originName) {

    console.log("DisplayProducts-> Node product es " + data.result);
    console.log("DisplayProducts-> Nodo Origen Id" + originNode);
    console.log("DisplayProducts-> Nodo Origen Nombre" + originName);

    if (data.result == 1) { // Hay resultados

        PRODUCTS = data.products;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        if (originNode == 0) {
            loadMenu(data);
        } else {
            updateBackButton(originNode, originName);
        }
        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        switch (type) {
        case "horizontal":
            {
                htmlContent = /*"<center></center>"*/ +grid;
                position = "a";
                for (var i = 0; i < data.products.length; i++) {

                    //if (data.products[i].price_x_region.totalPrice != undefined) { // Controlamos que el precio exista
                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" onclick="">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" onclick="">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a">';
                    }
                    var element = block + '<a data-role="button" data-theme="f"><div id="circulo' + data.products[i].id + '"  class="circulo" style="width: 35px;height: 35px;display: none;position: absolute;">' +
                        '<label id="quantity' + data.products[i].id + '" style="display:block;padding-top: 5px;font-size: 22px;color: white;">10</label></div>' +
                        '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + i + ',\'PRODUCTS\')" style="width: 120px;height: 120px;">' +
                        '<br><div class="contenedor">' + data.products[i].name + '</div>' +
                        '<br><br><strong>' + formatoNumero(data.products[i].price_x_region.totalPrice, 2, ",", ".", "€") + '</strong>' +
                        '<br><button id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                        '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                        '<div class="ui-block-a" onclick="" style="width: 45%;"><button id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="" style="width: 45%;"><button id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    //console.log(element);

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;
                    //}
                }
                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');

                break;

            };
        case "vertical":
            {
                htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
                for (var i = 0; i < data.products.length; i++) {

                    if (data.products[i].name == "") {
                        var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                    }

                    htmlContent = htmlContent + element;

                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                //$("#divHeader_menu").hide();
                break;
            };
        }

    } else {

        console.log("Error ....");

    }

}

/*
    Enseña o esconde los botones de añadir o restar productos 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
*/
function displayItemOperations(id, param, position) {

    if (param > 0) {
        $("#btnAddProduct" + id).hide();
        $("#grid" + id).show();
        $("#quantity" + id).text(param);
        $("#circulo" + id).show();

    } else {
        $("#btnAddProduct" + id).show();
        $("#grid" + id).hide();
        $("#circulo" + id).hide();
        CART.splice(position, 1);
        //deleteItemCart(position);        
    }
    var total = 0;
    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }
    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

}

function openPopupAction(param) {
    $("#lbpopupAction").text(param);
    switch (param) {
    case 'deleteItem':
        $("#popupListItems").popup("close");
        setTimeout(function () {
            $("#popupAction").popup("open");
        }, popupTimeout);
        break;
    }
}


function displayPopupItemList() {

    var html = '';

    for (var i = 0; i < CART.length; i++) {
        html = html +
            '<li> ' +
            '<div class="ui-grid-b">' +
            '<div class="ui-block-a" style="width:10%"><img class="thumb" src="' + CART[i].linkext + '"></div>' +
            '<div class="ui-block-b" style="width:45%" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="margin:11px">' + CART[i].name + '</label></div>' +
            '<div class="ui-block-c" style="width:40%">' +
            '<div class="ui-grid-d">' +
            '<div class="ui-block-a" style="width:16%"><a style="padding:2px" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); displayPopupItemList();"></a></div>' +
            '<div class="ui-block-b" style="width:16%"><center><label style="margin-top:11px">' + CART[i].quantity + '</label></center></div>' +
            '<div class="ui-block-c" style="width:16%"><a style="padding:2px" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1); displayPopupItemList();"></a></div>' +
            '<div class="ui-block-d" style="width:36%"><label style="margin:11px; float:right">' + parseFloat(CART[i].quantity * CART[i].price_x_region.totalPrice).toFixed(2) + ' €</label></div>' +
            '<div class="ui-block-e" style="width:16%"><a data-icon="delete" data-role="button" data-theme="f" style="background-color: red; padding:2px" data-iconpos="notext" onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"></a></div>' +
            '</div>' +
            '</div>' +
            '</li>';
    }
    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");


    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    switch (CART.length) {
    case 0:
        console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayItemAlter(id_prod) {

    var aux_prod;

    for (var i = 0; i < PRODUCTS.length; i++) {

        if (parseInt(PRODUCTS_ALTER[i].id) == parseInt(id_prod)) {

            aux_prod = PRODUCTS_ALTER[i];
            break;

        }
    }

    var html = '';

    html = html +
        '<div class="ui-grid-a" >' +
        '<div class="ui-block-a" style="width:40%;"><img src="' + aux_prod.linkext + '" style="max-width:100%;"></div>' +
        '<div class="ui-block-b" style="width:60%;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:90%;">' + aux_prod.name + '</div>' +
        '<div class="ui-block-b"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><label id="price_alter">' + formatoNumero(aux_prod.price_x_region.totalPrice, 2, ",", ".", "€") + '/u. </label></div>' +
        '<div class="ui-block-b" style="width:50%;"><label id="total_alter"></label>Total:</div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;margin-top: 1%;"><input type="number" id="cantidad_prod_alter" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a id="mas_fiesta" onclick="addProduct(1);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">+</a></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><a data-role="button" data-theme="b" data-iconpos="notext" onclick="volver();">VOLVER</a></div>' +
        '<div class="ui-block-b" style="width:50%;"><a data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCartAlter(' + aux_prod.id + ');">AÑADIR</a></div>' +
        '</div></div>' +
        '</div>';


    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    switch (CART.length) {
    case 0:
        console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayPopupItemDetail(id, param) {

    console.log("click");
    switch (param) {
    case "CART":
        var productList = CART;
        var quantity = productList[id].quantity;
        var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
        break;

    case "PRODUCTS":
        var productList = PRODUCTS;
        var quantity = 0;
        var buttonBack = "";
        var carrusel = "";

        var div_carrusel = "";

        PRODUCTS_ALTER = productList[id].alternatives_products;

        if (productList[id].alternatives_products != null) {

            for (var i = 0; i < productList[id].alternatives_products.length; i++) {

                var prod_alt = productList[id].alternatives_products[i];

                //var imageUrl = prod_alt.linkext;

                // imageExists(imageUrl, function (exists) { //probamos que la imagen existe en el servidor

                //addToCart(item, param)

                //console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
                //if (exists == true) {
                // image exists.
                //console.log("Existe la imagen");
                carrusel = carrusel + '<div class="swiper-slide"><img onclick="displayItemAlter(' + prod_alt.id + ');" src="' + prod_alt.linkext + '" style="max-width: 75px;max-height: 75px;"></div>';

                /* } else {
                     // Image doesn't exist
                     console.log("No existe la imagen");
                     carrusel = carrusel + '<div class="swiper-slide"><img onclick="add_producto_cart(' + prod_alt.id + ',' + prod_alt.price + ',' + prod_alt.name + ');" src="lib/images/error_download.png" style="max-width: 75px;max-height: 75px;"></div>';

                 }

                 console.log(carrusel);*/

                ///});

            }

            div_carrusel = '<li data-role="list-divider" data-theme="c"><span>Productos alternativos</span></li>' +
                '<li><div class="ui-grid-a" id="img_prod_alter">' +
                '<div class="swiper-container"><div class="swiper-wrapper" id="carrusel"  style="">' + carrusel + '</div></div>' +
                '</div>' +
                '</li>';

        }

    }




    var imgAvailability = "";
    switch (productList[id].status) {
    case 1:
        imgAvailability = "css/maqueta/barraVerde.gif";
        break;
    case 2:
        imgAvailability = "css/maqueta/barraAmarilla.gif";
        break;
    default:
        imgAvailability = "css/maqueta/barraVerde.gif";
        break;
    }

    var html = '';

    html = html +
        '<ul data-role="listview" data-inset="true">' +
        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + productList[id].name + '</h2><span class="ui-li-count">' + quantity + '</span></li>' +
        '<li>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a"><img src="' + productList[id].linkext + '" style="max-width: 200px;max-height: 200px;"></div>' +
        '<div class="ui-block-b">' +
        '<br><h1>Precio Total: ' + parseFloat(productList[id].price_x_region.totalPrice).toFixed(2) + ' €</h1>' +
        '<p><strong> Ubicación: ' + productList[id].definition + '</strong></p>' +
        '<p><strong>' + productList[id].definition + '</strong></p>' +
        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
        '</div>' +
        '</li>' + div_carrusel +

    '</ul>';

    if (buttonBack != "") {
        html = html + buttonBack;
    }

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
    });

    setTimeout(function () {
        $("#popupListItems").popup("open");
    }, popupTimeout);


}

function displayMasMenos(param, id_producto) {
    /*

    console.log("Que es escondemos " + param);

    if (param == 1) {

        $("#btnAddProduct" + id_producto).hide();
        $("#grid" + id_producto).show();
        $("#circulo" + id_producto).show();



    } else {

        $("#btnAddProduct" + id_producto).show();
        $("#grid" + id_producto).hide();
        $("#circulo" + id_producto).hide();

    }
*/

}

/*
    Enseña o esconde el icono del numero de productos seleccionados 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
*/
function displayQantidadProducto(cantidad, id_producto) {
    /*

    if (cantidad == 0) {

        $("#circulo" + id_producto).hide();
        displayMasMenos(1, id_producto);

    } else {

        $("#circulo" + id_producto).show();
        console.log("Cantidad " + cantidad + " para el circulo -> $('#quantity" + id_producto + "').val(" + cantidad + ")");
        $("#quantity" + id_producto).text(cantidad);

    }
    */

}


/* Función que carga el menú lateral
 */
function loadMenu(data) {

    var options = '';
    var htmlHeader = '';

    console.log(data);

    if (data.nodes == undefined) {
        var len = data.node.length;
        var node = data.node;
    } else {
        var len = data.nodes.length;
        var node = data.nodes;
    }

    // var len = data.nodes.length;
    //var node = data.nodes;

    if (len > 0) {
        for (var i = 0; i < len; i++) { //data:image/png;base64,

            if (parseInt(data.nodes[i].isMain) == 1) {
                console.log("este es el principal " + node[i].isMain);
                var valorSwitch = 7;
            } else {
                var valorSwitch = parseInt(node[i].type);
            }

            switch (valorSwitch) {
            case 1: //catalogo
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',0,1)';
                break;
            case 2: //promos
                extra = '';
                break;
            case 3: // asis fistas
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            case 4: // asis disfra
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            case 5: // sugerencias
                extra = 'displayPantallaSugerencias()';
                break;
            case 6: // fuera tienda
                extra = '';
                break;
            case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            }

            options = options + '<li onclick="' + extra + ';"; openMenu()"><img src="' + node[i].linkext + '" style="width:12em">' + node[i].name + '</li>';
        }

    }

    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">'+jsonIdiomas.menu_lateral.menu+'</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');


    var cart = '<a href="#" onclick="displayCar();" data-position-to="origin">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:30%"><img src="css/icons/cesta.png" width="75%" style="margin-left: 20%"></div>' +
        '<div class="ui-block-b" style="width: 70%;"><span style="margin-left:15px" id="spBtnPopupCartProducts">0</span><span id="labelProductos">'+jsonIdiomas.header.labelProductos+'</span><br> <span style="margin:15px" id="spBtnPopupCartAmmount">0 €</span></div>' +
        '</div></a>';


    /*HEADER  de la pantalla*/

    htmlHeader = '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:30%;color: rgb(70, 130, 180);" id="divBack"></div>' +
        '<div class="ui-block-b" style="margin-top:10px; width:27%;"><img src="css/icons/logo.png" width="75%" style="margin-left: 20%"> </div>' +
        '<div class="ui-block-c" style="margin-top:15px;width:21%" id="session">' +
        '<center><a id="login" onclick="displayLogin();" style="width:10%"> <span>'+jsonIdiomas.header.login+'</span> </a>' +
        '</div>' +
        '<div class="ui-block-d" style="margin-top:10px; width:18%" id="car_compra">' + cart +
        '</div>' +
        '<div class="ui-block-e" style="margin-top:10px; width:4%">' +
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px; float:right"> <span class="flaticon-menu"></span> </a>' +
        '</div>' +
        '</div>';
    //'<img src="css/icons/barra.png" height="5px" width="100%"><ul data-role="listview" style="margin:0px"> <li data-role="list-divider" id="path"> </li> </ul>';
    /*
    htmlHeader = '<div>'+
        '<div class="ui-grid-b">'+
        '<div class="ui-block-a" style="margin-top:10px; width:20%" id="divBack"></div>'+
        '<div class="ui-block-b" style="margin-top:10px;width:30%"><img src="css/icons/logo.png" width="100%"> </div>'+
        '<div class="ui-block-c" style="text-align:right; width:50%">'+
        '<div class="ui-grid-b">'+
        '<div class="ui-block-a" style="width:30%" id="session">'+
        '<a id="login" onclick="displayLogin();" style="margin:10px"> <span>Identificate!</span> </a>'+
        '</div>'+
        '<div class="ui-block-b" style="width:50%">'+ cart +
        '</div>'+
        '<div class="ui-block-c" style="width:20%">'+
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<img src="css/icons/barra.png" height="5px" width="100%"><ul data-role="listview" style="margin:0px"> <li data-role="list-divider" id="path"> </li> </ul>';
        */

    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');
    $("#divHeader_catalogo").addClass("border-header");
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

}


function displayPantallaIntermediaAsistDisfra(data) {

    //console.log(data);

    loadMenu(node_cero);
    updateBackButton(0, jsonIdiomas.header.menu);
    $("#divHeader_catalogo").show();

    var info = data.node;

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<img src="' + info.linkint + '" alt="">' +
    //'<h3> ¿Para quién es el disfraz?</h3>' +
    '<div style="width: 30%"><select id="select_sexo" data-native-menu="false">' +
        '</select></div>' +
    //'<h3> Edad </h3>' +
    //'<div style="width: 25%"><select id="select_edad" >' +
    //'</select></div>' +
    //'<h3> Talla </h3>' +
    '<div id="div_selectTalla" style="width: 25%;display:none"><select id="select_talla" data-native-menu="false">' +
        '</select></div>' +
        '<br>' +
        '<a style="width:150px" id="btn_continuar" onclick="displayProductos(' + info.id + ',\'' + info.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">'+jsonIdiomas.asistente_disfraces.btn_continuar+'</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#select_sexo").attr("data-native-menu", "false");
    $("#select_talla").attr("data-native-menu", "false");

    $('#select_sexo').scrollTop(5);
    $('#select_talla').scrollTop(5);

    getGender(); //llamamos al webservice que tiene los sexos

    $('#select_sexo').change(function () {
        var optionSelected = $(this).find('option:selected');
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected != 0) {

            getSize(optValueSelected);
            $("#div_selectTalla").show();

        } else {
            $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
            $('#popupAlert').popup('open');

            $("#div_selectTalla").hide();
        }
    });



}


function displayPantallaIntermediaAsistFiestas(data) {

    console.log(data);
    console.log("Asistente de fiestas");

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<br>' +
        '<img src="' + data.linkint + '" style="max-width:30%;">' +
        '<h4><label id="label_num_per_fiesta" style="">'+jsonIdiomas.asistente_fiestas.label_num_per_fiesta+'</label></h4>'+
        '<div class="ui-grid-b" style="max-width:25%;">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;"><input type="number" id="personas_fiesta" min="1" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a id="mas_fiesta" onclick="addPeople(1);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">+</a></div>' +
        '</div>' +
        '<a style="max-width:15%;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">'+jsonIdiomas.asistente_fiestas.btn_continuar+'</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');


}


function displayRegistro() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

}

function displayCambioContra() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupCambioContra").popup("open");
    }, popupTimeout);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, popupTimeout);


}

function displayCar() { //muestra el pop up de inicio de session


    $('.ui-popup').popup('close');
    setTimeout(function () {
        $("#popupCart").popup("open");
    }, popupTimeout);


}


function displayLogin2() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupCambioContra").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);


}



function displayMenu() { //muestra el pop up de inicio de session

    console.log("Volver al menu");
    getNodes(0);

}



function logout() { //muestra el pop up de inicio de session


    console.log("Cerramos session");
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px"><span>'+jsonIdiomas.header.login+'</span></a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");


}

function displayScreenSaver() { //muestra el pop up de inicio de session

    /*if (idleTimeActive == true) {

        idleTimeActive = false;

        //$('#contentPopupScreenSaver').fadeIn();
        $('#contentPopupScreenSaver').hide();

        setTimeout(function () {
            $('#principal').show();
        }, 100);

    } else {*/

    $('.ui-popup').popup('close');
    idleTimeActive = true;
    console.log("Protector de pantalla activado");
    $('#principal').hide();
    $('#contentPopupScreenSaver').show();

    //}


}



function displayPantallaSugerencias() {

    console.log("Entramos en la pantalla de sugerencias");
    $("#banderas").hide();
    nodeIds = [];
    nodeNames = [];
    loadMenu(node_cero);

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();

    html_sug = '<div id="form_sugerencias" style="margin-top:2%;">' +
        '<form  enctype="text/plain">' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNom">'+jsonIdiomas.form_sugerencias.labelSugNom+'</label><input type="text" id="nombre" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugNaci">'+jsonIdiomas.form_sugerencias.labelSugNaci+'</label><input type="date" value="" id="fecha_naci" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugMail">'+jsonIdiomas.form_sugerencias.labelSugMail+'</label ><input type="email" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNPob">'+jsonIdiomas.form_sugerencias.labelSugNPob+'</label ><input type="text" id="poblacion" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugProv">'+jsonIdiomas.form_sugerencias.labelSugProv+'</label><input type="text" value="" id="provincia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugTelf">'+jsonIdiomas.form_sugerencias.labelSugTelf+'</label><input type="number" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugTipo">'+jsonIdiomas.form_sugerencias.labelSugTipo+'</label><select name="suge_inci" data-native-menu="false"><option value="1">'+jsonIdiomas.form_sugerencias.selectOption+'<option value="2">Petición</select></div>' +
        '<div class="ui-block-b" style="width: 65%;"><label id="labelSugNSugPreg">'+jsonIdiomas.form_sugerencias.labelSugNSugPreg+'</label><input type="text" value="" id="tipo_sugenrencia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<label id="labelSugPreg">' +jsonIdiomas.form_sugerencias.labelSugPreg+
        '<textarea cols="40" rows="3" id="sugerencias" style="height: 52px;" placeholder="'+jsonIdiomas.form_sugerencias.sugerenciasPlaceholder+'"></textarea>' +
        '<table width="25%" border="0" align="center" cellpadding="10" cellspacing="0">' +
        '<tr>' +
        '<td>' +
        '<div align="center">' +
        '<button type="button" onclick="enviarSugerencia();" id="enviar_sugerencia">'+jsonIdiomas.form_sugerencias.enviar_sugerencia+'</button>' +
        '</div>' +
        '</form>' +
        '</div>';


    $("#divContent").html(html_sug);
    $("#divContent").trigger('create');

}

function displaySummary(param) {

    var html = '';
    if (LOGGED == true) {
        if (CART.length > 0) {
            console.log("Actualizar div");
            $('.ui-popup').popup('close');
            var htmlHeader = '<ul data-role="listview">' +
                '<li data-role="list-divider" style="background-color:#0096D2; font-size:20px; color:white;">' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width:70%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:20%">id</div>' +
                '<div class="ui-block-b" style="width:40%">Producto</div>' +
                '<div class="ui-block-v" style="width:40%">Ubicación</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-block-b" style="width:30%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:25%; text-align:center;">Unds</div>' +
                '<div class="ui-block-b" style="width:25%; text-align:center;">Precio</div>' +
                '<div class="ui-block-c" style="width:25%; text-align:center;">Total</div>' +
                '<div class="ui-block-d" style="width:25%; text-align:right;"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>';
            /*
            var htmlContent = '';
            for (var i = 0; i<CART.length ; i++){
                htmlContent = htmlContent +
                '<li>'+
                        '<div class="ui-grid-a">
                            '<div class="ui-block-a" style="width:65%">
                                '<div class="ui-grid-b">
                                    '<div class="ui-block-a" style="width:20%"><img src="'+CART[i].linkext+'"></div>'+
                                    '<div class="ui-block-b" style="width:40%">'+
                                        Pack Gafas Frozen
                                        <br> ID: 660591
                                        <br> Descuento: 20%
                                        <br>Stock Central: <img src="css/maqueta/barraVerde.gif">
                                    </div>
                                    <div class="ui-block-c" style="width:40%">
                                        Sección: NAV
                                        <br> Estantería : 17
                                        <br> Nivel: 9
                                        <br> Stock Tienda: <img src="css/maqueta/barraAmarilla.gif">
                                    </div>

                                </div>
                            </div>
                            <div class="ui-block-b" style="width:35%">
                                <div class="ui-grid-c">
                                    <div class="ui-block-a" style="width:25%; text-align:right;">
                                        2
                                    </div>
                                    <div class="ui-block-b" style="width:25%; text-align:right;">
                                        9.99€
                                    </div>
                                    <div class="ui-block-c" style="width:25%; text-align:right;">
                                        19.98€
                                    </div>
                                    <div class="ui-block-d" style="width:25%; text-align:right;">
                                        <img src="css/maqueta/eliminar.png" onclick='$("#popup").popup("open");'>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li> 
                    
            }
            */

            html = htmlHeader + htmlContent + '</ul>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            var n = nodeIds.length + 1;
            updateBackButton(nodeIds[n], nodeNames[n]);
        } else {
            alert("No hay productos");
        }
    } else {

        console.log("No estás logado");
    }
}


function displayFlags(res) {

    console.log("Cargamos el popUp de idiomas");

    var html = '<ul data-role="listview" data-inset="true">';

    var count = res.flags.length;
    var info = res.flags;
    
    console.log(info);

    for (var i = 0; i < count; i++) {

        html += '<li data-icon="false">' +
            '<a onclick="changeIdiom(\'' + info[i].shortname + '\','+info[i].id+');"><img src="' + info[i].image + '" class="ui-li-icon ui-corner-none">' + info[i].name + '</a>' +
            '</li>';

    }

    html += '</ul>';

    $("#contentPopupIdioma").html(html);
    $("#contentPopupIdioma").trigger('create');

}