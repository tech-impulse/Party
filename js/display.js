/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName, linkImg) {

    //console.log("DisplayNode-> Nodes es " + data.result + " link " + linkImg);
    //console.log(data);
    
    //console.log("Cargamos los nodos");

    var len = data.nodes.length;

    if (parseInt(len) < parseInt(data.columns)) {
        len = data.columns;
    }
    var alturaMin = W_HEIGTH * 0.55;
    var filas = parseInt(len / data.columns);
    var count = 1;

    var aux_altura = parseInt(alturaMin / filas); //altura de la patanlla por el % del div partido por el numero de filas

    var alturaBox = aux_altura; // //obtenemos el valor en px 
    var alturaBox2 = (aux_altura / W_HEIGTH) * 100; //obtenemos el valor en % 


    var heigth = (W_WIDTH * (0.90));
    var heigth2 = (W_WIDTH * (0.06)); //se utiliza para el margen de separacion de las cajas

    var heig_block = parseInt(heigth / data.columns); // valor de cada caja
    var he_b_margin = parseInt(heigth2 / (data.columns - 1)); // valor de cada caja

    var heigth_img = parseInt(alturaMin * 0.33);

    //console.log("Comprobamos las alturas");
    //console.log("alturaMin " + alturaMin + " filas " + filas + " heig_block " + heig_block + " alturaBox " + alturaBox + "");

    //console.log("*Filas " + filas + " Altura min " + alturaMin + "  Altura es : " + alturaBox + " aux_altura " + aux_altura);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        if (originNode == 0) {
            loadMenu(data);
            //var imagen_partyfiesta = "<div><img src='css/icons/logo.png'></div>";
            var imagen_partyfiesta = "";
        } else {
            var imagen_partyfiesta = "";
            updateBackButton(originNode, originName);
            //$("#divHeader").show();
        }
        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        }

        var extra = "";
        //console.log("Tipo " + type);

        switch (type) {
        case "horizontal":
            {
                LINKINT = "";
                htmlContent = grid;
                var aux_col = 1; //se utiliza para el margen de las cajas
                var aux_reinicio = 10;
                for (var i = 0; i < data.nodes.length; i++) {

                    aux_reinicio = 0;
                    //console.log("Margen es " + he_b_margin + " columnas " + data.columns + " aux " + aux_col);
                    if (parseInt(data.columns) == parseInt(aux_col)) {
                        he_b_margin = 0;
                        aux_col = 0;
                        aux_reinicio = 1;
                    }

                    aux_col++;


                    //solo se mostrar en el menu inicial de la app getNodes(0) diferenciamos entre los diferentes bloques del menu principal
                    if (originNode == 0) {

                        //comprobamos si existe algun nodo principal
                        //console.log("Este es el principal??? " + data.nodes[i].isMain);
                        if (parseInt(data.nodes[i].isMain) == 1) {
                            console.log("Este es principal " + data.nodes[i].isMain);
                            var valorSwitch = 7;
                        } else {
                            var valorSwitch = parseInt(data.nodes[i].type);
                        }
                        switch (valorSwitch) {
                        case 1: //catalogo
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkint + '\')';
                            break;
                        case 2: //promos
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkint + '\')';
                            break;
                        case 3: // asis fistas
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkint + '\')';
                            break;
                        case 4: // asis disfra
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkint + '\')';
                            break;
                        case 5: // sugerencias
                            extra = 'displayPantallaSugerencias()';
                            break;
                        case 6: // fuera tienda
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkint + '\')';
                            break;
                        case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkint + '\')';
                            break;
                        }

                    } else { //mostramos los bloques sin ningun orden

                        extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')';

                    }


                    if (position < parseInt(data.columns)) { //numero maximo de columnas que tendra la pantalla
                        switch (position) {
                        case 0:
                            block = '<div class="ui-block-a" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            break;
                        case 1:
                            block = '<div class="ui-block-b" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">'; //style="height:' + alturaBox + '%"
                            break;
                        case 2:
                            block = '<div class="ui-block-c" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            break;
                        case 3:
                            block = '<div class="ui-block-d" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            break;
                        case 4:
                            block = '<div class="ui-block-e" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                    }

                    if ( /*(position + 1) == parseInt(data.columns) && count < filas && */ valorSwitch == 7) { //despues de la primera fila se mostrara el elemento principal

                        var element2 = '<div class="ui-block-a" style="width: 25%;height:' + alturaBox + 'px"></div><div class="ui-block-b" style="width: ' + heig_block + 'px;height:' + alturaBox + 'px"><a data-role="button" data-theme="f" style="background-color: lightgray;"><img src="' + data.nodes[i].linkext + '" style="width: 100px;height: 100px;" ><br><strong>' + data.nodes[i].name +
                            '</strong></a></div><div class="ui-block-c" style="width: 25%;height:' + alturaBox + 'px"></div>';

                        var element = block + '<div><a data-role="button" data-theme="f"><img src="' +
                            data.nodes[i].linkext + '" style="width: 85px;height:' + alturaBox + 'px"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';

                        count++;
                        htmlContent = htmlContent + element + element2;

                    } else {

                        var element = block + '<div><a data-role="button" data-theme="f"><img src="' +
                            data.nodes[i].linkext + '" style="width: ' + heigth_img + 'px;height: ' + heigth_img + 'px;"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';
                        htmlContent = htmlContent + element;

                    }

                    if (aux_reinicio == 1) {
                        he_b_margin = parseInt(heigth2 / (data.columns - 1));
                    }
                    position++;


                }

                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                if (originNode != 0) {
                    $("#divHeader_catalogo").show();
                }

                break;
            };
        case "vertical":
            {
                /*htmlContent = grid + " <div class='ui-block-a' style='width:66%;'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';*/

                //console.log("Link " + linkImg);

                LINKINT = linkImg;

                htmlContent = grid + " <div class='ui-block-a' style='width:66%;'><center><img src='" + linkImg + "'></center></div>";
                block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';

                for (var i = 0; i < data.nodes.length; i++) {

                    //console.log("Is party? " + data.nodes[i].isParty);

                    switch (i) { //color para los botones
                    case 0:
                        var bacgroundColor = "mediumvioletred";
                        break;

                    case 1:
                        var bacgroundColor = "gold";
                        break;

                    case 2:
                        var bacgroundColor = "darkorange";
                        break;

                    case 3:
                        var bacgroundColor = "yellowgreen";
                        break;

                    case 4:
                        var bacgroundColor = "dodgerblue";
                        break;

                    }

                    if (data.nodes[i].name == "") {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')" style="background-color:' + bacgroundColor + ';">' + data.nodes[i].name + '</a>';
                    } else {
                        var element = '<a data-role="button" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\')" style="background-color:' + bacgroundColor + ';">' + data.nodes[i].name + '</a>';
                    }
                    htmlContent = htmlContent + element;
                }

                htmlContent = htmlContent + '</div></div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                break;
            };
        }

    } else {

        console.log("Error en el envio de parametros");

    }

}




