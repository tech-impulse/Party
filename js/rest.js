// request.abort(); // Esto aborta la conexión al webservice (Por si se necesitara)

//WS de login en la app
function getLogin(usario, contraseña) {

    // Datos que se van a enviar
    var dataSend = {
        user: usario,
        password: contraseña
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'login.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            if (response.result == 1) {

                console.log("Todo ok");
                console.log(response);
                LOGGED = true;
                //console.log(response.info);
                INFO_USU = response.info;
                $('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');
                if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }
            } else if (response.result == 0) {

                console.log("No exite");
                $("#texto_popup").text("Usuario o contraseña incorrectos");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}


//WS para realizar el registro del usuario
function getRegistro(usario, contraseña, cod_pos) {

    // Datos que se van a enviar
    var dataSend = {
        user: usario,
        password: contraseña,
        codigo: cod_pos
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'signup.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            if (response.result == 1) {

                console.log(response);
                displayLogin();
                $("#usrnm").val(usario);


            } else if (response.result == -2) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("El usuario ya existe");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });

}

function getFlags() {

    console.log("Pedimos los idiomas");

    request = $.ajax({
        url: urlServices + 'getFlags.php',
        dataType: 'json',
        type: 'GET',
        //timeout: 10000, //10 seg
        success: function (response) {

            console.log("Los paises nos han llegado, cargamos el popup");
            //console.log("La respuesta es ");
            console.log(response);

            displayFlags(response);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}




/* Función que solicita la información al webservice de Nodos
    - idNode: id del nodo que se esta solicitando
    - nodeName: el nombre del nodo al que estamos accediento (Necesario para pintar en el botón de atrás el titulo);
    */
function getNodes(idNode, nodeName, isAlgo) {

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: idNode
    };

    if (isAlgo != undefined) {
        ISFIESTA = isAlgo;
        console.log("Is algo es " + isAlgo);
    }


    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodes.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            if (response.result == 1) {

                console.log("Respuesta del nodo");
                console.log(response);

                if (idNode == 0) {
                    node_cero = response;
                }

                restOk(response, "nodes", idNode, nodeName);


            } else if (response.result == 0) { // ya no tenemos mas nodos que mostrar, ahora se mostratan los productos

                console.log("Resultado del nodo es cero");
                console.log(response);

                console.log("Pedimos los productos. Id " + idNode + " nombre " + nodeName);
                //console("¿Estamos en el asistente de fiestas? " + ISFIESTA);

                if (ISFIESTA == 4) { // si estamos en algun asistente, ya sea de fistas o disfraces, hayq ue mostrar una pantalla intermadia

                    console.log("Asistentes de disfraces");
                    var info = getInfoNode(idNode);

                    if (info != "undefined") {
                        console.log("DisplayPantalla intermadia");
                        displayPantallaIntermediaAsistDisfra(info);
                    } else {
                        $("#texto_popup").text("Ocurrio un problema. Contacte con el administrador de la app");
                        $('#popupAlert').popup('open');
                    }

                } else if (ISFIESTA == 3) {

                    console.log("Asistentes de fiestas");
                    var info = getInfoNode(idNode);

                    //console.log(info);

                    if (info != "undefined") {
                        console.log("DisplayPantalla intermadia");
                        displayPantallaIntermediaAsistFiestas(info.node);
                    } else {
                        $("#texto_popup").text("Ocurrio un problema. Contacte con el administrador de la app");
                        $('#popupAlert').popup('open');
                    }

                } else {

                    console.log("Dame productos de " + nodeName);
                    getProducts(idNode, nodeName);

                }


            } else if (response.result == -1) {

                console.log("Error en el envio de parametros");

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
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
    //console.log(res);

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

function getInfoNode(idNode) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: idNode
    };

    var enviarInfo = [];

    request = $.ajax({
        data: dataSend,
        async: false,
        url: urlServices + 'getInfoNode.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            enviarInfo = response;
            //console.log(enviarInfo);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });

    return enviarInfo;


}

//WS que devuelve el listado de productos para un nodo
function getProducts(idNode, nodeName, info_aux) {

    if (info_aux != undefined) { //cuando estemos en el asist. de disfraces

        console.log("Venimos del asist. de disfraces");
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE,
            gender: info_aux.sexo,
            size: info_aux.talla,
            id: idNode
        };


    } else {

        console.log("No estamos en el asist. de fiestas");
        // Datos que se van a enviar
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE,
            id: idNode
        };

    }

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getProducts.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                //console.log(response);

                restOk_products(response, "nodes", idNode, nodeName);

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function restOk_products(res, typ, param, param2) {
    console.log("Todo bien desde " + typ);
    //console.log("La respuesta es ");
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
        url: urlServices + 'getShops.php',
        dataType: 'json',
        type: 'GET',
        //timeout: 10000, //10 seg
        success: function (response) {

            setTimeout(function () {
                restOk_tiendas(response, "tiendas");
            }, 500);

            $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
            $('#popupAlert').popup('open');

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                console.log(response);
                $("#texto_popup").text("Error..." + response.result);
                $('#popupAlert').popup('open');

            }
        },
    });
}


