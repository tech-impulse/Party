// request.abort(); // Esto aborta la conexión al webservice (Por si se necesitara)

//WS de login en la app
function getLogin(usario, contraseña) {

    // Datos que se van a enviar
    var dataSend = {
        user: usario,
        password: contraseña

    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'login.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
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

                $("#texto_popup").text("Error login...");
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

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'signup.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
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

                $("#texto_popup").text("Error registro...");
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


    var request = $.ajax({
        url: urlServices + 'getFlags.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
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
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}

/* Función que solicita la información al webservice de Nodos
    - idNode: id del nodo que se esta solicitando
    - nodeName: el nombre del nodo al que estamos accediento (Necesario para pintar en el botón de atrás el titulo);
    -isAlgo: variable para saber si es el asis de fiestas o disfraces
    */
function getNodes(idNode, nodeName, isAlgo, aux, backPage) {

    console.log('-> getNodes | pantalla actual: ' + pantallaActual + ' AUX: ' + AUX + ' CANRT length ' + CART.length);

    //$("#spBtnAmountPerson").text(''); // TEMP !!
    $("#userIcoCarrito").hide(); // TEMP !!

    /*if (pantallaActual == "Asistente fiestas" && AUX == 1 && CART.length > 0) {

        setTimeout(function () {
            $("#popupPregunta").popup("open");
        }, popupTimeout);

        AUX = 0;

    }*/

    console.log('-> Llamamos a guardarInfo'); // TEMP !!


    //guardarInfo('si');  // TEMP !!

    console.log('-> miramos carrito'); // TEMP !!

    if (CART.length < 1) { // TEMP !!!
        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");
    } else {

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

    if (idNode != 0) {
        $("#banderas").hide();
    }

    PAGINA = 0; //se reinicia la pagina del catalogo

    if (aux == 1) {
        nodeIds = [];
        nodeNames = [];
        nodeImg = [];
        openMenu();
    }

    //language = 1;
    // Datos que se van a enviar
    var dataSend = {
        lang: parseInt(language),
        origin: origin,
        id: idNode,
        store: STORE.id
    };

    //console.log("Info enviar ws");
    //console.log(dataSend);

    if (isAlgo != undefined && isAlgo > 0) { //estamos en el asistente de disfraces o fiestas?????
        ISFIESTA = isAlgo;
    }

    //console.log("Is algo es " + isAlgo);

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodes.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                //console.log("Respuesta del nodo");
                //console.log(response);

                if (idNode == 0) {
                    node_cero = response;
                    $("#banderas").show();
                    pantallaActual = "menu principal";
                }

                //pantallaActual = "nodos";
                //console.log("Tenemos nuevos nodos");
                restOk(response, "nodes", idNode, nodeName, aux, backPage);

            } else if (response.result == 0) { //ya no tenemos mas nodos que mostrar, ahora se mostratan los productos

                //console.log("Resultado del nodo es cero");
                //console.log(response);

                //console.log("Pedimos los productos. Id " + idNode + " nombre " + nodeName);
                //console("¿Estamos en el asistente de fiestas? " + ISFIESTA);

                if (ISFIESTA == 4) { // si estamos en algun asistente, ya sea de fistas o disfraces, hay que mostrar una pantalla intermadia

                    updateBackButton(idNode, nodeName, aux);

                    console.log("Asistentes de disfraces");
                    var info = getInfoNode(idNode);

                    if (info != "undefined") {
                        //console.log("DisplayPantalla intermadia");
                        pantallaActual = "Asistente disfraces";
                        $("#divHeader_catalogo").show();
                        $("#divHeader_menuInicial").hide(); // TEMP !!
                        displayPantallaIntermediaAsistDisfra(info);
                    } else {
                        $("#texto_popup").text("Ocurrio un problema. Contacte con el administrador de la app");
                        $('#popupAlert').popup('open');
                    }

                } else if (ISFIESTA == 3) { //3 asist. fiestas

                    console.log("Asistentes de fiestas. Pedimos info del nodo");
                    var info = getInfoNode(idNode);

                    //console.log("Enviar info es 4");
                    //console.log(info);
                    pantallaActual = "Asistente fiestas";

                    if (CART.length > 0 && num_personas_fiesta > 0) {
                        var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

                        //$("#spBtnAmountPerson").text(precio_persona + " x"); //TEMP
                        //$("#spBtnAmountPerson").show(); //TEMP
                        $("#userIcoCarrito").show();

                        //$("#btn_finalizarpedido").show();
                    }

                    if (info != undefined) {

                        console.log("DisplayPantalla intermadia");
                        console.log(info);
                        //pantallaActual = "Asistente fiestas";
                        updateBackButton(idNode, nodeName, aux);

                        displayPantallaIntermediaAsistFiestas(info.node);

                    } else {

                        console.log("Dame productos del catalogo" + nodeName);
                        updateBackButton(idNode, nodeName, aux);
                        getProducts(idNode, nodeName);

                    }

                } else if (ISFIESTA == 1) { //1 catalogo

                    $('#popupCargando').popup('open');

                    getNodesProducts(idNode, nodeName);

                } else {

                    console.log("Error nodes en getNodes...");

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
function restOk(res, typ, param, param2, aux, backPage) {

    //console.log("Cargamos nuevos nodos " + typ);
    //console.log("La respuesta es ");
    //console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":
        //console.log("El aux " + aux);
        displayNode(res, param, param2, aux, backPage);
        break;

    default:

        console.log(res);
        break;

    }


}

function getAlternativeProducts(idnode, idproduct, cantidad) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        product: idproduct,
        store: STORE.id,
        id: idnode
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getAlternativeProducts.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Datos alternativos");
            console.log(response);

            PRODUCTS_ALTER = response.alternativeProducts;

            displayAlternativeProducts(idnode, idproduct, cantidad);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });

}

function getNodesProducts(idNode, nodeName) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: parseInt(language),
        origin: origin,
        id: idNode,
        store: STORE.id
            //page: parseInt(PAGINA)
    };

    console.log("Post catalogo");
    console.log(dataSend);

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodeProducts.php',
        dataType: 'json',
        type: 'POST',
        timeout: 60000, //10 seg
        success: function (response) {

            console.log("Respueta");
            console.log(response);

            if (response.result == 1) { //todo bien cargamos productos

                pantallaActual = "catalogo";
                if (PAGINA == 0) {
                    displayProducts(response, idNode, nodeName);
                } else {
                    añadirMasProductos(response, idNode, nodeName);
                }


            } else {

                setTimeout(function () {
                    $('#popupCargando').popup('close');
                }, 500);

                $("#texto_popup").text("Esta categoría no tiene artículos");
                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 750);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("La red esta satura vuelva a intentarlo");
                $('#popupAlert').popup('open');

                setTimeout(function () {
                    $("#popupAlert").popup("open");
                }, 500);

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("La red esta satura vuelva a intentarlo");
                $('#popupAlert').popup('open');

                setTimeout(function () {
                    $("#popupAlert").popup("open");
                }, 500);

            }
        },
    });


}