function displayProducts(data, originNode, originName, param) {

    console.log("DisplayProducts-> Nodo Origen Id" + originNode);
    var aux_carac = 0;


    if (data.result == 1 && pantallaActual == "Asistente fiestas") { // Hay resultados

        PRODUCTS = data.products;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var num_personas;

        if (originNode == 0) {
            loadMenu(data);
        } else {
            updateBackButton(originNode, originName);
        }

        if (pantallaActual == "Asistente disfraces") {
            console.log("Estamos en la pantalla ".pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            console.log("Estamos en la pantalla ".pantallaActual);
            num_personas = $("#personas_fiesta").val();
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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;
            //auxTest = data;
            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.96));
                var heig_block = heigth / parseInt(data.columns);

                //if (data.products[i].price_x_region[0].totalPrice != undefined) { // Controlamos que el precio exista
                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }


                if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                var count = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;


                //console.log("Miramos que contenga la caracteristica de unidades:");
                for (var j = 0; j < count; j++) {
                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //unidades = "1 unidad";
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;

                    }

                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 unidad";
                }

                //console.log("Caracteristicas");
                //console.log(caracteristicas);

                if (data.products[i].name == "") {
                    //var titulo = "Falta descripción del producto";
                    //console.log("No tiene el nombre corto, pasamos al siguiente producto");
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                var element = block +
                    '<a data-role="button" data-theme="f"><div id="circulo' + data.products[i].id + '"  class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;padding-top: 5px;font-size: 22px;color: white;">10</label></div>' +
                    '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 120px;height: 120px;">' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><div class="contenedor">' + titulo + '</div></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><strong>' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;font-size: 15px;"></label></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><button id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button></div></div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';

                //console.log(element);

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;
                //}


            }

            htmlContent = htmlContent + '</div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');

            var aux = 0;
            // calculo del numero de articulos por producto
            for (var k = 0; k < data.products.length; k++) {

                //console.log("Calculamos los articulos .Aux_carac " + aux_carac + "------------------------------------------------");
                aux = 0;
                var count = data.products[k].caracteristics.length;
                var caracteristicas = data.products[k].caracteristics;

                for (var j = 0; j < count; j++) {

                    if (caracteristicas[j].type == "9" && data.products[k].name != "" && data.products[k].price_x_region.length > 0 && aux_carac == 0) {

                        var num_uni = caracteristicas[j].name;
                        var units = num_uni.split(' ');

                        //console.log("Unidades es " + units[0]);

                        if (parseInt(units[0]) >= parseInt(num_personas)) { //el articulo tiene suficientes para el grupo
                            //console.log("Unidades es1 " + units[0] + " se añade 1");
                            addToCart(data.products[k].id, 1);
                            aux = 1;
                        } else { //mas personas que unidades del articulo
                            //console.log("Unidades es3 " + units[0] + "");
                            var num_prod = Math.ceil(parseInt(num_personas) / parseInt(units[0]));
                            //console.log("Numero " + num_prod);
                            addToCart(data.products[k].id, num_prod);
                            aux = 1;
                        }

                        break;
                    }

                }

                //console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

                if (aux == 0 && data.products[k].name != "" && data.products[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                    addToCart(data.products[k].id, parseInt(1));
                }


            }

            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();
            break;

        }

    } else if (data.result == 1 && pantallaActual == "Asistente disfraces") {

        PRODUCTS = data.products;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;

        console.log("Productos para el asistente de disfraces");
        //console.log(data);


        if (originNode == 0) {
            loadMenu(data);
        } else {
            updateBackButton(originNode, originName);
        }

        console.log("Estamos en el " + pantallaActual);


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

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            var sexo = param.sexo;
            var talla = param.talla;

            //console.log("Sexo " + sexo + " talla " + talla);

            for (var i = 0; i < data.products.length; i++) {

                var heigth = (W_WIDTH * (0.96));
                var heig_block = heigth / parseInt(data.columns);

                var count = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;
                var generoDisfraz = 0; //sexo del disfraz no es el seleccioando

                for (var j = 0; j < count; j++) { // comprobamos que la talla y sexo sea el escogido en los selects

                    if (caracteristicas[j].name == sexo) {
                        for (var m = 0; m < count; m++) {
                            if (caracteristicas[m].name == talla) {
                                //console.log("Disfracaz válido " + caracteristicas[m].name);
                                //console.log("Producto es:");
                                //console.log(data.products[i]);
                                //console.log("Caracteristicas es:");
                                c//onsole.log(data.products[i]);
                                generoDisfraz = 1;
                            } else {
                                continue;
                                //console.log("Disfracaz no válido " + caracteristicas[m].name);
                            }
                        }
                    }
                }

                if (generoDisfraz == 0) { //sexo no valido lo saltamos
                    continue;
                }

                for (var j = 0; j < count; j++) {
                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                    } else {
                        //unidades = "1 unidad";
                        continue;
                    }

                }

                //if (data.products[i].price_x_region[0].totalPrice != undefined) { // Controlamos que el precio exista
                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }

                //en el caso que no tengamos el precio no se muestra el articulo
                if (data.products[i].price_x_region.length == 0) {
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }


                //console.log("Caracteristicas");
                //console.log(caracteristicas);

                if (data.products[i].name == "" || data.products[i].linkext == "") {
                    //var titulo = "Falta descripción del producto";
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                var element = block +
                    '<a data-role="button" data-theme="f"><div id="circulo' + data.products[i].id + '"  class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;padding-top: 5px;font-size: 22px;color: white;">10</label></div>' +
                    '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 120px;height: 120px;">' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><div class="contenedor">' + titulo + '</div></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><strong>' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;font-size: 15px;"></label></div></div>' +
                    '<div class="ui-grid-a"><div class="ui-block-a" style="width: 100%;"><button id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button></div></div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';

                //console.log("Producto " + i);
                //console.log(data.products[i]);

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;
                //}


            }

            htmlContent = htmlContent + '</div>';


            setTimeout(function () {

                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');

            }, 50);


            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();

            break;

        }


    } else {

        console.log("Error ....");

    }

    $("#popupCargando").popup("close");

}

