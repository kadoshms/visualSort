/**
 * Created by mor on 15/05/16.
 */

define([
    'classes/timeline'
], function(Timeline){

    /**
     * create a new instance of group
     * @param snap snap object
     * @param element element type
     * @param values array of values
     * @constructor
     */
    function Group(snap, Element, props, array){
        this.elements = [];
        this.props = props;
        this.array = array;
        for(var i=0;i<array.length;i++)
        {
            props.x = i;
            props.y = props.y || 100;

            this.elements.push(new Element(snap, array[i], props));
        }
    }

    /**
     * graphically swap between group elements
     */
    Group.prototype.swap = function(){
        var i = arguments[0], j = arguments[1];

        var g1 = this.elements[i].getGraphics();
        var g2 = this.elements[j].getGraphics();

        var tl1 = new Timeline(g1);
        var tl2 = new Timeline(g2);

        var anim1 = this.elements[i].populateSwapAnimation(parseFloat(g2.attr('cx')), this.props.y);
        var anim2 = this.elements[j].populateSwapAnimation(parseFloat(g1.attr('cx')), this.props.y);

        for(var k=0;k<anim1.length;k++)
        {
            tl1.add(anim1[k]);
            tl2.add(anim2[k]);
        }

        tl1.play();
        tl2.play();

        // now swap them logically
        var temp = this.elements[i];
        this.elements[i] = this.elements[j];
        this.elements[j] = temp;
    }

    /**
     * get array
     * @returns {*}
     */
    Group.prototype.getArray = function(){
        return this.array;
    }

    return Group;
});