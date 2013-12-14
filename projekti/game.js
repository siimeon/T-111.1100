/* Copyright 2013 by Patric Patoila and Simo Haakana */
/* All Rights Reserved */

var stage;
var queue;
var score;
var tkr = new Object;

var left = false; //left, up, right and down are buttons are not pressed and true when they are pressed
var up1 = false;
var up2 = false;
var up3 =  false;
var up4 = false;
var up5 = false;
var right = false;
var down = false;
var enemyCount = 0;
var enemyArray = new Array();
var player;
var rand;
var gamegoing = false;
var pause_text;
var pause_continue;
var pause_mainmenu;
var pause_restart;
var enemySpeed;
var playerSpeed;
var count;

function init() {
	stage = new createjs.Stage("game");
	queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", handleFileLoad);
	queue.addEventListener("complete", playMusic);
	queue.loadManifest([{id: "bg", src: "projekti/img/forestbackground.png"}, {id: "tree", src: "projekti/img/tree.png"}, {id: "player1", src: "projekti/sprite/runningGrant.png"}, {id: "music", src: "projekti/sounds/JungleB.mp3"},{id: "hop", src: "projekti/sounds/hop.mp3"},{id: "crash", src: "projekti/sounds/crash.wav"}, {id: "rock", src: "projekti/img/smallrock.png"}, {id: "bird", src: "projekti/img/bird.png"}, {id: "start_btn", src: "projekti/img/btn/start_btn.png"}, {id: "instructions_btn", src: "projekti/img/btn/instructions_btn.png"}, {id: "credits_btn", src: "projekti/img/btn/credits_btn.png"}, {id: "restart_btn", src: "projekti/img/btn/restart_btn.png"}, {id: "mainmenu_btn", src: "projekti/img/btn/mainmenu_btn.png"}, {id: "back_btn", src: "projekti/img/btn/back_btn.png"}, {id: "logo", src: "projekti/img/logo.png"}, {id: "gameover", src: "projekti/img/gameover.png"}, {id: "paused", src: "projekti/img/paused.png"}, {id: "continue_btn", src: "projekti/img/btn/continue_btn.png"}]);

};

function handleFileLoad() {
	var loading = new createjs.Text("Loading...", "50px Verdana", "#FFFFFF");
	loading.x = 200;
	loading.y = 140;
	stage.addChild(loading);
	stage.update();
};

function playMusic() {
	createjs.Sound.play("music", {loop:-1, volume: 1});
	mainMenu();
};

function mainMenu() {
	stage.removeAllChildren();

	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var title = new createjs.Bitmap(queue.getResult("logo"));
	var start = new createjs.Bitmap(queue.getResult("start_btn"));
	var instructions = new createjs.Bitmap(queue.getResult("instructions_btn"));
	var credits = new createjs.Bitmap(queue.getResult("credits_btn"));

	title.scaleX = 0.5;
	title.scaleY = 0.5;

	start.x = 50;
	start.y = 120;

	instructions.x = 50;
	instructions.y = 180;

	credits.x = 50;
	credits.y = 240;

	stage.addChild(bitmap, title, start, instructions, credits);
	stage.update();

	start.addEventListener("click", game);
	instructions.addEventListener("click", instructionPage);
	credits.addEventListener("click", creditPage);
	gamegoing = false;
};

function instructionPage() {
	stage.removeAllChildren();

	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var title = new createjs.Text("Instructions", "40px Arial", "#00FF00");
	var text = new createjs.Text("Use WASD keys to guide a lost boy scout through the forest. In the", "20px Arial", "#FFCCFF");
	var text2 = new createjs.Text("forest the boy scout must avoid runnning into rocks and trees. There", "20px Arial", "#FFCCFF");
	var text3 = new createjs.Text("are also very anggressive birds living in the forest which are better left", "20px Arial", "#FFCCFF");
	var text4 = new createjs.Text("alone.", "20px Arial", "#FFCCFF");
	var back = new createjs.Bitmap(queue.getResult("back_btn"));

	title.x = 220;
	text.y = 100;
	text.x = 5;
	text2.y = 120;
	text2.x = 5;
	text3.y = 140;
	text3.x = 5;
	text4.y = 160;
	text4.x = 5;
	back.y = 280;
	back.x = 10;

	stage.addChild(bitmap, title, text, text2, text3, text4, back);
	stage.update();

	back.addEventListener("click", mainMenu);
};

