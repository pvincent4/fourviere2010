
function FinishMessage(game) {
	this.Game = game;
	this.Width = 200;
	this.Height = 100;
	this.X = ((this.Game.Width / 2) - (this.Width / 2));
	this.Y = ((this.Game.Height / 2) - (this.Height / 2));
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

function PlayButton(game) {
	this.Game = game;
	this.Width = 100;
	this.Height = 100;
	this.X = ((this.Game.Width / 2) - (this.Width / 2));
	this.Y = ((this.Game.Height / 2) - (this.Height / 2));
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
		playButton.Game.remove(playButton);
		playButton.Game.play();
	}, true);
}

function CardLayout(game) {
	this.Game = game;
	this.Width = 512;
	this.Height = 512;
	this.X = 0;
	this.Y = 0;
	this.Ui = document.createElement('table');
	this.Ui.owner = this;
	this.Ui.style.position = 'absolute';
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
//	this.Ui.style.webkitBorderRadius = '20px';
	this.Ui.style.webkitTransform = 'translate3d('+this.X+'px, '+this.Y+'px, 0px)';
//	this.Ui.style.backgroundColor = 'green';

	for(var y = 0; y < 4; y++) {
		var row = this.Ui.insertRow(-1);
		for(var x = 0; x < 4; x++) {
			var cell = row.insertCell(0);
			var card = new Card(game, cell);
//			cell.style.width = '128px';
//			cell.style.height = '128px';
//			cell.style.backgroundColor = 'red';
//			cell.style.backgroundImage = 'url(data/backcard.png)';

//			cell.appendChild(card.Ui);
		}
	}
}

function Card(game, ui) {
	var self = this;
	this.Game = game;
	this.Width = 128;
	this.Height = 128;
	this.Ui = ui;
	this.Ui.owner = this;
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
	this.Ui.style.backgroundImage = 'url(data/backcard.png)';

	this.IsRevealed = false;

	this.halfRevealed = function() {
		console.debug('halfRevealed');
		if(self.IsRevealed)
			self.Ui.style.backgroundImage = 'url(data/card1.png)';
		else
			self.Ui.style.backgroundImage = 'url(data/backcard.png)';

		self.Ui.style.webkitTransitionProperty = '-webkit-transform';
		self.Ui.style.webkitTransitionDuration = '0.25s';
		self.Ui.style.webkitTransform = 'rotateY(0deg)';
	};

	this.Ui.addEventListener("click", function(event) {
		var card = event.currentTarget.owner;
		if(card.IsRevealed) {
			card.IsRevealed = false;
			setTimeout(self.halfRevealed, 250);
			card.Ui.style.webkitTransform = 'rotateY(0deg)';
			card.Ui.style.webkitTransitionProperty = '-webkit-transform';
			card.Ui.style.webkitTransitionDuration = '0.25s';
			card.Ui.style.webkitTransform = 'rotateY(90deg)';
		}
		else {
			card.IsRevealed = true;
			setTimeout(self.halfRevealed, 250);
			card.Ui.style.webkitTransform = 'rotateY(0deg)';
			card.Ui.style.webkitTransitionProperty = '-webkit-transform';
			card.Ui.style.webkitTransitionDuration = '0.25s';
			card.Ui.style.webkitTransform = 'rotateY(90deg)';
		}
	}, false);

	this.Ui.addEventListener("touchstart", function(event) {
		event.preventDefault();
		var card = event.currentTarget.owner;
		if(card.IsRevealed) {
			card.IsRevealed = false;
			setTimeout(self.halfRevealed, 250);
			card.Ui.style.webkitTransform = 'rotateY(0deg)';
			card.Ui.style.webkitTransitionProperty = '-webkit-transform';
			card.Ui.style.webkitTransitionDuration = '0.25s';
			card.Ui.style.webkitTransform = 'rotateY(90deg)';
		}
		else {
			card.IsRevealed = true;
			setTimeout(self.halfRevealed, 250);
			card.Ui.style.webkitTransform = 'rotateY(0deg)';
			card.Ui.style.webkitTransitionProperty = '-webkit-transform';
			card.Ui.style.webkitTransitionDuration = '0.25s';
			card.Ui.style.webkitTransform = 'rotateY(90deg)';
		}
	}, false);

	// called when the gui need update
//	this.updateUi = function() {
//		this.Ui.style.webkitTransform = 'translate3d('+(this.X - this.Radius)+'px, '+(this.Y - this.Radius)+'px, 0px)';
//	};
}

/*
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
*/

function Memory(div) {
	var self = this;
	this.Width = 512;
	this.Height = 512;
	this.IsPlaying = false;
	this.Ui = div;
	this.Ui.owner = this;
	this.Ui.style.width = this.Width+'px';
	this.Ui.style.height = this.Height+'px';
//	this.Ui.style.backgroundColor = 'lightGray';
//	this.Ui.style.backgroundImage = 'url(data/background.jpg)';
//	this.Ui.style.borderTop = '5px solid darkGray';
//	this.Ui.style.borderLeft = '5px solid darkGray';
//	this.Ui.style.borderRight = '5px solid darkGray';

	this.add = function(element) {
		this.Ui.appendChild(element.Ui);
	};

	this.remove = function(element) {
		this.Ui.removeChild(element.Ui);
	};

	this.CardLayout = new CardLayout(this);
	this.add(this.CardLayout);

	this.FinishMessage = new FinishMessage(this);
	this.add(this.FinishMessage);

	this.PlayButton = new PlayButton(this);
	this.add(this.PlayButton);

//	this.Card = new Card(this);
//	this.add(this.Card);

	this.play = function() {
		if(!this.IsPlaying) {
			this.IsPlaying = true;
		}
	};

	this.pause = function() {
		if(this.IsPlaying) {
			this.IsPlaying = false;
		}
	};
}

