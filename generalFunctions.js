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

    stones[i] = new RStone(x,y,radius,angle);
    for(var j=0;j<6;j++){

        stones[i].nodes[j][0] = j*60;
        stones[i].nodes[j][1] =  10+Math.floor(Math.random()*40);
    }
};

    /*amount to be reduced from ship health*/
var healthReducer = function(shipRadius,stone){
    var total =0;
    for(var i=0;i<6;i++){
        total+= stone.nodes[i][1];
    }
    total = total/6;
    return Math.floor(8*(Math.PI*total*total)/(Math.PI*shipRadius*shipRadius));
};
/*detect collision of stones with either bullets or shooter cartesian plane concepts have been used for collision detection*/
var collision = function(stone,circleX,circleY,circleR){

        /*y coordinates are multiplied by -1 to make them cartesian coordinates*/
    circleY *= -1;
    var xc = stone.locationx;
    var yc = -stone.locationy;
    var x1 =  xc+stone.nodes[5][1]*Math.cos(2*Math.PI*stone.nodes[5][0]/360);
    var y1 = yc-stone.nodes[5][1]*Math.sin(2*Math.PI*stone.nodes[5][0]/360);
    var x2 = xc+stone.nodes[0][1]*Math.cos(2*Math.PI*stone.nodes[0][0]/360);
    var y2 = yc-stone.nodes[0][1]*Math.sin(2*Math.PI*stone.nodes[0][0]/360);
    var beta;
    var alpha = intersectionX(x1,y1,x2,y2,circleX,circleY,xc,yc);

    if(alpha>= -100 && alpha<= 700){
          beta = (alpha-x1)*((y1-y2)/(x1-x2)) + y1;

        if(getDistance(x1,y1,x2,y2)+10 > getDistance(x1,y1,alpha,beta) + getDistance(alpha,beta,x2,y2)){

            if(getDistance(xc,yc,circleX,circleY)+10 > getDistance(xc,yc,alpha,beta) + getDistance(alpha,beta,circleX,circleY)){

                if(getDistance(alpha,beta,circleX,circleY) < circleR){//collision occurs
                    return true;
                }
            }
        }
    }

    for(i=0;i<5;i++){

         xc = stone.locationx;
         yc = -stone.locationy;
         x1 =  xc+stone.nodes[i][1]*Math.cos(2*Math.PI*stone.nodes[i][0]/360);
         y1 = yc-stone.nodes[i][1]*Math.sin(2*Math.PI*stone.nodes[i][0]/360);
         x2 = xc+stone.nodes[i+1][1]*Math.cos(2*Math.PI*stone.nodes[i+1][0]/360);
         y2 = yc-stone.nodes[i+1][1]*Math.sin(2*Math.PI*stone.nodes[i+1][0]/360);


         alpha = intersectionX(x1,y1,x2,y2,circleX,circleY,xc,yc);

        if(alpha>= -100 && alpha<= 700){
             beta = (alpha-x1)*((y1-y2)/(x1-x2)) + y1;

            if(getDistance(x1,y1,x2,y2)+10 > getDistance(x1,y1,alpha,beta) + getDistance(alpha,beta,x2,y2)){

                if(getDistance(xc,yc,circleX,circleY)+10 > getDistance(xc,yc,alpha,beta) + getDistance(alpha,beta,circleX,circleY)){

                        if(getDistance(alpha,beta,circleX,circleY) < circleR){//collision occurs
                            return true;
                        }
                }
            }
        }
    }
        return false;

};

/*theory for the intersection of two straight lines is used*/
var intersectionX = function (x1,y1,x2,y2,xb,yb,xc,yc){

    var a = (y1-y2)/(x1-x2);
    var b = (yb-yc)/(xb-xc);

    if(a==b){
        return 10000;
    }

    return (b*(-xb) + x1*a + yb -y1)/(a-b) ;
};

/*distance between to coordinates*/
var getDistance = function(x1,y1,x2,y2){

    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
};