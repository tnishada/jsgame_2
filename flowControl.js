/**
 * Created by tharindu on 10/29/2014.
 */
/**
 * Created by tharindu on 10/28/2014.
 */
/*initialize values*/
var ctx;
var WIDTH;  // width and height of the canvas
var HEIGHT;
var dx , dy;
var bullet;
var stones = new Array(5);
var t; // used to control timer events
var canvas; // canvas object
var shooter;

/*initialize*/
var initialize = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;



    dx =1;
    dy = 0;
    bullet = new Bullet();
    shooter = new Shooter();

    for(var i=0;i<5;i++) { //  assign each stone a sze and beginning coordinates
        createStone(i);
    }
};

window.onload = function(){
    initialize();
    playGame();

};

/*start to execute the game*/
var playGame = function(){
    clearCanvas();

    for(var i=0;i<5;i++) {
        if(!stones[i].stoneEnabled){
            createStone(i);
        }

        stones[i].handle();

       // if(collision(bullet.locationx, bullet.locationy,bullet.radius,stones[i].locationx,stones[i].locationy,stones[i].radius) && bullet.bulletEnabled){
        if(collision(stones[i],bullet.locationx, bullet.locationy,bullet.radius) && bullet.bulletEnabled){

            stones[i].stoneEnabled = false;
            bullet.bulletEnabled = false;
            var p = document.getElementById("sPoint");
            p.innerText = parseInt(p.innerText) + 1+""; // update the score bar
        }

        /*used  to detect collision between stones and shooter*/
        /*-5 used to give a clear vision to the user about the collision */
        if(collision(stones[i],shooter.locationx, shooter.locationy,shooter.radius-5)){


            var health = document.getElementById("hPoint");
            var Hpoint = parseInt(health.innerText,10);
            Hpoint -= healthReducer(shooter.radius,stones[i].radius);
            health.innerText = Hpoint+"";

            stones[i].stoneEnabled = false;

            if(Hpoint<=0){
                health.innerText = "00";
                var s = document.getElementById("gameStatus");
                s.innerText = "Game Over";
                clearInterval(t);
            }
        }
    }

    shooter.draw();

    if(left){
        shooter.angle = (shooter.angle+shooter.rotationSpeed)%360;
    }
    else if(right){
        shooter.angle = (shooter.angle-shooter.rotationSpeed)%360;
    }

    shooter.setDirection();

    if(shooter.locationx+shooter.dx>WIDTH){
        shooter.locationx =0;
    }else if(shooter.locationx+shooter.dx <0){
        shooter.locationx = WIDTH;
    }

    if(shooter.locationy+shooter.dy>HEIGHT){
        shooter.locationy =0;
    }else if(shooter.locationy+shooter.dy <0){
        shooter.locationy = HEIGHT;
    }

    if(up){
        shooter.locationx += shooter.dx;
        shooter.locationy +=shooter.dy;
    }
    else if(down){
        shooter.locationx -= shooter.dx;
        shooter.locationy -=shooter.dy;
    }
    document.getElementById("text").innerText = shooter.angle;

    if(ctrl && !bullet.bulletEnabled){ // shoot occur
        bullet.shoot(shooter.angle);

    }
    bullet.handle();
};

/*start button click call this function*/
var startEvent = function() {
    clearInterval(t);
    t = setInterval(function( ){playGame();},10);
};

var pauseEvent = function(){
    clearInterval(t);
};

var resetEvent = function(){
    shooter.angle =90;
    shooter.locationx = 300;
    shooter.locationy = 300;

    for(var i=0;i<5;i++) { //  assign each stone a sze and beginning coordinates
        createStone(i);
    }

    clearInterval(t);
    document.getElementById("hPoint").innerText = "100";
    document.getElementById("sPoint").innerText = "00";
    playGame();
};