function restOk_tiendas(res, typ, param, param2) {

    console.log("Las tiendas nos han llegado, cargamos el select" + typ);
    //console.log("La respuesta es ");
    console.log(res);

    var count = res.stores.length;
    var select = $('#select_tienda');

    TIENDAS = res; //array con todas las tiendas

    for (var i = 0; i < 25; i++) {

        var val = res.stores[i].id;
        var text = res.stores[i].name;

        select.append($('<option>', {
            value: val,
            text: text
        }));

        select.selectmenu('refresh', true);

    }

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


function sendSugerencias(info) {

    request = $.ajax({
        data: info,
        url: urlServices + '.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                //console.log(response);
                getNodes(0);


            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendContra(usuario) {

    console.log("Funcion enviar contra");

    usuario = "alberto.alarcon@esadecreapolis.com";

    var dataSend = {
        user: usuario
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'email.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response.password);


            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado de sexo mas-feme
function getGender() {

    request = $.ajax({
        url: urlServices + 'getGender.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);

                var count = response.genders.length;
                var select = $('#select_sexo');

                select.append($('<option>', {
                    value: 0,
                    text: "¿Para quién es el disfraz?"
                }));

                for (var i = 0; i < count; i++) {

                    var val = response.genders[i].nombre;

                    //console.log("Val es " + val);

                    select.append($('<option>', {
                        value: val,
                        text: val
                    }));

                    select.selectmenu('refresh', true);

                }


                //var option1 = $($("option", select).get(1));
                //option1.attr('selected', 'selected');
                select.selectmenu();

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado de tallas      
function getSize(gender) {

    var dataSend = {
        sex: gender
    };

    console.log("EL gender es " + gender);

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getSize.php',
        dataType: 'json',
        type: 'POST',
        //timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response);

                $('#select_talla  option').remove();

                var count = response.sizes.length;
                var select = $('#select_talla');

                select.append($('<option>', {
                    value: 0,
                    text: "¿Que talla tiene?"
                }));


                for (var i = 0; i < count; i++) {

                    var val = response.sizes[i].nombre;

                    //console.log("Val es " + val);

                    select.append($('<option>', {
                        value: val,
                        text: val
                    }));

                    select.selectmenu('refresh', true);

                }


                //var option1 = $($("option", select).get(1));
                //option1.attr('selected', 'selected');
                select.selectmenu();

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No tenemos tallas...");
                $('#popupAlert').popup('open');
                console.log(response);

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');
                console.log(response);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado edades
function getAge() {

    request = $.ajax({
        url: urlServices + 'getAge.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);

                var count = response.age.length;
                var select = $('#select_edad');

                for (var i = 0; i < count; i++) {

                    if (i == 0) {

                        select.append($('<option>', {
                            value: 0,
                            text: "¿Que edad tiene?"
                        }));


                    } else {

                        var val = response.age[i].nombre;

                        console.log("Val es " + val);

                        select.append($('<option>', {
                            value: val,
                            text: val
                        }));

                        select.selectmenu('refresh', true);

                    }

                }

                select.selectmenu();

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}