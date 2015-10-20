function checkOut() {

    if (LOGGED == true) {
        if (CART.length > 0) {
            console.log("Actualizar div");
            $('.ui-popup').popup('close');

            if (SHOPDELIVERY == 0) {
                var html = '<div>' +
                    '<center>' +
                    '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                    '<br>' +
                    '<a style="width:300px" onclick="displaySummary(\'list\');" data-role="button" data-icon="bullets" data-iconpos="right" data-theme="b" onclick="">Mostrar listado para recoger</a>' +
                    '<br>' +
                    '<a style="width:300px" onclick="displaySummary(\'home\');" data-role="button" data-icon="home" data-iconpos="right" data-theme="b" onclick="">Enviar a Casa</a>' +
                    '</center>' +
                    '</div>';
                $("#divContent").html(html);
                $("#divContent").trigger('create');
                var n = nodeIds.length + 1;
                updateBackButton(nodeIds[n], nodeNames[n]);

            } else {
                var html = '<div>' +
                    '<center>' +
                    '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                    '<br>' +
                    '<a style="width:300px" onclick="displaySummary(\'list\');" data-role="button" data-icon="bullets" data-iconpos="right" data-theme="b" onclick="">Mostrar listado para recoger</a>' +
                    '<br>' +
                    '<a style="width:300px" onclick="displaySummary(\'home\');" data-role="button" data-icon="home" data-iconpos="right" data-theme="b" onclick="">Enviar a Casa</a>' +
                    '<br>' +
                    '<a style="width:300px" onclick="displaySummary(\'store\');" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b" onclick="">Recoger en Mi Tienda</a>' +
                    '</center>' +
                    '</div>';
                $("#divContent").html(html);
                $("#divContent").trigger('create');
                var n = nodeIds.length + 1;
                updateBackButton(nodeIds[n], nodeNames[n]);
            }
        } else {
            alert("No hay productos");
        }
    } else {
        $('.ui-popup').popup('close');
        setTimeout(function () {
            REDIRECT = true;
            $("#popupLogin").popup("open");
        }, popupTimeout);
        console.log("No estás logado");
    }
}

function updateBackButton(originNode, originName) {
    if (nodeIds.length == 0) {
        nodeIds.push(0);
        nodeNames.push("Menú");
        nodeIds.push(originNode);
        nodeNames.push(originName);
    } else {
        nodeIds.push(originNode);
        nodeNames.push(originName);
    }
    $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:10px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 2] + '</div>');
}


function changeIdiomPopUp() {

    console.log("PopUp idiomas");

    setTimeout(function () {
        $("#popupIdiomas").popup("open");
    }, popupTimeout);

}


function timerIncrement() {

    console.log("Estas incativo " + idleTime);
    getNodes(0);

}

function changeIdiom(idioma) {

    console.log("Cambiamos el idioma " + idioma);

    idiomStore = idioma;

    getTraduccion(idioma);


}

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}

function addPeople(oparation) {

    var valor = $("#personas_fiesta").val();
    console.log("Valor de personas es " + valor);

    if (valor == "") valor = 0;

    if (oparation == 0 && valor > 1) {
        if (valor != 0 || valor != "") {
            valor = parseInt(valor) - 1;
            $("#personas_fiesta").val(valor);
            console.log("Sumamos " + valor);
        } else {
            console.log("No hacemos nada ya que es cero");
        }
    } else if (oparation == 1) {
        valor = parseInt(valor) + 1;
        console.log("Sumamos " + valor);
        $("#personas_fiesta").val(valor);
    }



}


function sleep2(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function sleep(millisegundos) {
    var inicio = new Date().getTime();
    while ((new Date().getTime() - inicio) < millisegundos) {}
}