/******************************************************************
    Enseña o esconde los botones de añadir o restar productos 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
******************************************************************/
function displayItemOperations(id, param, position) {

    if (param > 0) {
        //console.log("La cantidad que llega es " + param);
        $("#btnAddProduct" + id).hide();
        $("#grid" + id).show();
        $("#quantity" + id).text(param);
        $("#circulo" + id).show();

    } else {
        $("#btnAddProduct" + id).show();
        $("#grid" + id).hide();
        $("#circulo" + id).hide();
        $("#labelPrecioTotalProducto" + id).hide();
        CART.splice(position, 1);
        //deleteItemCart(position);        
    }

    var total = 0;
    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }
    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

    if (CART.length < 1) {
        $("#popupListItems").popup("close");
    }


}

function openPopupAction(param) {

    $("#lbpopupAction").text(param);
    switch (param) {
    case 'deleteItem':
        $("#popupListItems").popup("close");
        setTimeout(function () {
            $("#popupAction").popup("open");
        }, popupTimeout);
        break;
    }
}


function displayPopupItemList() {

    var html = '';

    var tituloPopUp = '<div data-role="header" data-theme="a" style="background: rgb(154, 205, 50);"><h1>' + jsonIdiomas.popup_errores.tituloPopUp + '</h1></div>';

    for (var i = 0; i < CART.length; i++) {
        html = html +
            '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
        '<div class="ui-grid-b">' +
            '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + CART[i].linkext + '"></div>' +
            '<div class="ui-block-b" style="width:45%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;padding-top: 5%;">' + CART[i].name + '</label></div>' +
            '<div class="ui-block-c" style="width:40%;">' +
            '<div class="ui-grid-d">' +
            '<div class="ui-block-a" style="width:16%;"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
            '<div class="ui-block-b" style="width:16%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 35%;">' + parseInt(CART[i].quantity) + '</label></div>' +
            '<div class="ui-block-c" style="width:16%;"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1);setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
            '<div class="ui-block-d" style="width:32%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 19%;">' + parseFloat(parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice)).toFixed(2) + ' €</label></div>' +
            '<div class="ui-block-e" style="width:16%"><a data-icon="delete" data-role="button" data-theme="f" style="background-color: red;" data-iconpos="notext" onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"></a></div>' +
            '</div>' +
            '</div>' +
            '</li>';
    }


    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");


    $("#contentPopupListItems").html(tituloPopUp + html);
    $("#contentPopupListItems").trigger("create");

    switch (CART.length) {
    case 0:
        //console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayItemAlter(id_prod) {

    var aux_prod;

    for (var i = 0; i < PRODUCTS_ALTER.alternativeProducts.length; i++) {

        if (parseInt(PRODUCTS_ALTER.alternativeProducts[i].id) == parseInt(id_prod)) {

            aux_prod = PRODUCTS_ALTER.alternativeProducts[i];
            break;

        }
    }

    //console.log("Alter encontrado");
    //console.log(aux_prod);

    var html = '';

    html = html +
        '<div class="ui-grid-a" >' +
        '<div class="ui-block-a" style="width:40%;"><img src="' + aux_prod.linkext + '" style="max-width:100%;"></div>' +
        '<div class="ui-block-b" style="width:60%;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:90%;">' + aux_prod.name + '</div>' +
        '<div class="ui-block-b"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><label id="price_alter">' + formatoNumero(aux_prod.price_x_region[0].totalPrice, 2, ",", ".", "€") + '/u. </label></div>' +
        '<div class="ui-block-b" style="width:50%;"><label id="total_alter"></label>Total:</div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;margin-top: 1%;"><input type="number" id="cantidad_prod_alter" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a id="mas_fiesta" onclick="addProduct(1);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">+</a></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><a data-role="button" data-theme="b" data-iconpos="notext" onclick="volver();">VOLVER</a></div>' +
        '<div class="ui-block-b" style="width:50%;"><a data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCartAlter(' + aux_prod.id + ');">AÑADIR</a></div>' +
        '</div></div>' +
        '</div>';


    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    switch (CART.length) {
    case 0:
        //console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayAlternativeProducts() {

    console.log("Productos alternativos");
    console.log(PRODUCTS_ALTER);

    var productList = PRODUCTS_ALTER.alternativeProducts; //productList[id].alternatives_products;

    var carrusel = "";

    if (productList != null) {

        for (var i = 0; i < productList.length; i++) {

            var prod_alt = productList[i];

            //console.log("Link " + prod_alt.linkext);

            var aux = jQuery.isEmptyObject(prod_alt.linkext);
            //console.log("Aux " + aux);

            if (aux == false) {

                carrusel = carrusel + '<div class="swiper-slide"><img onclick="displayItemAlter(' + prod_alt.id + ');" src="' + prod_alt.linkext + '" style="max-width: 75px;max-height: 75px;"></div>';

            }

        }
    }


    $("#carrusel").html(carrusel);
    $("#carrusel").trigger("create");


    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
    });

    $("#swiper").show();
    $("#imgBarraCarga").hide();

}


