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

    htmlHeader_menu = '<img src="css/icons/barra.png" width="100%"> </div>';
    $("#divHeader_menu").html(htmlHeader_menu);
    $("#divHeader_menu").trigger('create');
    $("#divHeader_menu").show();

    // Obtenermos el listado de tiendas
    getTiendas();

    $("#btn_acceder").click(function () { // botton de acceso a la app despus de escoger una tienda

        var seleccion = $("select#select_tienda option").filter(":selected").val();
        console.log("Seleccion es " + seleccion);

        if (seleccion != undefined) {

            $("#divTienda").hide();
            $("#divContent").show();

            STORE = seleccion;

            var countTiendas = TIENDAS.stores.length;

            for (var i = 0; i < countTiendas; i++) {

                if (TIENDAS.stores[i].id == STORE) {
                    SHOPDELIVERY = TIENDAS.stores[i].shopDelivery;
                    break;
                    TIENDAS = "";
                }

            }

            console.log("Item seleccionado " + STORE + " y tiene entraga en tienda? " + SHOPDELIVERY);

            getNodes(0);

        } else {

            alert("¿Seleccione una tienda!");

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