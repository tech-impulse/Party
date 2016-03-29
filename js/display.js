/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName, linkImg, aux) {

    //console.log("DisplayNode-> Nodes es " + data.result + " link " + linkImg);

    console.log("Cargamos nuevos los nodos");
    console.log(data);

    var len = data.nodes.length;

    if (parseInt(len) < parseInt(data.columns)) {
        console.log("Length " + len);
        len = data.columns;
    }
    var alturaMin = W_HEIGTH * 0.6;
    var filas = Math.ceil(len / data.columns);
    var count = 1;

    var aux_altura = parseInt(alturaMin / filas); //altura de la patanlla por el % del div partido por el numero de filas

    var alturaBox = parseInt(alturaMin / data.columns); // //obtenemos el valor en px 
    var alturaBox2 = (aux_altura / W_HEIGTH) * 100; //obtenemos el valor en % 


    if (parseInt(originNode) == 0) {
        //var altura_menu = "height:" + (heig_block * 0.8) + "px;";
        var heigth = (W_WIDTH * (0.95));
    } else {
        var heigth = (W_WIDTH * (0.93));
    }
    //var heigth = (W_WIDTH * (0.93));
    var heigth2 = (W_WIDTH * (0.04)); //se utiliza para el margen de separacion de las cajas

    var heig_block = parseInt(heigth / data.columns); // valor de cada caja
    var he_b_margin = parseInt(heigth2 / (data.columns - 1)); // valor de cada caja

    //var heigth_img = parseInt(alturaMin * 0.35);

    //console.log("Comprobamos las alturas");
    //console.log("alturaMin " + alturaMin + " filas " + filas + " heig_block " + heig_block + " alturaBox " + alturaBox + "");

    //console.log("*Filas " + filas + " Altura min " + alturaMin + "  Altura es : " + alturaBox + " aux_altura " + aux_altura);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;

        if (aux && aux != "back") {
            //console.log("Eliminamos la pantalla -------------------------------------------------------");
            pantallaActual = "";
            ISFIESTA = aux;
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
        }

        if (CART.length > 0) {
            $("#btn_finalizarpedido").show();
        }

        PRODUCTS = [];
        TEMP_PRODUCTS = [];

        if (originNode == 0) {
            loadMenu(data);
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
        } else {
            console.log("Nodo origen " + originNode + " nombre " + originName + " link " + linkImg + "--------------------------------------------");
            updateBackButton(originNode, originName, linkImg);
        }

        //console.log("Seguimos despus de guardar la pantalla  " + data.columns);

        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        }

        var extra = "";
        console.log("Tipo " + type);

        switch (type) {
        case "horizontal":
            {
                LINKINT = "";
                htmlContent = grid;
                var aux_col = 1; //se utiliza para el margen de las cajas
                var aux_reinicio = 10;

                //console.log("Antes del for");
                //console.log(data.nodes.length);

                for (var i = 0; i < data.nodes.length; i++) {

                    //console.log("Dentro for");
                    aux_reinicio = 0;
                    //console.log("Margen es " + he_b_margin + " columnas " + data.columns + " aux " + aux_col);
                    if (parseInt(data.columns) == parseInt(aux_col)) {
                        he_b_margin = 0;
                        aux_col = 0;
                        aux_reinicio = 1;
                    }

                    aux_col++;


                    //solo se mostrar en el menu inicial de la app getNodes(0) diferenciamos entre los diferentes bloques del menu principal
                    if (originNode == 0) {

                        //comprobamos si existe algun nodo principal
                        //console.log("Este es el principal??? " + data.nodes[i].isMain);
                        if (parseInt(data.nodes[i].isMain) == 1) {
                            console.log("Este es principal " + data.nodes[i].isMain);
                            var valorSwitch = 7;
                        } else {
                            var valorSwitch = parseInt(data.nodes[i].type);
                        }
                        switch (valorSwitch) {
                        case 1: //catalogo
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 2: //promos
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 3: // asis fistas
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 4: // asis disfra
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            //extra = 'displayPantallaPreviaDisfraces(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 5: // sugerencias
                            //extra = 'displayPantallaSugerencias()';
                            extra = 'displayPopUpPantallaSugerencias()';
                            break;
                        case 6: // fuera tienda
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        }

                    } else { //mostramos los bloques sin ningun orden

                        extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';

                    }

                    if (parseInt(originNode) == 0) {
                        //var altura_menu = "height:" + (heig_block * 0.8) + "px;";
                        var altura_menu = "height:" + alturaBox + "px;";
                    } else {
                        var altura_menu = "";
                    }


                    if (position < parseInt(data.columns)) { //columnas que tendra la pantalla
                        switch (position) {
                        case 0:
                            block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right: 1%;margin-bottom:1%;margin-left: 1.3%;">';
                            break;
                        case 1:
                            block = '<div class="ui-block-b"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 2:
                            block = '<div class="ui-block-c"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 3:
                            block = '<div class="ui-block-d"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 4:
                            block = '<div class="ui-block-e"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        }

                    } else {

                        position = 0;
                        block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%;margin-left: 1.3%;">';


                    }

                    var imgLinkExt = data.nodes[i].linkext.replace("wide", "bigPreview");

                    if (valorSwitch == 7) { //despues de la primera fila se mostrara el elemento principal que ocupa toda una fila

                        var element2 = '<div class="ui-block-a" style="width: 25%;height:' + alturaBox + 'px"></div><div class="ui-block-b" style="width: ' + heig_block + 'px;height:' + alturaBox + 'px"><a  data-corners="false" data-role="button" data-theme="f" style="background-color: lightgray;"><img src="' + imgLinkExt + '" style="width: 100px;height: 100px;" ><br><strong>' + data.nodes[i].name +
                            '</strong></a></div><div class="ui-block-c" style="width: 25%;height:' + alturaBox + 'px"></div>';

                        var element = block + '<div><a  data-corners="false" data-role="button" data-theme="f"><img src="' +
                            imgLinkExt + '" style="width: 150px;height:' + alturaBox + 'px"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';

                        count++;
                        htmlContent = htmlContent + element + element2;

                    } else {

                        if (parseInt(originNode) == 0) { //se carga el menu cuando se hace un getNodes(0)

                            var element = block + '<div style="position:absolute; display: table; height:' + alturaBox + 'px;width:' + heig_block + 'px;background-image:url(\'' + imgLinkExt + '\'); background-size:cover; background-position: top center; background-repeat: no-repeat;">' +
                                '<div style="width:' + heig_block + 'px;position:absolute; bottom:0; font-size:30px;color: white; text-align: center; display: block;text-transform: uppercase;">' + data.nodes[i].name + '</div></div>' +
                                '</div>';

                        } else {

                            var element = block + '<a  data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;">' +
                                '<center><div style="height:' + (heig_block * 0.7) + 'px;min-width: ' + (heig_block * 0.8) + 'px;display: table-cell;vertical-align: middle;"><img src="' + imgLinkExt + '" style="max-width:' + (heig_block * 0.8) + 'px;"></div></center>' +
                                '<br>' +
                                '<label style="width: 100%;text-align:center;line-height: ' + (heig_block * 0.15) + 'px;height: ' + (heig_block * 0.15) + 'px;margin-top: 5px;overflow: hidden;text-overflow: ellipsis;background-color: rgb(23, 152, 209);color: rgb(255, 255, 255);text-transform: uppercase;">' + data.nodes[i].name +
                                '</label></a></div>';

                        }

                        htmlContent = htmlContent + element;

                    }

                    if (aux_reinicio == 1) {
                        he_b_margin = parseInt(heigth2 / (data.columns - 1));
                    }
                    position++;


                }

                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                if (originNode != 0) {
                    $("#divHeader_catalogo").show();
                    $("#divHeader_menuInicial").hide();
                }

                break;
            };
        case "vertical":
            {

                LINKINT = linkImg;

                htmlContent = grid + " <div class='ui-block-a' align='right' style='width:50%;'><img src='" + linkImg + "' style='max-width: " + (W_WIDTH * 0.35) + "px;'></div>";
                htmlContent = htmlContent + '<div class="ui-block-b" align="left" style="width:50%;">';

                for (var i = 0; i < data.nodes.length; i++) {


                    if (data.nodes[i].name == "") {
                        var element = '<a  data-corners="false" data-role="button" data-theme="b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + linkImg + '\')" style="border: 0px;width: 50%;margin: 1% 1% 1% 1%;"><label style="font-weight: bold;text-transform: uppercase;">' + data.nodes[i].name + '</label></a>';
                    } else {
                        var element = '<a  data-corners="false" data-role="button" data-theme="b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + linkImg + '\')" style="border: 0px;width: 50%;margin: 1% 1% 1% 1%;"><label style="font-weight: bold;text-transform: uppercase;">' + data.nodes[i].name + '</label></a>';
                    }
                    htmlContent = htmlContent + element;
                }

                htmlContent = htmlContent + '</div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                $("#divHeader_menuInicial").hide();
                break;
            };
        }

    } else {

        console.log("Error en el envio de parametros");

    }

    translateButtons(idiomStore);

}

function refreshDisplayProducts(data, productAlter, id_produc) {

    console.log(data);
    console.log(productAlter);

    PRODUCTS.push(productAlter);

    AUX = 1;

    var htmlContent = "";
    var htmlContent_seccion = "";
    var new_htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;
    var seccion_titulo = "";
    var aux = {};
    aux = data;
    //console.log("Longitud de secciones es " + aux.length);

    for (var a = 0; a < data.length; a++) { //buscamos el producto alternativo

        for (var b = 0; b < data[a].typeproducts.length; b++) {

            if (data[a].typeproducts[b].id == id_produc) {

                for (var k = 0; k < data[a].typeproducts[b].caracteristics.length; k++) {

                    var caracteristicas = data[a].typeproducts[b].caracteristics[k];

                    if (caracteristicas.type == "9") {

                        var unidades = caracteristicas.name;
                        units = unidades.split(' ');
                        break;

                    } else {

                        units = 1;
                        continue;

                    }
                }

                cantidad = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units));
                productAlter.quantity = cantidad;
                productAlter.original = false; //este campo indica si el articulo ha sido sustituido o no
                productAlter.dedonde = nodeIds[nodeIds.length - 1];
                data[a].typeproducts.push(productAlter);
                break;
            }
        }
    }

    for (var j = 0; j < data.length; j++) {


        seccion_titulo = "<div id='tituloSeccion' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"

        switch (parseInt(COLUMS)) {
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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            for (var i = 0; i < data[j].typeproducts.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                var pro_seccion = data[j].typeproducts[i];
                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(COLUMS);

                if (position < parseInt(COLUMS)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }


                if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = pro_seccion.price_x_region[0].totalPrice;
                }

                var count = pro_seccion.caracteristics.length;
                var caracteristicas = pro_seccion.caracteristics;

                for (var k = 0; k < count; k++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[k].type == "9") {
                        unidades = caracteristicas[k].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;
                    }

                }

                var imgStock = "";
                var stock = pro_seccion.stock_x_store;

                if (stock == 0) {
                    stock = pro_seccion.stock_x_central_store;
                }

                if (stock > pro_seccion.stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock > 0 && stock <= pro_seccion.stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (pro_seccion.name == "") {
                    continue;
                } else {
                    var titulo = pro_seccion.name;
                }

                var unidades_prod = 1;

                if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                    unidades_prod = 1;
                } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                    unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                } else { //mas personas que unidades del articulo
                    unidades_prod = 1;
                }

                if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                    unidades_prod = 1;
                }

                if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var displayNone = "display:none;"

                var nada = "";

                var imgLinkExt = pro_seccion.linkext.replace("wide", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + pro_seccion.id + '" class="circulo" style="width: 40px; ' + (id_produc == pro_seccion.id ? displayNone : nada) + 'height: 40px;position: absolute;">' +
                    '<label id="quantity' + pro_seccion.id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + ID_NODE + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');" style="' + (productAlter.id == pro_seccion.id ? displayNone : nada) + '">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="' + (productAlter.id != pro_seccion.id ? displayNone : nada) + '">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + pro_seccion.id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + pro_seccion.id + ',1);">+</button></div>' +
                    '</div></a></div>';

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent += '</div>';
            htmlContent_seccion = seccion_titulo + htmlContent;
            $('#popupListItems').popup('close');
            break;


        case "vertical":

            break;

        } //switch

        new_htmlContent += htmlContent_seccion;


    } //for secciones


    console.log("Len");
    console.log(CART.length);
    var precio = productAlter.price_x_region[0].totalPrice;

    if (CART.length < 1) {
        CART.push(productAlter);
        CART.ammount = parseInt(precio * parseInt(productAlter.quantity));
    } else {
        CART.push(productAlter);
        var ammount = parseInt(CART.ammount);
        CART.ammount = ammount + parseInt(precio * parseInt(productAlter.quantity));
    }

    $("#divContent").html(new_htmlContent);
    $("#divContent").trigger('create');
    //$("#btn_finalizarpedido").show();

    $("#popupCargando").popup("close");

    updatePrecioTotalArticulo(); // TEMP !!
    updateCarritoDisplay();
    translateButtons(idiomStore);
}

