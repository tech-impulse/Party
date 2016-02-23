function translateButtons(idioma) {

    console.log("Cambiamos el idioma " + idioma);
    //$("#popupIdiomas").popup("close");

    switch (idioma) {

    case "en":

        jsonIdiomas = {
            "header": {
                "menu": "Menu",
                "login": "login!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Go to menu"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "How many people will attend the party?",
                "btn_continuar": "NEXT"
            },
            "asistente_disfraces": {
                "select_sexo_button": "Who is the disguise?",
                "btn_continuar": "CONTINUE"
            },
            "pagina_pago": {
                "envio_email": "Send email",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "select_sexo_button": "Who is the disguise?",
                "btn_continuar": "CONTINUE",
                "labelSugNom": "Name:",
                "labelSugNaci": "Birthdate:",
                "labelSugMail": "Email:",
                "labelSugNPob": "Population:",
                "labelSugTelf": "Phone number:",
                "labelSugProv": "Province:",
                "labelSugTipo": "Type suggestion:",
                "labelSugNSugPreg": "On what is the request / suggestion?",
                "sugerenciasPlaceholder": "Write them down here ...",
                "enviar_sugerencia": "Send!",
                "selectOption": "Incidence",
                "labelSugPreg": "Do you have any suggestions?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Checkout"
            },
            "popup_errores": {
                "tituloPopUp": "Products in the cart",
                "tituloBoton": "Empty cart",
                "campo_vacio": "Fill in this field",
                "displayProductos": {
                    "isfiesta_3": "All selects ok",
                    "else": "Select a valid field to continue"
                },
                "evento_click": {
                    "cam_contraseña": "Type a password",
                    "enviar_registro": "Fill in all fields . Thank you",
                    "contra_nocoinciden": "Do not match",
                    "mail_no_valido": "Not a valid adress"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Item price: ",
                "unidades": "units"
            },
            "exclusivoWeb": "EXCLUSIVE WEB!",
            "soloEnWeb": "ONLY WEB"

        }

        //pagina de inicio  
        $('#btn_acceder').text('Access');
        $('#labelInicio').text('Select a store:');
        $('#labelCargando').text('Loading...');

        //header    
        $('#labelCarrito').text('Tú carrito');
        $('#labelItems').text('Artículos');

        //popup login
        $('#labelIniciarSession').text('Log in');
        $('#labelLoginUsuario').text('User');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Password');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Login');
        $('#registrarse').text('Singup');
        $('#olviContra').text('¿Has olvidado la contraseña?');


        //popup cambio de pass
        $('#tituloCamContra').text('Forgot your password?');
        $('#labelSuUsuario').text('Username');
        $('#cam_contraseña').text('Request a new password!');
        $('#volver').text('Back');

        //pop up registro
        $('#labelRegistrarse').text("Sign up");
        $('#usernamesignup').text("User");
        $('#emailsignup').attr("placeholder", 'Ex. myemail@email.com');
        $('#labelpasswordsignup').text("Password");
        $('#passwordsignup').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirm password");
        $('#passwordsignup_confirm').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelcodpos').text("Postal Code");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Create account");
        $('#labelYAesClient').text("Already a customer?");
        $('#linkIniSes').text("Login");


        break;

    case "es":

        jsonIdiomas = {
            "header": {
                "menu": "Menú",
                "login": "identificarse!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR"
            },
            "pagina_pago": {
                "envio_email": "Enviar correo",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre:",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidencia",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Realizar pedido"
            },
            "popup_errores": {
                "labelCargando": "Cargando...",
                "tituloPopUp": "Productos en la cesta",
                "tituloBoton": "Vaciar carro",
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "exclusivoWeb": "EXCLUSIVO WEB!",
            "soloEnWeb": "SOLO WEB"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');
        $('#labelInicio').text('Seleccione una tienda:');
        $('#labelCargando').text('Cargando...');

        //header 
        $('#labelCarrito').text('Your cart');
        $('#labelItems').text('Items');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");

        break;

    case "ca":

        jsonIdiomas = {
            "inicio": {
                "labelInicio": "Seleccioneu una botiga:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menú",
                "login": "identificar-se!",
                "labelProductos": " Prod",
            },
            "menu_lateral": {
                "menu": "Tornar al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Quantes persones assistiran a la festa?",
                "btn_continuar": "CONTINUAR"
            },
            "pagina_pago": {
                "envio_email": "Enviar correo",
                "envio_casa": ""
            },
            "asistente_disfraces": {
                "select_sexo_button": "Per a qui és la disfressa?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Quina talla té?"
            },
            "form_sugerencias": {
                "labelSugNom": "Nom:",
                "labelSugNaci": "Data de naixement:",
                "labelSugMail": "Correu electrònic:",
                "labelSugNPob": "Població:",
                "labelSugTelf": "Teléfon:",
                "labelSugProv": "Província:",
                "labelSugTipo": "Tipus de suggeriment:",
                "labelSugNSugPreg": "Sobre que és la petició / suggeriment?",
                "sugerenciasPlaceholder": "Escriviu aquí ...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidència",
                "labelSugPreg": "Té algun suggeriment?"
            },

            "pop_checkOut": {
                "realizar_pedido": "Fer la comanda"
            },
            "popup_errores": {
                "labelCargando": "Carregant...",
                "tituloPopUp": "Productes en la cistella",
                "tituloBoton": "Buidar carro",
                "campo_vacio": "Ompli aquest camp",
                "displayProductos": {
                    "isfiesta_3": "Tots els selects ok",
                    "else": "Seleccioni un camp valid per poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Introduïu una contrasenya",
                    "enviar_registro": "Ompli tots els camps . Gràcies",
                    "contra_nocoinciden": "No coincideixen",
                    "mail_no_valido": "Adreça no vàlida"
                },
                "opcion_no_valida": "Seleccioneu una opció vàlida"
            },
            "popup_info_item": {
                "alternativos": "Productes alternatius",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total article: ",
                "unidades": "unitats"
            },
            "exclusivoWeb": "EXCLUSIU WEB!",
            "soloEnWeb": "NOMÉS WEB"

        }

        //pagina de inicio    
        $('#btn_acceder').text('Accedir');
        $('#labelInicio').text('Seleccioneu una botiga:');
        $('#labelCargando').text('Carregant...');

        //header 
        $('#labelCarrito').text('La cistella');
        $('#labelItems').text('Articles');

        //popup login    
        $('#labelIniciarSession').text('Inicia sessió');
        $('#labelLoginUsuario').text('Usuari');
        $('#usrnm').attr("placeholder", 'Correu');
        $('#labelLoginContra').text('Contrasenya');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Inicia sessió');
        $('#registrarse').text('Registrar');
        $('#olviContra').text('¿Ha oblidat la contrasenya?');

        //popup cambio de pass
        $('#tituloCamContra').text('Canvi de contrasenya');
        $('#labelSuUsuario').text('El seu usuari');
        $('#cam_contraseña').text('¡Demanar una nova contrasenya!');
        $('#volver').text('Tornar');

        //pop up registro
        $('#labelRegistrarse').text("Registra't");
        $('#usernamesignup').text("Usuari");
        $('#emailsignup').attr("placeholder", 'Ex. myemail@email.com');
        $('#labelpasswordsignup').text("Contrasenya");
        $('#passwordsignup').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contrasenya");
        $('#passwordsignup_confirm').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelcodpos').text("Codi postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crea un compte");
        $('#labelYAesClient').text("Ja és client?");
        $('#linkIniSes').text("Inicia sessió");


        break;

    case "pr":

        jsonIdiomas = {
            "header": {
                "menu": "Menú"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?"
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidència",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Checkout"
            },
            "popup_errores": {
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "exclusivoWeb": " EXCLUSIVO WEB!",
            "soloEnWeb": "SOLO WEB"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');
        $('#labelCargando').text('Cargando...');

        //header 
        $('#labelCarrito').text('Tú carrito');
        $('#labelItems').text('Artículos');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");


        break;

    case "fr":

        jsonIdiomas = {
            "header": {
                "menu": "Menú"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?"
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "popup_errores": {
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "exclusivoWeb": "EXCLUSIF WEB!",
            "soloEnWeb": "SOLO WEB"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');

        //header 
        $('#login').text('identificarse!');
        $('#labelProductos').text(' Prod');
        $('#labelCargando').text('Chargement...');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");


        break;


    }


}