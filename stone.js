/**
 * Created by tharindu on 10/29/2014.
 */

/*stone object*/
function Stone(x,y,radius,angle){
    this.locationx=x;
    this.locationy = y;
    this.angle = angle;
    this.stoneEnabled = true;
    this.radius =radius;
    this.speed = 1;
    this.dx = 3;
    this.dy = 3;

    this.dx = this.speed*Math.cos(Math.PI*2*angle/360);
    this.dy = -this.speed*Math.sin(Math.PI*2*angle/360);

    this.draw = function(){
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.locationx, this.locationy,this.radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "black";
    };

    this.handle = function(){

        if(this.locationx-radius <= WIDTH &&this.locationx+radius>=0 && this.locationy-radius<=HEIGHT && this.locationy+radius>=0 && this.stoneEnabled){

            this.draw(this.locationx,this.locationy);
            this.locationx += this.dx;
            this.locationy +=this.dy;

        }else{   //stone is out of the canvas thus reset everything
            this.stoneEnabled = false;
        }
    };

}