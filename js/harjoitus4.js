/* harjoitus4.js */
$(document).ready(function(){
	var ctx = $('#canvas4')[0].getContext("2d");
	var canX = 1200;
	var canY = 600;
	var loop = null;
	var items = new Array();

	function Player(speed, positionX, positionY){
		this.speed = speed;
		this.positionX = positionX;
		this.positionY = positionY;
		this.img = new Image();
		this.img.src = 'img/sailboat.png';
		this.img.onload = function(){
	  		ctx.drawImage(this, positionX, positionY, 50, 50);
	  	}
	  	this.get_img = function(){
	  		return this.img;
	  	}
	  	this.get_x = function(){
	  		return positionX;
	  	}
	  	this.get_y = function(){
	  		return positionY;
	  	}
	  	this.move = function(){}
	  	this.mouseEvent = function(x, y){
	  		return true
	  	}
	  	this.hit = function(x,y){}
		$('body').keydown(function( event ) {
			if ( event.which == 37 || event.which == 65) {
				if (positionX > 0){
					positionX -= speed;
				}
			}
			if (event.which == 39 || event.which == 68){
				if (positionX < 1150){
					positionX += speed;
				}
			}
			if (event.which == 38 || event.which == 87){
				if (positionY > 0){
					positionY -= speed;
				}
			}
			if (event.which == 40 || event.which == 83){
				if (positionY < 550){
					positionY += speed;
				}
			}
		});
	}

	function Enemy(speed, positionX, positionY){
		this.speedX = speed;
		this.speedY = speed;
		this.positionX = positionX;
		this.positionY = positionY;
		this.img = new Image();
		this.img.src = 'img/boat.png';
		this.img.onload = function(){
	  		ctx.drawImage(this, positionX, positionY, 50, 50);
	  	}
	  	this.get_img = function(){
	  		return this.img;
	  	}
	  	this.get_x = function(){
	  		return positionX;
	  	}
	  	this.get_y = function(){
	  		return positionY;
	  	}
	  	this.mouseEvent = function(x, y){
	  		if (x < positionX || x > positionX+50){
	  			if (y < this.positionY || y > this.positionY+50){
	  				return true;
	  			}
	  		}
	  		return false;
	  	}
	  	this.hit = function(x, y){
	  		if (positionX-50 <= x && positionX > x){
	  			if (positionY-50 <= y && positionY > y){
		  			this.speedY = -this.speedY;
		  			this.speedX = -this.speedX;
		  		}
		  		if (positionY+50 >= y && positionY < y){
		  			this.speedY = -this.speedY;
		  			this.speedX = -this.speedX;
		  		}
	  		}
	  		if (positionX+50 >= x && positionX < x){
	  			if (positionY-50 <= y && positionY > y){
		  			this.speedY = -this.speedY;
		  			this.speedX = -this.speedX;
		  		}
		  		if (positionY+50 >= y && positionY < y){
		  			this.speedY = -this.speedY;
		  			this.speedX = -this.speedX;
		  		}
	  		}
	  	}
	  	this.move = function(){
	  		// x-transition
	  		positionX += this.speedX;
	  		positionY += this.speedY;
	  		if (positionX+50 >= canX){
	  			this.speedX = -this.speedX;
	  		}
	  		if (positionX <= 0){
	  			this.speedX = -this.speedX;
	  		}
	  		if (positionY+50 >= canY){
	  			this.speedY = -this.speedY;
	  		}
	  		if (positionY <= 0){
	  			this.speedY = -this.speedY;
	  		}
	  	}
	}
	
	function init(){
		ctx = $('#canvas4')[0].getContext("2d");
		items[0] = new Player(5, canX/2, canY/2);
		items[1] = new Enemy(1, 100, 100);
		items[2] = new Enemy(3, 500, 70);
		items[3] = new Enemy(1, 150, 200);
		items[4] = new Enemy(2, 300, 500);
		loop = setInterval(draw, 10);
	}

	function draw(){
		ctx.clearRect(0,0,canX,canY);
		for (i=0; i<items.length; i++){
			ctx.drawImage(items[i].get_img(), items[i].get_x(), items[i].get_y(), 50, 50);
			items[i].move();
			for (j=0; j<items.length; j++){
				if (i !== j){
					items[i].hit(items[j].get_x(), items[j].get_y());
				}
			}
			
		}
	}

	$("#canvas4").click(function (e) {
	    var mouseX = e.pageX - $("#canvas4").offset().left;
	    var mouseY = e.pageY - $("#canvas4").offset().top;
		console.log(mouseX);
		console.log(mouseY);
		for (i=0; i<items.length; i++){
			var hit = items[i].mouseEvent(mouseX, mouseY);
			if (hit == false){
				items.splice(i, 1);
				console.log('hit');
			}
		}
	});
	var pause = false;
	var first = true;
	$('body').keydown(function( event ) {
		if ( event.which == 80) {
			if (pause == true){
				loop = setInterval(draw, 10);
				pause = false;
			}
			else{
				clearInterval(loop);
				pause = true;
			}
		}
		if ( event.which == 83) {
			if (first == true){
				init();
				first = false;
			}
		}
	});
});