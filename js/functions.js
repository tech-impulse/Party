/*************************************************************
  Esta funcion muestra la pantalla de pago cuando se clica en 
  el boton de checkout
**************************************************************/
function checkOut() {

    if (CART.length > 0) {

        console.log("Actualizar div");
        $('.ui-popup').popup('close');

        $("#btn_finalizarpedido").hide();

        if (SHOPDELIVERY == 0) {
            var html = '<div>' +
                '<center>' +
                '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="sendEmail();" data-role="button" data-icon="mail" data-iconpos="right" data-theme="b">' + jsonIdiomas.pagina_pago.envio_email + '</a>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="imprimirPedido();" data-role="button" data-icon="home" data-iconpos="right" data-theme="b"> Imprimir en tienda </a>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="pedidoOnline();" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b"> Pedido online </a>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
                '</center>' +
                '</div>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            //var n = nodeIds.length + 1;
            //updateBackButton(nodeIds[n], nodeNames[n]);

        } else {
            var html = '<div>' +
                '<center>' +
                '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                '<br>' +
                '<a data-corners="false" style="width:300px" onclick="sendEmail();" data-role="button" data-icon="mail" data-iconpos="right" data-theme="b" >' + jsonIdiomas.pagina_pago.envio_email + '</a>' +
                '<br>' +
                '<a data-corners="false" style="width:300px" onclick="imprimirPedido();" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b" > Imprimir en tienda </a>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="pedidoOnline();" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b"> Pedido online </a>' +
                '<br>' +
                '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
                '</center>' +
                '</div>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            //var n = nodeIds.length + 1;
            //updateBackButton(nodeIds[n], nodeNames[n]);
            // BORRAR!
        }
    } else {
        alert("No hay productos");
    }
    //} else {
    //    $('.ui-popup').popup('close');
    //    setTimeout(function () {
    //        REDIRECT = true;
    //        $("#popupLogin").popup("open");
    //    }, popupTimeout);
    //    console.log("No estás logado");
    //}

    $("#page_count").hide();


}

