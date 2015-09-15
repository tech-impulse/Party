<?php

include('bd.php');
$bd= new BD();
/*
$user = "cess";
$password = 12345678;
*/

if(isset($_POST['user']) && isset($_POST['password'])) {
	$user = $_POST['user'];
	$password = $_POST['password'];
	
	$sel_user = "SELECT * FROM Clients WHERE email='".$user."'";
	$resu = $bd->consultar($sel_user);
	
	if(empty($resu)){
		//no existeix
		$pass_enc = cryptBlowfish($password,7);
		$dat = date('Y-m-d H:m:s');
		$sel_max = "SELECT MAX(id)+1 AS id FROM Clients";
		$max_id = $bd->consultar($sel_max); $idm = $max_id[0]['id'];	
		$ins = "INSERT INTO Clients(id,email,password,created) VALUES('".$idm."','".$user."','".$pass_enc."','".$dat."')";
		$bd->modificar($ins);
		$arr = array('result' => 1);
		print_r(json_encode($arr));
	}
	else {
		//ja existeix
		$arr = array('result' => -2);
		print_r(json_encode($arr));
	}
}
else {
	//paràmetres incorrectes
	$arr = array('result' => -1);
	print_r(json_encode($arr));
}

function cryptBlowfish($password, $number = 7) {
    $set_salt = './1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $salt = sprintf('$2a$%02d$', $number);
    for ($i = 0; $i < 22; $i++) {
        $salt .= $set_salt[mt_rand(0, 63)];
    }
    return crypt($password, $salt);
}
?>