/**
 *       updatePrecioTotalArticulo
 *
 *       Actualiza el precio total mostrado en función del precio del articulo y la cantidad de este.
 */
function updatePrecioTotalArticulo() {

    for (var i = 0; i < CART.length; i++) {
        var precioArticulo = parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice);

        //console.log('-> ACTUALIZANDO precio de procId: ' + CART[i].id + ' a precio por unidad: ' + parseFloat(CART[i].price_x_region[0].totalPrice));

        if (precioArticulo > 0.00) {
            $("#labelPrecioTotalProducto" + CART[i].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));
            $("#labelPrecioTotalProducto" + CART[i].id).show();
        }
    }
}

/**
 *       updateCarritoDisplay
 *
 *       Funcion que se encarga de actualizar la visualizacion del carrito i el boton finalizar pedido
 *       en funcion de los productos comprados i la pantalla actual.
 */
function updateCarritoDisplay() {

    var total = 0;

    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }

    //var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

    if (CART.length < 1) {

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP 

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        //if (pantallaActual == 'Asistente fiestas') {
        //$("#spBtnAmountPerson").text(precio_persona + " x"); //TEMP
        //$("#userIcoCarrito").show();
        //}

        $("#btn_finalizarpedido").show();
        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }
}

function displayProducts(data, originNode, originName, param, param4) {

    console.log("DisplayProducts-> Nodo Origen Id " + originNode);
    var aux_carac = 0;

    if (data.result == 1 && pantallaActual == "Asistente fiestas" && param4 == "") { // Hay resultados

        AUX = 1;
        //PRODUCTS.push(data.products);
        PRODUCTS = PRODUCTS.concat(data.products);

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        updateBackButton(originNode, originName);


        if (pantallaActual == "Asistente disfraces") {
            console.log("Estamos en la pantalla ".pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            console.log("Estamos en la pantalla ".pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;
            //auxTest = data;

            console.log("Productos que tenemos asistente fiestas");
            console.log(data.products);

            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(data.columns);

                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }


                if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                var count = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;

                for (var j = 0; j < count; j++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;

                    }

                }


                var imgStock = "";
                var stock = data.products[i].stock_x_store;

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock > 0 && stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (data.products[i].name == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';

            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            //$("#btn_finalizarpedido").show();

            var aux = 0;
            // calculo del numero de articulos por producto
            for (var k = 0; k < data.products.length; k++) {

                console.log("Calculamos los articulos para el carrito------------------------------------------------");
                aux = 0;
                var count = data.products[k].caracteristics.length;
                var caracteristicas = data.products[k].caracteristics;

                for (var j = 0; j < count; j++) {

                    if (caracteristicas[j].type == "9" && data.products[k].name != "" && data.products[k].price_x_region.length > 0) {

                        var num_uni = caracteristicas[j].name;
                        var units = num_uni.split(' ');

                        console.log("Encontrada car. Unidades es " + units[0]);

                        if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo

                            console.log("Unidades es1 " + units[0] + " se añade 1");
                            addToCart(data.products[k].id, 1);
                            aux = 1;

                        } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {

                            addToCart(data.products[k].id, Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            console.log("Math " + Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            aux = 1;

                        } else { //mas personas que unidades del articulo
                            addToCart(data.products[k].id, 1);
                            aux = 1;
                        }

                        break;

                    }

                }

                console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

                if (aux == 0 && data.products[k].name != "" && data.products[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                    addToCart(data.products[k].id, 1);

                }
            }

            $("#popupCargando").popup("close");

            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();
            $("#divHeader_menuInicial").hide();

            $("#popupCargando").popup("close");
            break;

        }

    } else if (data.result == 1 && pantallaActual == "Asistente fiestas" && param4 == "getProductsClassified") { // Hay resultados

        //console.log("Entramos en la nueva visualizacion");
        console.log(data);
        AUX = 1;

        for (var c = 0; c < data.products.length; c++) { //guardamos los productos

            for (var d = 0; d < data.products[c].typeproducts.length; d++) {
                data.products[c].typeproducts[d].original = true;
                PRODUCTS = PRODUCTS.concat(data.products[c].typeproducts[d]);
                PRODUCTS[d].original = true;
            }
        }

        TEMP_PRODUCTS = data.products;

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = "";
        var htmlContent_seccion = "";
        var new_htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var seccion_titulo = "";

        updateBackButton(originNode, originName);


        if (pantallaActual == "Asistente disfraces") {
            //console.log("Estamos en la pantalla " + pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            //console.log("Estamos en la pantalla " + pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
        }

        var aux = {};
        aux = data.products;
        //console.log("Longitud de secciones es " + aux.length);

        for (var j = 0; j < data.products.length; j++) {

            //console.log("Entramos en la nueva visualizacion 2, jota es " + j);
            //console.log(aux[j]);

            seccion_titulo = "<div id='tituloSeccion" + j + "' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;display: inline-table;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"

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

                htmlContent = grid;
                position = "a";
                var precio;
                var unidades;

                for (var i = 0; i < data.products[j].typeproducts.length; i++) {

                    //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                    var pro_seccion = data.products[j].typeproducts[i];
                    var heigth = (W_WIDTH * (0.98));
                    var heig_block = heigth / parseInt(data.columns);

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    }


                    if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                        //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                        continue;
                    } else {
                        precio = pro_seccion.price_x_region[0].totalPrice;
                    }

                    var count = pro_seccion.caracteristics.length;
                    var caracteristicas = pro_seccion.caracteristics;
                    var units = 1;

                    for (var k = 0; k < count; k++) {

                        //console.log("Caracteristica " + caracteristicas[j].type);
                        if (caracteristicas[k].type == "9") {
                            unidades = caracteristicas[k].name;
                            //console.log("Caracteristica encontrada");
                            units = unidades.split(' ');
                            aux_carac = 0;
                            break;
                        } else {
                            //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                            aux_carac = 1;
                            continue;
                        }

                    }

                    var imgStock = "";
                    var stock = pro_seccion.stock_x_store;

                    if (stock == 0) {
                        stock = pro_seccion.stock_x_central_store;
                    }

                    if (stock > pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgStock = "css/maqueta/barraRojo.png";
                    }

                    if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                        //console.log("No tiene unidades saltamos el producto")
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        units = 1;
                    }

                    if (pro_seccion.name == "") {
                        continue;
                    } else {
                        var titulo = pro_seccion.name;
                    }

                    if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                        var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                            '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                            '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                            '</div>';
                    } else {
                        var displayWarning = "";
                    }

                    var unidades_prod = 1;

                    if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                        unidades_prod = 1;
                    } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                        unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                    } else { //mas personas que unidades del articulo
                        unidades_prod = 1;
                    }

                    if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                        unidades_prod = 1;
                    }


                    var imgLinkExt = pro_seccion.linkext.replace("wide", "bigPreview");

                    var element = block +
                        '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                        '<div style="position: relative;overflow:hidden">' +
                        '<div id="circulo' + pro_seccion.id + '" class="circulo" style="width: 40px;height: 40px;position: absolute;">' +
                        '<label id="quantity' + pro_seccion.id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                        '</div>' +
                        '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                        '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                        '<div class="contenedor">' + titulo + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                        '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                        '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;">' +
                        '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');">Añadir</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="display:none;">' +
                        '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + pro_seccion.id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + pro_seccion.id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;

                }

                htmlContent += '</div>';
                htmlContent_seccion = seccion_titulo + htmlContent;
                break;

            case "vertical":

                break;

            } //switch

            new_htmlContent += htmlContent_seccion;


        } //for secciones


        $("#divContent").html(new_htmlContent);
        $("#divContent").trigger('create');
        //$("#btn_finalizarpedido").show();

        $("#popupCargando").popup("close");

    } else if (data.result == 1 && pantallaActual == "Asistente disfraces" && param4 == "getProductsClassified") {


        //console.log("Entramos en la nueva visualizacion");
        console.log(data);
        AUX = 1;

        for (var c = 0; c < data.products.length; c++) { //guardamos los productos

            for (var d = 0; d < data.products[c].typeproducts.length; d++) {
                data.products[c].typeproducts[d].original = true;
                PRODUCTS = PRODUCTS.concat(data.products[c].typeproducts[d]);
                PRODUCTS[d].original = true;
            }
        }

        TEMP_PRODUCTS = data.products;

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = "";
        var htmlContent_seccion = "";
        var new_htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var seccion_titulo = "";

        updateBackButton(originNode, originName);


        if (pantallaActual == "Asistente disfraces") {
            //console.log("Estamos en la pantalla " + pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            //console.log("Estamos en la pantalla " + pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
        }

        var aux = {};
        aux = data.products;
        //console.log("Longitud de secciones es " + aux.length);

        for (var j = 0; j < data.products.length; j++) {

            //console.log("Entramos en la nueva visualizacion 2, jota es " + j);
            //console.log(aux[j]);

            seccion_titulo = "<div id='tituloSeccion" + j + "' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;display: inline-table;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"

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

                htmlContent = grid;
                position = "a";
                var precio;
                var unidades;

                for (var i = 0; i < data.products[j].typeproducts.length; i++) {

                    //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                    var pro_seccion = data.products[j].typeproducts[i];
                    var heigth = (W_WIDTH * (0.98));
                    var heig_block = heigth / parseInt(data.columns);

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    }


                    if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                        //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                        continue;
                    } else {
                        precio = pro_seccion.price_x_region[0].totalPrice;
                    }

                    var count = pro_seccion.caracteristics.length;
                    var caracteristicas = pro_seccion.caracteristics;
                    var units = 1;

                    for (var k = 0; k < count; k++) {

                        //console.log("Caracteristica " + caracteristicas[j].type);
                        if (caracteristicas[k].type == "9") {
                            unidades = caracteristicas[k].name;
                            //console.log("Caracteristica encontrada");
                            units = unidades.split(' ');
                            aux_carac = 0;
                            break;
                        } else {
                            //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                            aux_carac = 1;
                            continue;
                        }

                    }

                    var imgStock = "";
                    var stock = pro_seccion.stock_x_store;

                    if (stock == 0) {
                        stock = pro_seccion.stock_x_central_store;
                    }

                    if (stock > pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgStock = "css/maqueta/barraRojo.png";
                    }

                    if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                        //console.log("No tiene unidades saltamos el producto")
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        units = 1;
                    }

                    if (pro_seccion.name == "") {
                        continue;
                    } else {
                        var titulo = pro_seccion.name;
                    }

                    if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                        var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                            '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                            '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                            '</div>';
                    } else {
                        var displayWarning = "";
                    }

                    var unidades_prod = 1;

                    if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                        unidades_prod = 1;
                    } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                        unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                    } else { //mas personas que unidades del articulo
                        unidades_prod = 1;
                    }

                    if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                        unidades_prod = 1;
                    }


                    var imgLinkExt = pro_seccion.linkext.replace("wide", "bigPreview");

                    var element = block +
                        '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                        '<div style="position: relative;overflow:hidden">' +
                        '<div id="circulo' + pro_seccion.id + '" class="circulo" style="width: 40px;height: 40px;position: absolute;">' +
                        '<label id="quantity' + pro_seccion.id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                        '</div>' +
                        '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                        '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                        '<div class="contenedor">' + titulo + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                        '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                        '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;">' +
                        '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');">Añadir</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="display:none;">' +
                        '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + pro_seccion.id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + pro_seccion.id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;

                }

                htmlContent += '</div>';
                htmlContent_seccion = seccion_titulo + htmlContent;
                break;

            case "vertical":
                //no se hace nada    
                break;

            } //switch

            new_htmlContent += htmlContent_seccion;


        } //for secciones


        $("#divContent").html(new_htmlContent);
        $("#divContent").trigger('create');
        //$("#btn_finalizarpedido").show();

        $("#popupCargando").popup("close");

        /*PRODUCTS = PRODUCTS.concat(data.products);
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var aux_carac = 0;

        console.log("Productos para el asistente de disfraces");

        if (originNode == 0) {
            loadMenu(data);
        } else {
            updateBackButton(originNode, originName);
        }

        console.log("Estamos en el " + pantallaActual);


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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            var sexo = param.sexo;
            var talla = param.talla;

            //console.log("Sexo " + sexo + " talla " + talla);

            for (var i = 0; i < data.products.length; i++) {

                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(data.columns);

                var count_carac = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;
                var generoDisfraz = 0; //sexo del disfraz no es el seleccioando

                var count_uses = data.products[i].uses.length;
                var uses = data.products[i].uses;

                for (var k = 0; k < count_uses; k++) {

                    if (parseInt(uses[k].id) == parseInt(1)) { //si el articulo no es un disfraz se muesta, ya que sera un complemento

                        for (var j = 0; j < count_carac; j++) { // comprobamos que la talla y sexo sea el escogido en los selects

                            if (caracteristicas[j].name == sexo) {

                                for (var m = 0; m < count_carac; m++) {

                                    if (caracteristicas[m].name == talla) {
                                        generoDisfraz = 1;
                                    } else {
                                        continue;
                                    }
                                }
                            }
                        }
                    } else {
                        generoDisfraz = 1;
                    }
                }

                if (generoDisfraz == 0) { //sexo no valido lo saltamos
                    continue;
                }

                for (var j = 0; j < count_carac; j++) {
                    console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        break;
                    } else {
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        aux_carac = 1;
                        continue;
                    }

                }


                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;


                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }

                //en el caso que no tengamos el precio no se muestra el articulo
                if (data.products[i].price_x_region.length == 0) {
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                if (data.products[i].name == "" || data.products[i].linkext == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                var imgStock = "";
                var stock = data.products[i].stock_x_store;

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock > 0 && stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }


                //if (data.products[i].stock_x_store == 0) {
                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        //'<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }
                //comentario para putear al jordi
                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock > 0 && stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }


                //if (data.products[i].stock_x_store == 0) {
                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        //'<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>'
                    //'<img src="' + imgStock + '" style="position:absolute;float:right;width: 40px;height: 40px;">'
                    + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';



                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';


            setTimeout(function () {

                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');

            }, 50);


            $("#popupCargando").popup("close");

            break;


        case "vertical":

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
            $("#divHeader_menuInicial").hide();

            $("#popupCargando").popup("close");

            break;

        }*/



    } else if (data.result == 1 && pantallaActual == "catalogo") {

        //console.log("Entramos en la nueva visualizacion");
        console.log(data);
        AUX = 1;

        for (var c = 0; c < data.products.length; c++) { //guardamos los productos

            for (var d = 0; d < data.products[c].typeproducts.length; d++) {
                data.products[c].typeproducts[d].original = true;
                PRODUCTS = PRODUCTS.concat(data.products[c].typeproducts[d]);
                PRODUCTS[d].original = true;
            }
        }

        TEMP_PRODUCTS = data.products;

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = "";
        var htmlContent_seccion = "";
        var new_htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var seccion_titulo = "";

        updateBackButton(originNode, originName);


        if (pantallaActual == "Asistente disfraces") {
            //console.log("Estamos en la pantalla " + pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            //console.log("Estamos en la pantalla " + pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
        }

        var aux = {};
        aux = data.products;
        //console.log("Longitud de secciones es " + aux.length);

        for (var j = 0; j < data.products.length; j++) {

            //console.log("Entramos en la nueva visualizacion 2, jota es " + j);
            //console.log(aux[j]);

            if (aux[j].type !== "empty") {
                seccion_titulo = "<div id='tituloSeccion" + j + "' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;display: inline-table;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"
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

                htmlContent = grid;
                position = "a";
                var precio;
                var unidades;

                for (var i = 0; i < data.products[j].typeproducts.length; i++) {

                    //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                    var pro_seccion = data.products[j].typeproducts[i];
                    var heigth = (W_WIDTH * (0.98));
                    var heig_block = heigth / parseInt(data.columns);

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    }


                    if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                        //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                        continue;
                    } else {
                        precio = pro_seccion.price_x_region[0].totalPrice;
                    }

                    var count = pro_seccion.caracteristics.length;
                    var caracteristicas = pro_seccion.caracteristics;
                    var units = 1;

                    for (var k = 0; k < count; k++) {

                        //console.log("Caracteristica " + caracteristicas[j].type);
                        if (caracteristicas[k].type == "9") {
                            unidades = caracteristicas[k].name;
                            //console.log("Caracteristica encontrada");
                            units = unidades.split(' ');
                            aux_carac = 0;
                            break;
                        } else {
                            //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                            aux_carac = 1;
                            continue;
                        }

                    }

                    var imgStock = "";
                    var stock = pro_seccion.stock_x_store;

                    if (stock == 0) {
                        stock = pro_seccion.stock_x_central_store;
                    }

                    if (stock > pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= pro_seccion.stock_min) {
                        imgStock = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgStock = "css/maqueta/barraRojo.png";
                    }

                    if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                        //console.log("No tiene unidades saltamos el producto")
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        units = 1;
                    }

                    if (pro_seccion.name == "") {
                        continue;
                    } else {
                        var titulo = pro_seccion.name;
                    }

                    if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                        var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                            '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                            '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                            '</div>';
                    } else {
                        var displayWarning = "";
                    }

                    var imgLinkExt = pro_seccion.linkext.replace("wide", "bigPreview");

                    var element = block +
                        '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                        '<div style="position: relative;overflow:hidden">' +
                        '<div id="circulo' + pro_seccion.id + '" class="circulo" style="display:none;width: 40px;height: 40px;position: absolute;">' +
                        '<label id="quantity' + pro_seccion.id + '" style="margin-top: 9px;font-size: 22px;color: white;"></label>' +
                        '</div>' +
                        '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                        '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                        '<div class="contenedor">' + titulo + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                        '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                        '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;">' +
                        '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');">Añadir</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="display:none;">' +
                        '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + pro_seccion.id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + pro_seccion.id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;

                }

                htmlContent += '</div>';
                htmlContent_seccion = seccion_titulo + htmlContent;
                break;

            case "vertical":

                break;

            } //switch

            new_htmlContent += htmlContent_seccion;


        } //for secciones


        $("#divContent").html(new_htmlContent);
        $("#divContent").trigger('create');
        //$("#btn_finalizarpedido").show();

        $("#popupCargando").popup("close");

        /*
        console.log("Productos para el catalago");
        AUX = 1;
        //PRODUCTS = data.products;
        PRODUCTS = PRODUCTS.concat(data.products);
        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;

        updateBackButton(originNode, originName);

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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            console.log("Productos que tenemos catalogo");
            console.log(data.products);

            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(data.columns);

                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        POS_GRID = "A";
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        POS_GRID = "B";
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        POS_GRID = "C";
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        POS_GRID = "D";
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        POS_GRID = "E";
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    POS_GRID = "A";
                }


                if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                if (data.products[i].name == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }


                var count = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;

                for (var j = 0; j < count; j++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;

                    }

                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                console.log("Unidades es " + unidades);



                var imgStock = "";
                var stock = data.products[i].stock_x_store;

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock > 0 && stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                //if (data.products[i].stock_x_store == 0) {
                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        //'<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>'
                    //'<img src="' + imgStock + '" style="position:absolute;float:right;width: 40px;height: 40px;">'
                    + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                    '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';



                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';

            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');

            $("#popupCargando").popup("close");


            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();
            $("#divHeader_menuInicial").hide();
            break;

            $("#popupCargando").popup("close");

        }
        */

    } else {

        console.log("Error...");

    }


    translateButtons(idiomStore);







}

