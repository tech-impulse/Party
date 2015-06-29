$(document).ready(function () {
    $("#btnCatalogo").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#catalogo");
    });
    $("#btnFiesta").bind("click", function (event, ui) {
    $("body").pagecontainer("change", "#fiesta");
    });
    $("#btnDisfraz").bind("click", function (event, ui) {
        $("body").pagecontainer("change", "#disfraz");
    });
});

//