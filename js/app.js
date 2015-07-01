var pages = ["catalog", "party", "costumes", "birthday", "theme", "count", "chart"];

var seccion = ["Catálogo", "Asistente de fiestas", "Asistente de disfraces", "Fiestas de cumpleaños", "Fiestas temáticas", "Numero de personas", "Carrito de la compra"];

var currentPage = '';
var pageBefore = '';

$(document).ready(function () {
    $("#btnCatalogo").bind("click", function (event, ui) {
        //$('#divContent').html( $(contenido).html() );
        $("body").pagecontainer("change", "#contenido");
        showPage("catalog", 0);
    });
    $("#btnFiesta").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#contenido");
        showPage("party", 0);
    });
    $("#btnDisfraz").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#contenido");
        showPage("costumes", 0);
    });
    $("#btnMenu").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#principal");
    });

    $("#btn1").bind("click", function (event, ui) {
        showPage("birthday", 1);
    });

    $("#btn2").bind("click", function (event, ui) {
        showPage("theme", 1);
    });

    $("#btnNext").bind("click", function (event, ui) {
        showPage("chart", 1);
        loadChart();
    });

    // BOTONES DEL MENU

    $("#btnMenuParty").bind("click", function (event, ui) {
        showPage("party", 0);
        openMenu();
    });

    $("#btnMenuCostumes").bind("click", function (event, ui) {
        showPage("costumes", 0);
        openMenu();
    });

    $("#btnMenuCatalog").bind("click", function (event, ui) {
        showPage("catalog", 0);
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
}

function showPage(page, status) {
    for (var i = 0; i < pages.length; i++) {
        if (pages[i] != page) {
            $("#page_" + pages[i]).hide();
        }
        if (pages[i] == page) {
            if (status = 0) {
                currentPage = page;
            } else {
                pageBefore = currentPage;
                currentPage = page;
            }
            $("#page_" + page).show();
            var contenido = ""; //$("#path").html();
            $("#path").html(contenido + "<div onclick='showPage(pageBefore)'> <span  class='flaticon-leftarrow' style='font-size:16px; margin-right:10px'></span>" + seccion[i] + "</div>");
            $("#path").trigger("create");
        }
    }
}