function addCartAsistFiestas(prod_id) {

    //console.log("Calculamos los articulos para el carrito sistenteFiestas------------------------------------------------");

    // calculo del numero de articulos por producto
    for (var k = 0; k < PRODUCTS.length; k++) {

        //console.log("Comparacion es " + PRODUCTS[k].id + " id que nos llega " + prod_id);

        if (parseInt(PRODUCTS[k].id) == parseInt(prod_id)) {

            aux = 0;
            var count = PRODUCTS[k].caracteristics.length;
            var caracteristicas = PRODUCTS[k].caracteristics;

            for (var j = 0; j < count; j++) {

                if (caracteristicas[j].type == "9" && PRODUCTS[k].name != "" && PRODUCTS[k].price_x_region.length > 0) {

                    var num_uni = caracteristicas[j].name;
                    var units = num_uni.split(' ');

                    //console.log("Encontrada car. Unidades es " + units[0]);

                    if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo

                        //console.log("Unidades es1 " + units[0] + " se añade 1");
                        addToCart(PRODUCTS[k].id, 1);
                        aux = 1;

                    } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {

                        addToCart(PRODUCTS[k].id, Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                        //console.log("Math " + Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                        aux = 1;

                    } else { //mas personas que unidades del articulo
                        addToCart(PRODUCTS[k].id, 1);
                        aux = 1;
                    }

                    break;

                }
            }

            //console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

            if (aux == 0 && PRODUCTS[k].name != "" && PRODUCTS[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                addToCart(PRODUCTS[k].id, 1);
            }

            break;
        } //if

    }

}

function refrescarPantallaProductos(prod_id) {

    console.log("Refrescamos los articulos segun el carrito------------------------------------------------");

    for (var k = 0; k < CART.length; k++) {

        //console.log("Comparacion es " + PRODUCTS[k].id + " id que nos llega " + prod_id);

        if (parseInt(CART[k].id) == parseInt(prod_id)) {

            addToCart(CART[k].id, parseInt(CART[k].quantity));

        }

    }

}


/***********************************************************************
  Esta funcion sirve para actualizar el boton de atras de la pantalla
  Parametros:
  originNode: el node de donde venimos
  originName: nombre del nodo del que venimos
  Variables:
  nodeIds:lista de nodos por los que hemos pasado
  nodeNames: lista de los nombres de los nodos por los que hemos pasado
***********************************************************************/
function updateBackButton(originNode, originName, linkImg) {

    //console.log("Imagen es " + linkImg + " lonjutud es " + nodeIds.length);
    var encontrado = 0;
    if (nodeIds.length == 0) {

        console.log("No tenemos paginacion, la iniciamos " + nodeIds.length);

        //añadimos volver al menú
        nodeIds.push("0");
        nodeNames.push(jsonIdiomas.header.menu);
        nodeImg.push(linkImg);
        //añadimos volver a la opcion elegida del menú 
        nodeIds.push(originNode);
        nodeNames.push(originName);
        nodeImg.push(linkImg);

        //console.log("Añadir nueva pagina     -------------------------------------------------------------");
        //console.log(nodeIds);
        //console.log(nodeNames);
        //console.log(nodeImg);
        //console.log("Añadida                 -------------------------------------------------------------");

        $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">' + nodeNames[nodeNames.length - 2] + '</label></div></div></div>');

    } else {

        console.log("Añadimos un nuevo elemento a la paginacion nuevo pagina " + originNode + " ultimo del array " + nodeIds[nodeIds.length - 1]);
        //console.log("Añadimos " + originName + " lonjutud es " + nodeIds.length);

        if (nodeIds[nodeIds.length - 1] != originNode) { //si no es el mismo lo añadimos

            nodeIds.push(originNode);
            nodeNames.push(originName);
            nodeImg.push(linkImg);
            //console.log("Añadimos " + originName + " lonjutud es " + nodeIds.length);

            //$("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span>' + nodeNames[nodeNames.length - 2] + '</div>');
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">' + nodeNames[nodeNames.length - 2] + '</label></div></div></div>');


        } else {

            //console.log("Ya lo tenemos guardado -------------------------------------------------------");
            //$("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span>' + nodeNames[nodeNames.length - 2] + '</div>');
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">' + nodeNames[nodeNames.length - 2] + '</label></div></div></div>');


        }

    }

}


/******************************************
 Esta funcion enseña el pop up de idiomas
******************************************/
function changeIdiomPopUp() {

    console.log("PopUp idiomas");

    setTimeout(function () {
        $("#popupIdiomas").popup("open");
    }, popupTimeout);

}


/**************************************************************************
  Esta funcion se utiliza para cambiar el idioma de la app
  Parametros:
  idioma:el nuevo idioma que queremos ( es el nombre corto, ej: es de españa)
  idiomaId: el id del idioma nuevo
**************************************************************************/
function changeIdiom(idioma, idiomaId) {

    //console.log("Cambiamos el idioma " + idioma);

    idiomStore = idioma;
    language = idiomaId;

    $("#label_idioma").text(idiomStore);

    if (CART.length > 0) {
        getTraduccion(idioma);
    }

    translateButtons(idiomStore);

    if (pantallaActual == "menu principal") {

        getNodes(0);

    }

    $("#popupIdiomas").popup("close");



}

/************************************************************************************************
  Esta funcion se utiliza en la pantalla intermedia antes de entrar al asist. fiesta o disfraces
  para añadir o quitar personas del input
  Parametros:  
  oparation:sumar o restar personas
*************************************************************************************************/
function addPeople(oparation) {

    var valor = $("#personas_fiesta").val();
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



}

/**************************************************************************
  Esta funcion para dormir la app durante el tiempo que le digamos en milisegundos
***************************************************************************/
function sleep(millisegundos) {
    var inicio = new Date().getTime();
    while ((new Date().getTime() - inicio) < millisegundos) {}
}

function volver(id_product, idnodo) {

    $("#popupListItems").popup("close");
    /*setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);*/
    displayPopupItemDetail(idnodo, 'PRODUCTOS', id_product);

}



function guardarInfo(accion) {

    console.log("--> Guardar Info - action: " + accion);

    if (accion == "si") {

        var position = (nodeIds.length);

        position = nodeIds.length;
        //console.log("Antes de borrar " + nodeIds[position]);
        //nodeIds.splice(position - 1);
        //nodeNames.splice(position - 1);
        //nodeImg.splice(position - 1);
        //console.log(nodeIds);

        /*setTimeout(function () {
            $("#popupPregunta").popup("close");
        }, popupTimeout);*/
        //getNodes(idNode, nodeName, 0, linkint, "back");
        //getNodes(nodeIds[nodeIds.length - 1], nodeNames[nodeNames.length - 1], 0, nodeImg[nodeImg.length - 1], "back");

        console.log("--> Dins IF si"); // TEMP !!

    } else {

        for (var i = CART.length - 1; i >= 0; i--) {
            if (CART[i].dedonde == "Asistente fiestas") {
                //console.log("Borramos el item " + CART[i].id);

                CART.ammount = CART.ammount - (CART[i].price_x_region[0].totalPrice * CART[i].quantity);
                deleteItemCart(i);
            }

        }

        var total = 0;
        for (var i = 0; i < CART.length; i++) {
            total = total + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(total);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
        $("#spPopupCartCount").text(total);
        $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        //var position = (nodeIds.length);


        //position = nodeIds.length;
        console.log("Antes de borrar " + nodeIds[position]);
        //nodeIds.splice(position - 1);
        //nodeNames.splice(position - 1);
        //nodeImg.splice(position - 1);
        console.log(nodeIds);
        setTimeout(function () {
            $("#popupPregunta").popup("close");
        }, popupTimeout);
        getNodes(nodeIds[nodeIds.length - 1], nodeNames[nodeNames.length - 1], 0, nodeImg[nodeImg.length - 1], "back");


    }

}


function cerrar_popup() {

    $("#popupIdiomas").popup("close");

}

function revisarDireccionCorreo(id) {
    // Expresion regular para validar el correo
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

    // Se utiliza la funcion test() nativa de JavaScript
    //if (regex.test($('#emailsignup').val().trim())) {
    if (regex.test($('#' + id).val().trim())) {
        return true;
    } else {
        return false;
    }
}

/**
 *   cancelaPedido
 *
 *   funcion que vacia el carrito, vuelve a la pantalla inicial y esta logado, hace un logout.
 */
function cancelaPedido() {

    $("#btn_finalizarpedido").removeClass("btn_disabled");
    //$("#car_compra").removeClass("btn_disabled");

    vaciaCarrito();

    if (EMAIL_USER != "") {
        EMAIL_USER = "";
    }

    INFO_USU = "";
    $('#popupAlert').popup('open');
    $('#email').val('');
    //$("#spBtnAmountPerson").text(''); //TEMP
    $("#circuloCantidad").hide();
    $("#spBtnPopupCartAmmount").hide();
    $("#userIcoCarrito").hide();
    $("#btn_finalizarpedido").hide();
    CART = [];
    nodeNames = [];
    nodeIds = [];
    nodeImg = [];
}


/**
 *   Funcion updateOpcionCompraProducto
 *
 *   Recalcula opcionCompraProductos en función de las variables productosEnTienda y productosEnWeb
 */
function updateOpcionCompraProducto() { // dev 29-03-2016

    //console.log('-> Recalculamos opcionCompraProductos, antes valia: ' + opcionCompraProductos);

    if (CART.length == 0) {
        opcionCompraProductos = 1;
    } else {

        if (CART.length - CART.productosEnTienda == 0) { // 1- Todos los productos estan en tienda i productosEnWeb
            opcionCompraProductos = 1;
        } else if (CART.productosEnTienda > 0 && CART.productosEnTienda < CART.length) { // 2- Existe algun producto en tienda
            opcionCompraProductos = 2;
        } else if (CART.productosEnTienda == 0) { // 3- Ningun producto en tienda
            opcionCompraProductos = 3;
        }

    }

    //console.log('-> Ahora vale: ' + opcionCompraProductos);
}

/**
 *   Funcion updateVariblesTiposDeProducto
 *
 *   Recalcula opcionCompraProductos en función de las variables productosEnTienda y productosEnWeb
 *
 *   param: nuevoProducto --> boolean ( true: si se añade un nuevo producto al carrito | false: si se quita del carrito)
 */
function updateVariblesTiposDeProducto(product, nuevoProducto, foundInCart) {

    /*console.log('-> Recalculamos VariblesTiposDeProducto con:');
    console.log('-> Producto stoc en tienda: ' + product.stock_x_store);
    console.log('-> Producto stoc en web: ' + product.stock_x_central_store);

    console.log('-> CART.productosEnTienda: ' + CART.productosEnTienda);
    console.log('-> CART.productosSoloEnTienda: ' + CART.productosSoloEnTienda);
    console.log('-> CART.productosEnWeb: ' + CART.productosEnWeb);
    console.log('-> CART.productosSoloEnWeb: ' + CART.productosSoloEnWeb);

    console.log('\n-> Los nuevos valores son:\n');*/

    if (nuevoProducto) {

        //console.log("Nuevo prod " + nuevoProducto);

        if (product.stock_x_store > 0) {

            //console.log("Entramos para poner mas productos de tienda");
            if (isNaN(CART.precioTotalProductosTienda) == true) CART.precioTotalProductosTienda = 0;

            if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                CART.precioTotalProductosTienda = parseFloat(CART.precioTotalProductosTienda) + parseFloat(product.price_x_region[0].totalPrice);

            } else { //nuevo articulo en tienda

                CART.productosEnTienda++;
                CART.precioTotalProductosTienda = parseFloat(CART.precioTotalProductosTienda) + (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice));

            }

            if (product.stock_x_central_store <= 0) { //no esta en el almacen pero si en tienda

                if (isNaN(CART.precioTotalProductosSoloTienda) == true) CART.precioTotalProductosSoloTienda = 0;

                if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                    CART.precioTotalProductosSoloTienda = parseFloat(CART.precioTotalProductosSoloTienda) + parseFloat(product.price_x_region[0].totalPrice);

                } else { //nuevo articulo solo disponible en tienda

                    CART.productosSoloEnTienda++;
                    CART.precioTotalProductosSoloTienda = parseFloat(CART.precioTotalProductosSoloTienda) + (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice));

                }
            }

        }

        if (product.stock_x_central_store > 0) { //producto no disponible en tienda pero si en el almacen

            if (isNaN(CART.precioTotalProductosWeb) == true) CART.precioTotalProductosWeb = 0;


            if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                CART.precioTotalProductosWeb = parseFloat(CART.precioTotalProductosWeb) + parseFloat(product.price_x_region[0].totalPrice);

            } else { //nuevo articulo en web 

                CART.productosEnWeb++;
                CART.precioTotalProductosWeb = parseFloat(CART.precioTotalProductosWeb) + (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice));

            }

            if (product.stock_x_store <= 0) {

                if (isNaN(CART.precioTotalProductosSoloWeb) == true) CART.precioTotalProductosSoloWeb = 0;

                if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                    CART.precioTotalProductosSoloWeb = parseFloat(CART.precioTotalProductosSoloWeb) + parseFloat(product.price_x_region[0].totalPrice);

                } else { //nuevo articulo solo disponible en tienda

                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                    console.log(CART.precioTotalProductosSoloWeb);
                    console.log(product);

                    CART.productosSoloEnWeb++;
                    CART.precioTotalProductosSoloWeb = parseFloat(CART.precioTotalProductosSoloWeb) + (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice));

                }
            }
        }

    } else {

        //console.log("Quitamos productos");
        //console.log(product);

        if (product.stock_x_store > 0) {

            if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                CART.precioTotalProductosTienda = CART.precioTotalProductosTienda - parseFloat(product.price_x_region[0].totalPrice);

                if (parseInt(product.quantity) == 0) {
                    CART.productosEnTienda--;
                } else {

                }


            } else { //lo borramos del todo

                CART.productosEnTienda--;
                CART.precioTotalProductosTienda = CART.precioTotalProductosTienda - parseFloat(product.price_x_region[0].totalPrice);

            }

            if (product.stock_x_central_store <= 0) { //no esta disponible en almacen si en almacen


                if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                    CART.precioTotalProductosSoloTienda = CART.precioTotalProductosSoloTienda - parseFloat(product.price_x_region[0].totalPrice);

                    if (parseInt(product.quantity) == 0) {
                        CART.productosSoloEnTienda--;
                    } else {

                    }


                } else { //lo borramos del todo

                    CART.productosSoloEnTienda--;
                    CART.precioTotalProductosSoloTienda = CART.precioTotalProductosSoloTienda - parseFloat(product.price_x_region[0].totalPrice);

                }
            }

            //productAlter.price_x_region[0].totalPrice
        }
        if (product.stock_x_central_store > 0) {

            if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                CART.precioTotalProductosWeb = CART.precioTotalProductosWeb - parseFloat(product.price_x_region[0].totalPrice);

                if (parseInt(product.quantity) == 0) {
                    CART.productosEnWeb--;
                } else {

                }


            } else { //lo borramos del todo

                CART.productosEnWeb--;
                CART.precioTotalProductosWeb = CART.precioTotalProductosWeb - parseFloat(product.price_x_region[0].totalPrice);

            }

            if (product.stock_x_store <= 0) { //solo disponible en almacen

                if (foundInCart == 1) { //ya tenemos el producto en cuenta modificamos el precio total

                    CART.precioTotalProductosSoloWeb = CART.precioTotalProductosSoloWeb - parseFloat(product.price_x_region[0].totalPrice);

                    if (parseInt(product.quantity) == 0) {
                        CART.productosSoloEnWeb--;
                    } else {

                    }


                } else { //lo borramos del todo

                    CART.productosSoloEnWeb--;
                    CART.precioTotalProductosSoloWeb = CART.precioTotalProductosSoloWeb - parseFloat(product.price_x_region[0].totalPrice);

                }
            }
        }


    }

    //console.log('-> CART.productosEnTienda: ' + CART.productosEnTienda);
    //console.log('-> CART.productosSoloEnTienda: ' + CART.productosSoloEnTienda);
    //console.log('-> CART.productosEnWeb: ' + CART.productosEnWeb);
    //console.log('-> CART.productosSoloEnWeb: ' + CART.productosSoloEnWeb);

}