function displayPopupItemDetail(id, param, idproduct) {

    console.log("Mostramos el pop de detalle del producto");
    switch (param) {
    case "CART":
        var productList = CART;
        var quantity = productList[id].quantity;
        var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
        break;

    case "PRODUCTOS":
        ///var productList = PRODUCTS;
        var quantity = 0;
        var buttonBack = "";
        var carrusel = "";

        var div_carrusel = "";

        for (var i = 0; i < CART.length; i++) {

            if (CART[i].id == idproduct) {

                var imgAvailability;
                //console.log("CArrito encontrado");
                //console.log(CART[i]);
                switch (CART[i].state) {
                case 1:
                    imgAvailability = "css/maqueta/barraVerde.gif";
                    break;
                case 2:
                    imgAvailability = "css/maqueta/barraAmarilla.gif";
                    break;
                default:
                    imgAvailability = "css/maqueta/barraVerde.gif";
                    break;
                }

                var html = '';

                div_carrusel = '<li data-role="list-divider" data-theme="c"><span>Productos alternativos</span></li>' +
                    '<li><div class="ui-grid-a" id="img_prod_alter">' +
                    '<div id="imgBarraCarga"><center><label>' + jsonIdiomas.popup_errores.labelCargando + '</label></center></div>' +
                    '<div id="swiper" class="swiper-container"><div class="swiper-wrapper" id="carrusel"  style=""></div></div>' +
                    '</div>' +
                    '</li>';

                html = html +
                    '<ul data-role="listview" data-inset="true">' +
                    '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + CART[i].name + '</h2><span class="ui-li-count">' + CART[i].quantity + '</span></li>' +
                    '<li>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a"><img src="' + CART[i].linkext + '" style="max-width: 200px;max-height: 200px;"></div>' +
                    '<div class="ui-block-b">' +
                    '<br><h1>Precio Total: ' + parseFloat(CART[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1>' +
                    '<p><strong> Ubicación: ' + CART[i].definition + '</strong></p>' +
                    '<p><strong>' + CART[i].definition + '</strong></p>' +
                    '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
                    '</div>' +
                    '</li>' + div_carrusel +
                    '</ul>';

                if (buttonBack != "") {
                    html = html + buttonBack;
                }
            }


        }

        $("#contentPopupListItems").html(html);
        $("#contentPopupListItems").trigger("create");

        $("#swiper").hide();

        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);

        setTimeout(function () {
            getAlternativeProducts(id, idproduct);
        }, 200);

    }

}


/*********************************** 
Función que carga el menú lateral
************************************/
function loadMenu(data) {

    var options = '';
    var htmlHeader = '';

    console.log(data);

    if (data.nodes == undefined) {
        var len = data.node.length;
        var node = data.node;
    } else {
        var len = data.nodes.length;
        var node = data.nodes;
    }

    // var len = data.nodes.length;
    //var node = data.nodes;

    if (len > 0) {
        for (var i = 0; i < len; i++) {

            if (parseInt(data.nodes[i].isMain) == 1) {
                //console.log("este es el principal " + node[i].isMain);
                var valorSwitch = 7;
            } else {
                var valorSwitch = parseInt(node[i].type);
            }

            switch (valorSwitch) {
            case 1: //catalogo
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',0,1)';
                break;
            case 2: //promos
                extra = '';
                break;
            case 3: // asis fistas
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            case 4: // asis disfra
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            case 5: // sugerencias
                extra = 'displayPantallaSugerencias()';
                break;
            case 6: // fuera tienda
                extra = '';
                break;
            case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',1)';
                break;
            }

            options = options + '<li onclick="' + extra + ';"; openMenu()"><img src="' + node[i].linkext + '" style="width:12em">' + node[i].name + '</li>';
        }

    }

    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">' + jsonIdiomas.menu_lateral.menu + '</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');


    var cart = '<a href="#" onclick="displayCar();" data-position-to="origin">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:30%"><img src="css/icons/cesta.png" width="75%" style="margin-left: 20%"></div>' +
        '<div class="ui-block-b" style="width: 70%;"><span style="margin-left:15px" id="spBtnPopupCartProducts">0</span><span id="labelProductos">' + jsonIdiomas.header.labelProductos + '</span><br> <span style="margin:15px" id="spBtnPopupCartAmmount">0 €</span></div>' +
        '</div></a>';


    /*HEADER  de la pantalla*/

    htmlHeader = '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:30%;color: rgb(70, 130, 180);" id="divBack"></div>' +
        '<div class="ui-block-b" style="margin-top:10px; width:27%;"><img src="css/icons/logo.png" width="75%" style="margin-left: 20%"> </div>' +
        '<div class="ui-block-c" style="margin-top:15px;width:21%" id="session">' +
        '<center><a id="login" onclick="displayLogin();" style="width:10%"> <span>' + jsonIdiomas.header.login + '</span> </a>' +
        '</div>' +
        '<div class="ui-block-d" style="margin-top:10px; width:16%" id="car_compra">' + cart +
        '</div>' +
        '<div class="ui-block-e" style="margin-top:10px; width:4%">' +
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px; float:right"> <span class="flaticon-menu"></span> </a>' +
        '</div>' +
        '</div>';


    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');
    $("#divHeader_catalogo").addClass("border-header");
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");


}


function displayPantallaIntermediaAsistDisfra(data) {

    $("#divHeader_catalogo").show();
    //console.log(data);
    var info = data.node;

    htmlContent = '<div id="page_count" style="display: block;padding-top: 1%;">' +
        '<center>' +
        '<img src="' + info.linkint + '" alt="">' +
        '<div style="width: 30%"><select id="select_sexo" data-native-menu="false">' +
        '</select></div>' +
        '<div id="div_selectTalla" style="width: 30%;display:none"><select id="select_talla" data-native-menu="false">' +
        '</select></div>' +
        '<br>' +
        '<a style="width:150px" id="btn_continuar_dis" onclick="displayProductos(' + info.id + ',\'' + info.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#select_sexo").attr("data-native-menu", "false");
    $("#select_talla").attr("data-native-menu", "false");

    $('#select_sexo').scrollTop(5);
    $('#select_talla').scrollTop(5);

    getGender(); //llamamos al webservice que tiene los sexos

    $('#select_sexo').change(function () {
        var optionSelected = $(this).find('option:selected');
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        //console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected != 0) {

            getSize(optValueSelected);
            $("#div_selectTalla").show();

        } else {
            $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
            $('#popupAlert').popup('open');

            $("#div_selectTalla").hide();
        }
    });



}


