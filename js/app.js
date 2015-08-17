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

    var htmlHeader_menu = '<img src="css/icons/barra.png" width="100%"> </div>';
    $("#divHeader_menu").html(htmlHeader_menu);
    $("#divHeader_menu").trigger('create');
    $("#divHeader_menu").show();
    $("#registro").hide();


    // Obtenermos el listado de tiendas
    getTiendas();

    //comprobamos si el checkbox de guardar session esta activado para mostrar el nombre en el link del login
    /*var checkBoxSession = document.getElementById("recordar_session").checked;
    //console.log(checkBoxSession);
    if (checkBoxSession == true) {
        var html_login = '<a id="cerrar_session" onclick="cerrar_session();" style="margin:10px">' +
            '<label id="ya_soy_cliente"><span>Ya soy Cliente!</span></label></a>';
        $("#session").html(html_login);
    } else {
        console.log("No hace falta hacer nada");
    }*/

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
                    SHOPDELIVERY = TIENDAS.stores[i].shopDelivery; //guardamos el id de la tienda
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

        console.log("Logeandose");
        var usuario = $('#usrnm').val();
        var contraseña = $('#pswd').val();

        if (usuario == "" || contraseña == "") {
            $("#texto_popup").text("Usuario o contraseña vacios...");
            $('#popupAlert').popup('open');
        } else {
            getlogin(usuario, contraseña);
        }

    });

    $("#enviar_registro").click(function () { // botton de registro a la app 

        console.log("Logeandose");
        var usuario = $('#emailsignup').val();
        var contraseña = $('#passwordsignup').val();
        var rep_contraseña = $('#passwordsignup_confirm').val();

        if (usuario == "" || contraseña == "" || rep_contraseña == "") {
            $("#texto_popup").text("Rellene todos los campos. Gracias");
            $('#popupAlert').popup('open');
        } else if (usuario != "" && contraseña == rep_contraseña) {
            getRegistro(usuario, contraseña);
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
        nodeIds.splice(position - 2, position);
        getNodes(idNode, nodeName);
    } else {
        getNodes(0);
        nodeIds = [];
        nodeNames = [];
        $("#divHeader_menu").show();
    }
}



function displayProductos(idNode, nodeName) { // botton de acceso a la app despus de escoger una tienda

    var val = $("#num_personas").val();
    console.log("Seleccion es " + val);

    if (val >= 1) {

        getProducts(idNode, nodeName);


    } else {

        $("#texto_popup").text("Añada alguna persona para poder continuar");
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

function carrito(id_producto, operacion,precio) {

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