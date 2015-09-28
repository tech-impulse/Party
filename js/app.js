// CONFIGURACIÓN DE LA APLICACIÓN AL INICIARSE
$(document).bind("mobileinit", function () {

    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    // Configuración de Ajax
    $.ajaxSetup({
        timeout: 10000, //Time in milliseconds
        crossDomain: true
    });

});

// PRECARGA DE LA APLICACIÓN

$(document).ready(function () {

    /*
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 5000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });

    $(this).keypress(function (e) {
        idleTime = 0;
    });*/

    $(window).on("touchstart", function (ev) {
        var e = ev.originalEvent;
        console.log(" screen activa? " + idleTimeActive); //"Touchend" + e.touches + 

        if (idleTimeActive == true) {
            idleTimeActive = false;

            $('#contentPopupScreenSaver').fadeIn();
            $('#contentPopupScreenSaver').hide();

            setTimeout(function () {
                $('#principal').show();
            }, 100);
        }

        setTimeout(function () {
            displayScreenSaver();
        }, idleTime);

    });

    var htmlHeader_menu = '<div id="barra_sup" style="position:relative">' +
        '<img src="css/icons/barra.png" width="100%" style="height: 38px;"><div id="banderas" style="position:absolute; top:0px;right: 0px;margin-top: 3px;">' +
        '<a onclick="changeIdiom();"><img src="css/banderas/spain.png"  style="width: 30px;margin-right: 5px;height: 20px;margin-top: 5px;"></a>' +
        '</div>';
    $("#divHeader_menu").html(htmlHeader_menu);
    $("#divHeader_menu").trigger('create');
    $("#divHeader_menu").show();
    $("#registro").hide();


    // Obtenermos el listado de tiendas y banderas


    setTimeout(function () {
        getFlags();
    }, 1000);

    setTimeout(function () {
        getTiendas();
    }, 1000);


    //comprobamos si el checkbox de guardar session esta activado para mostrar el nombre en el link del login
    //var checkBoxSession = document.getElementById("recordar_session").checked;
    //console.log(checkBoxSession);
    //if (checkBoxSession == true) {
    // var html_login = '<a id="cerrar_session" onclick="cerrar_session();" style="margin:10px">' +
    //    '<label id="ya_soy_cliente"><span>Ya soy Cliente!</span></label></a>';
    // $("#session").html(html_login);
    //} else {
    //  console.log("No hace falta hacer nada");
    //}

    $("#btn_acceder").click(function () { // botton de acceso a la app 

        var seleccion = $("select#select_tienda option").filter(":selected").val();
        console.log("Seleccion es " + seleccion);

        if (seleccion != undefined) {

            $("#divTienda").hide();
            $("#divContent").show();

            STORE = seleccion;

            var countTiendas = TIENDAS.stores.length;

            for (var i = 0; i < countTiendas; i++) {

                if (TIENDAS.stores[i].id == STORE) {
                    SHOPDELIVERY = TIENDAS.stores[i].deliveryStore; //guardamos el id de la tienda
                    idiomStore = TIENDAS.stores[i].language;
                    TIENDAS = "";
                    break;
                }

            }

            console.log("Item seleccionado " + STORE + " y tiene entraga en tienda? " + SHOPDELIVERY);
            $("#logo_inicio").hide();
            getNodes(0);

        } else {

            alert("¿Seleccione una tienda!");

        }

    });

    $("#iniciar_session").click(function () { // botton de login de la app

        console.log("Logandose");
        var usuario = $('#usrnm').val();
        var contraseña = $('#pswd').val();

        if (usuario == "" || contraseña == "") {
            $("#texto_popup").text("Usuario o contraseña vacios...");
            $('#popupAlert').popup('open');
        } else {
            getLogin(usuario, contraseña);
        }

    });

    $("#enviar_registro").click(function () { // botton de registro a la app 

        console.log("registrandose");
        var usuario = $('#emailsignup').val();
        var contraseña = $('#passwordsignup').val();
        var rep_contraseña = $('#passwordsignup_confirm').val();
        var cod_pos = $('#cod_pos').val();

        if (usuario == "" || contraseña == "" || rep_contraseña == "" || cod_pos == "") {
            $("#texto_popup").text("Rellene todos los campos. Gracias");
            $('#popupAlert').popup('open');
        } else if (usuario != "" && contraseña == rep_contraseña && cod_pos != "") {
            getRegistro(usuario, contraseña, cod_pos);
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

        console.log("Cambio passwrod");
        var usuarioCambio = $('#usuarioCambio').val();

        console.log("Email " + usuarioCambio);

        if (usuarioCambio != "") {
            console.log("Procedemos...")
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
function backPage(idNode, nodeName) {
    var position = (nodeIds.length);
    if (position > 2) {
        position = nodeIds.length;
        nodeIds.splice(position - 2, position);
        nodeNames.splice(position - 2, position);
        getNodes(idNode, nodeName);
    } else {
        getNodes(0);
        nodeIds = [];
        nodeNames = [];
        $("#divHeader_menu").show();
    }
}



function displayProductos(idNode, nodeName) { // botton de acceso a la app despus de escoger una tienda

    var sexo = $("select#select_sexo option").filter(":selected").val();
    //var edad = $("select#select_edad option").filter(":selected").val();
    var talla = $("select#select_talla option").filter(":selected").val();

    var info_aux = {
        sexo: sexo,
        talla: talla
    };

    if (sexo != 0 && talla != 0 && ISFIESTA == 4) {

        console.log("Todos los selects ok");
        getProducts(idNode, nodeName, info_aux);


    } else if (ISFIESTA == 3) {

        var num_persosnas = $('#personas_fiesta').val();

        if (num_persosnas > 0) {

            console.log("Todos los selects ok. ASIS. FIESTAS");
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


/**
 * Da formato a un número para su visualización
 *
 * @param {(number|string)} numero Número que se mostrará
 * @param {number} [decimales=null] Nº de decimales (por defecto, auto); admite valores negativos
 * @param {string} [separadorDecimal=","] Separador decimal
 * @param {string} [separadorMiles=""] Separador de miles
 * @param {string} [simbolo=""] simbolo de la moneda
 * @returns {string} Número formateado o cadena vacía si no es un número
 *
 * @version 2014-07-18
 */
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


/************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  Parametros : 
  producto: info del producto a guardar
  operacion: si es añadir o restar articulos  1 sera sumar  0 restar
**************************************************************************************/

function carrito(id_producto, operacion, precio) {

    console.log("Longitud del array " + CARRITO.length);
    console.log(id_producto);
    console.log(CARRITO);

    if (CARRITO.length == 0) {

        displayMasMenos(0, id_producto);
        displayQantidadProducto(1, id_producto);
        var aux = [];

        aux['id_producto'] = id_producto;
        aux['cantidad'] = 1;
        aux['precio'] = precio;
        CARRITO.push(aux);

        console.log(CARRITO);

    } else {

        if (operacion == 1) { //sumamos

            var encontrado = 0;
            var count = "";
            for (var i = 0; i < CARRITO.length; i++) {
                count++;
                if (id_producto == CARRITO[i].id_producto) {

                    CARRITO[i].cantidad = CARRITO[i].cantidad + 1;
                    encontrado = 1;
                    displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                    break;

                }

            }

            if (encontrado == 0) { //no existe ese articulo en nuestro array aun, lo añadimos
                var aux = [];

                aux['id_producto'] = id_producto;
                aux['cantidad'] = 1;
                aux['precio'] = precio;
                CARRITO.push(aux);
                displayMasMenos(0, id_producto);
                displayQantidadProducto(1, id_producto);

            }

        } else if (operacion == 0) { //restamos

            var count = "";
            if (CARRITO.length > 0) {

                for (var i = 0; i < CARRITO.length; i++) {

                    count++;
                    if (id_producto == CARRITO[i].id_producto) {

                        CARRITO[i].cantidad = CARRITO[i].cantidad - 1;
                        encontrado = 1;
                        displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                        if (CARRITO[i].cantidad == 0) {
                            CARRITO.splice(i, 1);
                            console.log(CARRITO);
                        }
                        break;

                    }

                }


            }


        }

    }

}

function addToCart(item, param) {
    var product;
    var foundInCart = 0;
    for (var i = 0; i < PRODUCTS.length; i++) {
        console.log("buscando  " + item + " en la lista total de productos" + PRODUCTS[i]['sku']);
        if (PRODUCTS[i]['sku'] == item) {
            console.log("ENCONTRADO EN LISTA DE PRODUCTOS " + PRODUCTS[i]['sku'] + " es igual a " + item);
            product = PRODUCTS[i];
            i = PRODUCTS.length;
        }
    }

    for (var j = 0; j < CART.length; j++) {
        console.log("buscando  " + item + " en carrito " + CART[j]['sku']);
        if (CART[j]['sku'] == item) {
            console.log("ENCONTRADO EN CARRITO " + CART[j]['sku'] + " es igual a " + item);
            foundInCart = 1;
            CART[j].quantity = CART[j].quantity + param;
            CART.ammount = parseFloat((product.price_x_region.totalPrice * param)) + parseFloat(CART.ammount);
            displayItemOperations(item, parseInt(CART[j].quantity), j);
            j = PRODUCTS.length;
        }
    }
    if (foundInCart == 0) {
        if (CART.ammount == undefined) {
            console.log("EL carrito está vació, lo inicializamos");
            CART.ammount = 0;
        }
        console.log("Producto no esta en carrito, lo añadimos");
        CART.ammount = parseFloat(product.price_x_region.totalPrice) + parseFloat(CART.ammount);
        product.quantity = 1;
        CART.push(product);
        displayItemOperations(item, product.quantity);
    }
}

function deleteItemCart(position) {
    console.log("Eliminar item en posicion " + position + " SKU: " + CART[position].sku);
    displayItemOperations(CART[position].sku, 0, position); // Al pasarle un 0 en el campo cantidad, lo que hacemos es borrarlo
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
    var nombre = $("#nombre").val();
    var correo = $("#correo").val();
    var provincia = $("#provincia").val();
    var poblacion = $("#poblacion").val();
    var t_sugere = $("#tipo_sugenrencia").val();
    var telefono = $("#telf").val();
    var fecha_naci = $("#fecha_naci").val();
    var sugerencias = $("#sugerencias").val();

    console.log("Enviar sugenrencia. Nombre " + nombre + " Correo " + correo + " Provincia " + correo + " poblacion " + poblacion + " telefono " + telefono + " fecha_naci " + fecha_naci + " sugerencia " + sugerencias);

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
                                        nombre: nombre,
                                        correo: correo,
                                        provincia: provincia,
                                        poblacion: poblacion,
                                        telefono: telefono,
                                        fecha_naci: fecha_naci,
                                        suge_inci: sug_inci,
                                        sugerencia_tipo: t_sugere,
                                        sugerencia: sugerencia
                                    };

                                    sendSugerencias(info);

                                } else {

                                    $("#texto_popup").text("Escriba algo en el campo petición/sugerencia");
                                    $('#popupAlert').popup('open');
                                    console.log("No has escrito la sugerencia1");

                                }

                            } else {

                                $("#texto_popup").text("Escriba una sugerencia o incidencia");
                                $('#popupAlert').popup('open');
                                console.log("No has escrito la sugerencia2");

                            }



                        } else {

                            $("#texto_popup").text("Escriba un fecha de nacimiento");
                            $('#popupAlert').popup('open');
                            console.log("No has escrito la fecha de nacimiento");

                        }


                    } else {

                        $("#texto_popup").text("Escriba un telefono");
                        $('#popupAlert').popup('open');
                        console.log("No has escrito el telefono");

                    }



                } else {

                    $("#texto_popup").text("Escriba una poblacion");
                    $('#popupAlert').popup('open');
                    console.log("No has escrito el poblacion");

                }


            } else {

                $("#texto_popup").text("Escriba una provincia");
                $('#popupAlert').popup('open');
                console.log("No has escrito el provincia");

            }

        } else {

            $("#texto_popup").text("Escriba un correo electronico");
            $('#popupAlert').popup('open');
            console.log("No has escrito el correo electronico");

        }

    } else {

        $("#texto_popup").text("Escriba el nombre");
        $('#popupAlert').popup('open');
        console.log("No has escrito el nombre");


    }



}