function getInfoNode(idNode) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: idNode
    };

    var enviarInfo = new Array();

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getInfoNode.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 1000, //10 seg
        success: function (response) {

            enviarInfo = response;

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
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

    $("#popupCargando").popup("open");

    if (info_aux != undefined) { // asist. de disfraces

        console.log("Venimos del asist. de disfraces");
        pantallaActual = "Asistente disfraces";
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE.id,
            //gender: info_aux.sexo,// no se utiliza filtramos nosotros
            //size: info_aux.talla,// no se utiliza filtramos nosotros
            id: idNode
        };


    } else {

        console.log("Estamos en el asist. de fiestas");
        //pantallaActual = "Asistente fiestas";
        // Datos que se van a enviar
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE.id,
            id: idNode
        };
        console.log("Datos para enviar");
        console.log(dataSend);

    }

    //console.log("Enviamos el ajax");

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getProducts.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 25000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);
                restOk_products(response, "nodes", idNode, nodeName, info_aux);

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error... Resultado -1");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function getCostumesAge(info_aux) {

    $("#popupCargando").popup("open");

    console.log("Venimos del asist. de disfraces");
    pantallaActual = "Asistente disfraces";
    var dataSend = {
        id: 4,
        lang: language,
        origin: origin,
        store: STORE.id,
        gender: info_aux.sexo,
        size: info_aux.talla
    };

    console.log("Enviamos el ajax");
    console.log(dataSend);

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getCostumesAge.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 25000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);
                restOk_products(response, "nodes", 4, "Hola", info_aux);

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error... Resultado -1");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function getProductsClassified(idNode, nodeName, info_aux) {

    $("#popupCargando").popup("open");

    console.log("Estamos en el asist. de fiestas");
    //pantallaActual = "Asistente fiestas";
    //Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        store: STORE.id,
        id: idNode
    };

    console.log("Datos para enviar");
    console.log(dataSend);


    request = $.ajax({
        data: dataSend,
        //url: urlServices + 'getProductsClassified.php',
        url: urlServices + 'getProductsClassifiedCategory.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 25000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                console.log(response);
                restOk_products(response, "nodes", idNode, nodeName, info_aux, "getProductsClassified");

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function restOk_products(res, typ, param, param2, param3) {
    //console.log("Todo bien desde " + typ);
    //console.log("La respuesta es ");
    //console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":

        //displayProducts(res, param, param2, param3);
        displayProducts(res, param, param2, param3, "getProductsClassified");
        break;

    default:
        console.log(res);
        break;
    }


}

//Nos devuelve el listados de tiendas disponibles antes de cargar la ventana principal
function getTiendas() {

    console.log("Pedimos las tiendas");

    var request = $.ajax({
        url: urlServices + 'getShops.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {

            restOk_tiendas(response, "tiendas");

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                //console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //console.log(response);
                $("#texto_popup").text("Error de conexión...");
                $('#popupAlert').popup('open');

            }

        },
    });
}