function creditPage() {
	stage.removeAllChildren();

	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var title = new createjs.Text("Credits", "40px Arial", "#00FF00");
	var text = new createjs.Text("This game is an Aalto university course project made by Patrick Patoila", "20px Arial", "#FFCCFF");
	var text2 = new createjs.Text("and Simo Haakana.", "20px Arial", "#FFCCFF");
	var text3 = new createjs.Text("Course: T-111.1100 Digitaalisen median työvälineet.", "20px Arial", "#FFCCFF");
	var back = new createjs.Bitmap(queue.getResult("back_btn"));

	title.x = 230;
	text.y = 100;
	text.x = 5;
	text2.y = 120;
	text2.x = 5;
	text3.y = 140;
	text3.x = 5;
	back.y = 280;
	back.x = 10;

	stage.addChild(bitmap, title, text, text2, text3, back);
	stage.update();

	back.addEventListener("click", mainMenu);
};


function game() {
		
		count = 0;
		enemySpeed = 2;
		playerSpeed = 2;
	
		stage.removeAllChildren();

		var bitmap = new createjs.Bitmap(queue.getResult("bg"));
		
		var data = {
			images: ["projekti/sprite/runningGrant.png"],
			frames: {width: 165, height: 292, count: 64},
			animations: {run:[0, 25, "run"], jump1: [36, 40, "jump2"], jump2: [40, 40, "jump2"], jump3: [48, 63, "run"]}
		};
		var spriteSheet = new createjs.SpriteSheet(data);
	 	player = new createjs.BitmapAnimation(spriteSheet);
	 	player.gotoAndPlay("run");

		var scoreText = new createjs.Text("Score:", "20px Arial", "#FF0000");
		score = new createjs.Text("0", "20px Arial", "#FF0000");

		player.x = 40;
		player.y = 214;

		player.scaleX = 0.5;
		player.scaleY = 0.5;

		score.x = 60;

		stage.addChild(bitmap, scoreText, score, player);
		stage.update();
		startGame();
	
};

function startGame() {
	enemyCount = 0;
	enemyArray = new Array();
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setPaused(false);
	gamegoing = true;
	
};

function tick(event) {
	if (!createjs.Ticker.getPaused()){
		if (enemyArray.length >= 1) {
			for (var i = 0; i < enemyArray.length; i++) {
				var enemy1 = enemyArray[i];
				var collision = ndgmr.checkPixelCollision(player, enemy1, 0);
				if (collision) {
					createjs.Sound.play("crash");
					createjs.Ticker.setPaused(true);
					createjs.Ticker.removeEventListener("tick", endGame());
				}
			}
		}
		if (count % 210 == 0 && playerSpeed <= 13) playerSpeed += 1;
		if (count % 90 == 0 && enemySpeed <= 15) enemySpeed += 1;
		enemy();
		movePlayer();
		if (count % 2 == 0) {
			score.text = parseInt(score.text + 1);
		} 
		stage.update();
		count += 1;
	}
};

function endGame() {
	stage.removeAllChildren();
	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var endnotice = new createjs.Bitmap(queue.getResult("gameover"));
	var endText = new createjs.Text("Your score:", "20px Arial", "#FF0000");
	var endText2 = new createjs.Text(score.text, "20px Arial", "#FF0000");
	var restart = new createjs.Bitmap(queue.getResult("restart_btn"));
	var mainMenu2 = new createjs.Bitmap(queue.getResult("mainmenu_btn"));

	endnotice.x = 280;
	endnotice.scaleX = 1.5;
	endnotice.scaleY = 1.5;
	endText.y = 40;
	endText.x = 50;
	endText2.y = 60;
	endText2.x = 50;
	restart.y = 100;
	restart.x = 50;
	mainMenu2.y = 160;
	mainMenu2.x = 50;

	restart.addEventListener("click", game);
	mainMenu2.addEventListener("click", mainMenu);

	stage.addChild(bitmap, endnotice, endText, endText2, restart, mainMenu2);
	stage.update();
	gamegoing = false;
};

