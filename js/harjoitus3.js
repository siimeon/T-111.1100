/* Copyright 2013 by Simo Haakana http://www.github.com/siimeon */
/* All Rights Reserved */
$(document).ready(function(){
	/*Tehtävä 1*/
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
	/*Tehtävä 2*/
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
	/*Tehtävä 3*/
	$('body').append('<div data-bg-color="Hiekanruskea" id="cordinate" style="border: 1px solid black;"></div>');
	$('#cordinate').css('height', '30px');
	$('#cordinate').css('width', '300px');
	$('#cordinate').css('font-size', '18px');
	$('#cordinate').css('border-radius', '10px');
	$('#cordinate').css('color', 'white');
	$('#cordinate').css('position', 'absolute');
	$('#cordinate').css('padding-left', '20px');
	$('#cordinate').css('padding-top', '10px');
	$('#cordinate').css('z-index', '100');
	$('body').mousemove(function( event ) {
		$('#cordinate').css('left', event.pageX+10);
		$('#cordinate').css('top', event.pageY);
		$('#cordinate').text('X-axel: '+event.pageX + 'px  Y-axal: '+event.pageY+'px');
	});
	/*Tehtävä 4*/
	$('nav').append('<div id="news" class="marquee" style="display: none;"></div>');
	$('#news').delay(5000).slideDown('slow');
	var fourSpace = '&nbsp;&nbsp;&nbsp;&nbsp;';
	var space = '&nbsp;';
	var newsDiv = '';
	function News(Ntitle, news, date){
		this.news_title = Ntitle;
		this.news = news;
		this.date = date;
	}
	News.prototype.add = function(){
    	newsDiv = newsDiv+fourSpace+fourSpace+this.news_title+space+space+this.date+fourSpace+this.news;
	}
	var uutinen1 = new News('Syyskokous', 'Syyskokous järjestettiin Harjunalustan seurakuntakodilla ja uudeksi lippukunnan johtajaksi valittii Emilia Sartamo. Katso kokous pöytkirja <a style="color:white;" href="https://docs.google.com/document/d/1EKJTP1bclzJ3ieto3tX-ECyghK8hM7xrmhSvEKVtHjs/edit?usp=sharing">tästä</a>', '14.10');
	var uutinen2 = new News('Rekisteröityminen', 'Lippukunta ylpeänä ilmoittaa että Harjunalustan Siniveljet Ry on perustettu 20.08.2013.', '20.08');
	uutinen1.add();
	uutinen2.add();
	$('#news').append(newsDiv);
});

