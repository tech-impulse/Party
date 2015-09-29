/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName) {

    console.log("DisplayNode-> Nodes es " + data.result);
    console.log(data);

    var filas = data.nodes.length / data.columns; //isMain
    var count = 1;

    var alturaBox = parseInt(100 / (filas + 1));

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
                            block = '<div class="ui-block-b" onclick="' + extra + '" style="height:' + alturaBox + '%">';
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
                $("#divContent").trigger('create');
                break;
            };
        case "vertical":
            {
                htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
                for (var i = 0; i < data.nodes.length; i++) {

                    console.log("Is party? " + data.nodes[i].isParty);

                    if (data.nodes[i].name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].name + '</a>';
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
                htmlContent = "<center></center>" + grid;
                position = "a";
                for (var i = 0; i < data.products.length; i++) {

                    if (data.products[i].price_x_region.totalPrice != undefined) { // Controlamos que el precio exista
                        if (position < parseInt(data.columns)) {

                            switch (position) {
                            case 0:

                                block = '<div class="ui-block-a" onclick="">';
                                break;

                            case 1:

                                block = '<div class="ui-block-b" onclick="">';
                                break;

                            case 2:

                                block = '<div class="ui-block-c" onclick="">';
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
                            block = '<div class="ui-block-a" onclick="">';
                        }
                        var element = block + '<a data-role="button" data-theme="f"><div id="circulo' + data.products[i].sku + '"  class="circulo" style="width: 35px;height: 35px;display: none;position: absolute;">' +
                            '<label id="quantity' + data.products[i].sku + '" style="display:block;padding-top: 5px;font-size: 22px;color: white;">10</label></div>' +
                            '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + i + ',\'PRODUCTS\')" style="width: 120px;height: 120px;">' +
                            '<br>' + data.products[i].name +
                            '<br><strong>' + formatoNumero(data.products[i].price_x_region.totalPrice, 2, ",", ".", "€") + '</strong>' +
                            '<br><button id="btnAddProduct' + data.products[i].sku + '" onclick="addToCart(' + data.products[i].sku + ',1);">Añadir</button>' +
                            '<div class="ui-grid-b" id="grid' + data.products[i].sku + '" style="display:none;">' +
                            '<div class="ui-block-a" onclick="" style="width: 45%;"><button id="restar" onclick="addToCart(' + data.products[i].sku + ',-1);" >-</button></div>' +
                            '<div class="ui-block-b" style="width:10%;"></div>' +
                            '<div class="ui-block-c" onclick="" style="width: 45%;"><button id="sumar" onclick="addToCart(' + data.products[i].sku + ',1);">+</button></div>' +
                            '</div></a></div>';

                        //console.log(element);

                        htmlContent = htmlContent + element;
                        if (position == "c") {
                            htmlContent = htmlContent + grid;
                        }
                        position++;
                    }
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
                $("#divHeader_menu").hide();
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
    html = '<img class="imgMedium" scr="http://www.partyfiesta.com/es/tienda-online/imagen-producto/product-hightQuality/partyfiesta/193368">' +
        '<div class="ui-grid-b" style="margin:10px">' +
        '<div class="ui-block-a" style="width:54%">' +
        '<label style="margin:11px; margin-left:20px">Producto</label>' +
        '</div>' +
        '<div class="ui-block-b" style="width:22%">' +
        '<label style="margin:11px; margin-left:35px">Cantidad</label>' +
        '</div>' +
        '<div class="ui-block-c" style="width:24%">' +
        '<label style="margin:11px">Precio</label>' +
        '</div>' +
        '</div>' +
        '<div class="ui-body ui-body-b">' +
        '<ul style="margin:5px" id="ulpopupListItems" data-role="listview" data-inset="true" data-theme="b" data-divider-theme="a" data-count-theme="a">' +
        '</ul>' +
        '<label style="width:8em; float:right; margin:10px;" id="lbPopupListItems"></label>' +
        '<br>' +
        '<button data-theme="d" data-icon="shop" data-iconpos="right" style="width:13em; float:center; margin:10px" onclick="checkOut()">Checkout</button>' +
        '</div>';

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");
    html = '';
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

    for (var i = 0; i < CART.length; i++) {
        html = html +
            '<li> ' +
            '<div class="ui-grid-b">' +
            '<div class="ui-block-a" style="width:10%"><img class="thumb" src="' + CART[i].linkext + '"></div>' +
            '<div class="ui-block-b" style="width:45%" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="margin:11px">' + CART[i].name + '</label></div>' +
            '<div class="ui-block-c" style="width:40%">' +
            '<div class="ui-grid-d">' +
            '<div class="ui-block-a" style="width:16%"><a style="padding:2px" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].sku + ',-1); displayPopupItemList();"></a></div>' +
            '<div class="ui-block-b" style="width:16%"><center><label style="margin-top:11px">' + CART[i].quantity + '</label></center></div>' +
            '<div class="ui-block-c" style="width:16%"><a style="padding:2px" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].sku + ',1); displayPopupItemList();"></a></div>' +
            '<div class="ui-block-d" style="width:36%"><label style="margin:11px; float:right">' + parseFloat(CART[i].quantity * CART[i].price_x_region.totalPrice).toFixed(2) + ' €</label></div>' +
            '<div class="ui-block-e" style="width:16%"><a data-icon="delete" data-role="button" data-theme="f" style="background-color: red; padding:2px" data-iconpos="notext" onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"></a></div>' +
            '</div>' +
            '</div>' +
            '</li>';
    }
    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");
    $("#ulpopupListItems").html(html);
    $("#ulpopupListItems").trigger("create");
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
        break;
    }

    $("#popupListItems").popup("open");
    var imgAvailability;
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
        '<div class="ui-block-a"><img src="' + productList[id].linkext + '" style="max-width: 250px;max-height: 250px;"></div>' +
        '<div class="ui-block-b">' +
        '<br><h1>Precio Total: ' + parseFloat(productList[id].price_x_region.totalPrice).toFixed(2) + ' €</h1>' +
        '<p><strong> Ubicación: ' + productList[id].definition + '</strong></p>' +
        '<p><strong>' + productList[id].definition + '</strong></p>' +
        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
        '</div>' +
        '</li>' +
        '</ul>';
    if (buttonBack != "") {
        html = html + buttonBack;
    }

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

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
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',0)';
                break;
            case 2: //promos
                extra = '';
                break;
            case 3: // asis fistas
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ')';
                break;
            case 4: // asis disfra
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ')';
                break;
            case 5: // sugerencias
                extra = 'displayPantallaSugerencias()';
                break;
            case 6: // fuera tienda
                extra = '';
                break;
            case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ')';
                break;
            }

            options = options + '<li onclick="' + extra + ';"; openMenu()"><img src="' + node[i].linkext + '" style="width:12em">' + node[i].name + '</li>';
        }

    }

    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">Ir al Menú</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');

    /*div que muestra las compras realizadas*/
    /*
    var cart = '<div class="ui-grid-b" >' +
        '<div class="ui-block-a" style="width: 70%;"><img src="http://partyfiesta.youtter.com/webservices/img/nodos/carrito.png" style="width: initial;"></div> ' +
        '<div class="ui-block-b" style="width: 30%;">' +
        '<div id="num_products_cart" class="ui-grid-a center" ><label id="label_info_cart_num" >2 productos</label></div>' +
        '<div id="precio_total" class="ui-grid-a center" ><label id="label_info_cart_precio"> 2,75</label></div></div>' +
        '</div>';
        */


    var cart = '<a href="#popupCart" data-rel="popup" data-position-to="#btnMenuLateral" data-transition="pop"> <div class="ui-grid-a"><div class="ui-block-a" style="width:30%"><span class="flaticon-shop" ></span></div><div class="ui-block-b" style="width: 70%;">' +
        '<span style="margin-left:15px" id="spBtnPopupCartProducts">0</span><span> Productos </span><br> <span style="margin:15px" id="spBtnPopupCartAmmount">0 €</span></div></div></a>';

    /*var cart = '<a href="#popupCart" data-rel="popup" data-position-to="#btnMenuLateral"> <div class="ui-grid-a"><div class="ui-block-a" style="width:20%"><span class="flaticon-shop"></span></div><div class="ui-block-b">' +
        '<span style="margin-left:15px" id="spBtnPopupCartProducts">0</span><span> Productos </span><br> <span style="margin:15px" id="spBtnPopupCartAmmount">0 €</span></div></div></a>';

    var cart = '<a href="#popupCart" data-rel="popup" data-position-to="#btnMenuLateral"> <div class="ui-grid-a"><div class="ui-block-a" style="width:20%"><span class="flaticon-shop"></span></div><div class="ui-block-b">' +
        '<span style="margin-left:15px" id="spBtnPopupCartProducts">0</span><span> Productos </span><br> <span style="margin:15px" id="spBtnPopupCartAmmount">0 €</span></div></div></a>';*/




    /*HEADER  de la pantalla*/

    htmlHeader = '<div>' +
        '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:30%" id="divBack"></div>' +
        '<div class="ui-block-b" style="margin-top:10px; width:27%;"><img src="css/icons/logo.png" width="75%" style="margin-left: 20%"> </div>' +
        '<div class="ui-block-c" style="margin-top:15px;width:21%" id="session">' +
        '<center><a id="login" onclick="displayLogin();" style="width:10%"> <span>Identificate!</span> </a>' +
        '</div>' +
        '<div class="ui-block-d" style="margin-top:10px; width:18%" id="car_compra">' + cart +
        '</div>' +
        '<div class="ui-block-e" style="margin-top:10px; width:4%">' +
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px; float:right"> <span class="flaticon-menu"></span> </a>' +
        '</div>' +
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
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

}