function añadirMasProductos(data, originNode, originName, param) {

    AUX = 1;
    //    /PRODUCTS = data.products;
    PRODUCTS = PRODUCTS.concat(data.products);
    COLUMS = parseInt(data.columns);
    ID_NODE = originNode;
    var htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;
    var continuar = 0;

    switch (parseInt(COLUMS)) {
    case 1:
        type = "vertical";
        break;

    case 2:
        type = "horizontal";
        break;

    case 3:
        type = "horizontal";
        break;

    case 4:
        type = "horizontal";
        break;

    case 5:
        type = "horizontal";
        break;

    }

    switch (type) {
    case "horizontal":

        htmlContent = "";
        position = 0;
        var precio;
        var unidades;

        console.log("Cargamos mas productos en el catalogo");
        console.log(data.products);

        for (var i = 0; i < data.products.length; i++) {

            //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

            var heigth = (W_WIDTH * (0.98));
            var heig_block = heigth / parseInt(data.columns);

            if (POS_GRID == "A" && continuar == 0) { //continuamos por la ultima caja que tenemos
                position = 1;
                continuar = 1;
            } else if (POS_GRID == "B" && continuar == 0) {
                position = 2;
                continuar = 1;
            } else if (POS_GRID == "C" && continuar == 01) {
                position = 3;
                continuar = 1;
            } else if (POS_GRID == "D" && continuar == 0) {
                position = 4;
                continuar = 1;
            } else if (POS_GRID == "E" && continuar == 0) {
                position = 0;
                continuar = 1;
            }

            if (position < parseInt(data.columns)) {

                switch (position) {
                case 0:

                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    POS_GRID = "A";
                    break;

                case 1:

                    block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                    POS_GRID = "B";
                    break;

                case 2:

                    block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                    POS_GRID = "C";
                    break;

                case 3:

                    block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                    POS_GRID = "D";
                    break;

                case 4:

                    block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                    POS_GRID = "E";
                    break;
                }

            } else {
                position = 0;
                block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                POS_GRID = "A";
            }

            if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                continue;
            } else {
                precio = data.products[i].price_x_region[0].totalPrice;
            }

            if (data.products[i].name == "") {
                continue;
            } else {
                var titulo = data.products[i].name;
            }


            var count = data.products[i].caracteristics.length;
            var caracteristicas = data.products[i].caracteristics;

            for (var j = 0; j < count; j++) {

                //console.log("Caracteristica " + caracteristicas[j].type);
                if (caracteristicas[j].type == "9") {
                    unidades = caracteristicas[j].name;
                    //console.log("Caracteristica encontrada");
                    aux_carac = 0;
                    break;
                } else {
                    //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                    aux_carac = 1;
                    continue;

                }

            }

            var count_carac = data.products[i].caracteristics.length;
            var caracteristicas = data.products[i].caracteristics;


            for (var j = 0; j < count_carac; j++) {
                //console.log("Caracteristica " + caracteristicas[j].type);
                if (caracteristicas[j].type == "9") {
                    unidades = caracteristicas[j].name;
                    break;
                } else {
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                    continue;
                }

            }

            var imgStock = "";
            var stock = data.products[i].stock_x_store;

            if (stock == 0) {
                stock = data.products[i].stock_x_central_store;
            }

            if (stock > data.products[i].stock_min) {
                imgStock = "css/maqueta/barraVerde.png";
            } else if (stock > 0 && stock <= data.products[i].stock_min) {
                imgStock = "css/maqueta/barraAmarilla.png";
            } else if (stock == 0) {
                imgStock = "css/maqueta/barraRojo.png";
            }

            //if (data.products[i].stock_x_store == 0) {
            if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                    '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                    //'<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                    '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                    '</div>';
            } else {
                var displayWarning = "";
            }


            var element = block +
                '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);" class="ui-link ui-btn ui-btn-f ui-shadow" role="button">' +
                '<div style="position: relative;overflow:hidden">' +
                '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                '</div>' +
                '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                '<div class="contenedor">' + titulo + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;">' +
                '<button  data-corners="false" data-theme="b" class=" ui-btn ui-btn-b ui-shadow" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                '<div class="ui-block-a" class=" ui-btn ui-btn-b ui-shadow" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                '<div class="ui-block-b" style="width:10%;"></div>' +
                '<div class="ui-block-c" class=" ui-btn ui-btn-b ui-shadow" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                '</div></a></div>';



            htmlContent = htmlContent + element;
            if (position == "c") {
                htmlContent = htmlContent;
            }
            position++;

        }

        $("#gridCatalogo").append(htmlContent);

        break;


    case "vertical":

        htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
        block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
        for (var i = 0; i < data.products.length; i++) {

            if (data.products[i].name == "") {
                var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
            } else {
                var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
            }

            htmlContent = htmlContent + element;

        }
        htmlContent = htmlContent + '</div></div></div>';
        $("#divContent").append(htmlContent);
        break;

    }



}

/******************************************************************
    Enseña o esconde los botones de añadir o restar productos 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
******************************************************************/
function displayItemOperations(id, param, position, borrarItem) {

    if (param > 0) {
        //console.log("La cantidad que llega es " + param);
        $("#btnAddProduct" + id).hide();
        $("#grid" + id).show();
        $("#quantity" + id).text(param);
        $("#circulo" + id).show();

    } else {
        $("#btnAddProduct" + id).show();
        $("#grid" + id).hide();
        //$("#circulo" + id).text("2");
        for (var i = 0; i < CART.length; i++) { //TEMP añadimos la cantidad

            if (CART[i].id == id) {

                for (var k = 0; k < CART[i].caracteristics.length; k++) {

                    var caracteristicas = CART[i].caracteristics[k];

                    if (caracteristicas.type == "9") {

                        var unidades = caracteristicas.name;
                        units = unidades.split(' ');
                        break;

                    } else {

                        units = 1;
                        continue;

                    }
                }

                var cantidad = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units));
                $("#quantity" + id).text(cantidad);
            }
        }


        //console.log('-------> No ocultamos el precio -----------'); // TEMP !!

        $("#labelPrecioTotalProducto" + id).hide();
        //CART.splice(position, 1);
        //console.log("BORRAMOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" + position);
        //console.log(CART);
    }

    if (borrarItem == "borrar") {
        CART.splice(position, 1);
    }

    /*var total = 0;
    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }

    var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

    //console.log("Precio x persona "+precio_persona+" precio total "+CART.ammount+" num personas "+num_personas_fiesta);

    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));


    if (CART.length < 1) {
        $("#popupListItems").popup("close");

        $("#spBtnAmountPerson").text('');

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");
    } else {

        if (pantallaActual == 'Asistente fiestas') {
            $("#spBtnAmountPerson").text(precio_persona + " x");
            $("#userIcoCarrito").show();

            $("#btn_finalizarpedido").show();
        }

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }*/

    /*if ( CART.length == 1 && CART[0].quantity == 0 )
        CART = [];*/

    updateCarritoDisplay();

    translateButtons(idiomStore);


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

    translateButtons(idiomStore);
}

