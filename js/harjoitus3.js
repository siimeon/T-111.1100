/* Copyright 2013 by Simo Haakana http://www.github.com/siimeon */
/* All Rights Reserved */


$(document).ready(function(){
	$('body').keydown(function( event ) {
		if ( event.which == 49 ) {
			window.location.replace("index.html");
		}
		if (event.which == 50){
			window.location.replace("harjoitukset.html");	
		}
		if (event.which == 51){
			window.location.replace("projektityo.html");
		}
	});
	var font_size = 22;
	$('#fplus').on('click',function (e) {
		font_size = $('section').css('font-size');
		font_size = font_size.replace('px', '');
		font_size = parseInt(font_size)+2;
		$('section').css('font-size', font_size+'px');
		console.log(font_size);
	});
	$('#fminus').on('click',function (e) {
		font_size = $('section').css('font-size');
		font_size = font_size.replace('px', '');
		font_size = parseInt(font_size)-2;
		$('section').css('font-size', font_size+'px');
		console.log(font_size);
	});
	$('body').append('<div data-bg-color="Hiekanruskea" id="cordinate"></div>');
	$('#cordinate').css('height', '50px');
	$('#cordinate').css('width', '300px');
	$('#cordinate').css('border-radius', '10px');
	$('#cordinate').css('border-width', '5px');
	$('#cordinate').css('border-color', 'white');
	$('#cordinate').css('color', 'white');
	$('#cordinate').css('position', 'absolute');
	$('#cordinate').css('padding-left', '20px');
	$('#cordinate').css('padding-top', '10px');
	$('#cordinate').css('z-index', '100');
	$('body').mousemove(function( event ) {
		$('#cordinate').css('left', event.pageX);
		$('#cordinate').css('top', event.pageY);
		$('#cordinate').text('X-axel: '+event.pageX + 'px  Y-axal: '+event.pageY+'px');
	});
	
});