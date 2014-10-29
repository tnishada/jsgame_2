/**
 * Created by tharindu on 10/29/2014.
 */

/*Bullet Object*/
function Bullet(){
    var radius = 5;
    var speed =9;
    this.bulletEnabled = false;
    this.locationx =0;
    this.locationy =0;
    this.dx = 0;
    this.dy =0;

    this.draw = function(x,y){  //draw function
        ctx.beginPath();
        ctx.arc(x, y,radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
        ctx.closePath();
        ctx.fill();
    };

        /*this method is invoked once ctrl pressed*/
    this.shoot = function(angle){

        this.locationx = x + (shooterRadius+gun_length)*Math.cos(Math.PI*2*angle/360);
        this.locationy =  y - (shooterRadius+gun_length)*Math.sin(Math.PI*2*angle/360);
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

/*shooter object*/

function shooter(x,y,radius,angle){
    this.x =x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
}

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
        ctx.beginPath();
        ctx.arc(this.locationx, this.locationy,this.radius, 0, Math.PI*2, true); // x-position, y-position,arc_radius, start angle , end angle, clockwise
        ctx.closePath();
        ctx.fill();
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