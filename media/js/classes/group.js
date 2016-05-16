/**
 * Created by mor on 15/05/16.
 */

define([], function(){

    /**
     * create a new instance of group
     * @param snap snap object
     * @param element element type
     * @param values array of values
     * @constructor
     */
    function Group(snap, Element, props, values){
        this.elements = [];
        for(var i=0;i<values.length;i++)
        {
            props.x = i;
            props.y = 100;

            this.elements.push(new Element(snap, values[i], props));
        }
    }

    return Group;
});