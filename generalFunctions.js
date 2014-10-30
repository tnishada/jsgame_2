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
var collision = function(bulletX,bulletY,bulletR,stoneX,stoneY,stoneR){

    var distance = Math.sqrt((bulletX-stoneX)*(bulletX-stoneX) + (bulletY-stoneY)*(bulletY-stoneY));

    return (distance<=(stoneR+bulletR));
};

/*random values for stones are assigned*/
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

    stones[i] = new Stone(x, y, radius, angle);

};
