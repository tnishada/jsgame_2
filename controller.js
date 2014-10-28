/**
 * Created by tharindu on 10/28/2014.
 */

/*initialize values*/

var dx , dy;

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
};

window.onload = function(){

    initialize();
    setInterval(function( ){playGame();},10);
    //alert(Math.cos(Math.PI/2));

};

/*start to execute the game*/
var playGame = function(){

    clearCanvas();
    drawShooter(x,y,30,global_gunAngle);

   if(left){
       global_gunAngle = (global_gunAngle+1)%360;

   }
   else if(right){
       global_gunAngle = (global_gunAngle-1)%360;
   }

   getDirection(global_gunAngle);


    if(up){
        x += dx;
        y +=dy;
    }
    else if(down){
        x -= dx;
        y -=dy;
    }
    document.getElementById("text").innerText = global_gunAngle;

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

    dy = 1*Math.sin(Math.PI*2*a/360);
    dx = 1*Math.cos(Math.PI*2*a/360);

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

