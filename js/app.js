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

        if (usuario == "" || contraseña == "" || rep_contraseña == "" ) {
            $("#texto_popup").text("Rellene todos los campos. Gracias");
            $('#popupAlert').popup('open');
        } else if( usuario != "" && contraseña == rep_contraseña ){
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