function displayPantallaIntermediaAsistFiestas(data) {

    //console.log(data);
    console.log("Asistente de fiestas");

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<br>' +
        '<img src="' + data.linkint + '" style="max-width:30%;width:22%;">' +
        '<h4><label id="label_num_per_fiesta" style="">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-b" style="max-width:25%;">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;"><input type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a id="mas_fiesta" onclick="addPeople(1);" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">+</a></div>' +
        '</div>' +
        '<a style="max-width:15%;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\')" data-role="button" data-theme="b" class="ui-link ui-btn ui-btn-b ui-shadow ui-corner-all" role="button">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
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
    }, popupTimeout);

}

function displayCambioContra() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupCambioContra").popup("open");
    }, popupTimeout);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, popupTimeout);


}

function displayCar() { //muestra el pop up de inicio de session


    $('.ui-popup').popup('close');
    setTimeout(function () {
        $("#popupCart").popup("open");
    }, popupTimeout);


}


function displayLogin2() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupCambioContra").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);


}



function displayMenu() { //muestra el pop up de inicio de session

    //console.log("Volver al menu");
    getNodes(0);

}



function logout() { //muestra el pop up de inicio de session


    console.log("Cerramos session");
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px"><span>' + jsonIdiomas.header.login + '</span></a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");


}

