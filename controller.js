/**
 * Created by tharindu on 10/28/2014.
 */
/*initialize values*/

var dx , dy;
var bullet;
var shooterAngle =0;
var dtheta =2;
var stones = new Array(5);

/*initialize*/
var initialize = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    x = 300;
    y = 300;

    dx =1;
    dy = 0;
    bullet = new Bullet();
    for(var i=0;i<5;i++) {
        createStone(i);
    }
};

window.onload = function(){

    initialize();
    setInterval(function( ){playGame();},10);
    //alert(Math.cos(Math.PI/2));

};

/*start to execute the game*/
var playGame = function(){

    clearCanvas();

    for(var i=0;i<5;i++) {

        if(!stones[i].stoneEnabled){
            createStone(i);
        }

        stones[i].handle();

        if(collision(bullet.locationx, bullet.locationy,stones[i].locationx,stones[i].locationy,stones[i].radius) && bullet.bulletEnabled){

            stones[i].stoneEnabled = false;
        }
    }

    drawShooter(x,y,shooterRadius,shooterAngle);

   if(left){
       shooterAngle = (shooterAngle+dtheta)%360;

   }
   else if(right){
       shooterAngle = (shooterAngle-dtheta)%360;
   }

   getDirection(shooterAngle);

    if(x+dx>WIDTH){
        x =0;
    }else if(x+dx <0){
        x = WIDTH;
    }

    if(y+dy>HEIGHT){
        y =0;
    }else if(y+dy <0){
        y = HEIGHT;
    }

    if(up){
        x += dx;
        y +=dy;
    }
    else if(down){
        x -= dx;
        y -=dy;
    }
    document.getElementById("text").innerText = shooterAngle;

    if(ctrl && !bullet.bulletEnabled){ // shoot occur
        bullet.shoot(shooterAngle);

    }
    bullet.handle();



};

/*update dx and dy*/
var getDirection = function(angle){

   var a;

  //  dx = dx/Math.abs(dx);

    if(angle>=0){
        a = angle;
    }
    else{
        a = angle + 360;
    }

    dy = shooterSpeed*Math.sin(Math.PI*2*a/360);
    dx = shooterSpeed*Math.cos(Math.PI*2*a/360);

    if(a<=90){
        dx = Math.abs(dx);
        dy = -Math.abs(dy);
    }
    else if(a<=180){
        dx = -Math.abs(dx);
        dy = -Math.abs(dy);
    }
    else if(a<=270){
        dx = -Math.abs(dx);
        dy = Math.abs(dy);
    }
    else{

        dx = Math.abs(dx);
        dy = Math.abs(dy);
    }

};

/*random values for stones are assigned*/
var createStone = function(i){

    var y = Math.floor(Math.random() * 2) * HEIGHT;
    var x = Math.random() * WIDTH;
    var angle;

    if (y == HEIGHT) { // created at bottom
        angle = 45 + Math.random() * 90;

    } else if (y == 0) {//created at top

        angle = 225 + Math.random() * 90;
    }

    var radius = 10 + 20 * Math.random();

    stones[i] = new Stone(x, y, radius, angle);

};

/*detect collision and return true if collision*/

var collision = function(bulletx,bullety,stonex,stoney,stoner){

    var distance = Math.sqrt((bulletx-stonex)*(bulletx-stonex) + (bullety-stoney)*(bullety-stoney));

    return (distance<=stoner);

};