function registroUsuarioDomicilio(soloFacturacion) { // underDev

    var user = (INFO_USU.id != undefined ? INFO_USU.email : $('#input_email').val());
    var password = (INFO_USU.id != undefined ? '' : $('#input_pass').val());
    var userPostalCode = (INFO_USU.id != undefined ? INFO_USU.postalCode : $('#input_cp').val());

    var sendName = null;
    var sendSurname = null;
    var sendPhone = null;
    var sendNIN = null;
    var sendAddress = null;
    var sendNumber = null;
    var sendPC = null;
    var sendCity = null;
    var sendCountry = null;
    var sendProvince = null;

    var facName = null;
    var facSurname = null;
    var facPhone = null;
    var facNIN = null;
    var facAddress = null;
    var facNumber = null;
    var facPC = null;
    var facCity = null;
    var facCountry = null;
    var facProvince = null;

    if (soloFacturacion != undefined && soloFacturacion == 1) {
        facName = $('#input_nombreUsuario_2').val();
        facSurname = $('#input_apellidos_2').val();
        facPhone = $('#input_telefono_2').val();
        facNIN = $('#input_dni_cif_2').val();
        facAddress = $('#input_direccion_2').val();
        facNumber = $('#input_num_direccion_2').val();
        facPC = $('#input_postal_2').val();
        facCity = $('#input_ciudad_2').val();
        //facCountry = $('#input_pais_2').val();
        facCountry = $('#selectCountry_2').val()
            //facProvince = $('#input_provincia_2').val();
        facProvince = $('#selectProvince_2').val();
    } else {
        sendName = $('#input_nombreUsuario').val();
        sendSurname = $('#input_apellidos').val();
        sendPhone = $('#input_telefono').val();
        sendNIN = $('#input_dni_cif').val();
        sendAddress = $('#input_direccion').val();
        sendNumber = $('#input_num_direccion').val();
        sendPC = $('#input_postal').val();
        sendCity = $('#input_ciudad').val();
        //sendCountry = $('#input_pais').val();
        sendCountry = $('#selectCountry').val()
            //sendProvince = $('#input_provincia').val();
        sendProvince = $('#selectProvince').val();


        facName = ($('#check_misma_direccion').prop('checked') ? sendName : $('#input_nombreUsuario_2').val());
        facSurname = ($('#check_misma_direccion').prop('checked') ? sendSurname : $('#input_apellidos_2').val());
        facPhone = ($('#check_misma_direccion').prop('checked') ? sendPhone : $('#input_telefono_2').val());
        facNIN = ($('#check_misma_direccion').prop('checked') ? sendNIN : $('#input_dni_cif_2').val());
        facAddress = ($('#check_misma_direccion').prop('checked') ? sendAddress : $('#input_direccion_2').val());
        facNumber = ($('#check_misma_direccion').prop('checked') ? sendNumber : $('#input_num_direccion_2').val());
        facPC = ($('#check_misma_direccion').prop('checked') ? sendPC : $('#input_postal_2').val());
        facCity = ($('#check_misma_direccion').prop('checked') ? sendCity : $('#input_ciudad_2').val());
        //facCountry = ( $('#check_misma_direccion').prop('checked') ? sendCountry : $('#input_pais_2').val() );
        facCountry = ($('#check_misma_direccion').prop('checked') ? sendCountry : $('#selectCountry_2').val());
        //facProvince = ( $('#check_misma_direccion').prop('checked') ? sendProvince : $('#input_provincia_2').val() );
        facProvince = ($('#check_misma_direccion').prop('checked') ? sendProvince : $('#selectProvince_2').val());
    }

    console.log('--> registroUsuarioDomicilio con sendCountry: ' + sendCountry + ' sendProvince: ' + sendProvince + ' facCountry: ' + facCountry + ' facProvince: ' + facProvince); // TEMP !!

    if (INFO_USU.id != undefined) { // El usuario se supone que ya esta registrado

        console.log('registrarse es true llamamos a updateRegistroUser'); // TEMP

        if (soloFacturacion != undefined && soloFacturacion == 1) {

            updateRegistroUser(user,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, 1);
        } else {

            updateRegistroUser(user,
                sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, 0);
        }

    } else { // El usuario quiere registrarse

        console.log('registrarse es false llamamos a sendRegistroDomicilio'); // TEMP

        if (soloFacturacion != undefined && soloFacturacion == 1) {

            sendRegistroDomicilio(user, password, userPostalCode,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, 1);
        } else {
            sendRegistroDomicilio(user, password, userPostalCode,
                sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
                facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, 0);
        }

    }

}


