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
    //getNodes(0);

    // Obtenermos el listado de tiendas
    getTiendas(); 
    
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
    }
}