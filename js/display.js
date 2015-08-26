/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName) {

    console.log("DisplayNode-> Nodes es " + data.result);
    //console.log(data);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        if (originNode == 0) {
            loadMenu(data);
            var imagen_partyfiesta = "<div><img src='css/icons/logo.png'></div>";
        } else {
            var imagen_partyfiesta = "";
            if (nodeIds.length == 0) {
                nodeIds.push(0);
                nodeNames.push("Menú");
                nodeIds.push(originNode);
                nodeNames.push(originName);
            } else {
                nodeIds.push(originNode);
                nodeNames.push(originName);
            }
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 1] + '</div>');
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
                htmlContent = "<center>" + imagen_partyfiesta + "</center>" + grid;
                position = "a";
                for (var i = 0; i < data.nodes.length; i++) {

                    if (originNode == 0) { //solo se mostrar en el menu inicial de la app getNodes(0)
                        switch (parseInt(data.nodes[i].type)) {
                        case 1: //catalogo
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\',0)';
                            break;
                        case 2: //promos
                            extra = '';
                            break;
                        case 3: // asis fistas
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\',1)';
                            break;
                        case 4: // asis disfra
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\',1)';
                            break;
                        case 5: // sugerencias
                            extra = '';
                            break;
                        case 6: // fuera tienda
                            extra = '';
                            break;
                        }
                    } else extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')';
                    //console.log("DisplayNode-> Nodes es " + data.result + " getNodes(" + data.nodes[i].id + "," + data.nodes[i].short_name + " )");

                    if (position < parseInt(data.columns)) { //numero maximo de columnas que tendra la pantalla
                        switch (position) {
                        case 0:
                            block = '<div class="ui-block-a" onclick="' + extra + '">';
                            break;
                        case 1:
                            block = '<div class="ui-block-b" onclick="' + extra + '">';
                            break;
                        case 2:
                            block = '<div class="ui-block-c" onclick="' + extra + '">';
                            break;
                        case 3:
                            block = '<div class="ui-block-d" onclick="' + extra + '">';
                            break;
                        case 4:
                            block = '<div class="ui-block-e" onclick="' + extra + '">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="' + extra + '">';
                    }
                    var element = block + '<a data-role="button" data-theme="f"><img src="' + data.nodes[i].linkext + '" style="width: 120px;height: 120px;"><br><strong>' + data.nodes[i].name + '</strong></a></div>';

                    //console.log(element);

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
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

                    if (data.nodes[i].short_name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].short_name + '</a>';
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

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        if (originNode == 0) {
            loadMenu(data);
        } else {
            if (nodeIds.length == 0) {
                nodeIds.push(0);
                nodeNames.push("Menú");
                nodeIds.push(originNode);
                nodeNames.push(originName);
            } else {
                nodeIds.push(originNode);
                nodeNames.push(originName);
            }
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 1] + '</div>');
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

        switch (type) {
        case "horizontal":
            {
                htmlContent = "<center></center>" + grid;
                position = "a";
                for (var i = 0; i < data.products.length; i++) {

                    //console.log("DisplayNode-> Nodes es " + data.result + " getNodes(" + data.nodes[i].id + "," + data.nodes[i].short_name + " )");

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
                    var element = block + '<a data-role="button" data-theme="f"><div id="circulo' + data.products[i].sku + '" class="circulo" style="width: 30px;height: 30px;display: none;position: absolute;">' +
                        '<label id="quantity' + data.products[i].sku + '" style="display:block;padding-top: 5px;">10</label></div>' +
                        '<img src="' + data.products[i].linkext + '" style="width: 120px;height: 120px;">' +
                        '<br>' + data.products[i].name +
                        '<br><strong>' + formatoNumero(data.products[i].price_x_region.totalPrice, 2, ",", ".", "€") + '</strong>' +
                        '<br><button id="btnAddProduct' + data.products[i].sku + '" onclick="addToCart(' + data.products[i].sku + ',1);">Añadir</button>' +
                        '<div class="ui-grid-b" id="grid' + data.products[i].sku + '" style="display:none;">' +
                        '<div class="ui-block-a" onclick="" style="width: 45%;"><button id="restar" onclick="addToCart(' + data.products[i].sku + ',-1);" >-</button></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="" style="width: 45%;"><button id="sumar" onclick="addToCart(' + data.products[i].sku + ',1);">+</button></div>' +
                        '</div></a></div>';

                    PRODUCTS = data.products;
                    //console.log(element);

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
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
                for (var i = 0; i < data.products.length; i++) {

                    if (data.products[i].short_name == "") {
                        var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="">' + data.products[i].short_name + '</a>';
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
    }
    $("#spPopupCartCount").text(CART.length);
    $("#spPopupTotalAmmount").text(CART.ammount + "€");


}

function displayPopupItemList() {
    $("#popupCart").popup("close");
    setTimeout(function() { $("#popupListItems").popup("open"); }, 200 );
    
    var html = '';
    for (var i = 0; i < CART.length; i++) { //data:image/png;base64,
      //  html = html + '<li><div class="ui-grid-b"><div class="ui-block-a" style="width:11%; margin:5px" ><img class="thumb" src="'+CART[i].linkext+'"></div><div class="ui-block-b" style="width:60%"><a href="#" data-role="button" data-theme="f">'+CART[i].name+'<span class="ui-li-count">'+CART[i].quantity+'</span></a></div><div class="ui-block-b" style="width:24%; margin:5px"><div class="ui-grid-b"><div class="ui-block-a"><a data-icon="minus" data-role="button" data-theme="f" data-iconpos="notext" onclick="addToCart('+CART[i].sku+',-1); displayPopupItemList();"></a></div><div class="ui-block-b"><a data-icon="plus" data-role="button" data-theme="f" data-iconpos="notext" onclick="addToCart('+CART[i].sku+',1); displayPopupItemList();"></a></div><div class="ui-block-c"><a onclick="addToCart('+CART[i].sku+',-'+CART[i].ammount+'); displayPopupItemList();"><img src="css/maqueta/eliminar.png"></a></div></div></div></li>';
          html = html + '<li><div class="ui-grid-b"><div class="ui-block-a" style="width:11%; margin:5px" ><img class="thumb" src="'+CART[i].linkext+'"></div><div class="ui-block-b" style="width:60%"><a href="#" data-role="button" data-theme="f">'+CART[i].name+'<span class="ui-li-count">'+CART[i].quantity+'</span></a></div><div class="ui-block-b" style="width:24%; margin:5px"><div class="ui-grid-b"><div class="ui-block-a"><a data-icon="minus" data-role="button" data-theme="f" data-iconpos="notext" onclick="addToCart('+CART[i].sku+',-1); displayPopupItemList();"></a></div><div class="ui-block-b"><a data-icon="plus" data-role="button" data-theme="f" data-iconpos="notext" onclick="addToCart('+CART[i].sku+',1); displayPopupItemList();"></a></div><div class="ui-block-c"><a onclick="addToCart('+CART[i].sku+',-'+CART[i].ammount+'); displayPopupItemList();"><img src="css/maqueta/eliminar.png"></a></div></div></div></li>';
    }
    html = '<li data-role="list-divider"><h3><center>Lista de Productos</center></h3></li>' + html;
    $("#ulpopupListItems").html(html);
    $("#ulpopupListItems").trigger("create");    

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
    for (var i = 0; i < data.nodes.length; i++) { //data:image/png;base64,
        options = options + '<li onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'); openMenu()"><img src="' + data.nodes[i].linkext + '" style="width:12em">' + data.nodes[i].short_name + '</li>';
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
    var cart = '<br><a href="#popupCart" data-rel="popup" data-role="button" data-icon="shop" data-theme="e" data-transition="pop">Items</a>';


    /*HEADER  de la pantalla*/
    htmlHeader = '<div><div class="ui-grid-b"><div class="ui-block-a" style="margin-top:10px" id="divBack"></div><div class="ui-block-b" style="margin-top:10px"><img src="css/icons/logo.png" width="100%"> </div> <div class="ui-block-c" style="text-align:right;"> <div id="session"><a id="login" onclick="displayLogin();" style="margin:10px"> <span>Ya soy Cliente!</span> </a><a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a>' + cart + '</div> </div></div> <img src="css/icons/barra.png" height="5px" width="100%"><ul data-role="listview" style="margin:0px"> <li data-role="list-divider" id="path"> </li> </ul>';
    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

}


function displayPantallaIntermedia(data) {

    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<img src="' + data.linkint + '" alt="">' +
        '<h3> ¿Para cuantas personas es la fiesta?</h3>' +
        '<div style="width:100px">' +
        '<input id="num_personas" type="number" name="quantity" min="1">' +
        '</div>' +
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
    }, 50);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, 50);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);


}

function loginOut() { //muestra el pop up de inicio de session

    console.log("Cerramos session");
    html = '<div id="session"><a id="login" onclick="displayLogin();" style="margin:10px"> <span>Ya soy Cliente!</span> </a><a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a> </div>';
    $("#session").html(html);
    INFO_USU = "";
    $('#usrnm').val("");
    $('#pswd').val("");


}