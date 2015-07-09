// request.abort(); // Esto aborta la conexión al webservice

function getLanguages(node) {

    request = $.ajax({
        url: urlServices + 'ws.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "lang");
        },
        error: function (response) {
            restError(response, "lang");
        },
    });
}

function getNodes(node) {

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: node
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodes.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            restOk(response, "nodes", node);
        },
        error: function (response) {
            restError(response, "nodes");
        },
    });
}

function restOk(res, typ, param) {
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
            displayNode(res, param);
            break;
        };
    default:
        console.log(res);
        break;
    }


}

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