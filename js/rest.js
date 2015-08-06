// request.abort(); // Esto aborta la conexión al webservice (Por si se necesitara)


/* Función que solicita la información al webservice de Nodos
    - idNode: id del nodo que se esta solicitando
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

            if (response.result == 1) {

                console.log("Respuesta del nodo");
                console.log(response);

                restOk(response, "nodes", idNode, nodeName);

            } else if (response.result == 0) {

                console.log("Respuesta del nodo cero");
                console.log(response);

                console.log("Pedimos los productos. Id " + idNode + " nombre " + nodeName);
                console.log(idNode);
                getProducts(idNode, nodeName);

            } else if (response.result == -1) {

                console.log("Error en el envio de parametros");

            }

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

    console.log("Cargamos nuevos nodos " + typ);
    //console.log("La respuesta es ");
    console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":

        displayNode(res, param, param2);
        break;

    default:

        console.log(res);
        break;

    }


}


function getProducts(idNode, nodeName) {

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        store: STORE,
        id: idNode
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getProducts.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);


            if (response.result == 1) {

                console.log(response);

                restOk_products(response, "nodes", idNode, nodeName);

            } else if (response.result == 0) {

                console.log("No hay productos para este nodo");

            } else if (response.result == -1) {

                console.log("Error en el envio de parametros");

            }

        },
        error: function (response) {
            restError(response, "nodes");
        },
    });
}

function restOk_products(res, typ, param, param2) {
    console.log("Todo bien desde " + typ);
    console.log("La respuesta es ");
    console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":

        displayProducts(res, param, param2);
        break;

    default:
        console.log(res);
        break;
    }


}

//Nos devuelve el listados de tiendas disponibles antes de cargar la ventana principal
function getTiendas() {

    console.log("Pedimos las tiendas");

    request = $.ajax({
        url: urlServices + 'getStores.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            restOk_tiendas(response, "tiendas");
        },
        error: function (response) {
            restError(response, "tiendas");
        },
    });
}


function restOk_tiendas(res, typ, param, param2) {

    console.log("Las tiendas nos han llegado, cargamos el select" + typ);
    //console.log("La respuesta es ");
    //console.log(res);

    var count = res.stores.length;
    var select = $('#select_tienda');

    for (var i = 0; i < count; i++) {

        var val = res.stores[i].id;
        var text = res.stores[i].name;

        //console.log("Val es " + val + " texto " + text);

        select.append($('<option>', {
            value: val,
            text: text
        }));

        select.selectmenu('refresh', true);

    }


    //var option1 = $($("option", select).get(1));
    //option1.attr('selected', 'selected');
    select.selectmenu();



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