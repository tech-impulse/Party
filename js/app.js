var nodeName = [];
var nodeId = [];

// CONFIGURACIÓN DE LA APLICACIÓN AL INICIARSE
$(document).bind("mobileinit", function () {

    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    $.ajaxSetup({
        timeout: 10000, //Time in milliseconds
        crossDomain: true
    });

});


$(document).ready(function () {
    nodeId.push(0);
    nodeName.push("Menú");
    getNodes(0);
});

function openMenu() {
    if ($("#lateralMenu").hasClass("ui-panel-open") == true) {
        $("#lateralMenu").panel("close");
    } else {
        $("#lateralMenu").panel("open");
    }
}

function principal() {
    $("body").pagecontainer("change", "#principal");
    nodeId = [];
    nodeName = [];
    nodeId.push("menu");
    nodeName.push("Menú");
}

function showPage(page, type) {
    if (type == "menu") {
        nodeId = [];
        nodeName = [];
        nodeId.push("menu");
        nodeName.push("Menú");
    }
    var position = (nodeName.length);
    for (var i = 0; i < pages.length; i++) {
        if (pages[i] != page) {
            $("#page_" + pages[i]).hide();
        }
        if (pages[i] == page) {
            if (nodeName[position - 2] == 0) {
                $("body").pagecontainer("change", "#principal");
            } else {
                if (type != "back") {
                    nodeId.push(page);
                    nodeName.push(seccion[i]);
                    $("#divBack").html("<div onclick='backPage()'> <span  class='flaticon-leftarrow' style='font-size:14px; margin-right:10px'></span>" + nodeName[position - 1] + "</div>");
                    $("#path").html(nodeName[position]);
                } else {
                    $("#divBack").html("<div onclick='backPage()'> <span  class='flaticon-leftarrow' style='font-size:14px; margin-right:10px'></span>" + nodeName[position - 2] + "</div>");
                    $("#path").html(nodeName[position - 1]);
                }
                $("#page_" + page).show();
                $("#divBack").trigger("create");
            }
        }
    }
}

function backPage() {
    var position = (nodeName.length);
    if (position > 2) {
        position = nodeName.length;
        nodeName.splice(position - 1, position);
        nodeId.splice(position - 1, position);
        showPage(nodeId[position - 2], "back");
    } else {
        principal();
    }
}