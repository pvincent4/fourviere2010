/*
function Vector(x, y) {
	this.X = x;
	this.Y = y;

	this.getNorme = function() {
		return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
	};

	this.normalize = function() {
		var norme = this.getNorme();
		this.X /= norme;
		this.Y /= norme;
	};

	this.addVector = function(vector) {
		this.X += vector.X;
		this.Y += vector.Y;
	};

	this.multiply = function(scalar) {
		this.X *= scalar;
		this.Y *= scalar;
	};
}
*/
function FinishMessage(breakout) {
	this.Breakout = breakout;
	this.Width = 200;
	this.Height = 100;
	this.X = ((this.Breakout.Width / 2) - (this.Width / 2));
	this.Y = ((this.Breakout.Height / 2) - (this.Height / 2));
	this.Ui = document.createElement('div');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
	this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
	this.Ui.style.backgroundImage = 'url(data/gamefinish.png)';
	this.Ui.style.opacity = 0;

	this.display = function() {
		this.Ui.style.webkitTransition = 'opacity 0.25s linear';
		this.Ui.style.opacity = 1;
	};
}

function PlayButton(breakout) {
	this.Breakout = breakout;
	this.Width = 100;
	this.Height = 100;
	this.X = ((this.Breakout.Width / 2) - (this.Width / 2));
	this.Y = ((this.Breakout.Height / 2) - (this.Height / 2));
	this.Ui = document.createElement('div');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
	this.Ui.style.webkitBorderRadius = '20px';
	this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
	this.Ui.style.backgroundColor = '#808080';
	this.Ui.style.backgroundImage = 'url(data/play.png)';
	this.Ui.style.opacity = 0.8;

	this.Ui.addEventListener("click", function(event) {
		var playButton = event.currentTarget.owner;
		playButton.Breakout.remove(playButton);
		playButton.Breakout.play();
	}, true);
}

function Paddle(breakout) {
	var paddle = this;
	this.Breakout = breakout;
	this.Width = 150;
	this.Height = 50;
	this.X = (512 - this.Width) / 2;
	this.Y = (512 - this.Height);
	this.Ui = document.createElement('div');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.height = this.Height+'px';
	this.Ui.style.width = this.Width+'px';
//	this.Ui.style.backgroundColor = 'yellow';
	this.Ui.style.backgroundImage = 'url(data/paddle.png)';
	this.Ui.style.webkitBorderRadius = '20px';
	this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
	this.IsMoving = false;

	this.MoveVectorX = 0;

//	this.Audio = new Audio('data/blip.mp3');
//	this.Audio.autobuffer = true;

	this.updateUi = function() {
		this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
	};

	this.IsMouseDown = false;

	this.Ui.addEventListener("mousedown", function(event) {
		var paddle = event.currentTarget.owner;
		if(!paddle.Breakout.IsPlaying)
			return;

		paddle.IsMouseDown = true;
		// capture the mouse up and move events
		window.addEventListener("mouseup", paddle.mouseUp, true);
		window.addEventListener("mousemove", paddle.mouseMove, true);
		paddle.StartX = paddle.X;
		paddle.StartMoveX = event.pageX;
	}, true);

	this.mouseUp = function(event) {
		// remove captured event
		window.removeEventListener("mouseup", paddle.mouseUp, true);
		window.removeEventListener("mousemove", paddle.mouseMove, true);
		paddle.IsMouseDown = false;
		paddle.MoveVectorX = 0;
	};

	this.mouseMove = function(event) {
		var deltaX = event.pageX - paddle.StartMoveX;
		paddle.MoveVectorX = (paddle.StartX + deltaX) - paddle.X;

		paddle.X = paddle.StartX + deltaX;
		if(paddle.X < 0)
			paddle.X = 0;
		else if(paddle.X > paddle.Breakout.Width - paddle.Width)
			paddle.X =  paddle.Breakout.Width - paddle.Width;
		paddle.updateUi();
	}

	this.Ui.addEventListener("touchstart", function(event) {
		event.preventDefault();
		var paddle = event.currentTarget.owner;
		if(!paddle.Breakout.IsPlaying)
			return;
		paddle.StartX = paddle.X;
		paddle.StartMoveX = event.touches[0].pageX;
//		paddle.Audio.pause();
//		paddle.Audio.currentTime = 0.0;
//		paddle.Audio.play();
//		new Audio('data/blip.mp3').play();
	}, true);

	this.Ui.addEventListener("touchmove", function(event) {
		event.preventDefault();
		var paddle = event.currentTarget.owner;
		if(!paddle.Breakout.IsPlaying)
			return;
		var deltaX = event.touches[0].pageX - paddle.StartMoveX;
		paddle.MoveVectorX = (paddle.StartX + deltaX) - paddle.X;
		paddle.X = paddle.StartX + deltaX;

		if(paddle.X < 0)
			paddle.X = 0;
		else if(paddle.X > paddle.Breakout.Width - paddle.Width)
			paddle.X =  paddle.Breakout.Width - paddle.Width;
		paddle.updateUi();
	}, true);


	this.Ui.addEventListener("touchend", function(event) {
		event.preventDefault();
		var paddle = event.currentTarget.owner;
		if(!paddle.Breakout.IsPlaying)
			return;
		paddle.MoveVectorX = 0;
	}, true);
}