function enemy() {
	if (enemyCount < 0) {
		rand = Math.random()*1000;
		if (rand < 30) {
			if (rand < 10){
				var bitmap = new createjs.Bitmap(queue.getResult("tree"));
				bitmap.x = 640;
				bitmap.y = 195;
				bitmap.scaleX = 1.5;
				bitmap.scaleY = 1.5;
				enemyArray.push(bitmap);
				stage.addChild(bitmap);
				enemyCount = 500;
			}
			else if (rand < 20){
				var bitmap = new createjs.Bitmap(queue.getResult("rock"));
				bitmap.x = 640;
				bitmap.y = 275;
				bitmap.scaleX = 1.5;
				bitmap.scaleY = 1.5;
				enemyArray.push(bitmap);
				stage.addChild(bitmap);
				enemyCount = 350;
			}
			else {
				var bitmap = new createjs.Bitmap(queue.getResult("bird"));
				bitmap.x = 640;
				bitmap.y = Math.random()*171;
				bitmap.scaleX = 0.1;
				bitmap.scaleY = 0.1;
				enemyArray.push(bitmap);
				stage.addChild(bitmap);
				enemyCount = 450;
			}
		}
	}
	if (enemyArray.length > 0) {
		if(enemyArray[0].x + 188 < 0) enemyArray.shift();
	}
	
	for (var i = 0; i < enemyArray.length; i++) {
		enemyArray[i].x -= enemySpeed;
		if (enemyArray[i].y <= 170) {
			if (Math.random() < 0.4 && enemyArray[i].y >= 10) enemyArray[i].y -= 10;
			else if (Math.random() >= 0.4 && enemyArray[i].y <= 160) enemyArray[i].y += 10;
		}
	}
	enemyCount -= 2 * enemySpeed;
};


function movePlayer() { //moves player
	if (player.y <= 214 - playerSpeed) player.y += playerSpeed;
	else {
		if (up3 == true) player.gotoAndPlay("jump3");
		player.y = 214;
		up3 = false;
		up4 = false;
	}
	
	if (left) {
		if (player.x >= playerSpeed) player.x -= playerSpeed;
		else player.x = 0;
	};
	if (up1 == true && up3 == false) {
		player.y -= 200;
		up1 = false;
		up3 = true;
	}
	if (up2 == true && up4 == false) {
		player.y -= 130;
		up2 = false;
		up4 = true;
	}
	if (right) {
		if (player.x <= 560 - playerSpeed) player.x += playerSpeed;
		else player.x = 560;
	};
	if (down) {
		if (player.y <= 214 - playerSpeed) player.y += playerSpeed;
		else player.y = 214;
	};
};

function onKeyDown(x) { //listens for wasd-keypress
	if (x.keyCode == 87) {
		if (up1 == false && up3 == false && up5 == false) {
			up1 = true;
			up5 = true;
			createjs.Sound.play("hop");
			player.gotoAndPlay("jump1");
		}
		else if (up2 == false && up4 == false && up5 == false) {
			up2 = true;
			up5 = true;
			createjs.Sound.play("hop");
			player.gotoAndPlay("jump1");
		}
	}
  	if (x.keyCode == 65) left = true;
  	if (x.keyCode == 83) down = true;
  	if (x.keyCode == 68) right = true;
  	if (x.keyCode == 80) {
  		if (gamegoing){
	  		if (createjs.Ticker.getPaused()){
	  			end_pause();

	  		}else{
	  			createjs.Ticker.setPaused(true);
	  			pause_text = new createjs.Bitmap(queue.getResult("paused"));
	  			pause_continue = new createjs.Bitmap(queue.getResult("continue_btn"));
	  			pause_mainmenu = new createjs.Bitmap(queue.getResult("mainmenu_btn"));
	  			pause_restart = new createjs.Bitmap(queue.getResult("restart_btn"));
	  			pause_text.x = 280;
	  			pause_continue.y = 100;
	  			pause_continue.x = 50;
	  			pause_restart.y = 160;
				pause_restart.x = 50;
				pause_mainmenu.y = 220;
				pause_mainmenu.x = 50;
				pause_restart.addEventListener("click", game);
				pause_mainmenu.addEventListener("click", mainMenu);
				pause_continue.addEventListener("click", end_pause);
				stage.addChild(pause_text, pause_restart, pause_mainmenu, pause_continue);
				stage.update();
	  		}
  		}
  	}
}
function end_pause(){
	createjs.Ticker.setPaused(false);
	stage.removeChild(pause_text, pause_restart, pause_mainmenu, pause_continue);
	stage.update();
}


function onKeyUp(x) {
	if (x.keyCode == 87) up5 = false;
  	if (x.keyCode == 65) left = false;
  	if (x.keyCode == 83) down = false;
  	if (x.keyCode == 68) right = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

init();