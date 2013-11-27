/* Copyright 2013 by Simo Haakana http://www.github.com/siimeon */
/* All Rights Reserved */

/* Show and hide part of menu */

$(document).ready(function(){
	var one = false;
	var two = false;
	var three = false;
	var four = false;
	var five = false;
	var project = false;
	$('#btn1').on('click',function (e) {
		if (one == true){
			$('#aside_1').slideUp("slow");
			one = false;
		}else{
			$('#aside_1').slideDown("slow");
			one = true;
		}
	});
	$('#btn2').on('click',function (e) {
		if (two == true){
			$('#aside_2').slideUp("slow");
			two = false;
		}else{
			$('#aside_2').slideDown("slow");
			two = true;
		}
	});
	$('#btn3').on('click',function (e) {
		if (three == true){
			$('#aside_3').slideUp("slow");
			three = false;
		}else{
			$('#aside_3').slideDown("slow");
			three = true;
		}
	});
	$('#btn4').on('click',function (e) {
		if (four == true){
			$('#aside_4').slideUp("slow");
			four = false;
		}else{
			$('#aside_4').slideDown("slow");
			four = true;
		}
	});
	$('#btn5').on('click',function (e) {
		if (five == true){
			$('#aside_5').slideUp("slow");
			five = false;
		}else{
			$('#aside_5').slideDown("slow");
			five = true;
		}
	});
	$('#btn6').on('click', function(e){
		window.open('css/harjoitus3.css');
	});
	$('#btn7').on('click', function(e){
		window.open('js/harjoitus3.js');
	});
	$('#btn8').on('click', function(e){
		window.open('js/harjoitus4.js');
	});
	$('#btn9').on('click', function(e){
		window.open('http://partiokuvia.kuvat.fi');
	});
	$('#btn_p').on('click',function (e) {
		if (project == true){
			$('#aside_p').slideUp("slow");
			project = false;
		}else{
			$('#aside_p').slideDown("slow");
			project = true;
		}
	});
});
