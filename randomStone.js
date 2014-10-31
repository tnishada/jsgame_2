/**
 * Created by tharindu on 10/30/2014.
 */
/**
 * Created by tharindu on 10/29/2014.
 */

/*stone object*/
function RStone(x,y,radius,angle){
    this.locationx=x;
    this.locationy = y;
    this.angle = angle;
    this.stoneEnabled = true;
    this.radius =radius;
    this.speed = 1;
    this.dx = 3;
    this.dy = 3;
    this.nodes = new Array(6);

    for(var i=0;i<6;i++){
        this.nodes[i] = new Array(2);
        this.nodes[i][0] = i*50;  // angle
        this.nodes[i][1] = 0; // length
    }

    this.dx = this.speed*Math.cos(Math.PI*2*angle/360);
    this.dy = -this.speed*Math.sin(Math.PI*2*angle/360);

    this.draw = function(){
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(this.locationx+this.nodes[0][1]*Math.cos(Math.PI*2*this.nodes[0][0]), this.locationy+this.nodes[0][1]*Math.sin(Math.PI*2*this.nodes[0][0]));

       for(var i =1;i<6;i++){
           ctx.lineTo(this.locationx+this.nodes[i][1]*Math.cos(Math.PI*2*this.nodes[i][0]/360), this.locationy+this.nodes[i][1]*Math.sin(Math.PI*2*this.nodes[i][0]/360));
       }
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