function displayScreenSaver() { //muestra el pop up de inicio de session

    /*if (idleTimeActive == true) {

        idleTimeActive = false;

        //$('#contentPopupScreenSaver').fadeIn();
        $('#contentPopupScreenSaver').hide();

        setTimeout(function () {
            $('#principal').show();
        }, 100);

    } else {*/

    $('.ui-popup').popup('close');
    idleTimeActive = true;
    console.log("Protector de pantalla activado");
    $('#principal').hide();
    $('#contentPopupScreenSaver').show();

    //}


}



function displayPantallaSugerencias() {

    console.log("Entramos en la pantalla de sugerencias");
    $("#banderas").hide();
    nodeIds = [];
    nodeNames = [];
    loadMenu(node_cero);

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    //$("#divHeader").show();

    html_sug = '<div id="form_sugerencias" style="margin-top:2%;">' +
        '<form  enctype="text/plain">' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNom">' + jsonIdiomas.form_sugerencias.labelSugNom + '</label><input type="text" id="nombre" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugNaci">' + jsonIdiomas.form_sugerencias.labelSugNaci + '</label><input type="date" value="" id="fecha_naci" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugMail">' + jsonIdiomas.form_sugerencias.labelSugMail + '</label ><input type="email" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNPob">' + jsonIdiomas.form_sugerencias.labelSugNPob + '</label ><input type="text" id="poblacion" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugProv">' + jsonIdiomas.form_sugerencias.labelSugProv + '</label><input type="text" value="" id="provincia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugTelf">' + jsonIdiomas.form_sugerencias.labelSugTelf + '</label><input type="number" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugTipo">' + jsonIdiomas.form_sugerencias.labelSugTipo + '</label><select name="suge_inci" data-native-menu="false"><option value="1">' + jsonIdiomas.form_sugerencias.selectOption + '<option value="2">Petición</select></div>' +
        '<div class="ui-block-b" style="width: 65%;"><label id="labelSugNSugPreg">' + jsonIdiomas.form_sugerencias.labelSugNSugPreg + '</label><input type="text" value="" id="tipo_sugenrencia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<label id="labelSugPreg">' + jsonIdiomas.form_sugerencias.labelSugPreg +
        '<textarea cols="40" rows="3" id="sugerencias" style="height: 52px;" placeholder="' + jsonIdiomas.form_sugerencias.sugerenciasPlaceholder + '"></textarea>' +
        '<table width="25%" border="0" align="center" cellpadding="10" cellspacing="0">' +
        '<tr>' +
        '<td>' +
        '<div align="center">' +
        '<button type="button" onclick="enviarSugerencia();" id="enviar_sugerencia">' + jsonIdiomas.form_sugerencias.enviar_sugerencia + '</button>' +
        '</div>' +
        '</form>' +
        '</div>';


    $("#divContent").html(html_sug);
    $("#divContent").trigger('create');

}

