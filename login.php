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
		
	if(!empty($resu)){
		$client = array();
		$pass_bbdd = $resu[0]['password'];
		if (crypt($password, $pass_bbdd) == $pass_bbdd) {
			$client['confirmed'] = $resu[0]['confirmed'];
			$client['blocked'] = $resu[0]['blocked'];
			
			if($client['confirmed']==1 && $client['blocked']==0) {
				$arr = array('result' => 1);
				$client['id'] = $resu[0]['id'];
				$client['email'] = utf8_encode($resu[$i]['email']);
				$client['password'] = utf8_encode($resu[$i]['password']);
				$client['province'] = utf8_encode($resu[0]['province']);
				$client['country'] = utf8_encode($resu[0]['country']);
				$client['name'] = utf8_encode($resu[0]['name']);
				$client['surname'] = utf8_encode($resu[0]['surname']);
				$client['address'] = utf8_encode($resu[0]['address']);
				$client['postalCode'] = utf8_encode($resu[0]['postalCode']);
				$client['phone'] = utf8_encode($resu[0]['phone']);
				$client['city'] = utf8_encode($resu[0]['city']);
				$client['NIN'] = utf8_encode($resu[0]['NIN']);
				$arr['info'] = $client;
				print_r(json_encode($arr));
			}
			else {
				$arr = array('result' => 0);
				print_r(json_encode($arr));
			}
		}
	}
	else {
		$arr = array('result' => 0);
		print_r(json_encode($arr));
	}
}
else {
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



