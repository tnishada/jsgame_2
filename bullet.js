/**
 * Created by tharindu on 10/30/2014.
 */

/*Bullet Object*/
function Bullet(){
    this.radius = 5;
    var speed =9;
    this.bulletEnabled = false;
    this.locationx =0;
    this.locationy =0;
    this.dx = 0;
    this.dy =0;

    this.draw = function(xCoordinate,yCoordinate){  //draw function

        ctx.fillStyle = "Blue";
        ctx.beginPath();
        ctx.arc(xCoordinate, yCoordinate,this.radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "black";
    };

    /*this method is invoked once ctrl pressed*/
    this.shoot = function(angle){

        this.locationx = shooter.locationx + (shooter.radius+shooter.gunlength)*Math.cos(Math.PI*2*angle/360);
        this.locationy =  shooter.locationy - (shooter.radius+shooter.gunlength)*Math.sin(Math.PI*2*angle/360);
        this.dx = speed*Math.cos(Math.PI*2*angle/360);
        this.dy = -speed*Math.sin(Math.PI*2*angle/360);
        this.bulletEnabled = true;
        this.draw(this.locationx,this.locationy);
    };

    this.handle = function(){
        /*bullet is in the canvas */
        if(this.locationx <= WIDTH &&this.locationx>=0 && this.locationy<=HEIGHT && this.locationy>=0 && this.bulletEnabled){

            this.draw(this.locationx,this.locationy);
            this.locationx += this.dx;
            this.locationy +=this.dy;

        }else{   //bullet is out of the canvas thus reset everything
            this.bulletEnabled = false;
        }
    }

}