function Ball(breakout) {
	var ball = this;
	this.Breakout = breakout;
	// ball radius
	this.Radius = 7.5;

	// create the gui
	this.Ui = document.createElement('div');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.backgroundImage = 'url(data/ball.png)';

	// call to generate a random initial ball direction
	this.randomDirection = function() {
		var randAngle = (Math.PI / 4) + (Math.random() * (Math.PI / 2));
		this.VectorX = Math.cos(randAngle);
		this.VectorY = -Math.sin(randAngle);
	};

	// called when the gui need update
	this.updateUi = function() {
		this.Ui.style.height = (this.Radius * 2)+'px';
		this.Ui.style.width = (this.Radius * 2)+'px';
		this.Ui.style.webkitTransform = 'translate3d('+(this.X - this.Radius)+'px, '+(this.Y - this.Radius)+'px, 0px)';
	};

	// called when explode animation finish
	this.explodeDone = function() {
		ball.explodedCallback();
	};

	// explode the ball
	this.explode = function(callback) {
		this.IsExploding = true;
		this.explodedCallback = callback;
		setTimeout(this.explodeDone, 250);
		this.Ui.style.webkitTransition = 'opacity 0.250s linear';
		this.Ui.style.opacity = 0;
	};

	// reset the ball position on the paddle
	this.reset = function() {
		this.randomDirection();
		this.Speed = 5;
		this.IsExploding = false;
		this.Ui.style.webkitTransition = undefined;
		this.Ui.style.opacity = 1;
		// ball on the center of the paddle
		this.X = this.Breakout.Paddle.X + (this.Breakout.Paddle.Width / 2);
		this.Y = this.Breakout.Paddle.Y - this.Radius;
	};

	// set the initial state
	this.reset();

	// update initial gui
	this.updateUi();
}

function Brick(breakout) {
	this.Breakout = breakout;
	this.Width = 64;
	this.Height = 32;
	this.X = 0;
	this.Y = 0;
	this.Ui = document.createElement('div');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.height = this.Height+'px';
	this.Ui.style.width = this.Width+'px';
//	this.Ui.style.backgroundColor = 'green';
	this.Ui.style.backgroundImage = 'url(data/brick.png)';
	this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';

	this.IsExploded = false;

	this.updateUi = function() {
		this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
	};

	this.explode = function() {
		if(!this.IsExploded) {
			this.IsExploded = true;
			this.Ui.style.webkitTransition = 'opacity 0.250s linear';
			this.Ui.style.opacity = 0;
		}
	};
}

