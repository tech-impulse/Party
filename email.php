<?php

include('bd.php');
require  'class.phpmailer.php';
require "class.smtp.php";


$bd= new BD();

$user='alberto.alarcon@esadecreapolis.com';

/*$_POST['user']*/

if( isset($user) ) {
    
    //$user = $_POST['user'];
    
    $sel_user = "SELECT id,count(id) as n FROM Clients WHERE email='".$user."'";
	  $res = $bd->consultar($sel_user);
    
    //echo "Estamos dentro";
        
    if( $res[0]['n'] > 0 ){
        
        //echo "Usuario existe<br>";
        
        $newPassword = getRandomCode();
            
        $aux = explode("@" , $user);
        $userName = $aux[0];
        
        $email = $user;
        
        //echo "Antes de enviar <br>";

        $respuestaCorreo = enviar_correo($email,$userName,$newPassword);

        //echo "Despues de enviar <br>";
        
        if($respuestaCorreo == 1){
                       
            //una vez enviado el correo actualizamos la base de datos
            $encripNewPass = cryptBlowfish($newPassword);

            $upd = "UPDATE Clients SET password='".$encripNewPass."' WHERE id=".$res[0][id];
            $bd->modificar($upd);
            
            //echo "se ha enviado";
             
            $arr = array('password' => $newPassword,'result' => 1); //correo enviado
            print_r(json_encode($arr));
        
        }else{
            
            echo "no se ha enviado";
            $arr = array('result' => 0); //correo no enviado
            print_r(json_encode($arr));
        
        }
                  
    }else{
    
        $arr = array('result' => -1); //no tenemos el correo del usuario
        print_r(json_encode($arr));
    
    }
    
}


function getRandomCode(){
    
    $an = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $su = strlen($an) - 1;
    return substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1);
    
}

function cryptBlowfish($password, $number = 7) {
    $set_salt = './1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $salt = sprintf('$2a$%02d$', $number);
    for ($i = 0; $i < 22; $i++) {
        $salt .= $set_salt[mt_rand(0, 63)];
    }
    return crypt($password, $salt);
}


function enviar_correo($email,$userName,$newPassword){
    
    $mail = new PHPMailer();
    
    $body = '<html>

        <head>
            <meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1">
            <style>
                @font-face {
                    font-family: "boldcond";
                    src: url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/boldcond/MyriadPro-BoldCond.eot ");
                    src: url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/boldcond/MyriadPro-BoldCond.eot?#iefix ") format("embedded-opentype "), url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/boldcond/MyriadPro-BoldCond.woff ") format("woff "), url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/boldcond/MyriadPro-BoldCond.ttf ") format("truetype ");
                    font-weight: normal;
                    font-style: normal;
                }

                @font-face {
                    font-family: "light ";
                    src: url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/light/MyriadPro-Light.eot ");
                    src: url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/light/MyriadPro-Light.eot?#iefix ") format("embedded-opentype "), url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/light/MyriadPro-Light.woff ") format("woff "), url("http://apis2.epsilontec.com/sistema_alertas/Icarus_Alerts/tipo/light/MyriadPro-Light.ttf ") format("truetype ");
                    font-weight: normal;
                    font-style: normal;
                }
            </style>
        </head>

        <body style="background:#ffffff;color:#4d4946; font-family:Arial;font-size:14px; ">

            <table style="background-color:#FFFFFF; border-collapse:collapse; " align="center " cellpadding="0 " cellspacing="0 " width="600 ">
                <tbody>
                    <tr>
                        <td>
                            <table style="background-color:#FFFFFF;border-collapse:collapse; " cellpadding="0 " cellspacing="0 " width="600 ">
                                <tbody>
                                    <tr>
                                        <td colspan="2 "><img src="css/icons/logo.png" alt="logo " /></td>
                                    </tr>

                                    <tr>
                                        <td colspan="2 " style="padding-top:20px;padding-right:20px; padding-bottom:20px; ">
                                            <span style="font-family:Arial; font-size:30px;font-weight:normal; ">Petición de cambio de contraseña
                                                    </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table style="background-color:#FFFFFF;border-collapse:collapse; " cellpadding="0 " cellspacing="0 " width="600 ">
                                <tbody>
                                    <tr>
                                        <td colspan="5 " style="font-family:Arial; font-weight:normal; font-size:13px;padding-top:10px;padding-bottom:8px;color:#373a41; ">
                                            <span style="font-size:14px; ">Hola '.$userName.', </span>
                                            <br>
                                            <span style="font-size:14px; ">Hemos recibido una petición de cambio de contraseña, su nueva contraseña es:'.$newPassword.'
                                            </span>
                                            <span style="font-size:14px; "><br>Que tenga un buen día,
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                </tbody>

                                <table style="padding-bottom:0px;margin-bottom:0px;background-color:#E6E6E6;border-collapse:collapse; " cellpadding="0 " cellspacing="0 " width="600 ">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href="http://www.epsilontec.com "><img src="" alt="" /></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </td>
                        </tr>

                </tbody>
                </table>
        </body>

        </html>';
    
    //$body = "Hola";

    //echo $body;

    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                               // 1 = errors and messages
                                               // 2 = messages only
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Host       = "zimbra.esadecreapolis.com"; // sets the SMTP server
    //$mail->Port       = 25;                    // set the SMTP port for the GMAIL server
    $mail->Username   = "notificaciones@youtter.com"; // SMTP account username
    $mail->Password   = "Ap123456";        // SMTP account password

    $mail->From = 'notificaciones@youtter.com';

    $mail->FromName = 'Party Fiesta';

    $mail->AddAddress($email);

    $mail->isHTML(true);

    $mail->Subject    = "Cambio de contraseña"; 

    $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

    $mail->MsgHTML($body);

    $mail->isHTML(true);
    
    //$mail->CharSet = 'ISO-8859-1';

    //echo "Antes de enviar3 <br>";
    
    $confirmar = $mail->Send();

    //echo "Antes de enviar4 <br>";

    if( !$confirmar ) {                             //////////////////////////////////////////////
      //echo "Mailer Error: " . $mail->ErrorInfo;        //
      return 0;
    } else {                                           //comentando estas lineas podemos hacer pruebas para ver lo que se envia, sin necesidad de enviar emails
      //echo "<br>Message sent!<br>";                    //  
      return 1;
    }                                                  //////////////////////////////////////////////

}

?>