function openPopUpConfirmacionVaciarCarrito() {

    //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    $("#popupListItems").popup("close");

    setTimeout(function () {
        $("#popupConfirmacionVaciarCarrito").popup("open");
    }, popupTimeout);
}


function getImgDisponibilidadStore(product) {

    var imgAvailability = "";
    var stock = CART[product].stock_x_store;

    if (stock > parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    return imgAvailability;
}

function getImgDisponibilidadCentral(product) {

    var imgAvailability = "";
    var stock = CART[product].stock_x_central_store;
    console.log("Stock " + stock);

    if (stock > parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }
    console.log("Stock " + imgAvailability);
    return imgAvailability;
}


function displayPopupItemList() { //cambios jordi

    var html = '';
    var html_store = '';
    var html_online = '';

    var precioTotalCesta = 0;
    var precioTotalProductosTienda = 0;
    var precioTotalProductosWeb = 0;

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;">' + jsonIdiomas.popup_errores.tituloPopUp + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div></div>';
    var tituloPopUpTienda = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;width:500px;margin-left:150px;">' + jsonIdiomas.popup_errores.tituloPopUpDisponiblesTienda + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div></div>';
    var tituloPopUpWeb = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;width:500px;margin-left:150px;">' + jsonIdiomas.popup_errores.tituloPopUpDisponiblesWeb + '</h1>'+ (CART.productosEnTienda <= 0 ? '<div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div>' : '') +'</div>';

    var labelsBar = '<div data-role="header" style="background-color:#ffffff; height:30px;">' +
        '<div class="ui-block-e" style="width:8%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;font-weight: bolder;">WEB</label></div>' +
        '<div class="ui-block-e" style="width:7%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;">Tienda</label></div>' +
        '<div class="ui-block-e" style="width:14%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center; font-weight: bolder;">STOCK EN:</label></div>' +
        '</div>';

    //productosEnTienda = 0;
    //productosEnWeb = 0;

    for (var i = 0; i < CART.length; i++) { // develop 2

        var imgLinkExt = CART[i].linkext.replace("wide", "normalPreview");
        var srcTienda = getImgDisponibilidadStore(i);
        var srcCentral = getImgDisponibilidadCentral(i);

        if (CART[i].quantity > 0) {

            if (CART[i].stock_x_store > 0) {

                //var src = getImgDisponibilidad(i);

                //productosEnTienda++;

                var price = parseFloat(parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice)).toFixed(2);

                precioTotalProductosTienda += price;

                html_store = html_store +
                    '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
                    '<div class="ui-grid-b">' +
                    '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                    '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                    '<div class="ui-block-c" style="width:52%;">' +
                    '<div class="ui-grid-d">' +
                    '<div class="ui-block-a" style="width:10%;"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                    '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;">' + parseInt(CART[i].quantity) + '</label></div>' +
                    '<div class="ui-block-c" style="width:16%;"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1);setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                    '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;">' + price + ' €</label></div>' +
                    '<div class="ui-block-e" style="width:70px; height:40px;"><a onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';

            } else if (CART[i].stock_x_central_store > 0) {

                //productosEnWeb++;

                var price = parseFloat(parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice)).toFixed(2);

                precioTotalProductosWeb += price;

                html_online = html_online +
                    '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
                    '<div class="ui-grid-b">' +
                    '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                    '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                    '<div class="ui-block-c" style="width:52%;">' +
                    '<div class="ui-grid-d">' +
                    '<div class="ui-block-a" style="width:10%;"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                    '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;">' + parseInt(CART[i].quantity) + '</label></div>' +
                    '<div class="ui-block-c" style="width:16%;"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1);setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                    '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;">' + price + ' €</label></div>' +
                    '<div class="ui-block-e" style="width:70px; height:40px;"><a onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
        }
    }

    //var opcionCompraProductos = 1;

    //var productosNoEnTienda = CART.length - productosEnTienda;

    /*if (CART.length - productosEnTienda == 0) { // 1- Todos los productos estan en tienda
        opcionCompraProductos = 1;
    } else if (productosEnTienda > 0 && productosEnTienda < CART.length) { // 2- Existe algun producto en tienda
        opcionCompraProductos = 2;
    } else if (productosEnTienda == 0) { // 3- Ningun producto en tienda
        opcionCompraProductos = 3;
    }*/

    //html = '<div style="width: 100%; height:400px; overflow: scroll;">' + html + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="checkOut();"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';

    var listadoProdTienda = tituloPopUpTienda + labelsBar + html_store;
    var listadoProdOnLine = tituloPopUpWeb + labelsBar + html_online;

    //html = '<div style="width: 100%; height:600px; overflow: scroll;">' + tituloPopUpTienda + labelsBar + html_store + (productosEnWeb > 0 ? listadoProdOnLine : '') + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="opcionesPago(' + opcionCompraProductos + ',' + productosEnTienda + ',' + productosEnWeb + ');"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';
    //html = '<div style="width: 100%; height:600px; overflow: scroll;">' + tituloPopUpTienda + labelsBar + html_store + (CART.productosEnWeb > 0 ? listadoProdOnLine : '') + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="opcionesPago();"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';
    html = '<div style="width: 100%; height:600px; overflow: scroll;">' + (CART.productosEnTienda > 0 ? listadoProdTienda : '') + (CART.productosSoloEnWeb > 0 ? listadoProdOnLine : '') + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="opcionesPago();"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';


    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");


    //$("#contentPopupListItems").html(tituloPopUp + labelsBar + html);
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
    translateButtons(idiomStore);
}


/*
function displayPopupItemList() { //cambios jordi

    var html = '';

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background: rgb(154, 205, 50);"><h1>' + jsonIdiomas.popup_errores.tituloPopUp + '</h1></div>';
    var tituloPopUp = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;">' + jsonIdiomas.popup_errores.tituloPopUp + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div></div>';

    var labelsBar = '<div data-role="header" style="background-color:#ffffff; height:30px;">' +
        '<div class="ui-block-e" style="width:8%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;font-weight: bolder;">WEB</label></div>' +
        '<div class="ui-block-e" style="width:7%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;">Tienda</label></div>' +
        '<div class="ui-block-e" style="width:14%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center; font-weight: bolder;">STOCK EN:</label></div>' +
        '</div>';

    var primeraVez = true;

    for (var i = 0; i < CART.length; i++) {

        if (CART[i].quantity > 0) {

            //var src = getImgDisponibilidad(i);
            var srcTienda = getImgDisponibilidadStore(i);
            var srcCentral = getImgDisponibilidadCentral(i);

            var imgLinkExt = CART[i].linkext.replace("wide", "normalPreview");

            html = html +
                '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                '<div class="ui-block-c" style="width:52%;">' +
                '<div class="ui-grid-d">' +
                '<div class="ui-block-a" style="width:10%;"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;">' + parseInt(CART[i].quantity) + '</label></div>' +
                '<div class="ui-block-c" style="width:16%;"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1);setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
                '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;">' + parseFloat(parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice)).toFixed(2) + ' €</label></div>' +
                '<div class="ui-block-e" style="width:70px; height:40px;"><a onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                '</div>' +
                '</div>' +
                '</li>';

            if (primeraVez == true)
                primeraVez = false;
        }
    }

    html = '<div style="width: 100%; height:400px; overflow: scroll;">' + html + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="opcionesPago(1);"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';


    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");


    $("#contentPopupListItems").html(tituloPopUp + labelsBar + html);
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
    translateButtons(idiomStore);
}
*/

function displayItemAlter(id_prod_alter, id_product, idnode) {

    var aux_prod;
    var aux_cart;

    for (var i = 0; i < PRODUCTS_ALTER.length; i++) {

        if (parseInt(PRODUCTS_ALTER[i].id) == parseInt(id_prod_alter)) {
            aux_prod = PRODUCTS_ALTER[i];
            break;

        }
    }

    for (var j = 0; j < CART.length; j++) {
        console.log("Id " + id_product + " car id " + CART[j].id);
        if (parseInt(CART[j].id) == parseInt(id_product)) {
            aux_cart = CART[j];
        }
    }

    var imgAvailability = "";
    var stock = aux_prod.stock_x_store;

    if (stock == 0) {
        stock = aux_prod.stock_x_central_store;
    }

    if (stock > aux_prod.stock_min) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= aux_prod.stock_min) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background: blue"><h1>' + aux_prod.name + ' - ' + aux_prod.sku + '</h1></div>';

    var html = '';

    if (aux_prod.definition == "NULL") {
        var definition = aux_prod.short_name;
    } else {
        var definition = aux_prod.definition;
    }

    var imgLinkExt = aux_prod.linkext.replace("wide", "bigPreview");

    html = '<ul data-role="listview" data-inset="true">' +
        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + aux_prod.name + ' - ' + aux_prod.sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + aux_prod.quantity + '</span></li>' +
        '<li>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;max-height: 350px;"></div>' +
        '<div class="ui-block-b">' +
        '<br><label style="font-size: 20px;margin-top:5px;"><h1>Precio: ' + parseFloat(aux_prod.price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
        '<p><strong style="font-size: 15px;margin-top:5px;"> Ubicación: ' + aux_prod.position_x_store.section + ' ' + aux_prod.position_x_store.module + ' ' + aux_prod.position_x_store.position + ' </strong></p>' +
        '<p><strong style="font-size: 15px;margin-top:5px;"> Descripción: </strong></p>' +
        '<strong style=""><p style="white-space: initial;font-size: 15px;margin-top:5px;">' + definition + '</p></strong>' +
        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
        '</div></div>' +
        '</ul>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="volver(' + id_product + ',' + idnode + ');">VOLVER</a></div>' +
        '<div class="ui-block-b" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCartAlter(' + aux_prod.id + ',' + id_product + ');">Sustituir</a></div>' +
        '</div>';

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    $("#cantidad_prod_alter").text(aux_prod.quantity);

    switch (CART.length) {
    case 0:
        //console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayAlternativeProducts(idnode, idproduct, cantidad) {

    console.log("Productos alternativos");
    console.log(PRODUCTS_ALTER);

    var productList = PRODUCTS_ALTER;

    var carrusel = "";

    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");

    if (productList != null) {

        for (var i = 0; i < productList.length; i++) {

            var prod_alt = productList[i];

            var aux = jQuery.isEmptyObject(prod_alt.linkext); // si es false es que no esta vacio

            if (aux == false && prod_alt.price_x_region[0] != "undefined") {

                if (prod_alt.price_x_region.length > 0) {

                    var imgLinkExt = prod_alt.linkext.replace("wide", "bigPreview");

                    var click = 'onclick="displayItemAlter(' + prod_alt.id + ',' + idproduct + ',' + idnode + ');"';
                    //var nada = "";
                    //+ (cantidad == 0 ? nada : click) +

                    carrusel = carrusel + '<div class="swiper-slide" style="height: 175px;"><ul>' +
                        '<li style="list-style-type: none;">' +
                        '<img ' + click + ' src="' + imgLinkExt + '" style="max-width: 75px;max-height: 75px;">' +
                        '</li>' +
                        '<li style="list-style-type: none;" >' +
                        '<label ' + click + ' style="color:rgb(0, 128, 0);">' + formatoNumero(prod_alt.price_x_region[0].totalPrice, 2, ",", ".", "€") + '</label>' +
                        '</li>' +
                        '<li style="list-style-type: none;">' +
                        '<div ' + click + ' style="white-space: normal;font-size: 14px;"><strong>' + prod_alt.name + '</strong></div>' +
                        '</li>' +
                        '</ul></div>';

                }
            }
        }
    }


    var html = '<div class="swiper-container" style="height: 175px;"><div class="swiper-wrapper" style="height: 175px;">' + carrusel + '</div><div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div></div>';


    $("#swiper").html(html);
    $("#swiper").trigger("create");

    $("#swiper").show();
    $("#imgBarraCarga").hide();

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 15
    });

}

