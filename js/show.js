/* Copyright 2013 by Simo Haakana http://www.github.com/siimeon */
/* All Rights Reserved */

/* Show and hide part of menu */

$(document).ready(function(){
	/* Dropdown menu handeler */
	var t = true;
	$('#open_btn').on('click',function (e) {
		if (t == true){
			$('#show_menu').slideDown("slow");
			t = false;
		}else{
			$('#show_menu').slideUp("slow");
			t = true;
		}
	});
	/* Smartphone menu handeler */
	var j = true;
	$('#mobile_menu').on('click',function (e) {
		if (j == true){
			$('[data-rwd="mobile_hide"]').show("slow");
			j = false;
		}else{
			$('[data-rwd="mobile_hide"]').hide("slow");
			j = true;
			$('#show_menu').slideUp("slow");
			t = true;
		}
	});
	/*
	$(window).scroll(function() {
   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
       		$('footer').css('z-index', '2');
   		}
   		else{
   			$('footer').css('z-index', '-2');
   		}
	});
	*/
	
});