function updateRegistroUser(user,
    sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
    facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, pantallaSiguiente) {

    console.log('Arguments update: ' + arguments); // TEMP
    // Datos que se van a enviar
    var dataSend = {
        user: user,

        sendName: sendName,
        sendSurname: sendSurname,
        sendPhone: sendPhone,
        sendNIN: sendNIN,
        sendAddress: sendAddress,
        sendNumber: sendNumber,
        sendCity: sendCity,
        sendProvince: sendProvince,
        sendPC: sendPC,
        sendCountry: sendCountry,
        //userPostalCode: userPostalCode,

        facName: facName,
        facSurname: facSurname,
        facPhone: facPhone,
        facNIN: facNIN,
        facAddress: facAddress,
        facNumber: facNumber,
        facCity: facCity,
        facProvince: facProvince,
        facPC: facPC,
        facCountry: facCountry
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'updateUser.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                console.log("Todo ok");
                console.log(response);
                LOGGED = true;
                //console.log(response.info);
                INFO_USU = response.info;
                //$('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                /*if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }*/

                switch (pantallaSiguiente) {
                case 0:
                    sistemasPago();
                    break;

                case 1:
                    formularioTiendaDestino();
                    break;
                }

            } else if (response.result == -1) {

                console.log("Número de parametros incorrecto");
                $("#texto_popup").text("Número de parametros incorrecto");
                $('#popupAlert').popup('open');

            } else if (response.result == -2) {

                $("#texto_popup").text("El usuario no existe");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendRegistroDomicilio(user, password, userPostalCode,
    sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
    facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, pantallaSiguiente) {

    console.log('Arguments update: ' + arguments); // TEMP

    // Datos que se van a enviar
    var dataSend = {
        user: user,
        password: password,
        userPostalCode: userPostalCode,

        sendName: sendName,
        sendSurname: sendSurname,
        sendPhone: sendPhone,
        sendNIN: sendNIN,
        sendAddress: sendAddress,
        sendNumber: sendNumber,
        sendCity: sendCity,
        sendProvince: sendProvince,
        sendPC: sendPC,
        sendCountry: sendCountry,

        facName: facName,
        facSurname: facSurname,
        facPhone: facPhone,
        facNIN: facNIN,
        facAddress: facAddress,
        facNumber: facNumber,
        facCity: facCity,
        facProvince: facProvince,
        facPC: facPC,
        facCountry: facCountry
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'register.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                console.log("Todo ok");
                console.log(response);
                LOGGED = true;
                //console.log(response.info);
                INFO_USU = response.info;
                //$('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                /*if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }*/

                switch (pantallaSiguiente) {
                case 0:
                    sistemasPago();
                    break;

                case 1:
                    formularioTiendaDestino();
                    break;
                }

            } else if (response.result == -1) {

                console.log("Número de parametros incorrecto");
                $("#texto_popup").text("Número de parametros incorrecto");
                $('#popupAlert').popup('open');

            } else if (response.result == -2) {

                $("#texto_popup").text("El usuario ya existe");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function añadirProductosArray(data) {

    var encotrado = false;
    //console.log("añadirProductosArray");
    //console.log(data);

    for (var i = 0; i < PRODUCTS.length; i++) {

        //console.log("FOR " + parseInt(PRODUCTS[i].id) + " == " + parseInt(data.id));

        if (parseInt(PRODUCTS[i].id) == parseInt(data.id)) {
            encotrado = true;
            break;
        }

    }

    if (encotrado == false) {
        //console.log("No esta en la lista de productos lo añadimos");
        data.original = true;
        //console.log(data);
        PRODUCTS = PRODUCTS.concat(data);
        encotrado == false;
    }

}