function displayPopupItemDetail(id, param, idproduct) {

    if (pantallaActual == "catalogo") {

        console.log("Mostramos el pop de detalle del producto catalogo");
        switch (param) {
        case "CART":

            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    var imgAvailability = "";
                    var stock = PRODUCTS[i].stock_x_store;

                    if (stock == 0) {
                        stock = PRODUCTS[i].stock_x_central_store;
                    }

                    if (stock > PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }


                    var html = '';

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        var cantidad = PRODUCTS[i].quantity;
                    } else {
                        var cantidad = 0;
                    }

                    //var imgLinkExt = PRODUCTS[i].linkext.replace("wide", "bigPreview"); // TEMP !!

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        //'<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-a"><img src="' + PRODUCTS[i].linkext + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:5px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:5px;"> Ubicación: ' + PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }
                }


            }

            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, popupTimeout);

            setTimeout(function () {
                getAlternativeProducts(id, idproduct);
            }, 510);

        }

        translateButtons(idiomStore);


    } else if (pantallaActual == "Asistente disfraces") {


        console.log("Mostramos el pop de detalle del producto en el asistente de disfraces");
        switch (param) {
        case "CART":
            var productList = CART;
            var quantity = productList[id].quantity;
            var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    var imgAvailability = "";
                    var stock = PRODUCTS[i].stock_x_store;

                    if (stock == 0) {
                        stock = PRODUCTS[i].stock_x_central_store;
                    }

                    if (stock > PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }


                    var html = '';

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        var cantidad = PRODUCTS[i].quantity;

                    } else {
                        var cantidad = 0;
                    }

                    //var imgLinkExt = PRODUCTS[i].linkext.replace("wide", "bigPreview"); // TEMP !!

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        //'<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-a"><img src="' + PRODUCTS[i].linkext + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;"> Ubicación: ' + PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }
                }


            }

            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, popupTimeout);

        }

        translateButtons(idiomStore);



    } else {

        console.log("Mostramos el pop de detalle del producto assit fiestas");

        var aux_original;
        var html = '';
        var cantidad = 0;

        switch (param) {
        case "CART":
            var productList = CART;
            var quantity = productList[id].quantity;
            var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    console.log("Entramos para mostrar las info del producto");
                    var imgAvailability = "";
                    var stock = PRODUCTS[i].stock_x_store;

                    if (stock == 0) {
                        stock = PRODUCTS[i].stock_x_central_store;
                    }

                    if (stock > PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        cantidad = PRODUCTS[i].quantity;

                    } else {
                        cantidad = 0;
                    }

                    div_carrusel = '<li data-role="list-divider" data-theme="c"><span>' + jsonIdiomas.popup_info_item.alternativos + '</span></li>' +
                        '<li style="height: 175px;" id="img_prod_alter"><div class="ui-grid-a" style="height: 175px;">' +
                        '<div id="imgBarraCarga"><center><label>' + jsonIdiomas.popup_errores.labelCargando + '</label></center></div>' +
                        '<div id="swiper" style="height: 175px;"></div>' +
                        '</div>' +
                        '</li>';

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a"><img src="' + PRODUCTS[i].linkext + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;"> Ubicación: ' + PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
                        '</div>' +
                        '</li>' + div_carrusel +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }

                    if (PRODUCTS[i].original == true) {
                        aux_original = PRODUCTS[i].original;
                    }

                    break;

                } //if
            } //for


            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, 200);

            if (aux_original == true) { // si no es alternativo y tiene cantidad en el carrito se mostraran los alternativos
                setTimeout(function () {
                    getAlternativeProducts(id, idproduct, cantidad);
                }, 510);
            }

        } //switch

        translateButtons(idiomStore);


    } //else



}


/*********************************** 
Función que carga el menú lateral
************************************/
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
        for (var i = 0; i < len; i++) {

            var imgLinkExt = node[i].linkext.replace("wide", "bigPreview");

            if (parseInt(data.nodes[i].isMain) == 1) {
                //console.log("este es el principal " + node[i].isMain);
                var valorSwitch = 7;
            } else {
                var valorSwitch = parseInt(node[i].type);
            }

            switch (valorSwitch) {
            case 1: //catalogo
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'1\')';
                break;
            case 2: //promos
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'2\')';
                break;
            case 3: // asis fistas
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\',\'3\')';
                break;
            case 4: // asis disfra
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\',\'4\')';
                break;
            case 5: // sugerencias
                //extra = 'displayPantallaSugerencias()';
                extra = 'displayPopUpPantallaSugerencias()';
                break;
            case 6: // fuera tienda
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'menu_lateral\')';
                break;
            case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',\'' + data.nodes[i].linkext + '\',\'menu_lateral\')';
                break;
            }

            //options = options + '<li onclick="' + extra + '; openMenu();"><img src="' + imgLinkExt + '" style="width:12em">' + node[i].name + '</li>';
            options = options + '<li style="text-align: center;color: rgb(23, 152, 209);font-weight: bold;" onclick="' + extra + '; openMenu();">' + node[i].name + '</li>';
        }

    }

    //options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">' + jsonIdiomas.menu_lateral.menu + '</a></center></li>';
    options = options + '<div onclick="getNodes(0);" style="text-align: center;color: white;text-transform: uppercase;">' + jsonIdiomas.menu_lateral.menu + '</div>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');


    var cart = '<a onclick="displayPopupItemList();" data-position-to="origin">' + //displayCar();
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:30%;position: relative;">' +
        '<div style="position: relative;margin-top:10px;margin-left: 20%;z-index:-1;float: left;"><img id="img_cesta" src="css/icons/cesta.png" style="width: 50px;height: 50px;"></div>' +
        '<div id="circuloCantidad" class="circulo" style="float: right;width: 25px; height: 25px;z-index:25;display:none;position: absolute;top: 0px;margin-left: 69%;">' +
        '<label id="spBtnPopupCartProducts" style="margin-top:3%;font-size: 18px;color: white;">0</label></div>' +
        '</div>' +
        '<div class="ui-block-b" style="margin-top: 10%;">' +
        //'</div><span style="margin:15px;display:none;" id="spBtnPopupCartAmmount">0 €</span><br><span style="margin:15px" id="spBtnAmountPerson"></span>' + //TEMP
        '<label style="margin-left:15px;display:none;" id="spBtnPopupCartAmmount">0 €</label></div>' +
        //'<img id="userIcoCarrito" style="display:none;" src="img/user_carrito.png" style="margin-left:-8px; margin-top:4px;">' +
        '</div></a>';


    /*HEADER  de la pantalla*/

    htmlHeaderMenuInicial = '<div class="ui-grid-d">' +
        '<div class="ui-block-b" style="margin-top:10px;margin-left: 37%; width:32%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="75%"></div>' +
        '</div>';

    var aux_login = "";
    if (INFO_USU.id != undefined) {
        aux_login = "Bienvenido/a " + INFO_USU.name + ',<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">';
    } else {
        aux_login = jsonIdiomas.header.login;
    }



    htmlHeader = '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:32%;color: rgb(70, 130, 180);text-transform:uppercase;" id="divBack"></div>' +

        '<div class="ui-block-b" style="margin-top:22px;width:11%;margin-left:-90px;" id="session" onclick="displayLogin();">' +
        '<center><a id="login" onclick="displayLogin();" style="text-transform: uppercase;float:left;font-size: 12pt;"><span>' + aux_login + '</span></a>' +
        '</div>' +

        '<div class="ui-block-c" style="margin-top:10px; margin-left:29px; width:32%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="75%" style="float: left;"> </div>' +

        '<div id="btn_finalizarpedido" class="btn_finalizarpedido" style="width: 16%; position: absolute; margin-left: 640px; margin-top: 20px; display: none;">Finalizar pedido</div>' +

        '<div class="ui-block-d" style="width:22%; margin-top:3px;margin-left:90px;" id="car_compra">' + cart + '</div>' +

        '<div class="ui-block-e" style="margin-top:10px; margin-left:-40px; width:4%">' +
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px; float:right"> <span class="flaticon-menu"></span> </a>' +
        '</div>' +
        '</div>';


    $("#divHeader_menuInicial").html(htmlHeaderMenuInicial);
    $("#divHeader_menuInicial").show();

    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');

    $("#divHeader_catalogo").addClass("border-header");
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

    if (INFO_USU.id != undefined) {
        $('#login').attr('onclick', "logout()");
        $('#session').attr('onclick', "logout()");
    }

    translateButtons(idiomStore);

    $('#btn_finalizarpedido').click(function () { // develop 1

        console.log('Handler for .click() called. con ' + opcionCompraProductos + ' ' + CART.productosEnTienda + ' ' + CART.productosEnWeb);

        //opcionesPago(opcionCompraProductos, productosEnTienda, productosEnWeb);
        opcionesPago();

    });
}


function displayPantallaIntermediaAsistDisfra(data) {

    if (data) {

        $("#divHeader_catalogo").show();
        $("#divHeader_menuInicial").hide();
        //console.log(data);
        var info = data.node;

        htmlContent = '<div id="page_count" style="display: block;padding-top: 1%;">' +
            '<center>' +
            '<img src="' + info.linkint + '" style="max-width: 30%;">' +
            '<div style="width: 30%"><select id="select_sexo" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
            '</select></div>' +
            '<div id="div_selectTalla" style="width: 30%;display:none"><select id="select_talla" data-theme="f" data-native-menu="false" data-corners="false">' +
            '</select></div>' +
            '<button style="width: 30%;" id="btn_continuar_dis" onclick="displayProductos(' + info.id + ',\'' + info.name + '\')" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
            '</center>' +
            '</div>';

        htmlContent = htmlContent;
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
            //console.log("Opcion seleccionada es " + optValueSelected);

            if (optValueSelected != 0) {

                getSize(optValueSelected);
                $("#div_selectTalla").show();

            } else {
                $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
                $('#popupAlert').popup('open');

                $("#div_selectTalla").hide();
            }
        });

        translateButtons(idiomStore);


    } else {


        $("#divHeader_catalogo").show();
        $("#divHeader_menuInicial").hide();

        htmlContent = '<div id="page_count" style="display: block;padding-top: 20%;">' +
            '<center>' +
            '<div style="width: 30%"><select id="select_sexo" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
            '</select></div>' +
            '<div id="div_selectTalla" style="width: 30%;display:none"><select id="select_talla" data-theme="f" data-native-menu="false" data-corners="false">' +
            '</select></div>' +
            '<button style="width: 30%;" id="btn_continuar_dis" onclick="" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
            '</center>' +
            '</div>';

        htmlContent = htmlContent;
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
            //console.log("Opcion seleccionada es " + optValueSelected);

            if (optValueSelected != 0) {

                getSize(optValueSelected);
                $("#div_selectTalla").show();

                $("#btn_continuar_dis").click(function () { //TEMP


                    var sexo = $("select#select_sexo option").filter(":selected").val(); // en los dos selects en caso de que no haya seleccionado nada sera cero
                    var talla = $("select#select_talla option").filter(":selected").val();

                    if (sexo != 0 && talla != 0) {

                        var info_aux = {
                            talla: talla,
                            sexo: sexo
                        }

                        getCostumesAge(info_aux);

                    }

                });

            } else {
                $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
                $('#popupAlert').popup('open');

                $("#div_selectTalla").hide();
            }
        });

        translateButtons(idiomStore);

    }

}


