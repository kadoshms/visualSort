/**
 * app.js
 *
 * application main module file
 *
 * Created by mor on 15/05/16.
 */

define([], function(){
    /**
     * first executed method
     */
    var initialize = function(){
        self = this;
        initGame();
    }

    /**
     * initialize game stage and components
     */
    function initGame(){
        // create snap stage
        var paper = Snap(800, 600);
    }

    return {
        initialize: initialize
    };
});