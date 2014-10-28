/**
 * Created by tharindu on 10/28/2014.
 */
var WIDTH;
var HEIGHT;
var canvas;
var ctx;
var gun_length =20;
var gun_width = 3;
var global_gunAngle =0;
var x,y;



/*draw shooter including body and gun*/
var drawShooter = function(x,y,radius, gun_angle){ // angle at 0 >  90 V

        /*draw circle*/
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
    ctx.closePath();
    ctx.fill();
    /*finish drawing circle*/

    ctx.translate(x,y);
    ctx.rotate( (Math.PI / 180) * gun_angle);


    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(gun_length+radius,0);
    ctx.lineWidth = gun_width;
    ctx.stroke();

    ctx.rotate((-Math.PI / 180) * gun_angle);
    ctx.translate(-x,-y);


};

/*clear the canvas*/
var clearCanvas = function(){

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(0,0,WIDTH,HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#000000";

};