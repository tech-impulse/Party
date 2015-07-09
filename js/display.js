function displayNode(data, param) {
    var htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;
    if (param == 0) {
        loadMenu(data);
    } else {
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
    if (data.result == 1) { // Hay resultados
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
                                block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ')">';
                                break;
                            }
                        case 1:
                            {
                                block = '<div class="ui-block-b" onclick="getNodes(' + data.nodes[i].id + ')">';
                                break;
                            }
                        case 2:
                            {
                                block = '<div class="ui-block-c" onclick="getNodes(' + data.nodes[i].id + ')">';
                                break;
                            }
                        case 3:
                            {
                                block = '<div class="ui-block-d" onclick="getNodes(' + data.nodes[i].id + ')">';
                                break;
                            }
                        case 4:
                            {
                                block = '<div class="ui-block-e" onclick="getNodes(' + data.nodes[i].id + ')">';
                                break;
                            }
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="getNodes(' + data.nodes[i].id + ')">';
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
                    var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ')">' + data.nodes[i].name + '</a>';
                    htmlContent = htmlContent + element;
                }
                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                break;
            };
        }
    }

}

function loadMenu(data) {
    var options = '';
    var htmlHeader = '';
    for (var i = 0; i < data.nodes.length; i++) {
        options = options + '<li onclick="getNodes(' + data.nodes[i].id + '); openMenu()"><img src="data:image/png;base64,' + data.nodes[i].image + '" style="width:12em">' + data.nodes[i].short_name + '</li>';
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

/*

 <div class="ui-grid-a" id="page_catalog">
                <div class="ui-block-a" style="width:66%">
                    <center>
                        <span class="flaticon-catalog-h" style="color:#EE7F01;"></span>

                    </center>
                </div>
                <div class="ui-block-b" style="width:30%; margin: 2%">
                    <div style="text-align:right">
                        <a data-role="button">Globos</a>
                        <a data-role="button">Decora tu fiesta</a>
                        <a data-role="button">Velas y bengalas</a>
                        <a data-role="button">Pastelería</a>
                        <a data-role="button">Piñatas</a>
                        <a data-role="button">Bromas</a>
                        <a data-role="button">Bolsa y cajas</a>
                        <a data-role="button">Accesorios</a>
                    </div>
                </div>
            </div>

<div data-role="header">
            <img src="css/icons/barra.png" width="100%">
            <div class="ui-grid-b">
                <div class="ui-block-a" style="margin-top:10px" id="divBack">
                </div>
                <div class="ui-block-b" style="margin-top:10px"><img src="css/icons/logo.png" width="100%">
                </div>
                <div class="ui-block-c" style="text-align:right;">
                    <a style="margin:10px">
                        <span>Ya soy Cliente!</span>
                    </a>
                    <a id="btnMenuLateral" onclick="openMenu()" style="margin:10px">
                        <span class="flaticon-menu"></span>
                    </a>
                </div>
            </div>
            <img src="css/icons/barra.png" height="5px" width="100%">
            <ul data-role="listview" style="margin:0px">
                <li data-role="list-divider" id="path">

                </li>
            </ul>
        </div>

*/