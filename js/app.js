/******************************************
Esto se ejecuta antes que la app se inicie  
******************************************/
$(document).bind("mobileinit", function () {

    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    //$.mobile.selectmenu.prototype.options.nativeMenu = false;

    // Configuración de Ajax
    $.ajaxSetup({
        timeout: 10000, //Time in milliseconds
        crossDomain: true
    });

    // Obtenermos el listado banderas y tiendas
    //alert("Antes de cargar");
    getFlags();
    getTiendas();

    //Cargamos el idioma por defecto de la app
    translateButtons("ca");


});

function onDeviceReady() {
    navigator.splashscreen.show();
}


/******************************************
Esto se ejecuta antes que la app se inicie
******************************************/
$(document).ready(function () {

    // jQuery no-double-tap-zoom plugin

    $(window).scroll(function () {

        if ($(window).scrollTop() == $(document).height() - $(window).height()) {

            if (pantallaActual == "catalogo") {

                console.log("Mas scroll");
                //PAGINA++;
                //getNodesProducts(nodeIds[nodeIds.length - 1], nodeNames[nodeNames.length - 1]);

            }


        }
    });

    var elm = document.body; // or some selection of the element you want to disable

    var catcher = function (evt) {
        if (evt.touches.length > 2)
            evt.preventDefault();
    };

    elm.addEventListener('touchstart', catcher, true);

    (function ($) {
        var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
        $.fn.nodoubletapzoom = function () {
            if (IS_IOS)
                $(this).bind('touchstart', function preventZoom(e) {
                    var t2 = e.timeStamp,
                        t1 = $(this).data('lastTouch') || t2,
                        dt = t2 - t1,
                        fingers = e.originalEvent.touches.length;
                    $(this).data('lastTouch', t2);
                    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                    e.preventDefault(); // double tap - prevent the zoom
                    // also synthesize click events we just swallowed up
                    $(this).trigger('click').trigger('click');
                });
        };
    })(jQuery);

    $('#popupCargando').on('popupafteropen', function () {

        console.log("Abrimos el popup de cargando");

        setTimeout(function () {
            $('#popupCargando').popup('close');
        }, 65000);

    }).on('popupafterclose', function () {

    });



    $("#popupListItems").bind({
        popupafterclose: function (event, ui) {

            console.log("Hemos cerrado el popup");

        }
    });


    //Guardamos el alto y ancho de la pantalla
    W_WIDTH = $(window).width();
    W_HEIGTH = $(window).height();

    $("#popupCargando").popup({
        beforeposition: function () {
            $(this).css({
                width: W_WIDTH,
                height: W_HEIGTH
            });
        },
        x: 0,
        y: 0
    });


    //Detectamos la orientacion de la pantalla
    $(window).bind("orientationchange", function (event) {
        if (event.orientation) {
            console.log("Me han reorientado a " + event.orientation);
            W_WIDTH = $(window).width();
            W_HEIGTH = $(window).height();
        }
    });

    //Protector de pantalla de la app
    protector = setInterval(function () {
        displayScreenSaver();
    }, idleTime);

    //Detectamos cuando clicamos en la pantalla para desactivar el protector de pantalla
    $(window).on("click", function (ev) {

        var e = ev.originalEvent;
        clearInterval(protector);

        //console.log("Click");

        $('#principal').show();
        $('#contentPopupScreenSaver').hide();

        protector = setInterval(function () {
            displayScreenSaver();
        }, idleTime);

    });

    var htmlHeader_menu = '<div id="barra_sup" style="position:relative" onclick="changeIdiomPopUp();">' +
        '<img src="css/icons/header.jpg" width="100%" style="height: 38px;"><div id="banderas" style="position:absolute; top:0px;right: 0px;margin-top: .5%;margin-right: 3%;">' +
        /*'<a onclick="changeIdiomPopUp();"><img id="img_banderas" src="css/banderas/idioma_codigo.png"  style="width: 30px;margin-right: 5px;height: 20px;margin-top: 5px;"></a>' +*/
        '<a onclick="changeIdiomPopUp();"><label id="label_idioma" style="color: rgb(255, 255, 255);text-transform:uppercase;" >ES</label></a>' +
        '</div>';
    $("#divHeader_menu").html(htmlHeader_menu);
    $("#divHeader_menu").trigger('create');

    // Obtenermos el listado banderas y tiendas
    getFlags();
    getTiendas();

    //Cargamos el idioma por defecto de la app
    translateButtons("es");

    //Boton de acceso a la app
    $("#btn_acceder").click(function () {

        var seleccion = $("#select_tienda option:selected").val();
        //console.log("Seleccion es " + seleccion);

        if (seleccion != undefined) {

            $("#divTienda").hide();
            $("#divContent").show();

            STORE = seleccion;

            var countTiendas = TIENDAS.stores.length;

            for (var i = 0; i < countTiendas; i++) {

                if (TIENDAS.stores[i].id == STORE) {
                    SHOPDELIVERY = TIENDAS.stores[i].deliveryStore; //guardamos el id de la tienda
                    //language = TIENDAS.stores[i].language;  
                    STORE = TIENDAS.stores[i];
                    TIENDAS = "";
                    break;
                }

            }

            //console.log("Item seleccionado " + STORE + " y tiene entraga en tienda? " + SHOPDELIVERY);
            $("#logo_inicio").hide();
            getNodes(0);

        } else {

            console.log("¿Seleccione una tienda!");

        }

    });

    //Boton de login de la app
    $("#iniciar_session").click(function () {

        //console.log("Logandose");
        var usuario = $('#usrnm').val();
        var contraseña = $('#pswd').val();

        if (usuario == "" || contraseña == "") {
            /*$('.ui-popup').popup('close');
            $("#texto_popup").text(jsonIdiomas.popup_errores.evento_click.iniciar_session);
            $('#popupAlert').popup('open');*/
            if (usuario == "" && contraseña != "") {
                $("#usrnm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#usrnm').addClass('colorText');
            } else if (usuario != "" && contraseña == "") {
                $("#pswd").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#pswd').addClass('colorText');
            } else {
                $("#usrnm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#usrnm').addClass('colorText');
                $("#pswd").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#pswd').addClass('colorText');
            }


        } else {
            $('#usrnm').removeClass('colorText');
            $('#pswd').removeClass('colorText');
            EMAIL_USER = usuario;
            getLogin(usuario, contraseña);
        }

    });

    //Boton de login de la app
    $("#enviar_correo").click(function () {

        //console.log("Logandose");
        var email = $('#email').val();
        EMAIL_USER = email;
        INFO_USU = email;

        if (email == "") {

            $("#email").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#email').addClass('colorText');

        } else {

            $('#email').removeClass('colorText');
            sendEmail();


        }

    });

    //Boton de registro de la app
    $("#enviar_registro").click(function () {

        //console.log("registrandose");
        var usuario = $('#emailsignup').val();
        var contraseña = $('#passwordsignup').val();
        var rep_contraseña = $('#passwordsignup_confirm').val();
        var cod_pos = $('#cod_pos').val();
        //console.log("Contra " + contraseña + " dos " + rep_contraseña + " mas " + cod_pos);

        if (contraseña != rep_contraseña) { //usuario == "" || contraseña == "" || rep_contraseña == "" || cod_pos == ""

            //console.log("AQUI333");
            $('#passwordsignup').val("");
            $('#passwordsignup_confirm').val("");
            $("#passwordsignup").attr("placeholder", jsonIdiomas.popup_errores.evento_click.contra_nocoinciden);
            $('#passwordsignup').addClass('colorText');
            $("#passwordsignup_confirm").attr("placeholder", jsonIdiomas.popup_errores.evento_click.contra_nocoinciden);
            $('#passwordsignup_confirm').addClass('colorText');

        } else if (usuario != "" && contraseña == rep_contraseña && cod_pos != "") {

            //console.log("AQUI222");
            $('#emailsignup').removeClass('colorText');
            $('#passwordsignup').removeClass('colorText');
            $('#passwordsignup_confirm').removeClass('colorText');
            $('#cod_pos').removeClass('colorText');
            getRegistro(usuario, contraseña, cod_pos);

        } else {
            //console.log("AQUI");
            $("#emailsignup").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#emailsignup').addClass('colorText');
            $("#passwordsignup").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#passwordsignup').addClass('colorText');
            $("#passwordsignup_confirm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#passwordsignup_confirm').addClass('colorText');
            $("#cod_pos").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#cod_pos').addClass('colorText');

        }

    });


    $("#btnPopupActionLeft").click(function () {

        var action = $("#lbpopupAction").text();
        switch (action) {
        case "deleteItem":

            displayPopupItemList();
            break;
        }
    });


    $("#btnPopupActionRight").click(function () {

        var action = $("#lbpopupAction").text();
        switch (action) {
        case "deleteItem":
            deleteItemCart($("#lbpopupAction").val());
            displayPopupItemList();
            break;
        }
    });

    $("#cam_contraseña").click(function () { // botton de login de la app

        //console.log("Cambio passwrod");
        var usuarioCambio = $('#usuarioCambio').val();

        //console.log("Email " + usuarioCambio);

        if (usuarioCambio != "") {
            //console.log("Procedemos...")
            sendContra(usuarioCambio);
        } else {
            $("#texto_popup").text("Escriba un usuario");
            $('#popupAlert').popup('open');
        }

    });



});


// FUNCIÓN QUE ABRE/CIERRA EL MENÚ LATERAL
function openMenu() {

    if ($("#lateralMenu").hasClass("ui-panel-open") == true) {
        $("#lateralMenu").panel("close");
    } else {
        $("#lateralMenu").panel("open");
    }

}

// FUNCIÓN QUE EMULA EL BOTÓN DE ATRÁS DE LA APLICACIÓN
function backPage(idNode, nodeName, linkint) {

    //console.log("Imagen: " + linkint);

    translateButtons(idiomStore);

    if (pantallaActual == "Asistente fiestas" && AUX == 1 && CART.length > 0) { //mostramos el popup para poder vaciar el cart

        setTimeout(function () {
            $("#popupPregunta").popup("open");
        }, popupTimeout);

        AUX = 0;

    } else {

        var position = (nodeIds.length);
        console.log("Posicion " + position);

        if (position > 2 && idNode != 0) {

            //console.log("Tenemos cola");
            //console.log(nodeIds);
            console.log("Antes de borrar " + position);
            nodeIds.splice(position - 2); //borramos el ultimo nodo
            nodeNames.splice(position - 2);
            nodeImg.splice(position - 2);
            console.log(nodeIds);
            position = nodeIds.length; //despues de borrar
            console.log("Despues de borrar " + position);
            getNodes(idNode, nodeName, 0, linkint, "back");
            //getNodes(nodeIds[position - 2], nodeNames[position - 2], 0, nodeImg[position - 2], "back");

        } else {
            getNodes(0);
            nodeIds = [];
            nodeNames = [];
            nodeImg = [];
        }

    }



}


/*********************************************************************************************
  Esta funcion carga la lista de productos una vez que no hay mas nodos que mostrar. Segun en 
  que pantalla estemos muestra una cosa o otra.
  Parametros:
  idNode: id del node del cual venimos.
  nodeName: nombre del nodo del cual venimos.  
**********************************************************************************************/
function displayProductos(idNode, nodeName) {

    if (ISFIESTA == 4) { //por aqui se accede al asistente de disfraces

        var sexo = $("select#select_sexo option").filter(":selected").val(); // en los dos selects en caso de que no haya seleccionado nada sera cero
        var talla = $("select#select_talla option").filter(":selected").val();

        if (sexo != 0 && talla != 0) {

            var info_aux = {
                talla: talla,
                sexo: sexo
            }

            //console.log("Todos los selects ok. Entramos en el asistente de disfraces.");
            getProducts(idNode, nodeName, info_aux);

        }

    } else if (ISFIESTA == 3) { //por aqui se accede desde el asistente de fiestas

        var num_persosnas = $('#personas_fiesta').val();

        if (num_persosnas >= 2) {

            //console.log("Todos los selects ok. ASIS. FIESTAS");
            getProducts(idNode, nodeName);

        } else {

            $("#texto_popup").text("Añada alguna persona a la fiesta");
            $('#popupAlert').popup('open');

        }

    } else {

        $("#texto_popup").text("Seleccione un campo valido para poder continuar");
        $('#popupAlert').popup('open');

    }

}


/**************************************************************************************************
 Da formato a un número para su visualización
 @param {(number|string)} numero Número que se mostrará
 @param {number} [decimales=null] Nº de decimales (por defecto, auto); admite valores negativos
 @param {string} [separadorDecimal=","] Separador decimal
 @param {string} [separadorMiles=""] Separador de miles
 @param {string} [simbolo=""] simbolo de la moneda
 @returns {string} Número formateado o cadena vacía si no es un número
****************************************************************************************************/
function formatoNumero(numero, decimales, separadorDecimal, separadorMiles, simbolo) {
    var partes, array;

    if (!isFinite(numero) || isNaN(numero = parseFloat(numero))) {
        return "";
    }
    if (typeof separadorDecimal === "undefined") {
        separadorDecimal = ",";
    }
    if (typeof separadorMiles === "undefined") {
        separadorMiles = "";
    }

    // Redondeamos
    if (!isNaN(parseInt(decimales))) {
        if (decimales >= 0) {
            numero = numero.toFixed(decimales);
        } else {
            numero = (
                Math.round(numero / Math.pow(10, Math.abs(decimales))) * Math.pow(10, Math.abs(decimales))
            ).toFixed();
        }
    } else {
        numero = numero.toString();
    }

    // Damos formato
    partes = numero.split(".", 2);
    array = partes[0].split("");
    for (var i = array.length - 3; i > 0 && array[i - 1] !== "-"; i -= 3) {
        array.splice(i, 0, separadorMiles);
    }
    numero = array.join("");

    if (partes.length > 1) {
        numero += separadorDecimal + partes[1];
    }

    return numero + " " + simbolo;
}


/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  No se utiliza.
  Parametros : 
  producto: info del producto a guardar
  operacion: si es añadir o restar articulos  1 sera sumar  0 restar
*********************************************************************************************************************/

function carrito(id_producto, operacion, precio) {

    //console.log("Longitud del array " + CARRITO.length);
    //console.log(id_producto);
    //console.log(CARRITO);

    if (CARRITO.length == 0) {

        //displayMasMenos(0, id_producto);
        //displayQantidadProducto(1, id_producto);
        var aux = [];

        aux['id_producto'] = id_producto;
        aux['cantidad'] = 1;
        aux['precio'] = precio;
        CARRITO.push(aux);

        //console.log(CARRITO);

    } else {

        if (operacion == 1) { //sumamos

            var encontrado = 0;
            var count = "";
            for (var i = 0; i < CARRITO.length; i++) {
                count++;
                if (id_producto == CARRITO[i].id_producto) {

                    CARRITO[i].cantidad = CARRITO[i].cantidad + 1;
                    encontrado = 1;
                    //displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                    break;

                }

            }

            if (encontrado == 0) { //no existe ese articulo en nuestro array aun, lo añadimos
                var aux = [];

                aux['id_producto'] = id_producto;
                aux['cantidad'] = 1;
                aux['precio'] = precio;
                CARRITO.push(aux);
                //displayMasMenos(0, id_producto);
                //displayQantidadProducto(1, id_producto);

            }

        } else if (operacion == 0) { //restamos

            var count = "";
            if (CARRITO.length > 0) {

                for (var i = 0; i < CARRITO.length; i++) {

                    count++;
                    if (id_producto == CARRITO[i].id_producto) {

                        CARRITO[i].cantidad = CARRITO[i].cantidad - 1;
                        encontrado = 1;
                        //displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                        if (CARRITO[i].cantidad == 0) {
                            CARRITO.splice(i, 1);
                            //console.log(CARRITO);
                        }
                        break;

                    }

                }


            }


        }

    }

}

/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  Parametros : 
  producto: info del producto a guardar
  operacion: si es añadir o restar articulos  1 sera sumar  0 restar
*********************************************************************************************************************/

function addToCart(item, param) {

    var product;
    var foundInCart = 0;
    var i = "";

    /*for (var i = 0; i < PRODUCTS.length; i++) { //cogemos los datos del producto con el id que tenemos
        
        
        if (PRODUCTS[i]['id'] == item) {
            console.log("ENCONTRADO EN LISTA DE PRODUCTOS " + PRODUCTS[i]['id'] + " es igual a " + item);
            product = PRODUCTS[i];
            i = PRODUCTS.length;
                        
            break;
        }
        
    }

    for (var j = 0; j < CART.length; j++) {
        //console.log("buscando  " + item + " en carrito " + CART[j]['id']);
        if (CART[j]['id'] == item) {
            //console.log("ENCONTRADO EN CARRITO " + CART[j]['id'] + " es igual a " + item);
            foundInCart = 1;
            CART[j].quantity = CART[j].quantity + parseInt(param);
            CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

            var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);
            //console.log("Precio del articulo es " + precioArticulo);
            $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

            displayItemOperations(CART[j].id, parseInt(CART[j].quantity), j);
            j = PRODUCTS.length;
            //console.log("Añadimos mas "+CART[j].quantity);

        }
    }*/

    for (i = 0; i < PRODUCTS.length; i++) { //cogemos los datos del producto con el id que tenemos

        if (PRODUCTS[i]['id'] == item) { //si coinciden lo añadimos al carrito

            console.log("ENCONTRADO EN LISTA DE PRODUCTOS " + PRODUCTS[i]['id'] + " es igual a " + item);
            product = PRODUCTS[i];
            //i = PRODUCTS.length;

            for (var j = 0; j < CART.length; j++) {

                if (CART[j]['id'] == item) {
                    //console.log("ENCONTRADO EN CARRITO " + CART[j]['id'] + " es igual a " + item);
                    foundInCart = 1;
                    CART[j].quantity = CART[j].quantity + parseInt(param);
                    CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

                    var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);

                    $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

                    displayItemOperations(CART[j].id, parseInt(CART[j].quantity), j);
                    //j = PRODUCTS.length;
                    break;

                } //if
            } //for
        } //if
    } //for

    if (foundInCart == 0) {

        if (CART.ammount == undefined) {
            CART.ammount = 0;
            PRODUCTS.ammount = 0;
        }

        if (parseInt(param) > 1) {
            product.quantity = parseInt(param);
        } else {
            product.quantity = 1;
        }

        CART.ammount = (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice)) + parseFloat(CART.ammount);
        PRODUCTS.ammount = CART.ammount;
        //product.dedonde = pantallaActual;
        product.dedonde = nodeIds[nodeIds.length - 1];
        product.original = true; //este campo indica si el articulo ha sido sustituido o no
              
        CART.push(product);

        var precioArticulo = parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice);

        //console.log($("#labelPrecioTotalProducto" + product.id));
        $("#labelPrecioTotalProducto" + product.id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));
        $("#labelPrecioTotalProducto" + product.id).show();

        displayItemOperations(item, product.quantity);
    }

    if (CART.length > 0) {
        $("#btn_finalizarpedido").show();
    }

}

