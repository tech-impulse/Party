/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName) {

    console.log("DisplayNode-> Nodes es " + data.result);
    //console.log(data);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        if (originNode == 0) {
            loadMenu(data);
            var imagen_partyfiesta = "<div><img src='css/icons/logo.png'></div>";
        } else {
            var imagen_partyfiesta = "";
            if (nodeIds.length == 0) {
                nodeIds.push(0);
                nodeNames.push("Menú");
                nodeIds.push(originNode);
                nodeNames.push(originName);
            } else {
                nodeIds.push(originNode);
                nodeNames.push(originName);
            }
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 1] + '</div>');
            //$("#divHeader").show();
        }
        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        var extra = "";

        switch (type) {
        case "horizontal":
            {
                htmlContent = "<center>" + imagen_partyfiesta + "</center>" + grid;
                position = "a";
                for (var i = 0; i < data.nodes.length; i++) {

                    if (data.nodes[i].isParty == 1 || data.nodes[i].isCostume == 1) {
                        extra = ",1";
                    } else {
                        extra = ",0";
                    }

                    //console.log("DisplayNode-> Nodes es " + data.result + " getNodes(" + data.nodes[i].id + "," + data.nodes[i].short_name + " )");

                    if (position < parseInt(data.columns)) {
                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                            break;

                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'' + extra + ')">';
                    }
                    var element = block + '<a data-role="button" data-theme="f"><img src="' + data.nodes[i].linkext + '" style="width: 120px;height: 120px;"><br><strong>' + data.nodes[i].name + '</strong></a></div>';

                    //console.log(element);

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;
                }
                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                break;
            };
        case "vertical":
            {
                htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
                for (var i = 0; i < data.nodes.length; i++) {

                    console.log("Is party? " + data.nodes[i].isParty);

                    if (data.nodes[i].short_name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')">' + data.nodes[i].short_name + '</a>';
                    }
                    htmlContent = htmlContent + element;
                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                //$("#divHeader_menu").hide();
                break;
            };
        }

    } else {

        console.log("Error en el envio de parametros");

    }

}




function displayProducts(data, originNode, originName) {

    console.log("DisplayProducts-> Node product es " + data.result);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        if (originNode == 0) {
            loadMenu(data);
        } else {
            if (nodeIds.length == 0) {
                nodeIds.push(0);
                nodeNames.push("Menú");
                nodeIds.push(originNode);
                nodeNames.push(originName);
            } else {
                nodeIds.push(originNode);
                nodeNames.push(originName);
            }
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 1] + '</div>');
            //$("#divHeader").show();
        }
        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        switch (type) {
        case "horizontal":
            {
                htmlContent = "<center></center>" + grid;
                position = "a";
                for (var i = 0; i < data.products.length; i++) {

                    //console.log("DisplayNode-> Nodes es " + data.result + " getNodes(" + data.nodes[i].id + "," + data.nodes[i].short_name + " )");

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                            break;


                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].short_name + '\')">';
                    }
                    var element = block + '<a data-role="button" data-theme="f"><img src="' + data.products[i].linkext + '" style="width: 120px;height: 120px;"><br><strong>' + data.products[i].name + '</strong></a></div>';

                    //console.log(element);

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;
                }
                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                break;
            };
        case "vertical":
            {
                htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
                for (var i = 0; i < data.products.length; i++) {

                    if (data.products[i].short_name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].name + '\')">' + data.products[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.products[i].id + ', \'' + data.products[i].name + '\')">' + data.products[i].short_name + '</a>';
                    }

                    htmlContent = htmlContent + element;

                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                $("#divHeader_menu").hide();
                break;
            };
        }

    } else {

        console.log("Error ....");

    }

}


/* Función que carga el menú lateral
 */
function loadMenu(data) {

    var options = '';
    var htmlHeader = '';
    for (var i = 0; i < data.nodes.length; i++) { //data:image/png;base64,
        options = options + '<li onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'); openMenu()"><img src="' + data.nodes[i].linkext + '" style="width:12em">' + data.nodes[i].short_name + '</li>';
    }
    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">Ir al Menú</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');

    htmlHeader = '<div><div class="ui-grid-b"> <div class="ui-block-a" style="margin-top:10px" id="divBack"> </div> <div class="ui-block-b" style="margin-top:10px"><img src="css/icons/logo.png" width="100%"> </div> <div class="ui-block-c" style="text-align:right;"> <div id="session"><a id="login" onclick="displayLogin();" style="margin:10px"> <span>Ya soy Cliente!</span> </a><a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a> </div> </div> </div> <img src="css/icons/barra.png" height="5px" width="100%"> <ul data-role="listview" style="margin:0px"> <li data-role="list-divider" id="path"> </li> </ul>';
    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

}


function displayPantallaIntermedia(data) {

    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<img src="' + data.linkint + '" alt="">' +
        '<h3> ¿Para cuantas personas es la fiesta?</h3>' +
        '<div style="width:100px">' +
        '<input id="num_personas" type="number" name="quantity" min="1">' +
        '</div>' +
        '<br>' +
        '<a style="width:150px" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">CONTINUAR</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');


}

function displayRegistro() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, 50);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, 50);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);


}

function loginOut() { //muestra el pop up de inicio de session

    console.log("Cerramos session");
    html = '<div id="session"><a id="login" onclick="displayLogin();" style="margin:10px"> <span>Ya soy Cliente!</span> </a><a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a> </div>';
    $("#session").html(html);
    INFO_USU = "";
    $('#usrnm').val("");
    $('#pswd').val("");


}