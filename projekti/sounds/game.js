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
var scoreCount = 0;
var player;

function init() {
	stage = new createjs.Stage("game");
	queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", handleFileLoad);
	queue.addEventListener("complete", playMusic);
	queue.loadManifest([{id: "bg", src: "projekti/img/forestbackground.png"}, {id: "tree", src: "projekti/img/tree2.png"}, {id: "player1", src: "projekti/sprite/runningGrant.png"}, {id: "music", src: "projekti/sounds/JungleB.mp3"}, {id: "start_btn", src: "projekti/img/btn/start_btn.png"}, {id: "instructions_btn", src: "projekti/img/btn/instructions_btn.png"}, {id: "credits_btn", src: "projekti/img/btn/credits_btn.png"}, {id: "restart_btn", src: "projekti/img/btn/restart_btn.png"}, {id: "mainmenu_btn", src: "projekti/img/btn/mainmenu_btn.png"}, {id: "back_btn", src: "projekti/img/btn/back_btn.png"},]);

};

function handleFileLoad() {
	var loading = new createjs.Text("Loading...", "40px Arial", "#FF0000");
	loading.x = 250;
	loading.y = 160;
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
	var title = new createjs.Text("Partiopojan seikkailut", "40px Arial", "#00FF00");
	var start = new createjs.Bitmap(queue.getResult("start_btn"));
	var instructions = new createjs.Bitmap(queue.getResult("instructions_btn"));
	var credits = new createjs.Bitmap(queue.getResult("credits_btn"));

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
};

function instructionPage() {
	stage.removeAllChildren();

	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var title = new createjs.Text("Instructions", "40px Arial", "#00FF00");
	var text = new createjs.Text("Collect points", "20px Arial", "#FF0000");
	var back = new createjs.Bitmap(queue.getResult("back_btn"));

	text.y = 100;
	back.y = 280;

	stage.addChild(bitmap, title, text, back);
	stage.update();

	back.addEventListener("click", mainMenu);
};

function creditPage() {
	stage.removeAllChildren();

	var bitmap = new createjs.Bitmap(queue.getResult("bg"));
	var title = new createjs.Text("Credits", "40px Arial", "#00FF00");
	var text = new createjs.Text("This game is an Aalto university course project made by Simo Haakana", "20px Arial", "#FF0000");
	var text2 = new createjs.Text("and Patrick Patoila.", "20px Arial", "#FF0000");
	var back = new createjs.Bitmap(queue.getResult("back_btn"));

	text.y = 100;
	text2.y = 120;
	back.y = 280;

	stage.addChild(bitmap, title, text, text2, back);
	stage.update();

	back.addEventListener("click", mainMenu);
};


function game() {
	
		stage.removeAllChildren();

		var bitmap = new createjs.Bitmap(queue.getResult("bg"));
		
		var data = {
			images: ["projekti/sprite/runningGrant.png"],
			frames: {width: 165, height: 292, count: 64},
			animations: {run:[0, 25, "run"], jump: [26, 63, "run"]}
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
	
};

function tick(event) {
	if (!createjs.Ticker.getPaused()){
		enemy();
		movePlayer();
		scoreCount += 1;
		if (scoreCount == 15) {
			score.text = parseInt(score.text + 1);
			scoreCount = 0;
		} 
		stage.update();
		if (enemyArray.length >= 1) {
			for (var i = 0; i < enemyArray.length; i++) {
				var enemy1 = enemyArray[i];
				var collision = ndgmr.checkPixelCollision(player, enemy1, 0);
				if (collision) {
					createjs.Ticker.setPaused(true);
					createjs.Ticker.removeEventListener("tick", endGame());
				}
			}
		}
	}
};

function endGame() {
	stage.removeAllChildren();
	var bitmap = new createjs.Bitmap(queue.getResult("bg"));

	var endText = new createjs.Text("Your score:", "20px Arial", "#FF0000");
	var endText2 = new createjs.Text(score.text, "20px Arial", "#FF0000");
	var restart = new createjs.Bitmap(queue.getResult("restart_btn"));
	var mainMenu2 = new createjs.Bitmap(queue.getResult("mainmenu_btn"));

	endText.y = 40;
	endText2.y = 60;
	restart.y = 100;
	mainMenu2.y = 160;

	restart.addEventListener("click", game);
	mainMenu2.addEventListener("click", mainMenu);

	stage.addChild(bitmap, endText, endText2, restart, mainMenu2);
	stage.update();
};

function enemy() {
	if (enemyCount < 1) {
		if (Math.random()*1000 < 10) {
			var bitmap = new createjs.Bitmap(queue.getResult("tree"));
			bitmap.x = 640;
			bitmap.y = 195;
			bitmap.scaleX = 1.5;
			bitmap.scaleY = 1.5;
			enemyArray.push(bitmap);
			stage.addChild(bitmap);
			enemyCount = 100;
		}
	}
	for (var i = 0; i < enemyArray.length; i++) {
		enemyArray[i].x -= 5;
	}
	enemyCount -= 1;
};

function movePlayer() { //moves player
	if (player.y < 209 ) player.y += 5;
	else {
		player.y = 214;
		up3 = false;
		up4 = false;
	}
	
	if (left) {
		if (player.x >= 5) player.x -= 5;
		else player.x = 0;
	};
	if (up1 == true && up3 == false) {
		player.y -= 180;
		up1 = false;
		up3 = true;
	}
	if (up2 == true && up4 == false) {
		player.y -= 180;
		up2 = false;
		up4 = true;
	}
	if (right) {
		if (player.x <= 555) player.x += 5;
		else player.x = 560;
	};
	if (down) {
		if (player.y <= 209) player.y += 5;
		else player.y = 214;
	};
};

function onKeyDown(x) { //listens for wasd-keypress
	if (x.keyCode == 87) {
		if (up1 == false && up3 == false && up5 == false) {
			up1 = true;
			up5 = true;
			player.stop();
			player.gotoAndPlay("jump");
		}
		else if (up2 == false && up4 == false && up5 == false) {
			up2 = true;
			up5 = true;
		}
	}
  	if (x.keyCode == 65) left = true;
  	if (x.keyCode == 83) down = true;
  	if (x.keyCode == 68) right = true;
  	if (x.keyCode == 80) {
  		if (createjs.Ticker.getPaused()){
  			createjs.Ticker.setPaused(false);
  		}else{
  			createjs.Ticker.setPaused(true);
  		}
  	}
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