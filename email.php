<?php


include('bd.php');
require_once('class.phpmailer.php');
$bd= new BD();


if( isset($_POST['user']) ) {
    
    $userName = $_POST['user'];
    
    $newPassword = getRandomCode();
    

    //function enviarCorreo($bd,$to,$info,$alerta,$cuenta,$comp_aux,$mediaInteraccion,$cuerpo_email){

    $mail = new PHPMailer();

    //$res = get_body($bd,$info,$alerta,$cuenta,$compe,$mediaInteraccion);

    $body = '<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
    <style>
        @font-face {
            font-family: "boldcond ";
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
                                    <span style="font-size:14px; ">Hola '+$userName+', </span>
                                    <br>
                                    <span style="font-size:14px; ">Hemos recibido una petición de cambio de contraseña, su nueva contraseña es:'+$newPassword+'
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

    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                               // 1 = errors and messages
                                               // 2 = messages only
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Host       = "mail.esadecreapolis.com"; // sets the SMTP server
    $mail->Port       = 25;                    // set the SMTP port for the GMAIL server
    $mail->Username   = "team@epsilontec.com"; // SMTP account username
    $mail->Password   = "Es9876";        // SMTP account password

    $mail->SetFrom('partyfiesta@info.com', 'Party Fiesta');

    $mail->AddReplyTo("partyfiesta@info.com", "Party Fiesta");

    $mail->Subject    = "Cambio de contraseña"; //"Icarus Alerts: ".$nom_comp.": ".$inter." interacciones";

    $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

    $mail->MsgHTML( $body );

    $address = $to;

    $mail->AddAddress($userName);

    $mail->isHTML(true);
    
    //$mail->CharSet = 'ISO-8859-1';

    if( !$mail->Send() ) {                             //////////////////////////////////////////////
      echo "Mailer Error: " . $mail->ErrorInfo;        //
    } else {                                           //comentando estas lineas podemos hacer pruebas para ver lo que se envia, sin necesidad de enviar emails
      echo "<br>Message sent!<br>";                    //
    }                                                  //////////////////////////////////////////////

    //echo "Enviar correo fin<br>";

}


function getRandomCode(){
    
    $an = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $su = strlen($an) - 1;
    return substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1) .
            substr($an, rand(0, $su), 1);
    
}

?>