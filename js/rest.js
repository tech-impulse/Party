// request.abort(); // Esto aborta la conexión al webservice (Por si se necesitara)


/* Función que solicita la información al webservice de Nodos
    - idNode: id del nodo que se est´ña solicitando
    - nodeName: el nombre del nodo al que estamos accediento (Necesario para pintar en el botón de atrás el titulo);
    */
function getNodes(idNode, nodeName) {

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: idNode
    };
    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodes.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            restOk(response, "nodes", idNode, nodeName);
        },
        error: function (response) {
            restError(response, "nodes");
        },
    });
}

/* Función que controla que la petición Ajax ha ido bien
    - res: Respuesta del webservice
    - typ: tipo de solicitud del webservice
    - param: parametro extra que queramos pasar
    - param2: idem
    */
function restOk(res, typ, param, param2) {
    console.log("Todo bien desde " + typ);
    console.log("La respuesta es ");
    console.log(res);

    switch (typ) {
    case "lang":
        {
            displayFlags(res);
            break;
        };
    case "nodes":
        {
            displayNode(res, param, param2);
            break;
        };
    default:
        console.log(res);
        break;
    }


}

/* Función que controla que la petición Ajax ha ido mal
    - res: Respuesta del webservice
    - typ: tipo de solicitud del webservice
    */
function restError(res, typ) {
    console.log("fallo de ws, tipo " + typ);
    console.log(res);
    /*
    switch (tipo) {
    case "comprarCreditos":
        {
            notificacion("Compruebe su conexión");
            //abrirPopupAviso("Compruebe su conexión");
            $('#submitPaypal').prop('disabled', false);
            break;
        };
    default:
        notificacion("Intentelo de nuevo");
        break;
    }
    */
}