function displayPantallaIntermediaAsistDisfra(data) {

    //console.log(data);

    loadMenu(node_cero);
    updateBackButton(0, "Menú");
    $("#divHeader_catalogo").show();

    var info = data.node;

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<img src="' + info.linkint + '" alt="">' +
        //'<h3> ¿Para quién es el disfraz?</h3>' +
        '<div style="width: 25%"><select id="select_sexo" data-native-menu="false">' +
        '</select></div>' +
        //'<h3> Edad </h3>' +
        //'<div style="width: 25%"><select id="select_edad" >' +
        //'</select></div>' +
        //'<h3> Talla </h3>' +
        '<div id="div_selectTalla" style="width: 25%;display:none"><select id="select_talla" data-native-menu="false">' +
        '</select></div>' +
        '<br>' +
        '<a style="width:150px" id="btn_continuar" onclick="displayProductos(' + info.id + ',\'' + info.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">CONTINUAR</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#select_sexo").attr("data-native-menu", "false");
    $("#select_talla").attr("data-native-menu", "false");

    $('#select_sexo').scrollTop(5);
    $('#select_talla').scrollTop(5);

    getGender();//llamamos al webservice que tiene los sexos

    $('#select_sexo').change(function () {
        var optionSelected = $(this).find('option:selected');
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected != 0) {
            
            getSize(optValueSelected);
            $("#div_selectTalla").show();

        } else {
            $("#texto_popup").text('Seleccione una opcion válida');
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
        '<img src="' + data.linkint + '" alt="">' +
        '<div style="width: 10%"><input type="number" id="personas_fiesta" min="1"></div>' +
        '<br>' +
        '<a style="width:150px" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">CONTINUAR</a>' +
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
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px"> <span>Identificate!</span> </a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");


}

