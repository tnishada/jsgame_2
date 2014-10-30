/**
 * Created by tharindu on 10/28/2014.
 */

var ctx;
var gun_length =10;
var gun_width = 3;
var shooterSpeed =2;

var shooterRadius = 30;
var x,y;



/*draw shooter including body and gun*/
var drawShooter = function(x,y,radius, gun_angle){ // angle at 0 >  90 V

        /*draw circle*/
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
    ctx.closePath();
    ctx.fill();
    /*finish drawing circle*/

    ctx.translate(x,y);
    ctx.rotate( -(Math.PI / 180) * gun_angle);


    ctx.beginPath();

    ctx.moveTo(0,0);
    ctx.lineTo(gun_length+radius,0);
    ctx.lineWidth = gun_width;
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.rotate((Math.PI / 180) * gun_angle);
    ctx.translate(-x,-y);

    ctx.fillStyle = "black";


};




