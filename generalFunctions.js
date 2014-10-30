/**
 * Created by tharindu on 10/29/2014.
 */
/*clear the canvas*/
var clearCanvas = function(){
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0,0,WIDTH,HEIGHT);
    ctx.closePath();
    ctx.fill();
};

/*detect collision and return true if collision occurs */
//original name "collision"
var collision__ = function(bulletX,bulletY,bulletR,stoneX,stoneY,stoneR){

    var distance = Math.sqrt((bulletX-stoneX)*(bulletX-stoneX) + (bulletY-stoneY)*(bulletY-stoneY));

    return (distance<=(stoneR+bulletR));
};





/*random values for stone nodes are assigned*/
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
   // stones[i] = new Stone(x, y, radius, angle);

    stones[i] = new RStone(x,y,radius,angle);
    for(var j=0;j<6;j++){

        stones[i].nodes[j][0] = j*60;
        stones[i].nodes[j][1] =  10+Math.floor(Math.random()*40);
    }

};

var healthReducer = function(shipRadius,stoneRadius){

        return Math.floor(25*(Math.PI*stoneRadius*stoneRadius)/(Math.PI*shipRadius*shipRadius));
};
// original name "complexCollision"
var collision = function(stone,circleX,circleY,circleR){



    for(i=0;i<5;i++){

        var x1 = stone.nodes[i][1]*Math.cos(2*Math.PI*stone.nodes[i][0]/360);
        var y1 = stone.nodes[i][1]*Math.sin(2*Math.PI*stone.nodes[i][0]/360);
        var x2 = stone.nodes[i+1][1]*Math.cos(2*Math.PI*stone.nodes[i+1][0]/360);
        var y2 = stone.nodes[i+1][1]*Math.sin(2*Math.PI*stone.nodes[i+1][0]/360);
        var xc = stone.locationx;
        var yc = stone.locationy;

        var alpha = intersectionX(x1,y1,x2,y2,circleX,circleY,xc,xy);

        if(alpha>= -100 && alpha<= 700){
            var beta = (alpha-x1)*((y1-y2)/(x1-x2)) + y1;

            if(getDistance(x1,y1,x2,y2)+10 > getDistance(x1,y1,alpha,beta) + getDistance(alpha,beta,x2,y2)){

                if(getDistance(xc,yc,circleX,circleY)+10 > getDistance(xc,yc,alpha,beta) + getDistance(alpha,beta,circleX,circleY)){

                        if(getDistance(alpha,beta,circleX,circleY) < circleR){//collision occurs
                            stone.stoneEnabled = false;
                        }
                }
            }
        }
    }


    var intersectionX = function (x1,y1,x2,y2,xb,yb,xc,yc){

        var a = (y1-y2)/(x1-x2);
        var b = (yb-yc)/(xb-xc);

        if(a==b){
            return 10000;
        }

        return (b*(-xb) + x1*a + yb -y1)/(a-b) ;
    };

    var getDistance = function(x1,y1,x2,y2){

        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    };
};