/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  Parametros : 
  item: id del producto a guardar
  
*********************************************************************************************************************/

function addToCartAlter(id_prod_alter, id_produc) {

    console.log("Id por alter " + id_prod_alter + " id product " + id_produc);
    var product={};
    var aux_prod;
    var cantidad;
    var foundInCart = 0;
    var units = units_alt = 0;
    var j, i;

    for (i = 0; i < PRODUCTS_ALTER.length; i++) { //buscamos el producto alternativo

        if (PRODUCTS_ALTER[i].id == id_prod_alter) {

            product = PRODUCTS_ALTER[i];
            var count = PRODUCTS_ALTER[i].caracteristics.length;

            for (var l = 0; l < count; l++) {

                var caracteristicas = product.caracteristics[l];
                if (caracteristicas.type == "9") {

                    var unidades = caracteristicas.name;
                    units_alt = unidades.split(' ');
                    break;

                } else {

                    aux_carac = 1;
                    continue;

                }
            }
            i = PRODUCTS_ALTER.length;
            break;
        }
    }

    for (j = 0; j < CART.length; j++) {

        console.log("buscando  " + id_produc + " en carrito " + CART[j]['id']);

        if (CART[j]['id'] == id_produc) {

            console.log("ENCONTRADO EN CARRITO " + j);
            console.log(CART[j]);

            foundInCart = 1;
            CART[j].quantity = 0;

            break;
        }
    }

    console.log("Antes de poner unidades");
    console.log(product);

    if (foundInCart == 1) { // se ha encontrado el producto en el carrito podemos sustituirlo

        if (parseInt(num_personas_fiesta) < parseInt(units_alt[0])) {

            for (var k = 0; k < product.caracteristics.length; k++) {

                var caracteristicas = product.caracteristics[k];
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
            product.quantity = cantidad;
            product.original = false; //este campo indica si el articulo ha sido sustituido o no
            product.dedonde = nodeIds[nodeIds.length - 1];

        } else {

            cantidad = 1;
            product.quantity = cantidad;
            product.original = false;
            product.dedonde = nodeIds[nodeIds.length - 1];

        }


        console.log("Vamos a cambiarlo ");
        console.log(product);
        console.log(CART[j]);
        //var precio_new_art = parseInt(product.quantity) * parseInt(product.price_x_region[0].totalPrice);
        CART.push(product);
        PRODUCTS.push(product);
        //displayItemOperations(id_prod_alter, cantidad);

    }



    refreshDisplayProducts(product);

}

function deleteItemCart(position) {
    //console.log("Eliminar item en posicion " + position + " id: " + CART[position].id);
    $("#labelPrecioTotalProducto" + CART[position].id).text("");
    //console.log("Eliminamos el " + CART[position]);
    displayItemOperations(CART[position].id, 0, position); // Al pasarle un 0 en el campo cantidad, lo que hacemos es borrarlo
}

/**
 *   Vacia el carrito de la compra y esconde los indicadores de cantidad.
 */
function vaciaCarrito() {

    for (var i = CART.length - 1; i >= 0; i--) { // TEMP !!
        //if (CART[i].dedonde == "Asistente fiestas") {
        //console.log("Borramos el item " + CART[i].id);

        //CART.ammount = CART.ammount - (CART[i].price_x_region[0].totalPrice * CART[i].quantity)
        deleteItemCart(i);
    }

    CART = [];

    $("#spBtnAmountPerson").text('');
    $("#circuloCantidad").hide();
    $("#spBtnPopupCartAmmount").hide();
    $("#userIcoCarrito").hide();

    $("#btn_finalizarpedido").hide();

    $("#img_cesta").attr("src", "css/icons/cesta.png");
}

function closingPopUpWithVideos(tableName, popupNAme, vecIdsVideos) {
    //$("#masinfo").popup("close");
    $(popupNAme).popup("close");

    //console.group("closing videos %i", vecIdsVideos.length);

    for (i = 0; i < vecIdsVideos.length; i++) {
        //console.log("%i Closing video %s", i, vecIdsVideos[i]);

        $(vecIdsVideos[i]).hide();
        stopYoutubeVideo(vecIdsVideos[i]);
    }

    //console.groupEnd();

    $(tableName).show();
}

function stopYoutubeVideo(idOfIframe) {
    //First get the  iframe URL
    var url = $(idOfIframe).attr('src');

    //Then assign the src to null, this then stops the video been playing
    $(idOfIframe).attr('src', '');

    // Finally you reasign the URL back to your iframe, so when you hide and load it again you still have the link
    $(idOfIframe).attr('src', url);
}


function enviarSugerencia() {

    var sug_inci = $("select#suge_inci option").filter(":selected").val();
    if (sug_inci == undefined) {
        sug_inci = "incidencia";
    }
    var nombre = $("#nombre").val();
    var correo = $("#correo").val();
    var provincia = $("#provincia").val();
    var poblacion = $("#poblacion").val();
    var t_sugere = $("#tipo_sugenrencia").val();
    var telefono = $("#telf").val();
    var fecha_naci = $("#fecha_naci").val();
    var sugerencias = $("#sugerencias").val();

    console.log("Enviar sugenrencia. Nombre " + nombre + " Correo " + correo + " Provincia " + provincia + " poblacion " + poblacion + " telefono " + telefono + " fecha_naci " + fecha_naci + " sugerencia " + sugerencias);

    if (nombre != "") {

        if (correo != "") {

            if (provincia != "") {

                if (poblacion != "") {

                    if (telefono != "") {

                        if (fecha_naci != "") {

                            if (t_sugere != "") {

                                if (sugerencias != "") {

                                    console.log("Llegamos hasta el final");

                                    var info = {
                                        name: nombre,
                                        email: correo,
                                        province: provincia,
                                        city: poblacion,
                                        phone: telefono,
                                        birthday: fecha_naci,
                                        about_sugg: t_sugere,
                                        type_sugg: sug_inci,
                                        suggestion: sugerencias
                                    };

                                    sendSugerencias(info);

                                } else {

                                    $("#texto_popup").text("Escriba algo en el campo petición/sugerencia");
                                    $('#popupAlert').popup('open');
                                    //console.log("No has escrito la sugerencia1");

                                }

                            } else {

                                $("#texto_popup").text("Escriba una sugerencia o incidencia");
                                $('#popupAlert').popup('open');
                                //console.log("No has escrito la sugerencia2");

                            }



                        } else {

                            $("#texto_popup").text("Escriba un fecha de nacimiento");
                            $('#popupAlert').popup('open');
                            //console.log("No has escrito la fecha de nacimiento");

                        }


                    } else {

                        $("#texto_popup").text("Escriba un telefono");
                        $('#popupAlert').popup('open');
                        //console.log("No has escrito el telefono");

                    }



                } else {

                    $("#texto_popup").text("Escriba una poblacion");
                    $('#popupAlert').popup('open');
                    //console.log("No has escrito el poblacion");

                }


            } else {

                $("#texto_popup").text("Escriba una provincia");
                $('#popupAlert').popup('open');
                //console.log("No has escrito el provincia");

            }

        } else {

            $("#texto_popup").text("Escriba un correo electronico");
            $('#popupAlert').popup('open');
            //console.log("No has escrito el correo electronico");

        }

    } else {

        $("#texto_popup").text("Escriba el nombre");
        $('#popupAlert').popup('open');
        //console.log("No has escrito el nombre");


    }



}