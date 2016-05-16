/**
 * Created by mor on 15/05/16.
 */

define([], function(){

    /**
     * create a new ball instance
     * @param snap snap object
     * @param value color strength
     * @param props properties object
     * @param
     * @constructor
     */
    function Ball(snap, value, props){
        this.value = value;

        var r = props.radius || value;
        var x = props.x;
        var y = props.y;
        var dx = props.dx != undefined ? props.dx : 0;

        var green = 255-this.value*8;

        // make sure color is valid
        green = Math.min(green, 255);
        green = Math.max(green, 0);

        var circle = snap.circle(dx + x * props.space, y, r).attr({
            fill    :   'rgb(255,'+green+',0)'
        });
        this.graphics = circle;
    }

    /**
     * value getter
     * @returns {*}
     */
    Ball.prototype.getValue = function(){
        return this.value;
    }

    /**
     * get ball graphics component
     * @returns {*}
     */
    Ball.prototype.getGraphics = function(){
        return this.graphics;
    }

    /**
     * generate animation sequences for ball swap
     * @param destX
     * @param destY
     * @returns {*[]}
     */
    Ball.prototype.populateAnimation = function(destX, destY){
        var bbox = this.graphics.getBBox();
        var y = bbox.y;
        var x = bbox.x;

        return [{animation : { cy: y+100}, dur:200}, {animation : { cx: destX}, dur:200}, {animation : { cy: destY}, dur:200}];
    }

    return Ball;
});