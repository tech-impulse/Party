/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName) {
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
                nodeNames.push(originName)
            } else {
                nodeIds.push(originNode);
                nodeNames.push(originName);
            }
            $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px"></span>' + nodeNames[nodeNames.length - 1] + '</div>');
            $("#divHeader").show();
        }
        switch (parseInt(data.columns)) {
        case 1:
            {
                grid = "<div class='ui-grid-a'>";
                type = "vertical";
                break;
            }
        case 2:
            {
                grid = "<div class='ui-grid-a'>";
                type = "horizontal";
                break;
            }
        case 3:
            {
                grid = "<div class='ui-grid-b'>";
                type = "horizontal";
                break;
            }
        case 4:
            {
                grid = "<div class='ui-grid-c'>";
                type = "horizontal";
                break;
            }
        case 5:
            {
                grid = "<div class='ui-grid-d'>";
                type = "horizontal";
                break;
            }
        }

        switch (type) {
        case "horizontal":
            {
                htmlContent = "<center><div><img src='css/icons/logo.png'></div></center>" + grid;
                position = "a";
                for (var i = 0; i < data.nodes.length; i++) {
                    if (position < parseInt(data.columns)) {
                        switch (position) {
                        case 0:
                            {
                                block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                                break;
                            }
                        case 1:
                            {
                                block = '<div class="ui-block-b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                                break;
                            }
                        case 2:
                            {
                                block = '<div class="ui-block-c" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                                break;
                            }
                        case 3:
                            {
                                block = '<div class="ui-block-d" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                                break;
                            }
                        case 4:
                            {
                                block = '<div class="ui-block-e" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                                break;
                            }
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">';
                    }
                    var element = block + '<a data-role="button" data-theme="f"><img src="data:image/png;base64,' + data.nodes[i].image + '"><br><strong>' + data.nodes[i].name + '</strong></a></div>';

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
                    var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\')">' + data.nodes[i].name + '</a>';
                    htmlContent = htmlContent + element;
                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                break;
            };
        }

    } else {
        alert("No hay datos");
    }

}

/* Función que carga el menú lateral
    */
function loadMenu(data) {
    var options = '';
    var htmlHeader = '';
    for (var i = 0; i < data.nodes.length; i++) {
        options = options + '<li onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].short_name + '\'); openMenu()"><img src="data:image/png;base64,' + data.nodes[i].image + '" style="width:12em">' + data.nodes[i].short_name + '</li>';
    }
    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">Ir al Menú</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');

    htmlHeader = '<img src="css/icons/barra.png" width="100%"> <div class="ui-grid-b"> <div class="ui-block-a" style="margin-top:10px" id="divBack"> </div> <div class="ui-block-b" style="margin-top:10px"><img src="css/icons/logo.png" width="100%"> </div> <div class="ui-block-c" style="text-align:right;"> <a style="margin:10px"> <span>Ya soy Cliente!</span> </a> <a id="btnMenuLateral" onclick="openMenu()" style="margin:10px"> <span class="flaticon-menu"></span> </a> </div> </div> <img src="css/icons/barra.png" height="5px" width="100%"> <ul data-role="listview" style="margin:0px"> <li data-role="list-divider" id="path"> </li> </ul>';
    $("#divHeader").html(htmlHeader);
    $("#divHeader").trigger('create');
    $("#divHeader").hide();
    $("#lateralMenu").panel("close");
}