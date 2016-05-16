/**
 * Created by mor on 16/05/16.
 */
define([], function(){

    /**
     * create a timeline instance
     * @param obj
     * @constructor
     */
    function Timeline(obj){
        this.seq = [];
        this.obj = obj;
        this.cur = 0;
    }

    /**
     * add a new animation sequence(s)
     */
    Timeline.prototype.add = function(){
        for(var i=0;i<arguments.length;i++){
            this.seq.push(arguments[i]);
        }
    }

    /**
     * play animation
     */
    Timeline.prototype.play = function(){
        this.playFrame(0);
    }

    /**
     * play a single frame
     * @param frame
     */
    Timeline.prototype.playFrame = function(frame){
        var f = this.seq[frame];
        if(f != undefined)
            this.obj.animate(f.animation, f.dur, this.playFrame.bind(this, frame+1));
        else
            return;
    }

    return Timeline;
});