function displayPantallaIntermediaAsistFiestas(data) {

    //console.log(data);
    console.log("Asistente de fiestas");
    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 50%;height:550px;">' +
        '<img src="' + data.linkint + '" style="width:90%; display:block; margin:10% auto;">' +
        '</div>' +
        '<center>' +
        '<div class="ui-block-b" style="width: 50%;height:550px;">' +
        '<h4 style="margin-top:25%;"><label id="label_num_per_fiesta" style="font-size:20px">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-d" style="width: 75%;">' +
        '<div class="ui-block-a">' +
        '<img src="img/a_fiesta_u_ico.jpg" />' +
        '</div>' +
        '<div class="ui-block-b" onclick=\'$("#personas_fiesta").val("5");\'>' +
        '<img src="img/a_fiesta_num_05.jpg" />' +
        '</div>' +
        '<div class="ui-block-c" onclick=\'$("#personas_fiesta").val("10");\'>' +
        '<img src="img/a_fiesta_num_10.jpg" />' +
        '</div>' +
        '<div class="ui-block-d" onclick=\'$("#personas_fiesta").val("15");\'>' +
        '<img src="img/a_fiesta_num_15.jpg" />' +
        '</div>' +
        '<div class="ui-block-e" onclick=\'$("#personas_fiesta").val("20");\'>' +
        '<img src="img/a_fiesta_num_20.jpg" />' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-b" style="max-width:80%;">' +
        '<div class="ui-block-a" style="width:20%;margin-right:3%;margin-left:2%;"><a  data-corners="false" id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b">-</a></div>' +
        '<div class="ui-block-b" style="width:50%;margin-right:3%;margin-top: 4px;"><input data-corners="false" type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:20%;"><a data-corners="false" id="mas_fiesta" data-role="button" data-theme="b">+</a></div>' +
        '</div>' +
        '<a data-corners="false" style="width:68%;margin:0 auto;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\');" data-role="button" data-theme="b">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
        '</div>' +

        '</center>' +
        '</div>' +
        '</div>';

    /*htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<br>' +
        '<img src="' + data.linkint + '" style="max-width:30%;width:22%;">' +
        '<h4><label id="label_num_per_fiesta" style="font-size:20px">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-b" style="max-width:25%;">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a  data-corners="false" id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;margin-top: 4px;"><input data-corners="false" type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a data-corners="false" id="mas_fiesta" data-role="button" data-theme="b">+</a></div>' +
        '</div>' +
        '<div class="ui-grid-c" style="width: 50%;">' +
        '<div class="ui-block-a"><div id="circulo5" onclick=\'$("#personas_fiesta").val("5");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">5</label>' +
        '</div></div>' +
        '<div class="ui-block-b"><div id="circulo10" onclick=\'$("#personas_fiesta").val("10");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">10</label>' +
        '</div></div>' +
        '<div class="ui-block-c"><div id="circulo15" onclick=\'$("#personas_fiesta").val("15");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">15</label>' +
        '</div></div>' +
        '<div class="ui-block-d"><div id="circulo20" onclick=\'$("#personas_fiesta").val("20");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">20</label>' +
        '</div></div>' +
        '</div>' +
        '<a data-corners="false" style="max-width:15%;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\');" data-role="button" data-theme="b">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
        '</center>' +
        '</div>';*/

    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#mas_fiesta").click(function () {

        var valor = $("#personas_fiesta").val();
        var oparation = 1;
        //console.log("Valor de personas es " + valor);

        if (valor == "") valor = 0;

        if (oparation == 0 && valor > 2) { //para que el minimo de personsa sea 2
            if (valor != 0 || valor != "") {
                valor = parseInt(valor) - 1;
                $("#personas_fiesta").val(valor);
                //console.log("Sumamos " + valor);
            } else {
                //console.log("No hacemos nada ya que es cero");
            }
        } else if (oparation == 1) {
            valor = parseInt(valor) + 1;
            //console.log("Sumamos " + valor);
            $("#personas_fiesta").val(valor);
        }
    });

    translateButtons(idiomStore);

}


/*
function displayPantallaIntermediaAsistFiestas(data) {

    //console.log(data);
    console.log("Asistente de fiestas");
    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<br>' +
        '<img src="' + data.linkint + '" style="max-width:30%;width:22%;">' +
        '<h4><label id="label_num_per_fiesta" style="font-size:20px">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-b" style="max-width:25%;">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a  data-corners="false" id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;margin-top: 4px;"><input data-corners="false" type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a data-corners="false" id="mas_fiesta" data-role="button" data-theme="b">+</a></div>' +
        '</div>' +
        '<div class="ui-grid-c" style="width: 50%;">' +
        '<div class="ui-block-a"><div id="circulo5" onclick=\'$("#personas_fiesta").val("5");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">5</label>' +
        '</div></div>' +
        '<div class="ui-block-b"><div id="circulo10" onclick=\'$("#personas_fiesta").val("10");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">10</label>' +
        '</div></div>' +
        '<div class="ui-block-c"><div id="circulo15" onclick=\'$("#personas_fiesta").val("15");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">15</label>' +
        '</div></div>' +
        '<div class="ui-block-d"><div id="circulo20" onclick=\'$("#personas_fiesta").val("20");\' class="circulo" style="width: 40px;height: 40px;">' +
        '<label id="quantity" style="display: inline-block;margin-top: 7px;font-size:22px; color: white;">20</label>' +
        '</div></div>' +
        '</div>' +
        '<a data-corners="false" style="max-width:15%;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\');" data-role="button" data-theme="b">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#mas_fiesta").click(function () {

        var valor = $("#personas_fiesta").val();
        var oparation = 1;
        //console.log("Valor de personas es " + valor);

        if (valor == "") valor = 0;

        if (oparation == 0 && valor > 2) { //para que el minimo de personsa sea 2
            if (valor != 0 || valor != "") {
                valor = parseInt(valor) - 1;
                $("#personas_fiesta").val(valor);
                //console.log("Sumamos " + valor);
            } else {
                //console.log("No hacemos nada ya que es cero");
            }
        } else if (oparation == 1) {
            valor = parseInt(valor) + 1;
            //console.log("Sumamos " + valor);
            $("#personas_fiesta").val(valor);
        }
    });

    translateButtons(idiomStore);

}
*/

function displayRegistro() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displayCambioContra() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupCambioContra").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}


function displayLogin2() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupCambioContra").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);

    translateButtons(idiomStore);


}



function displayMenu() { //muestra el pop up de inicio de session

    //console.log("Volver al menu");
    getNodes(0);

    translateButtons(idiomStore);
}



function logout() { //muestra el pop up de inicio de session


    console.log("Cerramos session");
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px;text-transform: uppercase;"><span>' + jsonIdiomas.header.login + '</span></a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");
    
            
    if ( $("#contenedorInfoUsuario").length > 0 && $("#contenedorInfoUsuario").is(':hidden') ) {    // Si estoy en formulario de domicilio y hago logout, muestro opciones de registro de usuario.
        $("#contenedorInfoUsuario").show();
    }

    translateButtons(idiomStore);


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

    translateButtons(idiomStore);


}

/**
 *   displayPopUpPantallaSugerencias
 *
 *   
 */