function restOk_tiendas(res, typ, param, param2) {

    console.log("Las tiendas nos han llegado, cargamos el select" + typ);
    console.log("La respuesta es ");
    console.log(res);

    var count = res.stores.length;

    TIENDAS = res; //array con todas las tiendas

    //var html = '<div class="ui-nodisc-icon"><select data-corners="false" id="select_tienda" data-native-menu="false" data-theme="b" style="border: 0px;padding: 0 0 0 20px;">';
    var html = '<div class="ui-nodisc-icon"><select data-corners="false" id="select_tienda" data-native-menu="false" data-theme="b" style="">';

    for (var i = 0; i < count; i++) {

        var val = res.stores[i].id;
        var text = res.stores[i].name;

        html = html + '<option value=' + val + ' style=""><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

    }

    html = html + '</select></div>';

    console.log("--> Añadimos: " + html); // TEMP !!


    $("#div_select_tienda").html(html);

    $("#div_select_tienda").trigger('create');
    $("#div_select_tienda").css('font-size', '20px');

    /*var select = $('#select_tienda');

    select.selectmenu({
        icon: "ui-icon-carat-d"
    });
    select.selectmenu({
        iconshadow: "false"
    });*/
    $('#select_tienda-button').css({
        border: "0px"
    });

    //console.log(html);


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


    //sugerencias@partyfiesta.com
    console.log("WS");
    console.log(info);

    var request = $.ajax({
        data: info,
        url: urlServices + 'sendSuggestion.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response);
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
                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendContra(usuario) {

    //console.log("Funcion enviar contra");

    var dataSend = {
        user: usuario
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'email.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
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

    var dataSend = {
        lang: language
    };

    var request = $.ajax({
        url: urlServices + 'getGender.php',
        data: dataSend,
        dataType: 'json',
        type: 'POST',
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
                    text: jsonIdiomas.asistente_disfraces.select_sexo_button
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
        sex: gender,
        lang: language
    };

    console.log("Get gender " + gender);

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'getSize.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
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
                    text: jsonIdiomas.asistente_disfraces.talla
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

    var request = $.ajax({
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

function getTraduccion(idioma) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    var aux = {};

    // Datos que se van a enviar
    for (var i = 0; i < CART.length; i++) {
        aux[i] = {
            id: CART[i].id
        };
    }

    console.log("Datos del carrito");
    console.log(aux);

    var dataSend = {
        language: idiomStore,
        products: aux
    };

    console.log("Datos del carrito2");
    console.log(dataSend);


    var request = $.ajax({
        data: dataSend,
        async: false,
        url: urlServices + 'getProductLanguage.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            for (var i = 0; i < CART.length; i++) {
                if (response[i].id == CART[i].id) {
                    CART[i].definition = response[i].definition;
                    CART[i].name = response[i].name;
                    CART[i].short_name = response[i].short_name;
                    CART[i].suggestions = response[i].suggestions;
                }
            }
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


}

/**************************************************************************
  WS para enviar el correo con el listado de articulos del carrito
***************************************************************************/
function sendEmail() {

    console.log("Email es " + EMAIL_USER);

    if (EMAIL_USER == "") {

        setTimeout(function () {
            $("#popupEmail").popup("open");
        }, popupTimeout);

    } else {

        $("#popupEmail").popup("close");

        var dataSend = {
            email: EMAIL_USER,
            carrito: CART,
            store_email: STORE.email
        };

        var request = $.ajax({
            data: dataSend,
            //async: false,
            url: urlServices + 'sendEmail.php',
            dataType: 'json',
            type: 'POST',
            success: function (response) {

                console.log("Respuesta es:");
                console.log(response);

                if (parseInt(response.result) == parseInt(1)) {

                    $("#texto_popup").text("Correo enviado a " + EMAIL_USER);
                    EMAIL_USER = "";
                    INFO_USU = "";
                    $('#popupAlert').popup('open');
                    $('#email').val('');
                    //$("#spBtnAmountPerson").text(''); //TEMP
                    $("#circuloCantidad").hide();
                    $("#spBtnPopupCartAmmount").hide();
                    $("#userIcoCarrito").hide();
                    $("#btn_finalizarpedido").hide();
                    CART = [];
                    nodeNames = [];
                    nodeIds = [];
                    nodeImg = [];
                    EMAIL_USER = "";
                    logout();
                    console.log("Enviamos email");

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                        getNodes(0);
                    }, 1500);


                } else if (parseInt(response.result) == parseInt(0)) {

                    $("#texto_popup").text("No se ha podido enviar el correo a " + EMAIL_USER);
                    $('#popupAlert').popup('open');

                } else if (parseInt(response.result) == parseInt(2)) {

                    $("#texto_popup").text("Problemas al generar el correo");
                    $('#popupAlert').popup('open');

                } else if (parseInt(response.result) == parseInt(0)) {

                    $("#texto_popup").text("Faltan datos para poder enviar el correo");
                    $('#popupAlert').popup('open');

                }

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
                INFO_USU = "";
            },
        });
    }
}

/**************************************************************************
  WS para imprimir listado de articulos del carrito
***************************************************************************/
function imprimirPedido() {

    STORE.currencySymbol = "20AC";

    var dataSend = {
        carrito: CART,
        tienda: STORE.code,
        currencySymbol: STORE.currencySymbol,
        lang: language
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'convert_pdf.php',
        type: 'POST',
        success: function (response) {

            console.log("Respuesta de imprimir es:");
            console.log(response);

            //temp para puesta en tienda
            $("#texto_popup").text("Pedido enviado para imprimir");
            EMAIL_USER = "";
            INFO_USU = "";
            $('#popupAlert').popup('open');
            $('#email').val('');
            //$("#spBtnAmountPerson").text(''); //TEMP
            $("#circuloCantidad").hide();
            $("#spBtnPopupCartAmmount").hide();
            $("#userIcoCarrito").hide();
            $("#btn_finalizarpedido").hide();
            CART = [];
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
            EMAIL_USER = "";
            logout();
            console.log("Enviamos a imprimir");


            setTimeout(function () {
                $('#popupAlert').popup('close');
                getNodes(0);
            }, 1500);


            if (parseInt(response.result) == parseInt(1)) {

                $("#texto_popup").text("Pedido enviado para imprimir");
                EMAIL_USER = "";
                INFO_USU = "";
                $('#popupAlert').popup('open');
                $('#email').val('');
                //$("#spBtnAmountPerson").text(''); //TEMP
                $("#circuloCantidad").hide();
                $("#spBtnPopupCartAmmount").hide();
                $("#userIcoCarrito").hide();
                $("#btn_finalizarpedido").hide();
                CART = [];
                nodeNames = [];
                nodeIds = [];
                nodeImg = [];
                EMAIL_USER = "";
                logout();
                console.log("Enviamos a imprimir");


                setTimeout(function () {
                    $('#popupAlert').popup('close');
                    getNodes(0);
                }, 1500);


            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("No se ha podido enviar el correo a " + EMAIL_USER);
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(2)) {

                $("#texto_popup").text("Problemas al generar el correo");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("Faltan datos para poder enviar el correo");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                //restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }

        }
    });

}

/**
 *   pedidoOnline
 *
 *   funcion que envia los datos del carrito al webservice de pedido online
 */
function pedidoOnline() {

    var dataSend = {
        carrito: CART,
        tienda: STORE.code
    };

    var request = $.ajax({
        data: dataSend,
        //async: false,
        url: urlServices + 'pedidoOnline.php',
        //dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Respuesta de pedidoOnline es:");
            console.log(response);

            //temp para puesta en tienda
            $("#texto_popup").text("Pedido enviado online");
            EMAIL_USER = "";
            INFO_USU = "";
            $('#popupAlert').popup('open');
            $('#email').val('');
            //$("#spBtnAmountPerson").text(''); //TEMP
            $("#circuloCantidad").hide();
            $("#spBtnPopupCartAmmount").hide();
            $("#userIcoCarrito").hide();
            $("#btn_finalizarpedido").hide();
            CART = [];
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
            EMAIL_USER = "";
            logout();
            console.log("Enviamos el pedido online");


            setTimeout(function () {
                $('#popupAlert').popup('close');
                getNodes(0);
            }, 1500);

            if (parseInt(response.result) == parseInt(1)) {


                setTimeout(function () {
                    $('#popupAlert').popup('close');
                    getNodes(0);
                }, 1500);

            } else if (parseInt(response.result) == parseInt(0)) { // ***** Cambiar en funcion del webservice a utilizar !!!!! ****

                $("#texto_popup").text("No se ha podido enviar el pedido");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(2)) {

                $("#texto_popup").text("Problemas al generar el pedido");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("Faltan datos para poder enviar el pedido");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                //restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }

        }
    });
}

function guardarCarrito() {

    console.log("Guardamos la cesta");
    var prod = [];

    var aux = {};

    for (var i = 0; i < CART.length; i++) {

        aux.id = CART[i].id;
        aux.qty = CART[i].quantity;

        prod[i] = aux;

    }

    console.log("Productos");
    console.log(prod);

    var dataSend = {
        idClient: INFO_USU.id,
        products: prod
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'sendBasket.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Carrito guardado correctamente");
                ID_BASKET = response.idBasket;
            } else if (parseInt(response.result) == parseInt(0)) {
                //guardarCarrito();
            } else {
                //guardarCarrito();
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}



function sendOrder() {

    console.log("Guardamos la cesta");

    var dataSend = {
        origin: origin,
        type: prod,
        sector: PENDIENTE,
        billingName: INFO_USU.name,
        billingNIN: INFO_USU.name,
        paymentMethod: INFO_USU.name,
        region: INFO_USU.name,
        deliveryAddress: INFO_USU.name,
        deliveryPostalCode: INFO_USU.name,
        deliveryCity: INFO_USU.name,
        deliveryProvince: INFO_USU.name,
        deliveryCountry: INFO_USU.name,
        deliveryPhone: INFO_USU.name,
        billingAddress: INFO_USU.name,
        billingPostalCode: INFO_USU.name,
        billingCity: INFO_USU.name,
        billingProvince: INFO_USU.name,
        billingCountry: INFO_USU.name,
        billingPhone: INFO_USU.name,
        productsBasePrice: INFO_USU.name,
        productsTaxPrice: INFO_USU.name,
        productsTotalPrice: INFO_USU.name,
        shippingBasePrice : INFO_USU.name,
        shippingTaxPrice: INFO_USU.name,
        shippingTotalPrice: INFO_USU.name,
        basePrice: INFO_USU.name,
        taxPrice: INFO_USU.name,
        totalPrice: INFO_USU.name,
        internalShippingCost: INFO_USU.name,
        userId: INFO_USU.id,
        shopId: STORE.id,
        idBasket: ID_BASKET,
        lang: language
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'sendOrder.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Order guardado correctamente");
                ID_ORDER = response.idOrder;
            } else if (parseInt(response.result) == parseInt(0)) {
                //guardarCarrito();
            } else {
                //guardarCarrito();
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}

function updateOrder() {

    console.log("Actualizamos la cesta");

    var dataSend = {
        idOrder:ID_ORDER,
        status: PAGADO,
        origin: origin
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'updateOrder.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Carrito guardado correctamente");
            } else if (parseInt(response.result) == parseInt(0)) {
                //guardarCarrito();
            } else {
                //guardarCarrito();
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}