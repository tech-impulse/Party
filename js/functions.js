function checkOut() {
    if (LOGGED == true) {
        if (CART.length > 0) {} else {
            console.log("NO hay productos");
        }

    } else {
        $('.ui-popup').popup('close');
        setTimeout(function () {
            console.log("Open pop");
            $("#popupLogin").popup("open");
        }, popupTimeout);
        

        console.log("No estás logado");
    }

}