function displayPopUpPantallaSugerencias() {

    PRODUCTS = [];
    TEMP_PRODUCTS = [];

    //$('#popupElegirTipoUsuario').popup('open');
    //displayPantallaSugerencias(); // TEMP !!
    console.log("Guardamos carrito antes de sugerencias");

    guardarInfo('si'); // TEMP !!

    console.log("Entramos en la pantalla de sugerencias");

    $("#banderas").hide();

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();

    var html = '<div data-corners="false"  id="popupElegirTipoUsuario" style="width:25%; margin:10% auto;">' +
        '<label id="labelSugTipo" style="font-weight: bolder; margin-top: 5px;">Tipo de Usuario:</label>' +
        '<div class="ui-select" style="margin:0 auto;font-size: 20px;">' +
        '<select id="selectUser" name="suge_inci" data-theme="b" data-native-menu="false" data-corners="false" tabindex="-1">' +
        '<option value="1" selected="selected">Cliente</option>' +
        '<option value="2">Dependiente</option>' +
        '</select>' +
        '<div style="display: none;" id="select-43-listbox-placeholder">' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-c" style="margin:0 auto;">' +
        '<button data-theme="b" id="btn_selectPantallaSugerencia" onclick="eligePantalla();" data-corners="false" style="border: 0px;text-transform: uppercase;font-size: 20px;" class=" ui-btn ui-btn-b ui-shadow">Acceder</button>' +
        '</div>' +
        '</div>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    translateButtons(idiomStore);

    console.log("--> Arribo al if amb length: " + CART.length);

    pantallaActual = 'sugerencias'; // TEMP !!

    if (CART.length < 1) { // TEMP !!!
        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");
    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

    $("#selectUser").val(1); // TEMP !!
}

function eligePantalla() {

    if ($("#selectUser").val() == 1) {
        displayPantallaSugerencias();
    } else {
        // ******************************* TODO !!
    }
}

function displayPantallaSugerencias() {

    console.log("Guardamos carrito antes de sugerencias");

    guardarInfo('si'); // TEMP !!

    console.log("Entramos en la pantalla de sugerencias");

    $("#banderas").hide();
    nodeIds = [];
    nodeNames = [];
    //loadMenu(node_cero);

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();
    //$("#divHeader").show();

    html_sug = '<div id="form_sugerencias" style="margin-top:2%;">' +
        '<form  enctype="text/plain">' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNom">' + jsonIdiomas.form_sugerencias.labelSugNom + '</label><input type="text" id="nombre" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugNaci">' + jsonIdiomas.form_sugerencias.labelSugNaci + '</label><input type="date" value="" id="fecha_naci" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugMail">' + jsonIdiomas.form_sugerencias.labelSugMail + '</label ><input type="email" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNPob">' + jsonIdiomas.form_sugerencias.labelSugNPob + '</label ><input type="text" id="poblacion" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugProv">' + jsonIdiomas.form_sugerencias.labelSugProv + '</label><input type="text" value="" id="provincia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugTelf">' + jsonIdiomas.form_sugerencias.labelSugTelf + '</label><input type="number" value="" id="telf" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugTipo">' + jsonIdiomas.form_sugerencias.labelSugTipo + '</label><select name="suge_inci" data-native-menu="false"  data-corners="false"><option value="1">' + jsonIdiomas.form_sugerencias.selectOption + '<option value="2">Petición</select></div>' +
        '<div class="ui-block-b" style="width: 65%;"><label id="labelSugNSugPreg">' + jsonIdiomas.form_sugerencias.labelSugNSugPreg + '</label><input type="text" value="" id="tipo_sugenrencia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<label id="labelSugPreg">' + jsonIdiomas.form_sugerencias.labelSugPreg +
        '<textarea cols="40" rows="3" id="sugerencias" style="height: 52px;" placeholder="' + jsonIdiomas.form_sugerencias.sugerenciasPlaceholder + '"></textarea>' +
        '<table width="25%" border="0" align="center" cellpadding="10" cellspacing="0">' +
        '<tr>' +
        '<td>' +
        '<div align="center">' +
        '<button type="button" onclick="enviarSugerencia();"  data-corners="false" id="enviar_sugerencia">' + jsonIdiomas.form_sugerencias.enviar_sugerencia + '</button>' +
        '</div>' +
        '</form>' +
        '</div>';


    $("#divContent").html(html_sug);
    $("#divContent").trigger('create');

    translateButtons(idiomStore);

    console.log("--> Arribo al if amb length: " + CART.length);

    pantallaActual = 'sugerencias'; // TEMP !!

    if (CART.length < 1) { // TEMP !!!
        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");
    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

}

function displaySummary(param) {



    $("#page_count").hide();

    var html = '';
    if (LOGGED == true) {
        if (CART.length > 0) {
            //console.log("Actualizar div");
            $('.ui-popup').popup('close');

            var div_li_prod = "";

            for (var i = 0; i < CART.length; i++) {

                div_li_prod = div_li_prod + "<li></li>";

            }

            var htmlHeader = '<div id="lista" style="witdh:90%;"><ul data-role="listview">' +
                '<li data-role="list-divider" style="background-color:#0096D2; font-size:20px; color:white;">' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width:70%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:20%"></div>' +
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
                '</li></div>';


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

    translateButtons(idiomStore);
}


function displayFlags(res) {

    console.log("Cargamos el popUp de idiomas");

    var html = '<ul data-role="listview">'; // data-role="listview" 

    var count = res.flags.length;
    var info = res.flags;

    //console.log(info);

    for (var i = 0; i < count; i++) {

        html += '<li style="list-style-type: none;background-color:#1798d1;" onclick="changeIdiom(\'' + info[i].shortname + '\',' + info[i].id + ');">' + //data-icon="false"
            //'<a onclick="changeIdiom(\'' + info[i].shortname + '\',' + info[i].id + ');"><label style="text-transform: uppercase;text-align: center;">' + info[i].name + '</label></a>' +
            '<label style="text-transform: uppercase;text-align: center;color: rgb(255, 255, 255);">' + info[i].name + '</label>' +
            '</li>';

    }

    li = '<center><img src="css/icons/creu.png" onclick="cerrar_popup()" style="width: 15%;"></center>';

    html += li + '</ul>';

    $("#contentPopupIdioma").html(html);
    $("#contentPopupIdioma").trigger('create');
    $("#contentPopupIdioma").css('font-size', '20px');

    translateButtons(idiomStore);

}

function displayPantallaPreviaDisfraces(idNode, nodeName, isAlgo, aux, backPage) { //Nuevo

    console.log("Asistente de disfraces");
    pantallaActual = 'Asistente disfraces'; //TEMP !!

    $("#banderas").hide();

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();
    //console.log(data);

    htmlContent = '<div id="page_count" style="display: block;padding-top: 20%;">' +
        '<center>' +
        '<label id="labelSugTipo" style="font-weight: bolder; margin-top: 5px;text-align:center;">Seleccione una opcion:</label>' +
        '<div style="width: 30%">' +
        '<select id="select_tema" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
        '<option selected="selected">Tipos de disfraces</option>' +
        '<option value="1">Edad</option>' +
        '<option value="2">Temática</option>' +
        '</select></div>' +
        '<button style="width: 30%;" id="btn_continuar_dis_previo" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
        '</center>' +
        '</div>';

    htmlContent = htmlContent;
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#select_tema").attr("data-native-menu", "false");

    $('#select_tema').change(function () {

        var optionSelected = $(this).find('option:selected');
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        //console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected == 2) {

            $('#btn_continuar_dis_previo').click(function () {
                getNodes(idNode, nodeName, isAlgo, aux, backPage);
            });

        } else if (optValueSelected == 1) {

            $('#btn_continuar_dis_previo').click(function () {
                displayPantallaIntermediaAsistDisfra();
            });

        } else {
            $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
            $('#popupAlert').popup('open');

            $("#div_selectTalla").hide();
        }
    });


    translateButtons(idiomStore);

    //console.log("--> Arribo al if amb length: " + CART.length);


    if (CART.length < 1) { // TEMP !!!

        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");
        //$("#spBtnAmountPerson").text(''); //TEMP
        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();
        $("#btn_finalizarpedido").hide();
        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }

        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        //console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

}


//function opcionesPago(casoPago, aux) { //TEMP

//function opcionesPago(casoPago, productosEnTienda, productosEnWeb) { //TEMP
function opcionesPago() { //TEMP

    $("#btn_finalizarpedido").addClass("btn_disabled");
    $("#car_compra").addClass("btn_disabled");

    $("#popupListItems").popup("close");

    pantallaActual = "opciones de pago";

    $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\');$(\'#car_compra\').removeClass(\'btn_disabled\');$(\'#btn_finalizarpedido\').removeClass(\'btn_disabled\');"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">' + nodeNames[nodeNames.length - 2] + '</label></div></div></div>');

    //switch (casoPago) {
    switch (opcionCompraProductos) {
    case 1:
        opcionEnvio = 1;
        var html = '<div>' +
            '<center>' +
            '<h2>Todos los artículos selecionados en tu cesta están en tienda y online</h2>' +
            '<h4>¿DONDE QUIERE ENVIAR SU PEDIDO?</h4>' +
            '<a data-corners="false" style="width:600px" onclick="pagarEnCaja();" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>PAGO EN CAJA Y RECOGER YO MISMO EN TIENDA</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +
            '<div class="ui-block-b" style="text-align: right;"><label>Total cesta: ' + formatoNumero(CART.ammount, 2, ",", ".", "€") + '</label></div>' +
            '</div>' +
            '</a>' +

            (CART.length - CART.productosEnWeb == 0 ?
                '<a data-corners="false" style="width:600px" onclick="opcionesEnvio(' + opcionEnvio + ',' + CART.ammount + ')" data-role="button" data-theme="b" >' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="text-align: left;"><label>PEDIDO ONLINE</label></div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="float:left;"><label></label></div>' +
                '<div class="ui-block-b" style="width:100%;text-align: right;"><label>Total cesta: ' + formatoNumero(CART.ammount, 2, ",", ".", "€") + ' + gastos de envio: 4.99€<br/>(gratuito a partir de 30€) = 29.75€</label></div>' +
                '</div>' +
                '</a>' : '') +

            '<br>' +
            '<a data-corners="false" style="width: 576px;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b">Cancelar pedido</a>' +
            '</center>' +
            '</div>';

        break;
    case 2:
        opcionEnvio = 2;
        var html = '<div>' +
            '<center><div style="width: 600px;">' +
            '<h2>TIENE ' + CART.productosEnTienda + ' PRODUCTOS EN TIENDA Y ' + CART.productosEnWeb + ' ONLINE</h2>' +
            '<h4>¿QUE QUIERES HACER?</h4>' +
            '<a data-corners="false" style="width:600px" onclick="pagarEnCaja();" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>COMPRAR SOLO LO DISPONIBLE EN TIENDA</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +
            '<div class="ui-block-b" style="width:100%;text-align: right;"><label>Total cesta(solo se tiene en cuenta los articulos en tienda): ' + formatoNumero(CART.precioTotalProductosTienda, 2, ",", ".", "€") + '<br/>(' + CART.productosEnTienda + ' productos disponibles)</label></div>' +
            '</div>' +
            '</a>' +
            '<a data-corners="false" style="width:600px" onclick="opcionesEnvio(' + opcionEnvio + ',' + CART.precioTotalProductosWeb + ')" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>COMPRAR ONLINE</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +
            '<div class="ui-block-b" style="width:100%;text-align: right;"><label>Total cesta: ' + formatoNumero(CART.precioTotalProductosWeb, 2, ",", ".", "€") + '<br/>(' + CART.productosEnWeb + ' productos disponibles)</label></div>' +
            '</div>' +
            '</a>' +
            '<a data-corners="false" style="width:600px" onclick="opcionesEnvio(' + opcionEnvio + ',' + CART.ammount + ')" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>RECOGER LO DISPONIBLE EN TIENDA Y EL RESTO PEDIRLO ONLINE</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +
            '<div class="ui-block-b" style="width:100%;text-align: right;"><label>Total cesta(solo se tiene en cuenta los articulos en tienda): ' + formatoNumero(CART.ammount, 2, ",", ".", "€") + '<br/>(' + CART.length + ' productos disponibles)</label></div>' +
            '</div>' +
            '</a>' +
            '<br>' +
            '<a data-corners="false" style="width:576px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b">Cancelar pedido</a>' +
            '</center>' +
            '</div>';
        break;
    case 3:
        opcionEnvio = 2;
        var html = '<div>' +
            '<center>' +
            '<h2>NO HAY DISPONIBLE NINGUN PRODUCTO EN TIENDA</h2>' +
            '<h4>¿QUE QUIERES HACER?</h4>' +
            '<a data-corners="false" style="width:600px" onclick="opcionesEnvio(' + opcionEnvio + ',' + CART.precioTotalProductosWeb + ')" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>PEDIDO ONLINE</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label></label></div>' +
            '<div class="ui-block-b" style="float:rigth; width:100%;text-align: right;"><label>Total cesta: ' + formatoNumero(CART.precioTotalProductosWeb, 2, ",", ".", "€")  + '<br/>(' + CART.productosEnWeb + ' productos disponibles)</label></div>' +
            '</div>' +
            '</a>' +
            '<br>' +
            '<a data-corners="false" style="width:576px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b">Cancelar pedido</a>' +
            '</center>' +
            '</div>';
        break;

    }


    $("#divContent").html(html);
    $("#divContent").trigger('create');


}

//function opcionesEnvio(casoEnvio, productosEnTienda, productosEnWeb) { //TEMP
function opcionesEnvio(casoEnvio, totalCesta) { //TEMP
    //function opcionesEnvio() { //TEMP

    pantallaActual = "opciones envio";

    $("#divBack").html('<div onclick="opcionesPago();"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">Opciones de pago</label></div></div></div>');

    switch (casoEnvio) {
    case 1:
        var html = '<div>' +
            '<center>' +
            '<h2>Todos los artículos selecionados en tu cesta están en tienda y online</h2>' +
            '<h4>¿QUE QUIERES HACER?</h4>' +
            '<a data-corners="false" style="width:600px" onclick="displayDomicilioForm()" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>ENVIO A DOMICILIO 48H</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +

            // '<div class="ui-block-b" style="text-align: right;width:100%;"><label>Total cesta: 25.23€ + gastos de envio = 30,25€</label></div>' +

            '<div class="ui-block-b" style="float:rigth; text-align: right;width:100%;"><label>Total cesta: ' + formatoNumero(totalCesta, 2, ",", ".", "€")  + ' + gastos de envio (4,99€)<br>(gratuito a partir de 30€ con entrega en tienda o<br> a partir de 75€ con entrega a domicilio)</label></div>' +

            '</div>' +
            '</a>' +
            '<br>' +
            '<a data-corners="false" style="width:576px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b">Cancelar pedido</a>' +
            '</center>' +
            '</div>';
        break;
    case 2:
        var html = '<div>' +
            '<center>' +
            '<h2>TIENE ' + CART.productosEnTienda + ' PRODUCTOS EN TIENDA Y ' + CART.productosEnWeb + ' ONLINE</h2>' +
            '<h4>¿QUE QUIERES HACER?</h4>' +
            '<a data-corners="false" style="width:600px" onclick="displayDomicilioForm()" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>ENVIO A DOMICILIO 48H</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +
            '<div class="ui-block-b" style="float:rigth;text-align: right;width:100%;"><label>Total cesta: <strong>' + formatoNumero(totalCesta, 2, ",", ".", "€")  + '</strong> + gastos de envio (4,99€)<br>(gratuito a partir de 30€ con entrega en tienda o<br> a partir de 75€ con entrega a domicilio)</label></div>' +
            '</div>' +
            '</a>' +
            '<a data-corners="false" style="width:600px" onclick="formularioTiendaDestino()" data-role="button" data-theme="b" >' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="text-align: left;"><label>CLICK AND COLLECT 48H</label></div>' +
            '</div>' +
            '<div class="ui-grid-a">' +
            '<div class="ui-block-a" style="float:left;"><label></label></div>' +

            //'<div class="ui-block-b" style="text-align: right;width:100%;"><label>Total cesta: 25.23€ + gastos de envio = 30,25€</label></div>' +

            '<div class="ui-block-b" style="float:rigth; text-align: right;width:100%;"><label>Total cesta: <strong>' + formatoNumero(totalCesta, 2, ",", ".", "€")  + '</strong> + gastos de envio (4,99€)<br>(gratuito a partir de 30€ con entrega en tienda o<br> a partir de 75€ con entrega a domicilio)</label></div>' +

            '</div>' +
            '</a>' +
            '<br>' +
            '<a data-corners="false" style="width:576px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
            '</center>' +
            '</div>';
        break;
    }

    $("#divContent").html(html);
    $("#divContent").trigger('create');

}


function sistemasPago() { //TEMP

    console.log('--> sistemasPago');

    pantallaActual = "sistemas pago";

    $("#divBack").html('<div onclick="opcionesEnvio(' + opcionEnvio + ')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">Opciones de envio</label></div></div></div>');

    var html = '<div>' +
        '<center>' +
        '<h2>OPCIONES DE PAGO</h2>' +
        '<a data-corners="false" style="width:600px" onclick="" data-role="button" data-theme="b" >' +
        '<div class="ui-grid-solo">' +
        '<div class="ui-block-a"><label>CAJA</label></div>' +
        '</div>' +
        '</a>' +
        //'<a data-corners="false" style="width:600px" onclick="" data-role="button" data-theme="b" >' +
        //'<div class="ui-grid-a">' +
        //'<div class="ui-block-a"><label>PAYPAL</label></div>' +
        //'</div>' +
        //'</a>' +
        '<a data-corners="false" style="width:600px" onclick="" data-role="button" data-theme="b" >' +
        '<div class="ui-grid-solo">' +
        '<div class="ui-block-a"><label>TARJETA</label></div>' +
        '</div>' +
        '</a>' +
        '<form id="myform" name="_xclick" action="https://www.paypal.com/es/cgi-bin/webscr" method="post">' +
        '<input type="hidden" name="cmd" value="_xclick">' +
        '<input type="hidden" name="business" value="me@mybusiness.es">' +
        '<input type="hidden" name="currency_code" value="EUR">' +
        '<input type="hidden" name="item_name" value="Pedido Party Fiesta">' +
        '<input type="hidden" name="amount" value="8.99">' +
        '<input type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" border="0" name="submit" alt="Realice pagos con PayPal: es rápido, gratis y seguro">' +
        '</form>' +

        '<br>' +
        '<a data-corners="false" style="width:576px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +

        '</center>';



    $("#divContent").html(html);
    $("#divContent").trigger('create');



}

function formularioTiendaDestino() {

    console.log('-> formularioTiendaDestino()'); // TEMP !!

    /*<div id="divTienda" align="center" style="padding-top: 5%;">

        <div>
            <label id="labelInicio">Seleccione provincia y tienda:</label>
        </div>
        <div id="div_select_provincia" data-theme="f" style="width: 25%; color: white; font-size: 20px;"></div>
        <br/>
        <div id="div_select_tienda" data-theme="f" style="width: 25%; color: white; font-size: 20px;"></div>
            
        <div class="ui-grid-c" style="width: 25%">
            <button data-theme="b" id="btn_seleccionar_tienda" data-corners="false" style="border: 0px;text-transform: uppercase;font-size: 20px;" class=" ui-btn ui-btn-b ui-shadow">Seleccionar</button>
        </div>

    </div>*/

    // TEMP !!!!!
    var html = '<div>' +
        '<center>' +
        '<h2>SELECCIONE TIENDA DE DESTINO</h2>' +
        //'<div id="div_select_provincia"></div>' +
        '<div id="div_select_tienda" style="width: 50%;"><select data-corners="false" id="selectShop" data-native-menu="false" data-theme="b" style=""></select></div>' +
        '<a data-corners="false" style="width:50%;" onclick="" data-role="button" data-theme="b" ><label>SELECCIONAR</label></a>' +
        '</center>';


    $("#divContent").html(html);
    $("#divContent").trigger('create');

    loadSelectShopsFromProvince(STORE.province);

    //loadSelectProvincias();

    /*$("#selectProvincia").change(function () {
        //alert("Han cambiado mi valor");

        idProvince = $("#selectProvincia").val();
        console.log("Provincia " + idProvince);

        loadSelectShopsFromProvince(idProvince);

    });*/

    /*html = '<div id="divTienda" align="center" style="padding-top: 5%;">' +

    '<div>' +
        '<label id="labelInicio">Seleccione provincia y tienda:</label>' +
    '</div>' +
    '<br/>' +
    '<div id="div_select_tienda" data-theme="f" style="width: 25%; color: white; font-size: 20px;"></div>' +

    '<div class="ui-grid-c" style="width: 25%">' +
        '<button data-theme="b" id="btn_seleccionar_tienda" data-corners="false" style="border: 0px;text-transform: uppercase;font-size: 20px;" class=" ui-btn ui-btn-b ui-shadow">Seleccionar</button>' +
    '</div>';

    html = '<center>' +
        '<h2>SELECCIONE LA TIENDA DE DESTINO</h2>' +
        '<center>' +

        '<div id="div_select_tienda" data-theme="f" style="width: 25%; margin: 0 auto; color: white; font-size: 20px;">' +
        '<div class="ui-nodisc-icon"><div class="ui-select"><select data-corners="false" id="select_tienda" data-native-menu="false" data-theme="b" style="" tabindex="-1"><option value="10" style="">C.C. GRAN VÍA 2</option><option value="96" style="">SANT CUGAT</option></select><div style="display: none;" id="select_tienda-listbox-placeholder"><!-- placeholder for select_tienda-listbox --></div></div></div>' +
        '<button data-theme="b" id="btn_acceder" data-corners="false" style="border: 0px;text-transform: uppercase;font-size: 20px;" onclick="sistemasPago();" class="ui-btn ui-btn-b ui-shadow">Seleccionar</button></div>'

    '<center>' +
    '<br>' +
    '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
    '</center>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');*/

    //getTiendas();
}

function loadSelectProvincias() {

    getProvinces();

    //console.log('-> loadSelectProvincias() con language: ' + language + ' i provincias: ' + PROVINCIAS.length); // TEMP !!

    //var provincias = getProvinces();
    //getProvinces();

    var html = '<div class="ui-nodisc-icon"><select data-corners="false" id="selectProvincia" data-native-menu="false" data-theme="b" style="">';

    for (var i = 0; i < PROVINCIAS.length; i++) {

        var val = PROVINCIAS[i].id;
        var text = '';

        switch (language) {
        case 1:
            text = PROVINCIAS[i].name_ca;
            break;

        case 2:
            text = PROVINCIAS[i].name_es;
            break;

        case 3:
            text = PROVINCIAS[i].name_en;
            break;

        case 4:
            text = PROVINCIAS[i].name_ge;
            break;

        case 5:
            text = PROVINCIAS[i].name_pt;
            break;

        case 6:
            text = PROVINCIAS[i].name_fr;
            break;

        case 9:
            text = PROVINCIAS[i].name_it;
            break;

        default:
            text = PROVINCIAS[i].name_es;
        }

        html = html + '<option value="' + val + '"><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

    }

    html = html + '</select></div>';

    //console.log('-> Incluyendo html: ' + html); // TEMP !!

    $("#div_select_provincia").html(html);
    $("#div_select_provincia").trigger('create');
    //$("#div_select_provincia").css('font-size', '20px');
}

function loadSelectShopsFromProvince(idProvince) {

    getShopsFromProvince(idProvince);

    console.log("SHOPSSSSSS");
    console.log(SHOPS);

    //var html = '<select data-corners="false" id="selectShop" data-native-menu="false" data-theme="b" style=""></select>';

    var select = $('#selectShop');

    for (var i = 0; i < SHOPS.length; i++) {

        var val = SHOPS[i].id;
        var text = SHOPS[i].name;

        //html = html + '<option value="' + val + '" style=""><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

        select.append($('<option>', {
            value: val,
            text: text
        }));

        select.selectmenu('refresh', true);

    }

    //html = html + '</select>';

    //console.log(html);

    //$("#div_select_tienda").html(html);
    //$("#div_select_tienda").trigger('create');
    //$("#div_select_tienda").css('font-size', '20px');
}

function changeFormRegUser(html_register_user) {

    var html_register_user = '<h2>Registro Usuario</h2>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">email</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_email" name="input_email" required="required" type="email" placeholder="nombre@email.com" autofocus data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Repetir email</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_repetir_email" name="input_repetir_email" required="required" type="email" placeholder="nombre@email.com" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Contraseña</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pass" name="input_pass" required="required" type="password" placeholder="" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Repetir contraseña</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_repetir_pass" name="input_repetir_pass" required="required" type="password" placeholder="" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Código postal</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_cp" name="input_cp" required="required" type="text" placeholder="00000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +

        '</div>' +
        '</div>';


    var div_form_reg_user = $('#div_form_reg_user');

    div_form_reg_user.empty();

    div_form_reg_user.html(html_register_user);
    div_form_reg_user.trigger('create');
}

function displayDomicilioForm() {

    /*    
    var html_login_user = '<h2>Login Usuario</h2>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">email</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_email" name="input_email" required="required" type="email" placeholder="nombre@email.com" autofocus="" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="uname" data-icon="u">Contraseña</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pass" name="input_pass" required="required" type="password" placeholder="" autofocus="" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<center><br>' +
        '<div onclick="changeFormRegUser();" style="height: 35px;">Es necesar<a id="registrarse" onclick="changeFormRegUser();" style="margin:10px;color: green;" class="ui-link">Registrarse</a></div>' +
        '</center>';*/
    
    var html_login_user = '<div id="contenedorInfoUsuario"><h2>Info Usuario</h2>' +
        '<center>' +
        '<div style="height: 35px;">Es necesario <a id="login2" onclick="displayLogin();" style="margin:10px;color: blue;" class="ui-link">Identificarse</a> o <a id="registrarse_reg_domicilio" onclick="changeFormRegUser();" style="margin:10px;color: green;" class="ui-link">Registrarse</a></div>' +
        '</center></div>';

    html = '<div id="div_registrarse" style="width:80%; margin:0 auto;">' +
        '<form autocomplete="on"><div id="div_form_reg_user">' +

        //(INFO_USU.id != undefined ? '<div id="contenedorInfoUsuario"></div>' : html_login_user) +
        
        html_login_user +

        '</div>' +
        '<h2 id="h2_direccion">Dirección</h2>' +

        '<div class="ui-grid-a" style="width:80%;">' + // --> CHECK DIRECCION !!!!    **********
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Dirección de entrega y facturación coinciden</label>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<div class=" ui-checkbox">' +
        '<input id="check_misma_direccion" type="checkbox" value="Click me" onclick="" data-cacheval="false" checked>' +
        '</div>' +
        '</div>' +
        '</div><br/>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Nombre</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_nombreUsuario" name="input_nombreUsuario" required="required" type="text" placeholder="Nombre" autofocus data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Apellidos</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_apellidos" name="input_apellidos" required="required" type="text" placeholder="Apellido1 Apellido2" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Tel&eacute;fono</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_telefono" name="input_telefono" required="required" type="text" placeholder="930000000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">DNI/CIF</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_dni_cif" name="input_dni_cif" required="required" type="text" placeholder="45444444T" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        /*'<div class="ui-grid-solo">' +
        '<label class="youpasswd" data-icon="p">Dirección (calle, número, escalera, piso)</label>' +
        '<div class="ui-block-a" style="width:90%; margin:0 auto;"><input id="input_direccion" name="input_direccion" required="required" type="text" placeholder="Dirección" data-clear-btn="true"></div>' +
        '</div>' +*/

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Dirección</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_direccion" name="input_direccion" required="required" type="text" placeholder="Dirección" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Número</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_num_direccion" name="input_num_direccion" required="required" type="text" placeholder="Número" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Código postal</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_postal" name="input_postal" required="required" type="text" placeholder="00000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Ciudad</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_ciudad" name="input_ciudad" required="required" type="text" placeholder="Barcelona" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">País</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pais" name="input_pais" required="required" type="text" placeholder="España" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Provincia</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_provincia" name="input_provincia" required="required" type="text" placeholder="Barcelona" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div id="div_direcion_facturacion" style="display:none;">' + // --> FORMULARIO DIRECCION FACTURACION !!!!    **********

        '<h2>Dirección de Facturación</h2>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Nombre</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_nombreUsuario_2" name="input_nombreUsuario_2" required="required" type="text" placeholder="Nombre" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Apellidos</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_apellidos_2" name="input_apellidos_2" required="required" type="text" placeholder="Apellido1 Apellido2" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Tel&eacute;fono</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_telefono_2" name="input_telefono_2" required="required" type="text" placeholder="930000000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">DNI/CIF</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_dni_cif_2" name="input_dni_cif_2" required="required" type="text" placeholder="45444444T" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        /*'<div class="ui-grid-solo">' +
        '<label class="youpasswd" data-icon="p">Dirección (calle, número, escalera, piso)</label>' +
        '<div class="ui-block-a" style="width:90%; margin:0 auto;"><input id="input_direccion_2" name="input_direccion_2" required="required" type="number" placeholder="Dirección" data-clear-btn="true"></div>' +
        '</div>' +*/

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Dirección</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_direccion_2" name="input_direccion_2" required="required" type="text" placeholder="Dirección" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Número</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_num_direccion_2" name="input_num_direccion_2" required="required" type="text" placeholder="Número" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Código postal</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_postal_2" name="input_postal_2" required="required" type="text" placeholder="00000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Ciudad</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_ciudad_2" name="input_ciudad_2" required="required" type="text" placeholder="Barcelona" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">País</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pais_2" name="input_pais_2" required="required" type="text" placeholder="España" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Provincia</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_provincia_2" name="input_provincia_2" required="required" type="text" placeholder="Barcelona" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        //'<button type="button" id="button_continuar_direcciones" class="ui-btn ui-shadow ui-corner-all" onclick="sistemasPago();">Continuar</button>' +
        '<button type="button" id="button_continuar_direcciones" class="ui-btn ui-shadow ui-corner-all" onclick="registroUsuarioDomicilio();">Continuar</button>' +

        '</form>' +
        '</div>' +

        '<center>' +
        '<br/>' +
        '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        '</center>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');
    
    if ( INFO_USU.id != undefined ) {           //  ------- Si el susuario esta logado no muestro cuadro de opciones de registro
        $("#contenedorInfoUsuario").hide();
    }

    $("#check_misma_direccion").click(function () { //  ---------------     evento de click en el checkbox  --------

        console.log('--> click!!');

        var chk = $("#check_misma_direccion");

        if (chk.prop('checked')) {
            $("#div_direcion_facturacion").hide();

            $("#h2_direccion").text('Dirección');

            console.log('---> checked');
        } else {
            $("#div_direcion_facturacion").show();

            $("#h2_direccion").text('Dirección de entrega');

            console.log('---> NO checked');
        }

    });
    
    if ( INFO_USU.id != undefined )   {     // si el usuario ha hecho login rellenar campos
        
        console.log('--> Cargando datos de sesion en formulario:'); // TEMP !!
        console.log(INFO_USU); // TEMP !!
        
        cargaDatosUsuarioAFormularioRegistro();
    }
    else    {   // TEMP !!
        console.log('-->Usuario no logueado, no se cargaran datos de sesion en formulario:'); // TEMP !!   
    }
}


function cargaDatosUsuarioAFormularioRegistro() {
    $('#input_nombreUsuario').val( INFO_USU.name )
    $('#input_apellidos').val( INFO_USU.surname );
    $('#input_telefono').val( INFO_USU.phone );
    $('#input_dni_cif').val( INFO_USU.NIN );
    $('#input_direccion').val( INFO_USU.address );
    $('#input_num_direccion').val( INFO_USU.NIN );       // --> falta modificar el webservice login.php
    $('#input_postal').val( INFO_USU.postalCode );
    $('#input_ciudad').val( INFO_USU.city );
    $('#input_num_direccion').val( INFO_USU.addressNumber );
    $('#input_pais').val( INFO_USU.country );
    $('#input_provincia').val( INFO_USU.province );
}

/**
 *
 *   funcion pagarEnCaja
 *
 *   Muesta opciones de Enviar correo, imprimir en tienda y cancelar pedido.
 */
function pagarEnCaja() {

    pantallaActual = "pagar caja";

    $("#divBack").html('<div onclick="opcionesPago()"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">Opciones de pago</label></div></div></div>');

    var html = '<div>' +
        '<center>' +
        '<h3> ¿Que deseas hacer con el pedido?</h3>' +
        '<br>' +
        '<a  data-corners="false" style="width:300px" onclick="sendEmail();" data-role="button" data-icon="mail" data-iconpos="right" data-theme="b">' + jsonIdiomas.pagina_pago.envio_email + '</a>' +
        '<br>' +
        '<a  data-corners="false" style="width:300px" onclick="imprimirPedido();" data-role="button" data-icon="home" data-iconpos="right" data-theme="b"> Imprimir en tienda </a>' +
        '<br>' +
        //'<a  data-corners="false" style="width:300px" onclick="pedidoOnline();" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b"> Pedido online </a>' +
        //'<br>' +
        '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        '</center>' +
        '</div>';
    $("#divContent").html(html);
    $("#divContent").trigger('create');
}