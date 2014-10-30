/**
 * Created by tharindu on 10/29/2014.
 */
/*shooter object*/

function Shooter(){
    this.locationx =300;
    this.locationy = 300;
    this.radius = 30;
    this.angle = 0;
    this.rotationSpeed = 2;
    var gunWidth = 3;
    var speed = 2;
    var gunLength = 10;
    this.dx =1;
    this.dy =0;

    /*draw shooter including body and gun*/
    this.draw = function(){

        /*draw circle*/
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.locationx, this.locationy, this.radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
        ctx.closePath();
        ctx.fill();
        /*finish drawing circle*/

        ctx.translate(this.locationx,this.locationy);
        ctx.rotate( -(Math.PI / 180) * this.angle);


        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(gunLength+this.radius,0);
        ctx.lineWidth = gunWidth;
        ctx.strokeStyle = "blue";
        ctx.stroke();

        ctx.rotate((Math.PI / 180) * this.angle);
        ctx.translate(-this.locationx,-this.locationy);

        ctx.fillStyle = "black";

    };


    /*update dx and dy*/
     this.setDirection = function(){

        var a;

        //  dx = dx/Math.abs(dx);

        if(this.angle>=0){
            a = this.angle;
        }
        else{
            a = this.angle + 360;
        }

        this.dy = shooterSpeed*Math.sin(Math.PI*2*a/360);
        this.dx = shooterSpeed*Math.cos(Math.PI*2*a/360);

        if(a<=90){
            this.dx = Math.abs(this.dx);
            this.dy = -Math.abs(this.dy);
        }
        else if(a<=180){
            this.dx = -Math.abs(this.dx);
            this.dy = -Math.abs(this.dy);
        }
        else if(a<=270){
            this.dx = -Math.abs(this.dx);
            this.dy = Math.abs(this.dy);
        }
        else{

            this.dx = Math.abs(this.dx);
            this.dy = Math.abs(this.dy);
        }

    };


}