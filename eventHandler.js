/**
 * Created by tharindu on 10/28/2014.
 */

var right = false;
var left = false;
var  up = false;
var down = false;
var ctrl = false;

/*detect whether a key is pressed*/
var onKeyDownFunc = function(event){


    switch(event.keyCode){

        case 37:  // left arrow
            left = true;
            break;

        case 38: // up arrow
            up = true;
            break;

        case 39:  // right arrow
            right =true;
            break;

        case 40: // down arrow
            down = true;
            break;

        case 17 : // ctrl
            ctrl = true;
            break;

        default : //do nothing
    }
};

/*detect whether a key is released*/
var onKeyUpFunc = function(event){

    switch(event.keyCode){

        case 37:  // left arrow
            left = false;
            break;

        case 38: // up arrow
            up = false;
            break;

        case 39:  // right arrow
            right = false;
            break;

        case 40: // down arrow
            down = false;
            break;

        case 17 : // ctrl
            ctrl = false;
            break;

        default : //do nothing
    }
};

/*event listners for key up and key down*/
document.addEventListener("keydown", function(){
    onKeyDownFunc(event);
});

document.addEventListener("keyup", function(){
    onKeyUpFunc(event);
});
