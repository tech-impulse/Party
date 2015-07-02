var pages = ["catalog", "party", "costumes", "birthday", "theme", "count", "chart"];

var seccion = ["Catálogo", "Asistente de fiestas", "Asistente de disfraces", "Fiestas de cumpleaños", "Fiestas temáticas", "Numero de personas", "Carrito de la compra"];

var historySection = [];
var IdhistorySection = [];



$(document).ready(function () {
    IdhistorySection.push("menu");
    historySection.push("Menú");
    $("#btnCatalogo").bind("click", function (event, ui) {
        //$('#divContent').html( $(contenido).html() );
        $("body").pagecontainer("change", "#contenido");
        showPage("catalog");
    });
    $("#btnFiesta").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#contenido");
        showPage("party");
    });
    $("#btnDisfraz").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#contenido");
        showPage("costumes");
    });
    $("#btnMenu").bind("click", function (event, ui) {
        principal();
    });

    $("#btn1").bind("click", function (event, ui) {
        showPage("birthday");
    });

    $("#btn2").bind("click", function (event, ui) {
        showPage("theme");
    });

    $("#btnNext").bind("click", function (event, ui) {
        showPage("chart");
        // loadChart();
    });

    // BOTONES DEL MENU

    $("#btnMenuParty").bind("click", function (event, ui) {
        showPage("party", "menu");
        openMenu();
    });

    $("#btnMenuCostumes").bind("click", function (event, ui) {
        showPage("costumes", "menu");
        openMenu();
    });

    $("#btnMenuCatalog").bind("click", function (event, ui) {
        showPage("catalog", "menu");
        openMenu();
    });

});

function openMenu() {
    if ($("#menuLateral").hasClass("ui-panel-open") == true) {
        $("#menuLateral").panel("close");
    } else {
        $("#menuLateral").panel("open");
    }
}

function principal() {
    $("body").pagecontainer("change", "#principal");
    IdhistorySection = [];
    historySection = [];
    IdhistorySection.push("menu");
    historySection.push("Menú");
}

function showPage(page, type) {
    if (type == "menu") {
        IdhistorySection = [];
        historySection = [];
        IdhistorySection.push("menu");
        historySection.push("Menú");
    }
    var position = (historySection.length);
    for (var i = 0; i < pages.length; i++) {
        if (pages[i] != page) {
            $("#page_" + pages[i]).hide();
        }
        if (pages[i] == page) {
            if (historySection[position - 2] == "menu") {
                $("body").pagecontainer("change", "#principal");
            } else {
                if (type != "back") {
                    IdhistorySection.push(page);
                    historySection.push(seccion[i]);
                    $("#divBack").html("<div onclick='backPage()'> <span  class='flaticon-leftarrow' style='font-size:14px; margin-right:10px'></span>" + historySection[position - 1] + "</div>");
                    $("#path").html(historySection[position]);
                } else {
                    $("#divBack").html("<div onclick='backPage()'> <span  class='flaticon-leftarrow' style='font-size:14px; margin-right:10px'></span>" + historySection[position-2] + "</div>");
                    $("#path").html(historySection[position-1]);
                }
                $("#page_" + page).show();
                $("#divBack").trigger("create");
            }
        }
    }
}

function backPage() {
    var position = (historySection.length);
    if (position > 2) {
        position = historySection.length;
        historySection.splice(position - 1, position);
        IdhistorySection.splice(position - 1, position);
        showPage(IdhistorySection[position - 2], "back");
    } else {
        principal();
    }
}