function displaySummary(param) {

    $("#page_count").hide();

    var html = '';
    if (LOGGED == true) {
        if (CART.length > 0) {
            //console.log("Actualizar div");
            $('.ui-popup').popup('close');

            var div_li_prod = "";

            for (var i = 0; i < CART.length; i++) {
                
                div_li_prod = div_li_prod + "<li></li>";

            }
            
            var htmlHeader = '<div id="lista" style="witdh:90%;"><ul data-role="listview">' +
                '<li data-role="list-divider" style="background-color:#0096D2; font-size:20px; color:white;">' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width:70%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:20%"></div>' +
                '<div class="ui-block-b" style="width:40%">Producto</div>' +
                '<div class="ui-block-v" style="width:40%">Ubicación</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-block-b" style="width:30%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:25%; text-align:center;">Unds</div>' +
                '<div class="ui-block-b" style="width:25%; text-align:center;">Precio</div>' +
                '<div class="ui-block-c" style="width:25%; text-align:center;">Total</div>' +
                '<div class="ui-block-d" style="width:25%; text-align:right;"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li></div>';


            html = htmlHeader + htmlContent + '</ul>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            var n = nodeIds.length + 1;
            updateBackButton(nodeIds[n], nodeNames[n]);
        } else {
            alert("No hay productos");
        }
    } else {

        console.log("No estás logado");
    }
}


function displayFlags(res) {

    console.log("Cargamos el popUp de idiomas");

    var html = '<ul data-role="listview" data-inset="true">';

    var count = res.flags.length;
    var info = res.flags;

    //console.log(info);

    for (var i = 0; i < count; i++) {

        html += '<li data-icon="false">' +
            '<a onclick="changeIdiom(\'' + info[i].shortname + '\',' + info[i].id + ');"><img src="' + info[i].image + '" class="ui-li-icon ui-corner-none">' + info[i].name + '</a>' +
            '</li>';

    }

    html += '</ul>';

    $("#contentPopupIdioma").html(html);
    $("#contentPopupIdioma").trigger('create');

}