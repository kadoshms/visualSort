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

        var r = props.radius;
        var x = props.x;
        var y = props.y;
        var dx = props.dx != undefined ? props.dx : 0;

        var circle = snap.circle(dx + x * props.space, y, r);

        // set red RGB value
        var red = Math.min(Math.max(value, 0), 255) * 15;

        // set properties
        circle.attr({
            fill    :   'rgb(255,'+(255-red)+',0)'
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

    return Ball;
});