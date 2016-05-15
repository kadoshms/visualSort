/**
 * Created by mor on 15/05/16.
 */

define([], function(){

    /**
     * create a new sorter instance
     * @param array array to sort
     * @constructor
     */
    var Sorter = function(array){
        this.array = array;
    }


    /**
     * bubble sort algorithm
     *
     * @complexity O(n^2)
     */
    Sorter.prototype.bubbleSort = function(){
        for(var i=0;i<this.array.length;i++)
        {
            for(var j=0;j<this.array.length-1;j++)
            {
                if(this.array[j] > this.array[j+1])
                {
                    this.swap(j, j+1);
                }
            }
        }
    }

    /**
     * get current array
     * @returns {*}
     */
    Sorter.prototype.getArray = function(){
        return this.array;
    }

    /**
     * swap between two elements in the array
     * @param i
     * @param j
     */
    Sorter.prototype.swap = function(i, j){
        var temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
    }

    return Sorter;
});