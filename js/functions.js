/*************************************************************
  Esta funcion muestra la pantalla de pago cuando se clica en 
  el boton de checkout
**************************************************************/
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

/*********************************************************************
  Esta funcion sirve para actualizar el boton de atras de la pantalla
  Parametros:
  originNode: el node de donde venimos
  originName: nombre del nodo del que venimos
  Variables:
  nodeIds:lista de nodos por los que hemos pasado
  nodeNames: lista de los nombres de los nodos por los que hemos pasado
*********************************************************************/
function updateBackButton(originNode, originName) {
    if (nodeIds.length == 0) {
        nodeIds.push(0);
        nodeNames.push(jsonIdiomas.header.menu);
        nodeIds.push(originNode);
        nodeNames.push(originName);
    } else {
        nodeIds.push(originNode);
        nodeNames.push(originName);
    }
    $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:10px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 2] + '</div>');
}


/******************************************
 Esta funcion enseña el pop up de idiomas
******************************************/
function changeIdiomPopUp() {

    console.log("PopUp idiomas");

    setTimeout(function () {
        $("#popupIdiomas").popup("open");
    }, popupTimeout);

}

/* No se utiliza
function timerIncrement() {

    console.log("Estas incativo " + idleTime);
    getNodes(0);

}*/

/**************************************************************************
  Esta funcion se utiliza para cambiar el idioma de la app
  Parametros:
  idioma:el nuevo idioma que queremos ( es el nombre corto, ej: es de españa)
  idiomaId: el id del idioma nuevo
**************************************************************************/
function changeIdiom(idioma, idiomaId) {

    console.log("Cambiamos el idioma " + idioma);

    idiomStore = idioma;
    language = idiomaId;

    if (CART.length > 0) {
        getTraduccion(idioma);
    }

    translateButtons(idiomStore);

}

/************************************************************************************************
  Esta funcion se utiliza en la pantalla intermedia antes de entrar al asist. fiesta o disfraces
  para añadir o quitar personas del input
  Parametros:  
  oparation:sumar o restar personas
*************************************************************************************************/
function addPeople(oparation) {

    var valor = $("#personas_fiesta").val();
    console.log("Valor de personas es " + valor);

    if (valor == "") valor = 0;

    if (oparation == 0 && valor > 2) { //para que el minimo de personsa sea 2
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

/**************************************************************************
  Esta funcion para la app durante el tiempo que le digamos en milisegundos
***************************************************************************/
function sleep(millisegundos) {
    var inicio = new Date().getTime();
    while ((new Date().getTime() - inicio) < millisegundos) {}
}



