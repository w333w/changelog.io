// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
	
  var a= Math.floor(Math.random()*(max-min)) + min;
  if(a!=0){
	  return a;
  }
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}
function Ball (x,y,velX,velY,color,size){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size =size;	
}
Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
	ctx.fill();
}
Ball.prototype.update = function(){
	if((this.x + this.size)>=width){
		this.velX = -(this.velX);
	}
	if((this.y + this.size)>=height){
		this.velY = -(this.velY);
	}
	if((this.x - this.size)<=0){
		this.velX = -(this.velX);
	}
	if((this.y - this.size)<=0){
		this.velY = -(this.velY);
	}
	this.x +=this.velX;
	this.y +=this.velY;
}
var balls = [];
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}
function loop(){
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);
	while(balls.length<150){
		const size = random(10,20);
		var ball = new Ball(
			random(0 + size,width - size),
			random(0 + size,height - size),
			random(-7,7),
			random(-7,7),
			randomColor(),
			size
		);
		balls.push(ball);
	}
	for (var i= 0;i < balls.length;i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
		
	}
	requestAnimationFrame(loop);
	
}
loop();