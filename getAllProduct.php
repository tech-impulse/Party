<?php
include('bd.php');
$bd= new BD();

$origen = 2;
$idioma = 1;
$idprod = '193368';
$store = 'PRTF0003';
$storeCent = 'PRTF0029';

/*
if(isset($_POST['id']) && isset($_POST['origin']) && isset($_POST['lang']) && isset($_POST['store']) && isset($_POST['product'])) {
	$idnode = $_POST['id'];
	$origen = $_POST['origin'];
	$idioma = $_POST['lang'];
	$store = $_POST['store'];
	$idprod = $_POST['product'];
	*/
	$sel_tarifa = "SELECT tarifa FROM Almacen WHERE id_tienda='".$store."'";
	$tarifa = $bd->consultar($sel_tarifa);
	$tarifa = $tarifa[0]['tarifa'];
	
	$producto = array();
	//INFORMACIÓN BÁSICA DEL PRODUCTO
	$sel_idioma_prod = "SELECT ixp.nombre, ixp.nombre_corto, ixp.definicion, p.estado, p.linkint, p.linkext FROM Idiomas_x_Producto AS ixp, Products AS p WHERE ixp.idproducto=p.SKU AND ixp.idproducto='".$idprod."' AND ixp.ididioma='".$idioma."'";
	$prod_id = $bd->consultar($sel_idioma_prod);
	//echo "<pre>"; print_r($prod_id); echo "</pre>";
	$sel_usos_prod = "SELECT * FROM Usos_x_Producto WHERE idproduct='".$idprod."'";
	$prod_usos = $bd->consultar($sel_usos_prod);
				
	//USOS DEL PRODUCTO
	$usos_prod = array();
	if(!empty($prod_usos)) {
		for($m=0;$m<count($prod_usos);$m++) {
			$usos_prod[$m]['id'] = $prod_usos[$m]['uso'];
			$usos_prod[$m]['idonity'] = $prod_usos[$m]['idoneidad'];
			}
	}
	//CARACTERÍSTICAS PRODUCTO
	$sel_cars_prod = "SELECT * FROM Caracteristicas_x_Producto WHERE idproducto='".$idprod."'";
	$prod_cars = $bd->consultar($sel_cars_prod);
		
	$cars_prod = array();
	if(!empty($prod_cars)) {
		for($m=0;$m<count($prod_usos);$m++) {
			$cars_prod[$m]['id'] = $prod_cars[$m]['idcar'];
			$cars_prod[$m]['idonity'] = $prod_cars[$m]['idoneidad'];
		}
	}
	//STOCK EN TIENDA
	$sel_stock_prod = "SELECT stock FROM Stocks WHERE SKU='".$idprod."' AND name='".$store."'";
	$stock_prod = $bd->consultar($sel_stock_prod);
	$stock_x_product = 0;
	if(!empty($stock_prod)) {
		$stock_x_product = $stock_prod[0]['stock'];
	}
			
	//STOCK EN CENTRAL
	$sel_stock_prod_c = "SELECT stock FROM Stocks WHERE SKU='".$idprod."' AND name='".$storeCent."'";
	$stock_prod_c = $bd->consultar($sel_stock_prod_c);
	$stock_x_product_c = 0;
	if(!empty($stock_prod_c)) {
		$stock_x_product_c = $stock_prod_c[0]['stock'];
	}
	
	$sel_price_rg = "SELECT basePrice,taxPercent,taxPrice,totalPrice FROM ProductRate WHERE SKU='".$idprod."' AND region='".$tarifa."'";
	//echo $sel_price_rg;
	$price_rg = $bd->consultar($sel_price_rg);
	$price_prod_rg = array();
	if(!empty($price_rg)) {
		$price_prod_rg['totalPrice'] = $price_rg[0]['totalPrice'];
		$price_prod_rg['basePrice'] = $price_rg[0]['basePrice'];
		$price_prod_rg['taxPercent'] = $price_rg[0]['taxPercent'];
		$price_prod_rg['taxPrice'] = $price_rg[0]['taxPrice'];
	}
	//FALTEN CÀLCULS DEL PREU TOTAL (PRECIO BASE + PRECIO IMPUESTOS)
		
	//POSICIO PRODUCTE
	$sel_pos_prod = "SELECT grupo,modulo,posicion FROM Productos_x_Tienda WHERE sku LIKE '".$idprod."' AND almacen='".$store."'";
	$pos_prod = $bd->consultar($sel_pos_prod);
	if(!empty($pos_prod)) {
		$posicion = array();
		$posicion['section']= $pos_prod[0]['grupo'];
		$posicion['module']= $pos_prod[0]['modulo'];
		$posicion['position']= $pos_prod[0]['posicion'];
	}				
				
	$producto['sku']=$idprod;
	$producto['name']=$prod_id[0]['nombre'];
	$producto['short_name']=$prod_id[0]['nombre_corto'];
	$producto['definition']=$prod_id[0]['definicion'];
	$producto['linkext']=$prod_id[0]['linkext'];
	$producto['linkint']=$prod_id[0]['linkint'];
	$producto['state']=$prod_id[0]['estado'];
	$producto['stock_x_store']=$stock_x_product;
	$producto['stock_x_central_store']=$stock_x_product_c;
	$producto['price_x_region']=$price_prod_rg;
	$producto['position_x_store']=$posicion;
	$producto['uses']=$usos_prod;
	$producto['caracteristics']=$cars_prod;
										
	$arr = array('result' => 1);
	$arr['info'] = $producto;
	print_r(json_encode($arr));
	/*
}
else {
	$arr = array('result' => -1);
	print_r(json_encode($arr));
}
*/
?>

