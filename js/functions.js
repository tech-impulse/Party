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

    console.log("Calculamos los articulos para el carrito------------------------------------------------");

    // calculo del numero de articulos por producto
    for (var k = 0; k < PRODUCTS.length; k++) {

        console.log("Comparacion es " + PRODUCTS[k].id + " id que nos llega " + prod_id);

        if (parseInt(PRODUCTS[k].id) == parseInt(prod_id)) {

            aux = 0;
            var count = PRODUCTS[k].caracteristics.length;
            var caracteristicas = PRODUCTS[k].caracteristics;

            for (var j = 0; j < count; j++) {

                if (caracteristicas[j].type == "9" && PRODUCTS[k].name != "" && PRODUCTS[k].price_x_region.length > 0) {

                    var num_uni = caracteristicas[j].name;
                    var units = num_uni.split(' ');

                    console.log("Encontrada car. Unidades es " + units[0]);

                    if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo

                        console.log("Unidades es1 " + units[0] + " se añade 1");
                        addToCart(PRODUCTS[k].id, 1);
                        aux = 1;

                    } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {

                        addToCart(PRODUCTS[k].id, Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                        console.log("Math " + Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                        aux = 1;

                    } else { //mas personas que unidades del articulo
                        addToCart(PRODUCTS[k].id, 1);
                        aux = 1;
                    }

                    break;

                }
            }

            console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

            if (aux == 0 && PRODUCTS[k].name != "" && PRODUCTS[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                addToCart(PRODUCTS[k].id, 1);
            }

            break;
        } //if

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
        console.log("Añadimos " + originName + " lonjutud es " + nodeIds.length);
        if (nodeIds[nodeIds.length - 1] != originNode) { //si no es el mismo lo añadimos

            nodeIds.push(originNode);
            nodeNames.push(originName);
            nodeImg.push(linkImg);
            console.log("Añadimos " + originName + " lonjutud es " + nodeIds.length);

            //$("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span>' + nodeNames[nodeNames.length - 2] + '</div>');
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\', \'' + nodeImg[nodeImg.length - 2] + '\')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 15%;"><span  class="flaticon-leftarrow" style="font-size:8px; margin-right:10px" style="text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 55%;"><label style="font-weight: bold;">' + nodeNames[nodeNames.length - 2] + '</label></div></div></div>');


        } else {

            console.log("Ya lo tenemos guardado -------------------------------------------------------");
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

    console.log("Cambiamos el idioma " + idioma);

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

                CART.ammount = CART.ammount - (CART[i].price_x_region[0].totalPrice * CART[i].quantity)
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
 *   getShopsFromProvince
 *
 *   funcion que llama al webservice para conseguir las tiendas en funcion del identificador de provincia.
 */
function getShopsFromProvince( idProvince ) {
    
    console.log("getShopsFromProvince con id: " + idProvince);
    
    var request = $.ajax({
        data: idProvince,
        url: urlServices + 'getShopsProvince.php',
        dataType: 'json',
        async: false,
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            
            if ( response.result == 1)  {
                
                return response.stores;
                
            }
            else    {
                console.log("-> No se encontraron tiendas");
                $("#texto_popup").text("No se encontraron tiendas");
                $('#popupAlert').popup('open');
                
                return [];
            }
        },
         error: function (jqXHR, textStatus, errorThrown) {

            return []; 
            
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

/**
 *   getProvinces
 *
 *   funcion que llama al webservice que devuelve todas las provincias.
 */
function getProvinces() {
    
    console.log("-> Llamando al webservice getProvinces.php");
    
    var request = $.ajax({
        url: urlServices + 'getProvinces.php',
        dataType: 'json',
        async: false,
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            
            if ( response.result == 1)  {
                
                //var provinces = JSON.parse(response.provinces);
                
                PROVINCIAS = response.provinces;
                
                //console.log('response.provinces: ' + response.provinces);
                
                console.log("-> Encontradas " + PROVINCIAS.length + " provincias");
                console.log("-> provincias " + PROVINCIAS);
                
                //return provinces;
                
            }
            else    {
                console.log("-> No se encontraron provincias");
                $("#texto_popup").text("No se encontraron provincias");
                $('#popupAlert').popup('open');
                
                return [];
            }
        },
         error: function (jqXHR, textStatus, errorThrown) {

            return []; 
            
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

/**
*   Funcion updateOpcionCompraProducto
*
*   Recalcula opcionCompraProductos en función de las variables productosEnTienda y productosEnWeb
*/
function updateOpcionCompraProducto()   {
    
    if (CART.length - CART.productosEnTienda == 0) { // 1- Todos los productos estan en tienda i productosEnWeb
        opcionCompraProductos = 1;
    } else if ( CART.productosEnTienda > 0 && CART.productosEnTienda < CART.length) { // 2- Existe algun producto en tienda
        opcionCompraProductos = 2;
    } else if (CART.productosEnTienda == 0) { // 3- Ningun producto en tienda
        opcionCompraProductos = 3;
    }
    
}

/**
*   Funcion updateVariblesTiposDeProducto
*
*   Recalcula opcionCompraProductos en función de las variables productosEnTienda y productosEnWeb
*
*   param: nuevoProducto --> boolean ( true: si se añade un nuevo producto al carrito | false: si se quita del carrito)
*/
function updateVariblesTiposDeProducto( product, nuevoProducto )   {
    
    if ( nuevoProducto )    {
        if (product.stock_x_store > 0) {
            CART.productosEnTienda++;
            
            CART.precioTotalProductosTienda += product.quantity * product.price_x_region[0].totalPrice;
            
            if ( product.stock_x_central_store <= 0 )   {
                CART.productosSoloEnTienda++;
                CART.precioTotalProductosSoloTienda += product.quantity * product.price_x_region[0].totalPrice;
            }
            
            //productAlter.price_x_region[0].totalPrice
        }
        if ( product.stock_x_central_store > 0 ) {
            CART.productosEnWeb++;
            
            CART.precioTotalProductosWeb += product.quantity * product.price_x_region[0].totalPrice;
            
             if (product.stock_x_store <= 0) {
                CART.productosSoloEnWeb++;
                 
                CART.precioTotalProductosSoloWeb += product.quantity * product.price_x_region[0].totalPrice;
            }
        }
    }
    else    {
        if (product.stock_x_store > 0) {
            CART.productosEnTienda--;
            
            CART.precioTotalProductosTienda -= product.quantity * product.price_x_region[0].totalPrice;
            
            if ( product.stock_x_central_store <= 0 )   {
                CART.productosSoloEnTienda--;
                
                CART.precioTotalProductosSoloTienda -= product.quantity * product.price_x_region[0].totalPrice;
            }
            
            //productAlter.price_x_region[0].totalPrice
        }
        if ( product.stock_x_central_store > 0 ) {
            CART.productosEnWeb--;
            
            CART.precioTotalProductosWeb -= product.quantity * product.price_x_region[0].totalPrice;
            
            if (product.stock_x_store <= 0) {
                CART.productosSoloEnWeb--;
                
                CART.precioTotalProductosSoloWeb -= product.quantity * product.price_x_region[0].totalPrice;
            }
        }
    }
    
}

