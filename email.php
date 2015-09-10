<?php


include('bd.php');
$bd= new BD();





if( isset($_POST['user']) && isset($_POST['password']) ) {

//function enviarCorreo($bd,$to,$info,$alerta,$cuenta,$comp_aux,$mediaInteraccion,$cuerpo_email){

    $mail = new PHPMailer();

    //$res = get_body($bd,$info,$alerta,$cuenta,$compe,$mediaInteraccion);

    $body = $cuerpo_email;

    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
                                               // 1 = errors and messages
                                               // 2 = messages only
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Host       = "mail.esadecreapolis.com"; // sets the SMTP server
    $mail->Port       = 25;                    // set the SMTP port for the GMAIL server
    $mail->Username   = "team@epsilontec.com"; // SMTP account username
    $mail->Password   = "Es9876";        // SMTP account password

    $mail->SetFrom('alertas@epsilontec.com', 'Epsilon Tecnologies Alertas');

    $mail->AddReplyTo("alertas@epsilontec.com","Epsilon Tecnologies Alertas");

    $mail->Subject    = "Icarus Alerts ($comp_aux)"; //"Icarus Alerts: ".$nom_comp.": ".$inter." interacciones";

    $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

    $mail->MsgHTML( $body );

    $address = $to;

    $mail->AddAddress($address);

    $mail->addBCC("alberto.alarcon@esadecreapolis.com");

    $mail->addCC("mcarrillo@epsilontec.com");

    $mail->addCC("danieldf@epsilontec.com");

    $mail->isHTML(true);
    
    //$mail->CharSet = 'ISO-8859-1';

    if( !$mail->Send() ) {                             //////////////////////////////////////////////
      echo "Mailer Error: " . $mail->ErrorInfo;        //
    } else {                                           //comentando estas lineas podemos hacer pruebas para ver lo que se envia, sin necesidad de enviar emails
      echo "<br>Message sent!<br>";                    //
    }                                                  //////////////////////////////////////////////

    //echo "Enviar correo fin<br>";

}

?>