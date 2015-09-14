function checkOut(param) {
    console.log(param.onclick);
    if (LOGGED == true) {
        if (CART.length > 0) {
            var html = '<div id="page_send" style="display:none">' +
                '<center>' +
                '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                '<br>' +
                '<a style="width:300px" data-role="button" data-icon="bullets" data-iconpos="right" data-theme="b" onclick="">Mostrar listado para recoger</a>' +
                '<br>' +
                '<a style="width:300px" data-role="button" data-icon="home" data-iconpos="right" data-theme="b" onclick="">Enviar a Casa</a>' +
                '<br>' +
                '<a style="width:300px" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b" onclick="">Recoger en Mi Tienda</a>' +
                '</center>' +
                '</div>';
            nodeIds.push(originNode);
            nodeNames.push(originName);
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');

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