function Breakout(div) {
	var breakout = this;
	this.Width = 512;
	this.Height = 512;
	this.IsPlaying = false;
	this.Ui = div;
	this.Ui.owner = this;
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
//	this.Ui.style.backgroundColor = 'lightGray';
//	this.Ui.style.backgroundImage = 'url(data/background.jpg)';
	this.Ui.style.borderTop = '5px solid darkGray';
	this.Ui.style.borderLeft = '5px solid darkGray';
	this.Ui.style.borderRight = '5px solid darkGray';

	this.add = function(element) {
		this.Ui.appendChild(element.Ui);
	};

	this.remove = function(element) {
		this.Ui.removeChild(element.Ui);
	};

	this.Paddle = new Paddle(this);
	this.add(this.Paddle);

	this.Ball = new Ball(this);
	this.add(this.Ball);

	this.Bricks = new Array();

	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 8; x++) {
			var brick = new Brick();
			brick.X = x * 64;
			brick.Y = y * 32;
			brick.updateUi();
			this.add(brick);
			this.Bricks.push(brick);
		}
	}

	this.FinishMessage = new FinishMessage(this);
	this.add(this.FinishMessage);

	this.PlayButton = new PlayButton(this);
	this.add(this.PlayButton);

	// called when the ball has exploded
	this.ballExploded = function() {
		console.debug('ballExploded');
		breakout.Ball.reset();
	};

	// called to animate the ball
	this.ballAnimation = function() {
		var oldX = breakout.Ball.X;
		var oldY = breakout.Ball.Y;

		breakout.Ball.X += breakout.Ball.VectorX * breakout.Ball.Speed;
		breakout.Ball.Y += breakout.Ball.VectorY * breakout.Ball.Speed;

		// check for right border collision
		if(breakout.Ball.X  > breakout.Width - breakout.Ball.Radius) {
			var alpha = (breakout.Width - breakout.Ball.Radius - oldX) / breakout.Ball.VectorX;
			var newY = oldY + (alpha * breakout.Ball.VectorY);
			breakout.Ball.X = breakout.Width - breakout.Ball.Radius;
			breakout.Ball.Y = newY;
			breakout.Ball.VectorX = -breakout.Ball.VectorX;
		}
		// check for left border collision
		else if(breakout.Ball.X  < breakout.Ball.Radius) {
			var alpha = (breakout.Ball.Radius - oldX) / breakout.Ball.VectorX;
			var newY = oldY + (alpha * breakout.Ball.VectorY);
			breakout.Ball.X = breakout.Ball.Radius;
			breakout.Ball.Y = newY;
			breakout.Ball.VectorX = -breakout.Ball.VectorX;
		}
		// check for top border collision
		else if(breakout.Ball.Y < breakout.Ball.Radius) {
			var alpha = (breakout.Ball.Radius - oldY) / breakout.Ball.VectorY;
			var newX = oldX + (alpha * breakout.Ball.VectorX);
			breakout.Ball.X = newX;
			breakout.Ball.Y = breakout.Ball.Radius;
			breakout.Ball.VectorY = -breakout.Ball.VectorY;
		}
		// check for bottom paddle collision (if ball was not exploded)
		else if((!breakout.Ball.IsExploding) && (breakout.Ball.Y > breakout.Height - breakout.Ball.Radius - breakout.Paddle.Height)) {
			var lineY = breakout.Height - breakout.Ball.Radius - breakout.Paddle.Height;
			var alpha = (lineY - oldY) / breakout.Ball.VectorY;
			var newX = oldX + (alpha * breakout.Ball.VectorX);
			// paddle collision
			if((newX > breakout.Paddle.X) && (newX < breakout.Paddle.X + breakout.Paddle.Width)) {
				console.debug('paddle collision '+breakout.Paddle.MoveVectorX);
				breakout.Ball.X = newX;
				breakout.Ball.Y = lineY;
				breakout.Ball.VectorY = -breakout.Ball.VectorY;
				// handle energy exchange to allow ball trajectory change				
				var energy = (breakout.Paddle.MoveVectorX * 0.1);
				if(energy < -0.2) energy = -0.2;
				if(energy > 0.2) energy = 0.2;
				breakout.Ball.VectorX += energy;
				// keep the same speed for the ball
				var norme = Math.sqrt((breakout.Ball.VectorX * breakout.Ball.VectorX) + (breakout.Ball.VectorY * breakout.Ball.VectorY));
				breakout.Ball.VectorX /= norme;
				breakout.Ball.VectorY /= norme;
			}
			else {
				breakout.Ball.explode(breakout.ballExploded);
			}
		}

		// check brick collisions
		var lastCollidingTest; var test;
		do {
			test = breakout.findCollidingBrick(oldX, oldY);
			if(test != undefined) {
				lastCollidingTest = test;
				var brick = test[0];
				var border = test[1];
				console.debug('brick collision '+border);
	
				if(border == "bottom") {
					var lineY = brick.Y + brick.Height + breakout.Ball.Radius;
					var alpha = (lineY - oldY) / breakout.Ball.VectorY;
					var newX = oldX + (alpha * breakout.Ball.VectorX);
					breakout.Ball.X = newX;
					breakout.Ball.Y = lineY;
				}
				else if(border == "top") {
					var lineY = brick.Y - breakout.Ball.Radius;
					var alpha = (lineY - oldY) / breakout.Ball.VectorY;
					var newX = oldX + (alpha * breakout.Ball.VectorX);
					breakout.Ball.X = newX;
					breakout.Ball.Y = lineY;
				}
				else if(border == "left") {
					var lineX = brick.X - breakout.Ball.Radius;
					var alpha = (lineX - oldX) / breakout.Ball.VectorX;
					var newY = oldY + (alpha * breakout.Ball.VectorY);
					breakout.Ball.X = lineX;
					breakout.Ball.Y = newY;
				}
				else if(border == "right") {
					var lineX = brick.X + brick.Width + breakout.Ball.Radius;
					var alpha = (lineX - oldX) / breakout.Ball.VectorX;
					var newY = oldY + (alpha * breakout.Ball.VectorY);
					breakout.Ball.X = lineX;
					breakout.Ball.Y = newY;
				}
			}
		}
		while(test != undefined);

		if(lastCollidingTest != undefined) {
			var brick = lastCollidingTest[0];
			var border = lastCollidingTest[1];
			if((border == "bottom") || (border == "top"))
				breakout.Ball.VectorY = -breakout.Ball.VectorY;
			else
				breakout.Ball.VectorX = -breakout.Ball.VectorX;
			brick.explode();

			if(breakout.checkEndGame()) {
				breakout.pause();
				console.debug('game finished');
				breakout.FinishMessage.display();
			}
		}
		breakout.Ball.updateUi();
	};

	this.checkEndGame = function() {
		for(var i = 0; i < this.Bricks.length; i++) {
			if(!this.Bricks[i].IsExploded)
				return false;
		}
		return true;
	};

	this.play = function() {
		if(!this.IsPlaying) {
			this.IsPlaying = true;
			this.BallTimer = setInterval(this.ballAnimation, 16);
		}
	};

	this.pause = function() {
		if(this.IsPlaying) {
			this.IsPlaying = false;
			clearInterval(this.BallTimer);
			this.BallTimer = undefined;
		}
	};

	this.findCollidingBrick = function(oldX, oldY) {
		for(var i = 0; i < this.Bricks.length; i++) {
			var brick = this.Bricks[i];
			if(brick.IsExploded)
				continue;
			var ballX = breakout.Ball.X;
			var ballY = breakout.Ball.Y;
			var ballR = breakout.Ball.Radius;
			var ballVX = breakout.Ball.VectorX;
			var ballVY = breakout.Ball.VectorY;
			var collidingBorder = undefined;
			// check for brick collisions
			if((ballY - ballR < brick.Y + brick.Height) && (ballY + ballR > brick.Y) &&
			   (ballX + ballR > brick.X) && (ballX - ballR < brick.X + brick.Width)) {

				// collision is left or bottom
				if((ballVX > 0) && (ballVY < 0)) {
					// check if it is left
					var lineX = brick.X - ballR;
					var alpha = (lineX - oldX) / ballVX;
					var newY = oldY + (alpha * ballVY);
					if((newY >= brick.Y) && (newY <= brick.Y + brick.Height))
						collidingBorder = "left";
					else
						collidingBorder = "bottom";
				}
				// collision is left or top
				else if(ballVX > 0) {
					// check if it is left
					var lineX = brick.X - ballR;
					var alpha = (lineX - oldX) / ballVX;
					var newY = oldY + (alpha * ballVY);
					if((newY >= brick.Y) && (newY <= brick.Y + brick.Height))
						collidingBorder = "left";
					else
						collidingBorder = "top";
				}
				// collision is right or top or bottom
				else {
					// check if it is right
					var lineX = brick.X + brick.Width + ballR;
					var alpha = (lineX - oldX) / ballVX;
					var newY = oldY + (alpha * ballVY);
					if((newY >= brick.Y) && (newY <= brick.Y + brick.Height))
						collidingBorder = "right";
					else if(ballVY < 0)
						collidingBorder = "bottom";
					else
						collidingBorder = "top";
				}
			}
			if(collidingBorder != undefined)
				return Array(brick, collidingBorder);
		}
	};
}