function displayScreenSaver() { //muestra el pop up de inicio de session

    $('.ui-popup').popup('close');
    console.log("Protector de pantalla activado");
    //$('#contentPopupScreenSaver').show();
    $('#principal').hide();
    //$('#contentPopupScreenSaver').fadeIn();
    $('#contentPopupScreenSaver').show();
    idleTimeActive = true;

}



function displayPantallaSugerencias() {

    console.log("Entramos en la pantalla de sugerencias");

    loadMenu(node_cero);
    updateBackButton(0, "Menú");
    $("#divHeader_catalogo").show();

    html_sug = '<div id="form_sugerencias" >' +
        '<form  enctype="text/plain">' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label>Nombre:</label><input type="text" id="nombre" size="25" maxlength="50" ></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label>Fecha de nacimiento:</label><input type="date" value="" id="fecha_naci" size="40" maxlength="100"></div>' +
        '<div class="ui-block-c" style=""><label>Correo electrónico:</label><input type="email" value="" id="correo" size="40" maxlength="100"></div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label>Población:</label><input type="text" id="poblacion" size="25" maxlength="50" ></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label>Provincia:</label><input type="text" value="" id="provincia" size="40" maxlength="100"></div>' +
        '<div class="ui-block-c" style=""><label>Teléfono:</label><input type="number" value="" id="correo" size="40" maxlength="100"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label>Tipo de sugerencia:</label><select name="suge_inci" data-native-menu="false"><option value="1">Incidencia<option value="2">Petición</select></div>' +
        '<div class="ui-block-b" style="width: 65%;"><label>¿Sobre que es la petición/sugerencia?</label><input type="text" value="" id="tipo_sugenrencia" size="40" maxlength="100"></div>' +
        '</div>' +
        '<br> Tiene alguna sugerencia...' +
        '<textarea cols="40" rows="3" id="sugerencias" placeholder="Escriba aquí sus sugerencias..."></textarea>' +
        '<table width="25%" border="0" align="center" cellpadding="10" cellspacing="0">' +
        '<tr>' +
        '<td>' +
        '<div align="center">' +
        '<button type="button" onclick="enviarSugerencia();" id="enviar_sugerencia">¡Enviar!</button>' +
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
                '<div class="ui-block-a" style="width:20%">SKU</div>' +
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

    for (var i = 0; i < count; i++) {

        html += '<li data-icon="false">' +
            '<a href="#" onclick="changeIdiom("' + info[i].shortname + '");"><img src="' + info[i].image + '" class="ui-li-icon ui-corner-none">' + info[i].name + '</a>' +
            '</li>';

    }

    html += '</ul></div>';

    $("#contentPopupIdioma").html(html);
    $("#contentPopupIdioma").trigger('create');

}

